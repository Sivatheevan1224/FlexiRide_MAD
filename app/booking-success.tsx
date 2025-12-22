// Booking Success Screen
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/ui/button';

export default function BookingSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-1 justify-center items-center px-6">
        {/* Success Icon */}
        <View className="bg-green-100 rounded-full p-8 mb-6">
          <Ionicons name="checkmark-circle" size={80} color="#22c55e" />
        </View>

        {/* Success Message */}
        <Text className="text-neutral-800 text-2xl font-bold text-center mb-3">
          Booking Confirmed!
        </Text>
        <Text className="text-neutral-600 text-center text-base mb-8">
          Your booking has been confirmed successfully. Check your bookings for more details.
        </Text>

        {/* Buttons */}
        <View className="w-full" style={{ gap: 12 }}>
          <Button
            title="View My Bookings"
            onPress={() => router.replace('/my-bookings')}
            size="lg"
          />
          <Button
            title="Back to Home"
            onPress={() => router.replace('/home')}
            variant="outline"
            size="lg"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
