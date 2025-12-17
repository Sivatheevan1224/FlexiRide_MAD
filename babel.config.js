/**
 * BABEL CONFIGURATION FILE
 * ========================
 * 
 * PURPOSE: Babel is a JavaScript transpiler that converts modern JavaScript/TypeScript
 * code into a version that can run on older devices and platforms.
 * 
 * WHY WE NEED IT:
 * - Expo uses Babel to compile JSX, TypeScript, and modern JS features
 * - Enables us to use latest JavaScript syntax while supporting older devices
 * - Required for React Native to work properly
 * 
 * NATIVEWIND v4:
 * - Uses 'nativewind/babel' preset instead of plugin
 * - This enables TailwindCSS styling on iOS, Android, and Web
 */
module.exports = function(api) {
  // api.cache(true) - Caches the config for better build performance
  api.cache(true);
  
  return {
    // PRESETS: Pre-configured sets of Babel plugins
    presets: [
      // 'babel-preset-expo' - Expo's preset that includes:
      //   - React Native transformations
      //   - TypeScript support
      //   - Modern JavaScript features (async/await, arrow functions, etc.)
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      // NativeWind v4 preset for TailwindCSS support
      'nativewind/babel',
    ],
  };
};
