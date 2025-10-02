import { transformByFileType } from "./ast-transformer";
import { safeLoadParser } from "./utils/version-utils";
import { CompatPlugin, CompatParser } from "./types/prettier-compat";
import { setPluginOptions } from "./normalizer";
import { PluginOptions } from "./types";

function createParser(parserName: string, fileType: string) {
  const baseParser = safeLoadParser(parserName, fileType);

  return {
    ...baseParser,
    preprocess: (text: string, options: any): string => {
      const pluginOptions: PluginOptions = {
        customSpacingUnit: options.customSpacingUnit,
      };
      setPluginOptions(pluginOptions);

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

  options: {
    customSpacingUnit: {
      type: "int",
      category: "Tailwind",
      default: 4,
      description:
        "Custom spacing unit in pixels (default: 4). Tailwind uses 4px as the base unit (e.g., p-1 = 4px). Change this if you've customized Tailwind's spacing scale.",
    },
  },
};

const { parsers, languages, options } = plugin;

export { parsers, languages, options };
