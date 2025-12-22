/**
 * ESLINT CONFIGURATION FILE
 * ==========================
 * 
 * PURPOSE: ESLint is a code linting tool that finds and fixes problems in
 * your JavaScript/TypeScript code before you run it.
 * 
 * WHY WE NEED IT:
 * - Catches bugs early (unused variables, undefined functions, etc.)
 * - Enforces consistent code style across the team
 * - Identifies potential security issues
 * - Improves code quality and readability
 * 
 * EXAMPLES OF WHAT ESLINT CATCHES:
 * - Unused imports or variables
 * - Missing dependencies in useEffect
 * - Incorrect React hooks usage
 * - TypeScript type errors
 * 
 * HOW TO USE:
 * - Errors show as red underlines in VS Code
 * - Run "npm run lint" to check all files
 */

// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');

// Use Expo's pre-configured ESLint rules (recommended for Expo projects)
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  // Include all of Expo's ESLint rules
  expoConfig,
  
  {
    // IGNORES: Files/folders that ESLint should skip
    ignores: [
      'dist/*',        // Built/compiled files
      // 'node_modules/*' is automatically ignored
    ],
  },
]);
