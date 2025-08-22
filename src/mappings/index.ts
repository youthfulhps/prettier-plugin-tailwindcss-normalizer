import { TailwindMapping } from "../types";
import { spacingMappings } from "./spacing";
import { sizingMappings } from "./sizing";
import { layoutMappings } from "./layout";
import { typographyMappings } from "./typography";
import { allEffectsMappings } from "./effects";
import { allTransitionsMappings } from "./transitions";
import { allInteractivityMappings } from "./interactivity";
import { allTransformsMappings } from "./transforms";
import { allFiltersMappings } from "./filters";

export const TAILWIND_MAPPINGS: TailwindMapping = {
  ...spacingMappings,
  ...sizingMappings,
  ...layoutMappings,
  ...typographyMappings,
  ...allEffectsMappings,
  ...allTransitionsMappings,
  ...allInteractivityMappings,
  ...allTransformsMappings,
  ...allFiltersMappings,
};
