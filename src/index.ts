import { transformByFileType } from "./ast-transformer";
import { safeLoadParser } from "./utils/version-utils";
import { CompatPlugin, CompatParser } from "./types/prettier-compat";

type SupportedLanguage =
  | "html"
  | "vue"
  | "angular"
  | "javascript"
  | "typescript";

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
    html: {
      ...safeLoadParser("html"),
      preprocess: (text: string, options: any): string => {
        return transformByFileType(text, options.filepath || "file.html");
      },
    } as CompatParser,
    vue: {
      ...safeLoadParser("html", "vue"),
      preprocess: (text: string, options: any): string => {
        return transformByFileType(text, options.filepath || "file.vue");
      },
    } as CompatParser,
    angular: {
      ...safeLoadParser("angular"),
      preprocess: (text: string, options: any): string => {
        return transformByFileType(text, options.filepath || "file.html");
      },
    } as CompatParser,

    babel: {
      ...safeLoadParser("babel"),
      preprocess: (text: string, options: any): string => {
        const filepath = options.filepath || "";
        if (filepath.endsWith(".jsx") || filepath.endsWith(".tsx")) {
          return transformByFileType(text, filepath);
        }
        return text;
      },
    } as CompatParser,
    "babel-ts": {
      ...safeLoadParser("babel", "babel-ts"),
      preprocess: (text: string, options: any): string => {
        const filepath = options.filepath || "";
        if (filepath.endsWith(".tsx")) {
          return transformByFileType(text, filepath);
        }
        return text;
      },
    } as CompatParser,
  },
};

module.exports = plugin;
export default plugin;
