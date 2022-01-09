module.exports = {
  parser: "@babel/eslint-parser",
  plugins: ["react"],
  parserOptions: {
    requireConfigFile: false,
    sourceType: "module",
    ecmaVersion: 8,
    ecmaFeatures: {
      jsx: true,
    },
    babelOptions: {
      presets: ["@babel/preset-react"],
    },
  },
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  rules: {
    "react/prop-types": "off",
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
  ],
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
}
