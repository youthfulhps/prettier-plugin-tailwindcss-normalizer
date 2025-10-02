import { ValueMapping } from "../types";

export function generateSpacingMappings(
  customUnit: number = 4
): Record<string, ValueMapping> {
  const spacingPrefixes = [
    "p",
    "px",
    "py",
    "pt",
    "pr",
    "pb",
    "pl",
    "ps",
    "pe",
    "m",
    "mx",
    "my",
    "mt",
    "mr",
    "mb",
    "ml",
    "ms",
    "me",
    "gap",
    "gap-x",
    "gap-y",
    "space-x",
    "space-y",
    "w",
    "h",
    "size",
    "min-w",
    "max-w",
    "min-h",
    "max-h",
    "top",
    "right",
    "bottom",
    "left",
    "scroll-m",
    "scroll-p",
  ];

  const standardScales = [
    { scale: "0", multiplier: 0 },
    { scale: "0.5", multiplier: 0.5 },
    { scale: "1", multiplier: 1 },
    { scale: "1.5", multiplier: 1.5 },
    { scale: "2", multiplier: 2 },
    { scale: "2.5", multiplier: 2.5 },
    { scale: "3", multiplier: 3 },
    { scale: "3.5", multiplier: 3.5 },
    { scale: "4", multiplier: 4 },
    { scale: "5", multiplier: 5 },
    { scale: "6", multiplier: 6 },
    { scale: "7", multiplier: 7 },
    { scale: "8", multiplier: 8 },
    { scale: "9", multiplier: 9 },
    { scale: "10", multiplier: 10 },
    { scale: "11", multiplier: 11 },
    { scale: "12", multiplier: 12 },
    { scale: "14", multiplier: 14 },
    { scale: "16", multiplier: 16 },
    { scale: "20", multiplier: 20 },
    { scale: "24", multiplier: 24 },
    { scale: "28", multiplier: 28 },
    { scale: "32", multiplier: 32 },
    { scale: "36", multiplier: 36 },
    { scale: "40", multiplier: 40 },
    { scale: "44", multiplier: 44 },
    { scale: "48", multiplier: 48 },
    { scale: "52", multiplier: 52 },
    { scale: "56", multiplier: 56 },
    { scale: "60", multiplier: 60 },
    { scale: "64", multiplier: 64 },
    { scale: "72", multiplier: 72 },
    { scale: "80", multiplier: 80 },
    { scale: "96", multiplier: 96 },
  ];

  const fractionalPrefixes = ["py", "my"];
  const result: Record<string, ValueMapping> = {};

  spacingPrefixes.forEach((prefix) => {
    const mapping: ValueMapping = {};
    const supportsFractional = fractionalPrefixes.includes(prefix);
    const supportsNegative = [
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
    ].includes(prefix);

    standardScales.forEach(({ scale, multiplier }) => {
      if (!supportsFractional && scale.includes(".")) {
        return;
      }

      const pixelValue = multiplier * customUnit;
      const pixelKey = `${pixelValue}px`;

      mapping[pixelKey] = `${prefix}-${scale}`;

      if (supportsNegative && scale !== "0") {
        const negativePixelValue = -pixelValue;
        const negativePixelKey = `${negativePixelValue}px`;
        mapping[negativePixelKey] = `-${prefix}-${scale}`;
      }
    });

    mapping["1px"] = `${prefix}-px`;

    result[prefix] = mapping;
  });

  return result;
}
