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
  const negativeArbitraryValueRegex = /^-([a-z:-]+)\[([^\]]+)\]$/;
  const negativeArbitraryMatch = className.match(negativeArbitraryValueRegex);

  if (negativeArbitraryMatch) {
    const [, prefixWithDash, value] = negativeArbitraryMatch;

    const prefix = prefixWithDash.replace(/-$/, "");

    if (value === "0px" || value === "0") {
      const mapping = findStandardMapping(prefix, value);
      return mapping || className;
    }

    const negativeValue = `-${value}`;
    const mapping = findStandardMapping(prefix, negativeValue);
    return mapping || className;
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

      const mapping = findStandardMapping(prefix, value);
      return mapping || className;
    }

    const mapping = findStandardMapping(prefix, value);
    return mapping || className;
  }

  const negativePxSuffixRegex = /^-([a-z:-]+)-(\d+)px$/;
  const negativePxMatch = className.match(negativePxSuffixRegex);

  if (negativePxMatch) {
    const [, prefix, numValue] = negativePxMatch;

    if (numValue === "0") {
      const mapping = findStandardMapping(prefix, "0px");
      return mapping || className;
    }

    const negativePixelValue = `-${numValue}px`;

    const mapping = findStandardMapping(prefix, negativePixelValue);
    return mapping || className;
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
