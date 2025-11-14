// Vehicle Details Screen
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/ui/button';
import Card from '../components/ui/card';

export default function VehicleDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  // Sample data - replace with actual API call based on params.id
  const vehicle = {
    id: params.id || '1',
    name: 'Honda City',
    type: 'car',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600',
    fuel: 'Petrol',
    gear: 'Automatic',
    seats: 5,
    rating: 4.8,
    reviews: 124,
    description:
      'The Honda City is a comfortable and reliable sedan perfect for city driving and long trips. Features include automatic transmission, powerful AC, and spacious interiors.',
  };

  const specs = [
    { icon: 'speedometer-outline', label: 'Fuel', value: vehicle.fuel },
    { icon: 'settings-outline', label: 'Gear', value: vehicle.gear },
    { icon: 'people-outline', label: 'Seats', value: vehicle.seats.toString() },
    { icon: 'shield-checkmark-outline', label: 'Insurance', value: 'Included' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header with Back Button */}
        <View className="relative">
          <Image
            source={{ uri: vehicle.image }}
            className="w-full h-72"
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-4 left-4 bg-white/90 rounded-full p-2"
          >
            <Ionicons name="arrow-back" size={24} color="#1f2937" />
          </TouchableOpacity>
          <TouchableOpacity className="absolute top-4 right-4 bg-white/90 rounded-full p-2">
            <Ionicons name="heart-outline" size={24} color="#ef4444" />
          </TouchableOpacity>
        </View>

        <View className="px-6 py-6 space-y-6">
          {/* Title and Rating */}
          <View>
            <View className="flex-row justify-between items-start mb-2">
              <Text className="text-neutral-800 text-2xl font-bold flex-1">
                {vehicle.name}
              </Text>
              <View className="flex-row items-center space-x-1">
                <Ionicons name="star" size={20} color="#fbbf24" />
                <Text className="text-neutral-700 font-semibold">{vehicle.rating}</Text>
                <Text className="text-neutral-500 text-sm">({vehicle.reviews})</Text>
              </View>
            </View>
            <Text className="text-blue-600 text-3xl font-bold">₹{vehicle.price}/day</Text>
          </View>

          {/* Specs */}
          <Card>
            <Text className="text-neutral-800 font-semibold text-lg mb-4">Specifications</Text>
            <View className="flex-row flex-wrap -mx-2">
              {specs.map((spec, index) => (
                <View key={index} className="w-1/2 px-2 mb-4">
                  <View className="bg-slate-50 rounded-lg p-3 space-y-1">
                    <Ionicons name={spec.icon as any} size={24} color="#2563eb" />
                    <Text className="text-neutral-500 text-xs">{spec.label}</Text>
                    <Text className="text-neutral-800 font-semibold">{spec.value}</Text>
                  </View>
                </View>
              ))}
            </View>
          </Card>

          {/* Description */}
          <Card>
            <Text className="text-neutral-800 font-semibold text-lg mb-3">Description</Text>
            <Text className="text-neutral-600 leading-6">{vehicle.description}</Text>
          </Card>

          {/* Date Selection */}
          <Card>
            <Text className="text-neutral-800 font-semibold text-lg mb-4">Select Dates</Text>
            <View className="space-y-3">
              <TouchableOpacity className="bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 flex-row items-center justify-between">
                <View className="flex-row items-center space-x-3">
                  <Ionicons name="calendar-outline" size={20} color="#64748b" />
                  <View>
                    <Text className="text-neutral-500 text-xs">Pickup Date</Text>
                    <Text className="text-neutral-800 font-medium">
                      {pickupDate || 'Select date'}
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-down" size={20} color="#64748b" />
              </TouchableOpacity>

              <TouchableOpacity className="bg-slate-50 border border-slate-300 rounded-lg px-4 py-3 flex-row items-center justify-between">
                <View className="flex-row items-center space-x-3">
                  <Ionicons name="calendar-outline" size={20} color="#64748b" />
                  <View>
                    <Text className="text-neutral-500 text-xs">Return Date</Text>
                    <Text className="text-neutral-800 font-medium">
                      {returnDate || 'Select date'}
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-down" size={20} color="#64748b" />
              </TouchableOpacity>
            </View>
          </Card>

          {/* Book Now Button */}
          <Button
            title="Book Now"
            onPress={() =>
              router.push(`/booking?id=${vehicle.id}&name=${vehicle.name}&price=${vehicle.price}`)
            }
            size="lg"
          />

          <View className="h-4" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
