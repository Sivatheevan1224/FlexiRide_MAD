// My Bookings Screen
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookingCard, { Booking } from '../components/ui/booking-card';

export default function MyBookingsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed'>('all');

  // Sample bookings data
  const bookings: Booking[] = [
    {
      id: '1',
      vehicleName: 'Honda City',
      vehicleImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400',
      pickupDate: '15 Nov 2025',
      returnDate: '20 Nov 2025',
      totalPrice: 7600,
      status: 'confirmed',
    },
    {
      id: '2',
      vehicleName: 'Royal Enfield',
      vehicleImage: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400',
      pickupDate: '10 Nov 2025',
      returnDate: '12 Nov 2025',
      totalPrice: 1700,
      status: 'completed',
    },
    {
      id: '3',
      vehicleName: 'Hyundai Creta',
      vehicleImage: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=400',
      pickupDate: '25 Nov 2025',
      returnDate: '28 Nov 2025',
      totalPrice: 6100,
      status: 'pending',
    },
  ];

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return booking.status === 'confirmed' || booking.status === 'pending';
    if (activeTab === 'completed') return booking.status === 'completed';
    return true;
  });

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-blue-600 px-6 pt-6 pb-8 rounded-b-3xl">
          <View className="flex-row items-center space-x-4 mb-6">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold">My Bookings</Text>
          </View>

          {/* Tabs */}
          <View className="flex-row space-x-3">
            {(['all', 'upcoming', 'completed'] as const).map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full ${
                  activeTab === tab ? 'bg-white' : 'bg-white/20'
                }`}
              >
                <Text
                  className={`font-semibold capitalize ${
                    activeTab === tab ? 'text-blue-600' : 'text-white'
                  }`}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="px-6 py-6">
          {filteredBookings.length > 0 ? (
            <View className="space-y-4">
              {filteredBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </View>
          ) : (
            <View className="items-center justify-center py-12">
              <Ionicons name="calendar-outline" size={64} color="#cbd5e1" />
              <Text className="text-neutral-500 text-lg mt-4">No bookings found</Text>
              <Text className="text-neutral-400 text-sm text-center mt-2">
                Start exploring and book your first ride
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="bg-white border-t border-slate-200 px-6 py-3">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity className="items-center" onPress={() => router.push('/home')}>
            <Ionicons name="home" size={24} color="#64748b" />
            <Text className="text-neutral-500 text-xs mt-1">Home</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center" onPress={() => router.push('/my-bookings')}>
            <Ionicons name="calendar" size={24} color="#2563eb" />
            <Text className="text-blue-600 text-xs mt-1 font-medium">Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center" onPress={() => router.push('/profile')}>
            <Ionicons name="person" size={24} color="#64748b" />
            <Text className="text-neutral-500 text-xs mt-1">Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
