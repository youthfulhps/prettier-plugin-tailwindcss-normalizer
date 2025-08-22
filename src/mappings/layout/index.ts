import { TailwindMapping } from "../../types";
import { bordersRoundedMappings } from "./borders-rounded";
import { positioningMappings } from "./positioning";

export const layoutMappings: TailwindMapping = {
  ...bordersRoundedMappings,
  ...positioningMappings,
};
