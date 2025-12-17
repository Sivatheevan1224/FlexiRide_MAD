// My Bookings Screen
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookingCard, { Booking } from '../components/ui/booking-card';
import { getCurrentUser } from '../firebase/auth';
import { getUserBookings } from '../firebase/bookings';
import { getVehicleById } from '../firebase/vehicles';

export default function MyBookingsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const result = await getUserBookings(currentUser.uid);
    
    if (result.success && result.bookings) {
      // Fetch vehicle details for each booking to get images
      const bookingsWithImages = await Promise.all(
        result.bookings.map(async (booking) => {
          let vehicleImage = 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400';
          
          if (booking.vehicleId) {
            const vehicleResult = await getVehicleById(booking.vehicleId);
            if (vehicleResult.success && vehicleResult.vehicle) {
              vehicleImage = vehicleResult.vehicle.imageUrl || vehicleImage;
            }
          }

          return {
            id: booking.id || '',
            vehicleName: booking.vehicleName || 'Vehicle',
            vehicleImage: vehicleImage,
            pickupDate: new Date(booking.pickupDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            returnDate: new Date(booking.returnDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            totalPrice: booking.totalPrice,
            status: booking.status === 'active' ? 'confirmed' : booking.status === 'completed' ? 'completed' : 'pending',
          };
        })
      );
      
      setBookings(bookingsWithImages);
    }
    setLoading(false);
  };

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
          <View className="flex-row items-center mb-6" style={{ gap: 16 }}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold">My Bookings</Text>
          </View>

          {/* Tabs */}
          <View className="flex-row" style={{ gap: 12 }}>
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
          {loading ? (
            <View className="items-center justify-center py-12">
              <ActivityIndicator size="large" color="#2563eb" />
              <Text className="text-neutral-500 mt-4">Loading bookings...</Text>
            </View>
          ) : filteredBookings.length > 0 ? (
            <View>
              {filteredBookings.map((booking) => (
                <View key={booking.id} style={{ marginBottom: 16 }}>
                  <BookingCard booking={booking} />
                </View>
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
