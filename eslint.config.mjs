import { defineConfig } from "eslint/config";
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginTS from '@typescript-eslint/eslint-plugin';
import globals from "globals";

export default defineConfig([
  {
    files: ["src/**/*.ts"],

    languageOptions: {
      globals: {
        ...globals.node,
      }

    },
    parserOptions: {
      ecmaVersion: 2021, // Or the latest supported version
      sourceType: 'module' // If using ES modules
    },

    rules: {
      // Стиль кода
      "semi": ["error", "always"], // Требовать точку с запятой
      "quotes": ["error", "double"], // Двойные кавычки
      "indent": ["error", 2], // Отступ 2 пробела
      "max-len": ["error", { "code": 120 }], // Максимальная длина строки
      "curly": ["error", "all"], // Скобки для всех блоков
      "eqeqeq": ["error", "always"], // Строгое сравнение
      "no-debugger": "error", // Запретить debugger
      "no-var": "error", // Запретить var, использовать let/const
      "prefer-const": "error", // Предпочитать const
      "no-unused-vars": ["warn", { "args": "none", "ignoreRestSiblings": true }], // Неиспользуемые переменные
      "no-multiple-empty-lines": ["error", { "max": 1 }], // Максимум одна пустая строка подряд
      "no-trailing-spaces": "error", // Запретить пробелы в конце строки
      "eol-last": ["error", "always"], // В конце файла новая строка

      // Стиль и качество кода
      "brace-style": ["error", "1tbs"], // Стиль скобок
      "comma-dangle": ["error", "always-multiline"], // Запятая в конце многострочных литералов
      "object-curly-spacing": ["error", "always"], // Пробелы внутри фигурных скобок
      "array-bracket-spacing": ["error", "never"], // Без пробелов внутри массивов
      "keyword-spacing": ["error", { "before": true, "after": true }], // Пробелы после/до ключевых слов

      // TypeScript специфичные правила
      "@typescript-eslint/no-explicit-any": ["warn"], // Предупреждение для any
      "@typescript-eslint/explicit-function-return-type": "off", // Не требовать явно возвращаемый тип
      "@typescript-eslint/no-unused-vars": ["warn"], // Предупреждение о неиспользуемых переменных
      "@typescript-eslint/ban-ts-comment": "off", // Разрешить ts-ignore и т.п.
      "@typescript-eslint/no-var-requires": "off", // Разрешить require

      // Дополнительные правила
      "prefer-arrow-callback": "error", // Предпочитать стрелочные функции в коллбеках
      "no-shadow": "error", // Запретить тени переменных
      "no-undef": "error", // Запретить неопределённые переменные
      "no-empty": ["error", { "allowEmptyCatch": true }], // Запретить пустые блоки, кроме catch
    },
    plugins: {
      '@typescript-eslint': eslintPluginTS,
      'prettier': eslintPluginPrettier
    }
  },
]);