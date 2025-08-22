import { TailwindMapping } from "../../types";
import { paddingMappings } from "./padding";
import { marginMappings } from "./margin";
import { gapSpaceMappings } from "./gap-space";

export const spacingMappings: TailwindMapping = {
  ...paddingMappings,
  ...marginMappings,
  ...gapSpaceMappings,
};
