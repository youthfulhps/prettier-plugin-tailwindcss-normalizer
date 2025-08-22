import { ValueMapping } from "../../types";

export const fontSizeMappings: Record<string, ValueMapping> = {
  text: {
    "12px": "text-xs",
    "14px": "text-sm",
    "16px": "text-base",
    "18px": "text-lg",
    "20px": "text-xl",
    "24px": "text-2xl",
    "30px": "text-3xl",
    "36px": "text-4xl",
    "48px": "text-5xl",
    "60px": "text-6xl",
    "72px": "text-7xl",
    "96px": "text-8xl",
    "128px": "text-9xl",
  },

  leading: {
    "1": "leading-none",
    "1.25": "leading-tight",
    "1.375": "leading-snug",
    "1.5": "leading-normal",
    "1.6": "leading-relaxed",
    "1.625": "leading-6",
    "1.75": "leading-7",
    "2": "leading-loose",
    "2.25": "leading-9",
    "2.5": "leading-10",
  },

  tracking: {
    "-0.05em": "tracking-tighter",
    "-0.025em": "tracking-tight",
    "0em": "tracking-normal",
    "0.025em": "tracking-wide",
    "0.05em": "tracking-wider",
    "0.1em": "tracking-widest",
  },
};
