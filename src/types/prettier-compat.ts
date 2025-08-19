/**
 * Prettier 버전별 타입 호환성 정의
 */

// Prettier v2/v3 호환 타입 정의
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

// 런타임 타입 체크를 위한 유틸리티
export function isValidParser(parser: any): parser is CompatParser {
  return parser && typeof parser === "object";
}

export function isValidPlugin(plugin: any): plugin is CompatPlugin {
  return plugin && typeof plugin === "object" && plugin.parsers;
}
