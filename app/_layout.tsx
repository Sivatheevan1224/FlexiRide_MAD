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

// Import NativeWind CSS - Required for Tailwind classes to work
// This applies the global.css styles to the entire app
require('../global.css');

/**
 * RootLayout Component
 * This wraps all screens in the app with a Stack Navigator
 */
export default function RootLayout() {
  return (
    <>
      {/* Stack Navigator - screens slide in from right, back button goes left */}
      <Stack 
        screenOptions={{ 
          headerShown: false,  // Hide the default navigation header on all screens
        }}
      >
        {/* MAIN SCREENS - Each Stack.Screen corresponds to a file in /app */}
        <Stack.Screen name="index" options={{ headerShown: false }} />       {/* Landing page (index.tsx) */}
        <Stack.Screen name="login" options={{ headerShown: false }} />       {/* Login screen (login.tsx) */}
        <Stack.Screen name="signup" options={{ headerShown: false }} />      {/* Signup screen (signup.tsx) */}
        <Stack.Screen name="home" options={{ headerShown: false }} />        {/* User home/dashboard (home.tsx) */}
        <Stack.Screen name="vehicle-details" options={{ headerShown: false }} /> {/* Vehicle info (vehicle-details.tsx) */}
        <Stack.Screen name="booking" options={{ headerShown: false }} />     {/* Booking form (booking.tsx) */}
        <Stack.Screen name="booking-success" options={{ headerShown: false }} /> {/* Booking confirmation */}
        <Stack.Screen name="my-bookings" options={{ headerShown: false }} /> {/* User's booking history */}
        <Stack.Screen name="profile" options={{ headerShown: false }} />     {/* User profile (profile.tsx) */}
        <Stack.Screen name="edit-profile" options={{ headerShown: false }} /> {/* Edit profile form */}
        <Stack.Screen name="support" options={{ headerShown: false }} />     {/* Support/help screen */}
        
        {/* ADMIN SECTION - /admin folder has its own _layout.tsx for nested navigation */}
        <Stack.Screen name="admin" options={{ headerShown: false }} />
      </Stack>
      
      {/* StatusBar - Controls the top bar (time, battery, signal) appearance */}
      {/* style="auto" means it adapts to light/dark mode */}
      <StatusBar style="auto" />
    </>
  );
}
