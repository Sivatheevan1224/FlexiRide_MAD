// Splash Screen
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Navigate to login after 2 seconds
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-blue-600 justify-center items-center px-6">
      {/* Logo Icon */}
      <View className="bg-white rounded-full p-8 mb-6 shadow-lg">
        <Ionicons name="car-sport" size={80} color="#2563eb" />
      </View>

      {/* App Name */}
      <Text className="text-white text-4xl font-bold mb-2">FlexiRide</Text>
      <Text className="text-blue-100 text-lg text-center">
        Car & Bike Rental System
      </Text>

      {/* Tagline */}
      <Text className="text-blue-200 text-sm text-center mt-4 px-8">
        Your journey, your way
      </Text>
    </View>
  );
}
