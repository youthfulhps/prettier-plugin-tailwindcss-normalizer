import { transformByFileType } from "./ast-transformer";
import { safeLoadParser } from "./utils/version-utils";
import { CompatPlugin, CompatParser } from "./types/prettier-compat";

type SupportedLanguage =
  | "html"
  | "vue"
  | "angular"
  | "javascript"
  | "typescript";

// Parser creation function for v3
function createParser(parserName: string, fileType: string) {
  const baseParser = safeLoadParser(parserName, fileType);

  return {
    ...baseParser,
    preprocess: (text: string, options: any): string => {
      return transformByFileType(text, options.filepath || `file.${fileType}`);
    },
  } as CompatParser;
}

const plugin: CompatPlugin = {
  languages: [
    {
      name: "HTML",
      parsers: ["html"],
      extensions: [".html"],
    },
    {
      name: "Vue",
      parsers: ["vue"],
      extensions: [".vue"],
    },
    {
      name: "Angular",
      parsers: ["angular"],
      extensions: [".component.html"],
    },
    {
      name: "JavaScript",
      parsers: ["babel"],
      extensions: [".js", ".jsx"],
    },
    {
      name: "TypeScript",
      parsers: ["babel-ts"],
      extensions: [".ts", ".tsx"],
    },
  ],

  parsers: {
    html: createParser("html", "html"),
    vue: createParser("html", "vue"),
    angular: createParser("angular", "html"),
    babel: {
      ...createParser("babel", "jsx"),
      // babel parser handles conditionally based on file extension
      parse: (text: string, options: any) => {
        const filepath = options.filepath || "";
        if (filepath.endsWith(".jsx") || filepath.endsWith(".tsx")) {
          const transformedText = transformByFileType(text, filepath);
          const baseParser = safeLoadParser("babel");
          return baseParser.parse
            ? baseParser.parse(transformedText, options)
            : text;
        }
        const baseParser = safeLoadParser("babel");
        return baseParser.parse ? baseParser.parse(text, options) : text;
      },
    } as CompatParser,
    "babel-ts": {
      ...createParser("babel", "tsx"),
      // babel-ts parser only processes tsx files
      parse: (text: string, options: any) => {
        const filepath = options.filepath || "";
        if (filepath.endsWith(".tsx")) {
          const transformedText = transformByFileType(text, filepath);
          const baseParser = safeLoadParser("babel", "babel-ts");
          return baseParser.parse
            ? baseParser.parse(transformedText, options)
            : text;
        }
        const baseParser = safeLoadParser("babel", "babel-ts");
        return baseParser.parse ? baseParser.parse(text, options) : text;
      },
    } as CompatParser,
  },
};

module.exports = plugin;
export default plugin;
