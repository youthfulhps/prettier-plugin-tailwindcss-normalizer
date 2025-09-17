/**
 * Prettier v3 type definitions
 */
export interface CompatParser {
  parse?: (text: string, options: any) => any;
  preprocess?: (text: string, options: any) => string;
  astFormat?: string;
  locStart?: (node: any) => number;
  locEnd?: (node: any) => number;
  [key: string]: any;
}

export interface CompatPlugin {
  languages?: Array<{
    name: string;
    parsers: string[];
    extensions: string[];
  }>;
  parsers: Record<string, CompatParser>;
  printers?: Record<string, any>;
  options?: Record<string, any>;
}

// Runtime type checking utilities
export function isValidParser(parser: any): parser is CompatParser {
  return parser && typeof parser === "object";
}

export function isValidPlugin(plugin: any): plugin is CompatPlugin {
  return plugin && typeof plugin === "object" && plugin.parsers;
}
