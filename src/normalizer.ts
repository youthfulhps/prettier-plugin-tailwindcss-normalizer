import { TailwindMapping, PluginOptions } from "./types";
import { TAILWIND_MAPPINGS } from "./mappings";
import { generateSpacingMappings } from "./utils/spacing-generator";

let currentMappings: TailwindMapping = TAILWIND_MAPPINGS;

export function setPluginOptions(options: PluginOptions = {}): void {
  if (options.customSpacingUnit && options.customSpacingUnit !== 4) {
    const customSpacingMappings = generateSpacingMappings(
      options.customSpacingUnit
    );

    currentMappings = {
      ...TAILWIND_MAPPINGS,
      ...customSpacingMappings,
    };
  } else {
    currentMappings = TAILWIND_MAPPINGS;
  }
}

export function normalizeClassAttribute(content: string): string {
  let result = content;

  const classAttributeRegex = /class\s*=\s*["']([^"']*?)["']/g;
  result = result.replace(classAttributeRegex, (match, classNames) => {
    const normalizedClasses = normalizeClassNames(classNames);
    return match.replace(classNames, normalizedClasses);
  });

  const classNameAttributeRegex = /className\s*=\s*["']([^"']*?)["']/g;
  result = result.replace(classNameAttributeRegex, (match, classNames) => {
    const normalizedClasses = normalizeClassNames(classNames);
    return match.replace(classNames, normalizedClasses);
  });

  const vueClassRegex = /(?::class|v-bind:class)\s*=\s*["']([^"']*?)["']/g;
  result = result.replace(vueClassRegex, (match, classNames) => {
    const normalizedClasses = normalizeClassNames(classNames);
    return match.replace(classNames, normalizedClasses);
  });

  const angularClassRegex = /\[class\]\s*=\s*["']([^"']*?)["']/g;
  result = result.replace(angularClassRegex, (match, classNames) => {
    const normalizedClasses = normalizeClassNames(classNames);
    return match.replace(classNames, normalizedClasses);
  });

  const templateLiteralRegex = /`([^`]*?)`/g;
  result = result.replace(templateLiteralRegex, (match, content) => {
    const processedContent = content.replace(
      /([a-z-]+\[[^\]]+\])/g,
      (classMatch: string) => {
        return normalizeClassName(classMatch);
      }
    );
    return "`" + processedContent + "`";
  });

  const jsxBraceStringRegex =
    /(className\s*=\s*\{)\s*["']([^"']*?)["']\s*(\})/g;
  result = result.replace(
    jsxBraceStringRegex,
    (match, prefix, classNames, suffix) => {
      const normalizedClasses = normalizeClassNames(classNames);
      return prefix + '"' + normalizedClasses + '"' + suffix;
    }
  );

  const classUtilRegex =
    /((?:clsx|classnames|cn)\s*\([^)]*?)["']([^"']*?)["']/g;
  result = result.replace(classUtilRegex, (match, prefix, classNames) => {
    const normalizedClasses = normalizeClassNames(classNames);
    return prefix + '"' + normalizedClasses + '"';
  });

  const generalStringRegex = /(["'])([^"']*?)(\1)/g;
  result = result.replace(
    generalStringRegex,
    (match, quote, content, endQuote) => {
      if (content.includes("=") || content.length < 3) {
        return match;
      }

      const hasArbitraryValues = /[a-z-]+\[[^\]]+\]/.test(content);
      if (hasArbitraryValues) {
        const normalizedContent = normalizeClassNames(content);
        return quote + normalizedContent + endQuote;
      }

      return match;
    }
  );

  return result;
}

export function normalizeClassNames(classNames: string): string {
  const classes = classNames.split(/\s+/).filter(Boolean);

  return classes.map((className) => normalizeClassName(className)).join(" ");
}

export function normalizeClassName(className: string): string {
  let variantPrefix = "";
  let pos = 0;

  while (pos < className.length) {
    if (className[pos] === "[") {
      const bracketEnd = className.indexOf("]:", pos);
      if (bracketEnd === -1) break;
      variantPrefix += className.substring(pos, bracketEnd + 2);
      pos = bracketEnd + 2;
    } else {
      const colonPos = className.indexOf(":", pos);
      if (colonPos === -1) break;

      const beforeColon = className.substring(pos, colonPos);
      if (beforeColon.includes("[")) {
        const bracketEnd = className.indexOf("]:", pos);
        if (bracketEnd === -1) break;
        variantPrefix += className.substring(pos, bracketEnd + 2);
        pos = bracketEnd + 2;
      } else {
        variantPrefix += className.substring(pos, colonPos + 1);
        pos = colonPos + 1;
      }
    }

    if (pos >= className.length) break;

    if (className[pos] === " ") break;

    const nextChar = className[pos];
    if (!/[a-z0-9_\-\[\]]/.test(nextChar)) {
      break;
    }
  }

  const classWithoutVariant = className.substring(variantPrefix.length);

  if (!variantPrefix) {
    return normalizeClassNameWithoutVariant(className);
  }

  const normalizedClass = normalizeClassNameWithoutVariant(classWithoutVariant);

  if (normalizedClass === classWithoutVariant) {
    return className;
  }

  return variantPrefix + normalizedClass;
}

function normalizeClassNameWithoutVariant(className: string): string {
  const negativeArbitraryValueRegex = /^-([a-z:-]+)\[([^\]]+)\]$/;
  const negativeArbitraryMatch = className.match(negativeArbitraryValueRegex);

  if (negativeArbitraryMatch) {
    const [, prefixWithDash, value] = negativeArbitraryMatch;

    const prefix = prefixWithDash.replace(/-$/, "");

    const negativeAllowedPrefixes = [
      "m",
      "mx",
      "my",
      "mt",
      "mr",
      "mb",
      "ml",
      "ms",
      "me",
      "top",
      "right",
      "bottom",
      "left",
      "inset",
      "inset-x",
      "inset-y",
      "gap",
      "gap-x",
      "gap-y",
      "space-x",
      "space-y",
    ];

    if (!negativeAllowedPrefixes.includes(prefix)) {
      return className;
    }

    if (value === "0px" || value === "0") {
      const mapping = findStandardMapping(prefix, value);
      return mapping ? `-${mapping}` : className;
    }

    const mapping = findStandardMapping(prefix, value);
    return mapping ? `-${mapping}` : className;
  }

  const arbitraryValueRegex = /^([a-z:-]+)\[([^\]]+)\]$/;
  const arbitraryMatch = className.match(arbitraryValueRegex);

  if (arbitraryMatch) {
    const [, prefixWithDash, value] = arbitraryMatch;

    const prefix = prefixWithDash.replace(/-$/, "");

    if (value.startsWith("-")) {
      if (value === "-0px" || value === "-0") {
        const positiveValue = value.substring(1);
        const mapping = findStandardMapping(prefix, positiveValue);
        return mapping || className;
      }

      const negativeMapping = findStandardMapping(prefix, value);
      if (negativeMapping) {
        return negativeMapping;
      }

      const negativeAllowedPrefixes = [
        "m",
        "mx",
        "my",
        "mt",
        "mr",
        "mb",
        "ml",
        "ms",
        "me",
        "top",
        "right",
        "bottom",
        "left",
        "inset",
        "inset-x",
        "inset-y",
        "gap",
        "gap-x",
        "gap-y",
        "space-x",
        "space-y",
        "rotate",
        "translate-x",
        "translate-y",
      ];

      if (negativeAllowedPrefixes.includes(prefix)) {
        const positiveValue = value.substring(1);
        const mapping = findStandardMapping(prefix, positiveValue);
        return mapping ? `-${mapping}` : className;
      }

      return className;
    }

    const mapping = findStandardMapping(prefix, value);
    return mapping || className;
  }

  const negativePxSuffixRegex = /^-([a-z:-]+)-(\d+)px$/;
  const negativePxMatch = className.match(negativePxSuffixRegex);

  if (negativePxMatch) {
    const [, prefix, numValue] = negativePxMatch;

    const negativeAllowedPrefixes = [
      "m",
      "mx",
      "my",
      "mt",
      "mr",
      "mb",
      "ml",
      "ms",
      "me",
      "top",
      "right",
      "bottom",
      "left",
      "inset",
      "inset-x",
      "inset-y",
      "gap",
      "gap-x",
      "gap-y",
      "space-x",
      "space-y",
    ];

    if (!negativeAllowedPrefixes.includes(prefix)) {
      return className;
    }

    if (numValue === "0") {
      const mapping = findStandardMapping(prefix, "0px");
      return mapping ? `-${mapping}` : className;
    }

    const pixelValue = `${numValue}px`;
    const mapping = findStandardMapping(prefix, pixelValue);
    return mapping ? `-${mapping}` : className;
  }

  const pxSuffixRegex = /^([a-z:-]+)-(\d+)px$/;
  const pxMatch = className.match(pxSuffixRegex);

  if (pxMatch) {
    const [, prefix, numValue] = pxMatch;
    const pixelValue = numValue + "px";

    const mapping = findStandardMapping(prefix, pixelValue);
    return mapping || className;
  }

  return className;
}

function findStandardMapping(prefix: string, value: string): string | null {
  const mappings = currentMappings[prefix as keyof TailwindMapping];

  if (!mappings) {
    return null;
  }

  return mappings[value] || null;
}
