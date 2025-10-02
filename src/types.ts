export type ValueMapping = Record<string, string>;

export interface PluginOptions {
  customSpacingUnit?: number;
}

export type TailwindMapping = {
  p?: ValueMapping;
  px?: ValueMapping;
  py?: ValueMapping;
  pt?: ValueMapping;
  pr?: ValueMapping;
  pb?: ValueMapping;
  pl?: ValueMapping;
  ps?: ValueMapping;
  pe?: ValueMapping;

  m?: ValueMapping;
  mx?: ValueMapping;
  my?: ValueMapping;
  mt?: ValueMapping;
  mr?: ValueMapping;
  mb?: ValueMapping;
  ml?: ValueMapping;
  ms?: ValueMapping;
  me?: ValueMapping;

  w?: ValueMapping;
  h?: ValueMapping;
  size?: ValueMapping;
  "min-w"?: ValueMapping;
  "max-w"?: ValueMapping;
  "min-h"?: ValueMapping;
  "max-h"?: ValueMapping;

  gap?: ValueMapping;
  "gap-x"?: ValueMapping;
  "gap-y"?: ValueMapping;
  "space-x"?: ValueMapping;
  "space-y"?: ValueMapping;
  "space-x-reverse"?: ValueMapping;
  "space-y-reverse"?: ValueMapping;

  rounded?: ValueMapping;
  "rounded-t"?: ValueMapping;
  "rounded-r"?: ValueMapping;
  "rounded-b"?: ValueMapping;
  "rounded-l"?: ValueMapping;
  "rounded-tl"?: ValueMapping;
  "rounded-tr"?: ValueMapping;
  "rounded-br"?: ValueMapping;
  "rounded-bl"?: ValueMapping;

  border?: ValueMapping;
  "border-x"?: ValueMapping;
  "border-y"?: ValueMapping;
  "border-t"?: ValueMapping;
  "border-r"?: ValueMapping;
  "border-b"?: ValueMapping;
  "border-l"?: ValueMapping;

  text?: ValueMapping;
  leading?: ValueMapping;
  tracking?: ValueMapping;

  shadow?: ValueMapping;
  opacity?: ValueMapping;

  ring?: ValueMapping;
  "ring-offset"?: ValueMapping;

  outline?: ValueMapping;
  "outline-offset"?: ValueMapping;

  duration?: ValueMapping;
  "transition-duration"?: ValueMapping;
  delay?: ValueMapping;

  "focus:ring"?: ValueMapping;
  "focus:ring-offset"?: ValueMapping;

  rotate?: ValueMapping;
  scale?: ValueMapping;
  "translate-x"?: ValueMapping;
  "translate-y"?: ValueMapping;

  blur?: ValueMapping;
  brightness?: ValueMapping;
  contrast?: ValueMapping;
  grayscale?: ValueMapping;
  invert?: ValueMapping;
  saturate?: ValueMapping;
  sepia?: ValueMapping;
  "hue-rotate"?: ValueMapping;

  "backdrop-blur"?: ValueMapping;
  "backdrop-brightness"?: ValueMapping;
  "backdrop-contrast"?: ValueMapping;
  "backdrop-grayscale"?: ValueMapping;
  "backdrop-hue-rotate"?: ValueMapping;
  "backdrop-invert"?: ValueMapping;
  "backdrop-opacity"?: ValueMapping;
  "backdrop-saturate"?: ValueMapping;
  "backdrop-sepia"?: ValueMapping;

  top?: ValueMapping;
  right?: ValueMapping;
  bottom?: ValueMapping;
  left?: ValueMapping;

  "scroll-m"?: ValueMapping;
  "scroll-p"?: ValueMapping;

  z?: ValueMapping;
};
