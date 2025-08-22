import { ValueMapping } from "../../types";

export const interactivityMappings: Record<string, ValueMapping> = {
  outline: {
    "0px": "outline-0",
    "1px": "outline-1",
    "2px": "outline-2",
    "4px": "outline-4",
    "8px": "outline-8",
  },

  "outline-offset": {
    "0px": "outline-offset-0",
    "1px": "outline-offset-1",
    "2px": "outline-offset-2",
    "4px": "outline-offset-4",
    "8px": "outline-offset-8",
  },

  ring: {
    "0px": "ring-0",
    "1px": "ring-1",
    "2px": "ring-2",
    "4px": "ring-4",
    "8px": "ring-8",
    inset: "ring-inset",
  },

  "ring-offset": {
    "0px": "ring-offset-0",
    "1px": "ring-offset-1",
    "2px": "ring-offset-2",
    "4px": "ring-offset-4",
    "8px": "ring-offset-8",
  },

  "scroll-m": {
    "0px": "scroll-m-0",
    "1px": "scroll-m-px",
    "4px": "scroll-m-1",
    "8px": "scroll-m-2",
    "12px": "scroll-m-3",
    "16px": "scroll-m-4",
    "20px": "scroll-m-5",
    "24px": "scroll-m-6",
  },

  "scroll-p": {
    "0px": "scroll-p-0",
    "1px": "scroll-p-px",
    "4px": "scroll-p-1",
    "8px": "scroll-p-2",
    "12px": "scroll-p-3",
    "16px": "scroll-p-4",
    "20px": "scroll-p-5",
    "24px": "scroll-p-6",
  },

  "focus:ring": {
    "0px": "focus:ring-0",
    "1px": "focus:ring-1",
    "2px": "focus:ring-2",
    "4px": "focus:ring-4",
    "8px": "focus:ring-8",
  },

  "focus:ring-offset": {
    "0px": "focus:ring-offset-0",
    "1px": "focus:ring-offset-1",
    "2px": "focus:ring-offset-2",
    "4px": "focus:ring-offset-4",
    "8px": "focus:ring-offset-8",
  },
};
