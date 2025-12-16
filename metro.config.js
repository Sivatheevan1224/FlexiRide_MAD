/**
 * METRO BUNDLER CONFIGURATION FILE
 * =================================
 * 
 * PURPOSE: Metro is the JavaScript bundler used by React Native and Expo.
 * It takes all your JavaScript/TypeScript files and bundles them into a single
 * file that can run on mobile devices.
 * 
 * WHY WE NEED IT:
 * - Bundles all JS/TS files into one file for the app
 * - Handles hot reloading during development (instant refresh when you save)
 * - Resolves imports and dependencies
 * - Transforms code using Babel
 * 
 * WHAT IT DOES:
 * - Watches for file changes during development
 * - Creates optimized bundles for production
 * - Handles asset loading (images, fonts, etc.)
 * 
 * NOTE: We use Expo's default config which works for most projects.
 * You only need to modify this for advanced customizations.
 */
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
// Get Expo's default Metro configuration
// __dirname is the current directory (project root)
const config = getDefaultConfig(__dirname);

// Export the configuration for Metro to use
module.exports = config;
