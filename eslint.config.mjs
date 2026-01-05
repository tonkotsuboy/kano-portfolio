import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import perfectionist from "eslint-plugin-perfectionist";
import testingLibrary from "eslint-plugin-testing-library";
import jest from "eslint-plugin-jest";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stripConfigs = (plugin) => {
    const clone = { ...plugin };
    delete clone.configs;
    return clone;
};

const reactPlugin = stripConfigs(react);
const reactHooksPlugin = stripConfigs(reactHooks);

const nextCoreWebVitals = nextPlugin.configs?.["core-web-vitals"] ?? {};
if (nextCoreWebVitals.plugins?.["@next/next"]?.configs) {
    nextCoreWebVitals.plugins["@next/next"] = stripConfigs(nextCoreWebVitals.plugins["@next/next"]);
}

export default defineConfig([
    { ignores: [
        "app/@types",
        ".next/**/*",
        ".velite/**/*",
        "**/*.d.ts",
        ".storybook/**/*",
        "public/**/*",
        "node-scripts/**/*",
        "next.config.js",
        "jest.config.js",
        "jest-setup.js",
        "eslint.config.mjs",
    ] },
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    testingLibrary.configs["flat/react"],
    jest.configs["flat/recommended"],
    jest.configs["flat/style"],
    nextCoreWebVitals,
    {
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: path.resolve(__dirname, "./tsconfig.json"),
                tsconfigRootDir: __dirname,
            },
            ecmaVersion: "latest",
            sourceType: "module",
        },
        plugins: {
            import: importPlugin,
            perfectionist,
            react: reactPlugin,
            "react-hooks": reactHooksPlugin,
        },
        rules: {
            "array-bracket-spacing": ["error", "never"],
            "array-callback-return": "error",
            "arrow-spacing": "error",
            "comma-dangle": ["error", "always-multiline"],
            "comma-spacing": "error",
            "comma-style": ["error", "last"],
            curly: ["error", "all"],
            "eol-last": "error",
            "jsx-quotes": ["error", "prefer-double"],
            "func-call-spacing": ["error", "never"],
            indent: ["error", 2],
            "key-spacing": ["error", { beforeColon: false, afterColon: true }],
            "keyword-spacing": "error",
            "linebreak-style": ["error", "unix"],
            "lines-between-class-members": ["error", "always"],
            "max-depth": ["error", 4],
            "no-else-return": "error",
            "no-multi-spaces": "error",
            "no-param-reassign": "error",
            "no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
            "no-prototype-builtins": "error",
            radix: ["error", "always"],
            quotes: ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
            semi: ["error", "always"],
            "no-lonely-if": "error",
            "no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 0 }],
            "no-tabs": "error",
            "no-trailing-spaces": ["error", { skipBlankLines: true }],
            "no-whitespace-before-property": "error",
            "object-curly-spacing": ["error", "always"],
            "semi-spacing": "error",
            "space-before-blocks": "error",
            "space-before-function-paren": ["error", { anonymous: "never", named: "never", asyncArrow: "always" }],
            "space-in-parens": ["error", "never"],
            "space-infix-ops": "error",
            "prefer-const": "error",
            "prefer-rest-params": "error",
            "prefer-spread": "error",
            "template-curly-spacing": ["error", "never"],
            "sort-imports": ["error", { ignoreCase: true, ignoreDeclarationSort: true }],
            "import/first": "error",
            "import/newline-after-import": "error",
            "import/no-useless-path-segments": "error",
            "import/no-extraneous-dependencies": "error",
            "import/order": ["error", {
                alphabetize: { order: "asc", caseInsensitive: true },
                groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
                "newlines-between": "always",
            }],
            "perfectionist/sort-objects": ["error", { order: "asc", type: "natural", ignoreCase: true }],
            "perfectionist/sort-interfaces": ["error", { order: "asc", type: "natural", ignoreCase: true }],
            "perfectionist/sort-union-types": ["error", { order: "asc", type: "natural", ignoreCase: true }],
            "perfectionist/sort-enums": ["error", { order: "asc", type: "natural", ignoreCase: true }],
            "react-hooks/exhaustive-deps": "error",
        },
    },
]);
