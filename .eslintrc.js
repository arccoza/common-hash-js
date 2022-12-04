module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "standard",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    // tsconfigRootDir: "functions",
    project: ["tsconfig.json", "tsconfig.dev.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
  ],
  plugins: [
    "@typescript-eslint",
    "import",
  ],
  rules: {
    quotes: "off",
    "import/no-unresolved": 0,
    semi: ["error", "never"],
    "space-before-function-paren": ["error", "never"],
    "import/newline-after-import": ["error", { count: 2 }],
    "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1 }],
    "comma-dangle": ["error", {
      arrays: "always-multiline",
      objects: "always-multiline",
      imports: "only-multiline",
      exports: "only-multiline",
      functions: "only-multiline",
    }],
  },
}
