import { Parser, Plugin, Printer } from "prettier";
import { transformByFileType } from "./ast-transformer";

type SupportedLanguage =
  | "html"
  | "vue"
  | "angular"
  | "javascript"
  | "typescript";

const plugin: Plugin = {
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
      ...require("prettier/parser-html").parsers.html,
      preprocess: (text: string, options: any): string => {
        return transformByFileType(text, options.filepath || "file.html");
      },
    } as Parser,
    vue: {
      ...require("prettier/parser-html").parsers.vue,
      preprocess: (text: string, options: any): string => {
        return transformByFileType(text, options.filepath || "file.vue");
      },
    } as Parser,
    angular: {
      ...require("prettier/parser-angular").parsers.angular,
      preprocess: (text: string, options: any): string => {
        return transformByFileType(text, options.filepath || "file.html");
      },
    } as Parser,

    babel: {
      ...require("prettier/parser-babel").parsers.babel,
      preprocess: (text: string, options: any): string => {
        const filepath = options.filepath || "";
        if (filepath.endsWith(".jsx") || filepath.endsWith(".tsx")) {
          return transformByFileType(text, filepath);
        }
        return text;
      },
    } as Parser,
    "babel-ts": {
      ...require("prettier/parser-babel").parsers["babel-ts"],
      preprocess: (text: string, options: any): string => {
        const filepath = options.filepath || "";
        if (filepath.endsWith(".tsx")) {
          return transformByFileType(text, filepath);
        }
        return text;
      },
    } as Parser,
  },
};

module.exports = plugin;
export default plugin;
