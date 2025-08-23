module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended"],
  plugins: ["@typescript-eslint"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  env: {
    node: true,
    jest: true,
  },
  rules: {
    // TypeScript specific rules
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "error",

    // General rules
    "no-console": "warn",
    "no-debugger": "error",
    "no-unused-vars": "off", // Use @typescript-eslint version instead
    "prefer-const": "error",
  },
  overrides: [
    {
      files: ["**/*.test.ts", "**/*.spec.ts"],
      env: {
        jest: true,
      },
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
  ignorePatterns: ["dist/", "node_modules/", "*.js", "examples/"],
};
