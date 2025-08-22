import { ValueMapping } from "../../types";

export const effectsMappings: Record<string, ValueMapping> = {
  shadow: {
    "0 1px 2px 0 rgb(0 0 0 / 0.05)": "shadow-sm",
    "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)": "shadow",
    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)":
      "shadow-md",
    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)":
      "shadow-lg",
    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)":
      "shadow-xl",
    "0 25px 50px -12px rgb(0 0 0 / 0.25)": "shadow-2xl",
    "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)": "shadow-inner",
    none: "shadow-none",
  },

  opacity: {
    "0": "opacity-0",
    "0.05": "opacity-5",
    "0.1": "opacity-10",
    "0.15": "opacity-15",
    "0.2": "opacity-20",
    "0.25": "opacity-25",
    "0.3": "opacity-30",
    "0.4": "opacity-40",
    "0.5": "opacity-50",
    "0.6": "opacity-60",
    "0.7": "opacity-70",
    "0.75": "opacity-75",
    "0.8": "opacity-80",
    "0.9": "opacity-90",
    "0.95": "opacity-95",
    "1": "opacity-100",
  },
};
