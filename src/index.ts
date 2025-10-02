import { transformByFileType } from "./ast-transformer";
import { safeLoadParser } from "./utils/version-utils";
import { CompatPlugin, CompatParser } from "./types/prettier-compat";

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
      parsers: ["typescript"],
      extensions: [".ts", ".tsx"],
    },
  ],

  parsers: {
    html: {
      ...createParser("html", "html"),
      astFormat: "html",
    },
    vue: {
      ...createParser("html", "vue"),
      astFormat: "vue",
    },
    angular: {
      ...createParser("angular", "html"),
      astFormat: "html",
    },
    babel: {
      ...createParser("babel", "babel"),
      astFormat: "estree",
    },
    typescript: {
      ...createParser("typescript", "typescript"),
      astFormat: "estree",
    },
  },
};

const { parsers, languages } = plugin;

export { parsers, languages };
