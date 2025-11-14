// Booking Screen
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/ui/button';
import Card from '../components/ui/card';

export default function BookingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  // Sample data from params
  const vehicleName = params.name || 'Honda City';
  const pricePerDay = Number(params.price) || 1500;
  const vehicleImage = 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400';

  // Sample dates - replace with actual date picker values
  const pickupDate = '15 Nov 2025';
  const returnDate = '20 Nov 2025';
  const numberOfDays = 5;
  const totalPrice = pricePerDay * numberOfDays;

  const handleConfirmBooking = async () => {
    setLoading(true);
    // Add your booking logic here
    setTimeout(() => {
      setLoading(false);
      router.replace('/booking-success');
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-blue-600 px-6 pt-6 pb-8 rounded-b-3xl">
          <View className="flex-row items-center space-x-4 mb-4">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold">Confirm Booking</Text>
          </View>
        </View>

        <View className="px-6 py-6 space-y-6">
          {/* Vehicle Info Card */}
          <Card>
            <Text className="text-neutral-800 font-semibold text-lg mb-4">Vehicle Details</Text>
            <View className="flex-row space-x-4">
              <Image
                source={{ uri: vehicleImage }}
                className="w-24 h-24 rounded-lg"
                resizeMode="cover"
              />
              <View className="flex-1 justify-center">
                <Text className="text-neutral-800 font-semibold text-lg">{vehicleName}</Text>
                <Text className="text-blue-600 font-bold text-xl mt-1">
                  ₹{pricePerDay}/day
                </Text>
              </View>
            </View>
          </Card>

          {/* Booking Details */}
          <Card>
            <Text className="text-neutral-800 font-semibold text-lg mb-4">Booking Details</Text>
            <View className="space-y-3">
              <View className="flex-row justify-between items-center py-2 border-b border-slate-100">
                <View className="flex-row items-center space-x-3">
                  <Ionicons name="calendar-outline" size={20} color="#2563eb" />
                  <Text className="text-neutral-600">Pickup Date</Text>
                </View>
                <Text className="text-neutral-800 font-semibold">{pickupDate}</Text>
              </View>

              <View className="flex-row justify-between items-center py-2 border-b border-slate-100">
                <View className="flex-row items-center space-x-3">
                  <Ionicons name="calendar-outline" size={20} color="#2563eb" />
                  <Text className="text-neutral-600">Return Date</Text>
                </View>
                <Text className="text-neutral-800 font-semibold">{returnDate}</Text>
              </View>

              <View className="flex-row justify-between items-center py-2">
                <View className="flex-row items-center space-x-3">
                  <Ionicons name="time-outline" size={20} color="#2563eb" />
                  <Text className="text-neutral-600">Duration</Text>
                </View>
                <Text className="text-neutral-800 font-semibold">{numberOfDays} days</Text>
              </View>
            </View>
          </Card>

          {/* Price Breakdown */}
          <Card>
            <Text className="text-neutral-800 font-semibold text-lg mb-4">Price Breakdown</Text>
            <View className="space-y-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-neutral-600">Rental ({numberOfDays} days)</Text>
                <Text className="text-neutral-800 font-medium">
                  ₹{pricePerDay} × {numberOfDays}
                </Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-neutral-600">Service Fee</Text>
                <Text className="text-neutral-800 font-medium">₹100</Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-neutral-600">Insurance</Text>
                <Text className="text-green-600 font-medium">Included</Text>
              </View>

              <View className="border-t border-slate-200 pt-3 mt-2">
                <View className="flex-row justify-between items-center">
                  <Text className="text-neutral-800 font-bold text-lg">Total Amount</Text>
                  <Text className="text-blue-600 font-bold text-2xl">
                    ₹{totalPrice + 100}
                  </Text>
                </View>
              </View>
            </View>
          </Card>

          {/* Payment Method */}
          <Card>
            <Text className="text-neutral-800 font-semibold text-lg mb-4">Payment Method</Text>
            <TouchableOpacity className="flex-row items-center justify-between bg-slate-50 rounded-lg p-4">
              <View className="flex-row items-center space-x-3">
                <Ionicons name="card-outline" size={24} color="#2563eb" />
                <View>
                  <Text className="text-neutral-800 font-medium">Credit/Debit Card</Text>
                  <Text className="text-neutral-500 text-sm">Pay securely</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#64748b" />
            </TouchableOpacity>
          </Card>

          {/* Terms */}
          <View className="bg-blue-50 rounded-xl p-4">
            <View className="flex-row items-start space-x-2">
              <Ionicons name="information-circle" size={20} color="#2563eb" />
              <Text className="text-neutral-600 text-sm flex-1">
                By confirming this booking, you agree to our terms and conditions. Cancellation
                charges may apply.
              </Text>
            </View>
          </View>

          {/* Confirm Button */}
          <Button
            title="Confirm Booking"
            onPress={handleConfirmBooking}
            size="lg"
            loading={loading}
          />

          <View className="h-4" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
