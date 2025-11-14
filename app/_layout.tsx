import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// Import NativeWind CSS
require('../global.css');

export default function RootLayout() {
  return (
    <>
      <Stack 
        screenOptions={{ 
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="vehicle-details" options={{ headerShown: false }} />
        <Stack.Screen name="booking" options={{ headerShown: false }} />
        <Stack.Screen name="booking-success" options={{ headerShown: false }} />
        <Stack.Screen name="my-bookings" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="admin/home" options={{ headerShown: false }} />
        <Stack.Screen name="admin/add-vehicle" options={{ headerShown: false }} />
        <Stack.Screen name="admin/manage-vehicles" options={{ headerShown: false }} />
        <Stack.Screen name="admin/view-bookings" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
