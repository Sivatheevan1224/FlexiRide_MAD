/**
 * ROOT LAYOUT FILE (_layout.tsx)
 * ===============================
 * 
 * PURPOSE: This is the main layout file for the entire app. In Expo Router,
 * _layout.tsx files define the navigation structure and shared UI for routes.
 * 
 * WHY WE NEED IT:
 * - Defines the navigation stack (how screens transition)
 * - Wraps all screens with shared configuration
 * - Imports global CSS for NativeWind styling
 * - Sets up the status bar appearance
 * - Provides AuthContext for session management
 * 
 * HOW EXPO ROUTER WORKS:
 * - Each .tsx file in /app folder becomes a route (screen)
 * - _layout.tsx files define navigation containers
 * - Folders with _layout.tsx create nested navigation
 * 
 * NAVIGATION STRUCTURE:
 * - Stack Navigator: Screens stack on top of each other (push/pop)
 * - Each Stack.Screen defines a route in the app
 */

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Import NativeWind CSS - Required for Tailwind classes to work
// This applies the global.css styles to the entire app
import '../global.css';

/**
 * Navigation component that shows loading while checking auth
 */
function RootLayoutNav() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' }}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <Stack 
      screenOptions={{ 
        headerShown: false,  // Hide the default navigation header on all screens
      }}
    >
      {/* MAIN SCREENS - Each Stack.Screen corresponds to a file in /app */}
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="home" />
      <Stack.Screen name="vehicle-details" />
      <Stack.Screen name="booking" />
      <Stack.Screen name="booking-success" />
      <Stack.Screen name="my-bookings" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="edit-profile" />
      <Stack.Screen name="support" />
      
      {/* ADMIN SECTION - /admin folder has its own _layout.tsx for nested navigation */}
      <Stack.Screen name="admin" />
    </Stack>
  );
}

/**
 * RootLayout Component
 * This wraps all screens in the app with AuthProvider and Stack Navigator
 */
export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      {/* StatusBar - Controls the top bar (time, battery, signal) appearance */}
      <StatusBar style="auto" />
      
      {/* AuthProvider - Manages user session across the app */}
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </View>
  );
}
