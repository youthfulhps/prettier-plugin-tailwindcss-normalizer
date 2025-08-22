import { TailwindMapping } from "../../types";
import { widthMappings } from "./width";
import { heightMappings } from "./height";
import { sizeMappings } from "./size";

export const sizingMappings: TailwindMapping = {
  ...widthMappings,
  ...heightMappings,
  ...sizeMappings,
};
