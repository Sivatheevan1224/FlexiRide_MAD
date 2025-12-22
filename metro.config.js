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
 * NATIVEWIND v4 CONFIGURATION:
 * - withNativeWind() wraps the config to enable TailwindCSS
 * - This is required for styles to work on iOS, Android, AND Web
 */
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
// Get Expo's default Metro configuration
const config = getDefaultConfig(__dirname);

// Wrap with NativeWind for TailwindCSS support on all platforms
module.exports = withNativeWind(config, { input: './global.css' });
