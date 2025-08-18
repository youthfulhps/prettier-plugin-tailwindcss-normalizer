import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import { normalizeClassNames } from "./normalizer";

export function transformJSXAST(code: string): string {
  try {
    const ast = parse(code, {
      sourceType: "module",
      plugins: [
        "jsx",
        "typescript",
        "decorators-legacy",
        "classProperties",
        "objectRestSpread",
      ],
    });

    const supportedAttributes = ["className"];
    const supportedFunctions = ["clsx", "classnames", "cn"];

    traverse(ast, {
      JSXAttribute(path) {
        const attributeName = path.node.name;

        if (
          attributeName.type === "JSXIdentifier" &&
          supportedAttributes.includes(attributeName.name)
        ) {
          const value = path.node.value;

          if (value && value.type === "StringLiteral") {
            value.value = normalizeClassNames(value.value);
          } else if (
            value &&
            value.type === "JSXExpressionContainer" &&
            value.expression.type === "StringLiteral"
          ) {
            value.expression.value = normalizeClassNames(
              value.expression.value
            );
          } else if (
            value &&
            value.type === "JSXExpressionContainer" &&
            value.expression.type === "TemplateLiteral"
          ) {
            value.expression.quasis.forEach((quasi) => {
              if (quasi.value.raw) {
                const normalized = normalizeClassNamesInTemplateLiteral(
                  quasi.value.raw
                );
                quasi.value.raw = normalized;
                quasi.value.cooked = normalized;
              }
            });
          }
        }
      },

      CallExpression(path) {
        const callee = path.node.callee;
        if (
          callee.type === "Identifier" &&
          supportedFunctions.includes(callee.name)
        ) {
          path.node.arguments.forEach((arg) => {
            if (arg.type === "StringLiteral") {
              arg.value = normalizeClassNames(arg.value);
            }
          });
        }
      },

      StringLiteral(path) {
        if (path.parent?.type === "JSXAttribute") {
          return;
        }

        if (
          path.parent?.type === "CallExpression" &&
          path.parent.callee?.type === "Identifier" &&
          supportedFunctions.includes(path.parent.callee.name)
        ) {
          return;
        }

        if (isTailwindClassString(path.node.value)) {
          path.node.value = normalizeClassNames(path.node.value);
        }
      },
    });

    return generate(ast, {
      retainLines: true,
      compact: false,
    }).code;
  } catch (error) {
    return code;
  }
}

export function transformHTMLAST(code: string): string {
  try {
    const supportedAttributes = ["class"];

    let result = code;
    supportedAttributes.forEach((attr) => {
      const regex = new RegExp(
        `(<[^>]+\\s)(${attr}\\s*=\\s*)(["'])([^"']*?)\\3`,
        "g"
      );
      result = result.replace(
        regex,
        (match, tagStart, attrName, quote, classValue) => {
          const normalized = normalizeClassNames(classValue);
          return `${tagStart}${attrName}${quote}${normalized}${quote}`;
        }
      );
    });

    return result;
  } catch (error) {
    return code;
  }
}

export function transformVueTemplate(code: string): string {
  try {
    let result = code;

    result = result.replace(
      /(:class|v-bind:class)\s*=\s*(["'])(.*?)\2/g,
      (match, attrName, outerQuote, content) => {
        const innerQuoteMatch = content.match(/^(['"])(.*?)\1$/);
        if (innerQuoteMatch) {
          const [, innerQuote, innerClasses] = innerQuoteMatch;
          const normalized = normalizeClassNames(innerClasses);
          return `${attrName}=${outerQuote}${innerQuote}${normalized}${innerQuote}${outerQuote}`;
        } else {
          const normalized = normalizeClassNames(content);
          return `${attrName}=${outerQuote}${normalized}${outerQuote}`;
        }
      }
    );

    result = result.replace(
      /\bclass\s*=\s*(["'])([^"']*?)\1/g,
      (match, quote, classValue) => {
        const normalized = normalizeClassNames(classValue);
        return `class=${quote}${normalized}${quote}`;
      }
    );

    return result;
  } catch (error) {
    return code;
  }
}

function isTailwindClassString(str: string): boolean {
  if (!str || str.length < 3) return false;

  const hasArbitraryValues = /[a-z:-]+\[[^\]]+\]/.test(str);
  if (!hasArbitraryValues) return false;

  const hasSpaces = str.includes(" ");
  const isUrl =
    str.includes("://") || str.includes(".com") || str.includes(".org");
  const hasCommonWords =
    /\b(the|and|is|are|in|on|at|to|for|of|with|by)\b/i.test(str);
  const hasNumbers = /^\d+$/.test(str.trim());

  if (isUrl || hasCommonWords || hasNumbers) return false;

  if (hasSpaces) {
    const parts = str.trim().split(/\s+/);
    const classLikeParts = parts.filter((part) =>
      /^[a-z][a-z0-9-]*(:?[a-z][a-z0-9-]*)*(\[[^\]]+\])?$/.test(part)
    );
    return classLikeParts.length >= Math.ceil(parts.length / 2);
  }

  return /^[a-z][a-z0-9-]*(:?[a-z][a-z0-9-]*)*(\[[^\]]+\])+$/.test(str);
}

function normalizeClassNamesInTemplateLiteral(rawString: string): string {
  const interpolations: string[] = [];
  const withPlaceholders = rawString.replace(/\$\{[^}]*\}/g, (match) => {
    const placeholder = `__INTERPOLATION_${interpolations.length}__`;
    interpolations.push(match);
    return placeholder;
  });

  const normalized = normalizeClassNames(withPlaceholders);

  return interpolations.reduce((result, interpolation, index) => {
    return result.replace(`__INTERPOLATION_${index}__`, interpolation);
  }, normalized);
}

export function transformByFileType(code: string, filepath?: string): string {
  if (!filepath) {
    return code;
  }

  const extension = filepath.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "jsx":
    case "tsx":
      return transformJSXAST(code);

    case "html":
      return transformHTMLAST(code);

    case "vue":
      return code.replace(
        /(<template[^>]*>)([\s\S]*?)(<\/template>)/g,
        (match, openTag, content, closeTag) => {
          return openTag + transformVueTemplate(content) + closeTag;
        }
      );

    default:
      return code;
  }
}
