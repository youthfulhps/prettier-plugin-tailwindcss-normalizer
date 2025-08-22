import { ValueMapping } from "../../types";

export const filtersMappings: Record<string, ValueMapping> = {
  blur: {
    "0": "blur-none",
    "4px": "blur-sm",
    "8px": "blur",
    "12px": "blur-md",
    "16px": "blur-lg",
    "24px": "blur-xl",
    "40px": "blur-2xl",
    "64px": "blur-3xl",
  },

  brightness: {
    "0": "brightness-0",
    "0.5": "brightness-50",
    "0.75": "brightness-75",
    "0.9": "brightness-90",
    "0.95": "brightness-95",
    "1": "brightness-100",
    "1.05": "brightness-105",
    "1.1": "brightness-110",
    "1.25": "brightness-125",
    "1.5": "brightness-150",
    "2": "brightness-200",
  },

  contrast: {
    "0": "contrast-0",
    "0.5": "contrast-50",
    "0.75": "contrast-75",
    "1": "contrast-100",
    "1.25": "contrast-125",
    "1.5": "contrast-150",
    "2": "contrast-200",
  },

  grayscale: {
    "0": "grayscale-0",
    "1": "grayscale",
  },

  invert: {
    "0": "invert-0",
    "1": "invert",
  },

  saturate: {
    "0": "saturate-0",
    "0.5": "saturate-50",
    "1": "saturate-100",
    "1.5": "saturate-150",
    "2": "saturate-200",
  },

  sepia: {
    "0": "sepia-0",
    "1": "sepia",
  },

  "hue-rotate": {
    "0deg": "hue-rotate-0",
    "15deg": "hue-rotate-15",
    "30deg": "hue-rotate-30",
    "60deg": "hue-rotate-60",
    "90deg": "hue-rotate-90",
    "180deg": "hue-rotate-180",
  },

  // Backdrop Filters
  "backdrop-blur": {
    "0": "backdrop-blur-none",
    "4px": "backdrop-blur-sm",
    "8px": "backdrop-blur",
    "12px": "backdrop-blur-md",
    "16px": "backdrop-blur-lg",
    "24px": "backdrop-blur-xl",
    "40px": "backdrop-blur-2xl",
    "64px": "backdrop-blur-3xl",
  },

  "backdrop-brightness": {
    "0": "backdrop-brightness-0",
    "0.5": "backdrop-brightness-50",
    "0.75": "backdrop-brightness-75",
    "0.9": "backdrop-brightness-90",
    "0.95": "backdrop-brightness-95",
    "1": "backdrop-brightness-100",
    "1.05": "backdrop-brightness-105",
    "1.1": "backdrop-brightness-110",
    "1.25": "backdrop-brightness-125",
    "1.5": "backdrop-brightness-150",
    "2": "backdrop-brightness-200",
  },

  "backdrop-contrast": {
    "0": "backdrop-contrast-0",
    "0.5": "backdrop-contrast-50",
    "0.75": "backdrop-contrast-75",
    "1": "backdrop-contrast-100",
    "1.25": "backdrop-contrast-125",
    "1.5": "backdrop-contrast-150",
    "2": "backdrop-contrast-200",
  },

  "backdrop-grayscale": {
    "0": "backdrop-grayscale-0",
    "1": "backdrop-grayscale",
  },

  "backdrop-hue-rotate": {
    "0deg": "backdrop-hue-rotate-0",
    "15deg": "backdrop-hue-rotate-15",
    "30deg": "backdrop-hue-rotate-30",
    "60deg": "backdrop-hue-rotate-60",
    "90deg": "backdrop-hue-rotate-90",
    "180deg": "backdrop-hue-rotate-180",
  },

  "backdrop-invert": {
    "0": "backdrop-invert-0",
    "1": "backdrop-invert",
  },

  "backdrop-opacity": {
    "0": "backdrop-opacity-0",
    "0.05": "backdrop-opacity-5",
    "0.1": "backdrop-opacity-10",
    "0.15": "backdrop-opacity-15",
    "0.2": "backdrop-opacity-20",
    "0.25": "backdrop-opacity-25",
    "0.3": "backdrop-opacity-30",
    "0.4": "backdrop-opacity-40",
    "0.5": "backdrop-opacity-50",
    "0.6": "backdrop-opacity-60",
    "0.7": "backdrop-opacity-70",
    "0.75": "backdrop-opacity-75",
    "0.8": "backdrop-opacity-80",
    "0.9": "backdrop-opacity-90",
    "0.95": "backdrop-opacity-95",
    "1": "backdrop-opacity-100",
  },

  "backdrop-saturate": {
    "0": "backdrop-saturate-0",
    "0.5": "backdrop-saturate-50",
    "1": "backdrop-saturate-100",
    "1.5": "backdrop-saturate-150",
    "2": "backdrop-saturate-200",
  },

  "backdrop-sepia": {
    "0": "backdrop-sepia-0",
    "1": "backdrop-sepia",
  },
};
