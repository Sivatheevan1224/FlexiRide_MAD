// View Bookings Screen (Admin)
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookingCard, { Booking } from '../../components/ui/booking-card';
import Button from '../../components/ui/button';
import Card from '../../components/ui/card';

export default function ViewBookingsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');

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
      pickupDate: '18 Nov 2025',
      returnDate: '20 Nov 2025',
      totalPrice: 1700,
      status: 'pending',
    },
    {
      id: '3',
      vehicleName: 'Hyundai Creta',
      vehicleImage: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=400',
      pickupDate: '10 Nov 2025',
      returnDate: '12 Nov 2025',
      totalPrice: 4100,
      status: 'completed',
    },
    {
      id: '4',
      vehicleName: 'Yamaha R15',
      vehicleImage: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=400',
      pickupDate: '20 Nov 2025',
      returnDate: '22 Nov 2025',
      totalPrice: 1300,
      status: 'pending',
    },
  ];

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === 'all') return true;
    return booking.status === activeTab;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-blue-600 px-6 pt-6 pb-8 rounded-b-3xl">
          <View className="flex-row items-center space-x-4 mb-6">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold">All Bookings</Text>
          </View>

          {/* Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {(['all', 'pending', 'confirmed', 'completed'] as const).map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full mr-3 ${
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
          </ScrollView>
        </View>

        <View className="px-6 py-6 space-y-6">
          {/* Stats */}
          <Card>
            <View className="flex-row justify-between">
              <View className="items-center">
                <Text className="text-neutral-500 text-xs">Total</Text>
                <Text className="text-neutral-800 font-bold text-xl">{stats.total}</Text>
              </View>
              <View className="w-px bg-slate-200" />
              <View className="items-center">
                <Text className="text-neutral-500 text-xs">Pending</Text>
                <Text className="text-yellow-600 font-bold text-xl">{stats.pending}</Text>
              </View>
              <View className="w-px bg-slate-200" />
              <View className="items-center">
                <Text className="text-neutral-500 text-xs">Confirmed</Text>
                <Text className="text-blue-600 font-bold text-xl">{stats.confirmed}</Text>
              </View>
              <View className="w-px bg-slate-200" />
              <View className="items-center">
                <Text className="text-neutral-500 text-xs">Completed</Text>
                <Text className="text-green-600 font-bold text-xl">{stats.completed}</Text>
              </View>
            </View>
          </Card>

          {/* Bookings List */}
          {filteredBookings.length > 0 ? (
            <View className="space-y-4">
              {filteredBookings.map((booking) => (
                <View key={booking.id}>
                  <BookingCard booking={booking} />
                  {/* Admin Actions */}
                  {booking.status === 'pending' && (
                    <View className="flex-row space-x-2 mt-2">
                      <Button
                        title="Approve"
                        onPress={() => {}}
                        variant="primary"
                        size="sm"
                        className="flex-1"
                      />
                      <Button
                        title="Reject"
                        onPress={() => {}}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-red-500"
                      />
                    </View>
                  )}
                </View>
              ))}
            </View>
          ) : (
            <View className="items-center justify-center py-12">
              <Ionicons name="calendar-outline" size={64} color="#cbd5e1" />
              <Text className="text-neutral-500 text-lg mt-4">No bookings found</Text>
            </View>
          )}

          <View className="h-4" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
