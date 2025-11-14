import { Stack } from 'expo-router';

export default function AdminLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="add-vehicle" options={{ headerShown: false }} />
      <Stack.Screen name="manage-vehicles" options={{ headerShown: false }} />
      <Stack.Screen name="view-bookings" options={{ headerShown: false }} />
    </Stack>
  );
}
