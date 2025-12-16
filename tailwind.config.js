/**
 * TAILWIND CSS CONFIGURATION FILE
 * ================================
 * 
 * PURPOSE: Tailwind CSS is a utility-first CSS framework. NativeWind brings
 * Tailwind to React Native, allowing us to use classes like "bg-blue-600".
 * 
 * WHY WE NEED IT:
 * - Write styles faster with utility classes (e.g., "p-4" instead of { padding: 16 })
 * - Consistent design system (colors, spacing, fonts)
 * - Responsive design support
 * - Works on iOS, Android, and Web
 * 
 * EXAMPLES OF TAILWIND CLASSES:
 * - bg-blue-600  → Blue background color
 * - text-white   → White text color
 * - p-4          → Padding of 16px (4 * 4 = 16)
 * - rounded-xl   → Large border radius
 * - flex-row     → Flexbox row direction
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  // CONTENT: Files to scan for Tailwind classes
  // Tailwind removes unused classes in production (tree-shaking)
  content: [
    "./App.{js,jsx,ts,tsx}",           // Root App file
    "./app/**/*.{js,jsx,ts,tsx}",      // All screen files in app folder
    "./components/**/*.{js,jsx,ts,tsx}", // All component files
    "./screens/**/*.{js,jsx,ts,tsx}"   // Any screen files (if separate folder)
  ],
  
  // THEME: Customize the default Tailwind design tokens
  theme: {
    extend: {
      // Custom colors that can be used like "bg-primary" or "text-secondary"
      colors: {
        primary: '#2563eb',   // blue-600 - Main brand color
        secondary: '#64748b', // slate-500 - Secondary/muted color
      },
    },
  },
  
  // PLUGINS: Add extra Tailwind functionality (none needed for now)
  plugins: [],
  
  // CORE PLUGINS: Control which CSS features are enabled
  corePlugins: {
    // preflight: false - Disable Tailwind's CSS reset
    // React Native has its own styling system, so we don't need web CSS resets
    preflight: false,
  },
};
