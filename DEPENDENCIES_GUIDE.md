# FlexiRide Dependencies Guide

This document explains every dependency in `package.json` and why we need it.

---

## 📦 Dependencies (Required for App to Run)

### Core Framework
| Package | Version | Purpose |
|---------|---------|---------|
| `react` | 19.1.0 | Core React library - enables component-based UI development |
| `react-dom` | 19.1.0 | React rendering for web platform |
| `react-native` | 0.81.5 | Framework for building native iOS/Android apps with React |
| `react-native-web` | ~0.21.0 | Allows React Native components to run in web browsers |

### Expo Framework
| Package | Version | Purpose |
|---------|---------|---------|
| `expo` | ~54.0.29 | Main Expo SDK - simplifies React Native development with managed workflow |
| `expo-router` | ~6.0.19 | File-based routing (like Next.js) - each file in /app becomes a screen |
| `expo-constants` | ~18.0.12 | Access app constants (version, device info, etc.) |
| `expo-status-bar` | ~3.0.9 | Control the phone's status bar (time, battery, signal) appearance |
| `expo-splash-screen` | ~31.0.12 | Customize the app loading screen (shown before app loads) |
| `expo-font` | ~14.0.10 | Load and use custom fonts in the app |
| `expo-linking` | ~8.0.10 | Handle deep links (URLs that open the app) |
| `expo-system-ui` | ~6.0.9 | Control system UI elements (navigation bar color, etc.) |
| `expo-symbols` | ~1.0.8 | Apple SF Symbols support for iOS icons |
| `expo-haptics` | ~15.0.8 | Trigger phone vibrations for tactile feedback |
| `expo-web-browser` | ~15.0.10 | Open links in an in-app browser |

### Feature-Specific Expo Packages
| Package | Version | Purpose |
|---------|---------|---------|
| `expo-image` | ~3.0.11 | Optimized image component (better than React Native's Image) |
| `expo-image-picker` | ~17.0.10 | Pick photos from gallery or take new photos |

### Navigation
| Package | Version | Purpose |
|---------|---------|---------|
| `@react-navigation/native` | ^7.1.8 | Core navigation library - handles screen transitions |
| `@react-navigation/bottom-tabs` | ^7.4.0 | Bottom tab navigation (we use for admin panel) |
| `@react-navigation/elements` | ^2.6.3 | UI components for navigation (headers, buttons) |
| `react-native-screens` | ~4.16.0 | Native screen containers - makes navigation faster |
| `react-native-safe-area-context` | ~5.6.0 | Handle phone notches, home indicators (safe areas) |
| `react-native-gesture-handler` | ~2.28.0 | Handle touch gestures (swipe, pinch, drag) |

### Animation
| Package | Version | Purpose |
|---------|---------|---------|
| `react-native-reanimated` | ~4.1.1 | High-performance animations (smoother than default) |
| `react-native-worklets` | 0.5.1 | Run JavaScript on UI thread (required by Reanimated) |

### Styling
| Package | Version | Purpose |
|---------|---------|---------|
| `nativewind` | ^2.0.11 | Use Tailwind CSS classes in React Native (className="bg-blue-600") |
| `tailwindcss` | ^3.3.2 | Utility-first CSS framework - provides all the classes |

### UI Components
| Package | Version | Purpose |
|---------|---------|---------|
| `@expo/vector-icons` | ^15.0.3 | Icon library (Ionicons, FontAwesome, etc.) - we use Ionicons |
| `@react-native-community/datetimepicker` | ^8.4.4 | Native date/time picker for booking dates |
| `react-native-svg` | ^15.12.1 | Render SVG graphics (used for icons and illustrations) |

### Backend
| Package | Version | Purpose |
|---------|---------|---------|
| `firebase` | ^12.6.0 | Firebase SDK - Authentication, Firestore database, Storage |

---

## 🛠️ Dev Dependencies (Development Only)

| Package | Version | Purpose |
|---------|---------|---------|
| `typescript` | ~5.9.2 | TypeScript compiler - adds static typing to JavaScript |
| `@types/react` | ~19.1.0 | TypeScript type definitions for React |
| `eslint` | ^9.25.0 | Code linting - finds bugs and enforces code style |
| `eslint-config-expo` | ~10.0.0 | Expo's ESLint rules - pre-configured for Expo projects |

---

## 📁 Configuration Files Reference

| File | Purpose |
|------|---------|
| `package.json` | Lists all dependencies and npm scripts |
| `babel.config.js` | Transpiler config - converts modern JS to compatible code |
| `metro.config.js` | Bundler config - bundles all code into one file |
| `tailwind.config.js` | Tailwind CSS configuration - defines colors, spacing, etc. |
| `tsconfig.json` | TypeScript configuration - compiler options |
| `eslint.config.js` | ESLint rules - code quality and style |
| `app.json` | Expo app configuration - name, icon, splash screen |
| `global.css` | Tailwind CSS imports - enables utility classes |

---

## 🔄 How It All Connects

```
User writes code with TypeScript
        ↓
Babel transpiles to JavaScript
        ↓
Metro bundles all files together
        ↓
Expo builds for iOS/Android/Web
        ↓
React Native renders native UI
        ↓
Firebase handles backend
```

---

## 📱 How to Install All Dependencies

```bash
npm install
```

This reads `package.json` and installs everything to `node_modules/`.

---

## 🔄 How to Update Dependencies

```bash
# Check for outdated packages
npx expo install --check

# Fix compatibility issues
npx expo install --fix
```
