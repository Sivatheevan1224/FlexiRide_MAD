// View Bookings Screen (Admin)
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookingCard, { Booking } from '../../components/ui/booking-card';
import Button from '../../components/ui/button';
import Card from '../../components/ui/card';
import { getAllBookings, updateBookingStatus } from '../../firebase/bookings';
import { getVehicleById } from '../../firebase/vehicles';

export default function ViewBookingsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setLoading(true);
    const result = await getAllBookings();
    
    if (result.success && result.bookings) {
      // Fetch vehicle details for each booking to get images
      const bookingsWithImages: Booking[] = await Promise.all(
        result.bookings.map(async (booking) => {
          let vehicleImage = 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400';
          
          if (booking.vehicleId) {
            const vehicleResult = await getVehicleById(booking.vehicleId);
            if (vehicleResult.success && vehicleResult.vehicle) {
              vehicleImage = vehicleResult.vehicle.imageUrl || vehicleImage;
            }
          }

          // Map Firebase booking status to BookingCard status
          const mapStatus = (status: string): 'pending' | 'confirmed' | 'completed' | 'cancelled' => {
            if (status === 'active') return 'confirmed';
            if (status === 'completed') return 'completed';
            if (status === 'cancelled') return 'cancelled';
            return 'pending';
          };

          return {
            id: booking.id || '',
            vehicleName: booking.vehicleName || 'Vehicle',
            vehicleImage: vehicleImage,
            pickupDate: new Date(booking.pickupDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            returnDate: new Date(booking.returnDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            totalPrice: booking.totalPrice,
            status: mapStatus(booking.status),
          };
        })
      );
      
      setBookings(bookingsWithImages);
    }
    setLoading(false);
  };

  const handleApprove = async (bookingId: string) => {
    Alert.alert(
      'Approve Booking',
      'Are you sure you want to approve this booking?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Approve',
          onPress: async () => {
            setProcessingId(bookingId);
            
            // Get booking to find vehicle ID
            const booking = bookings.find(b => b.id === bookingId);
            const allBookingsResult = await getAllBookings();
            const fullBooking = allBookingsResult.bookings?.find(b => b.id === bookingId);
            
            const result = await updateBookingStatus(bookingId, 'active');
            
            if (result.success && fullBooking?.vehicleId) {
              // Update vehicle availability to false (rented)
              const { updateVehicle } = await import('../../firebase/vehicles');
              await updateVehicle(fullBooking.vehicleId, { availability: false });
              
              Alert.alert('Success', 'Booking approved and vehicle marked as rented');
              loadBookings(); // Reload bookings
            } else if (result.success) {
              Alert.alert('Success', 'Booking approved successfully');
              loadBookings();
            } else {
              Alert.alert('Error', result.error || 'Failed to approve booking');
            }
            setProcessingId(null);
          },
        },
      ]
    );
  };

  const handleReject = async (bookingId: string) => {
    Alert.alert(
      'Reject Booking',
      'Are you sure you want to reject this booking?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reject',
          style: 'destructive',
          onPress: async () => {
            setProcessingId(bookingId);
            
            // Get booking to find vehicle ID
            const allBookingsResult = await getAllBookings();
            const fullBooking = allBookingsResult.bookings?.find(b => b.id === bookingId);
            
            const result = await updateBookingStatus(bookingId, 'cancelled');
            
            if (result.success && fullBooking?.vehicleId) {
              // Update vehicle availability to true (available again)
              const { updateVehicle } = await import('../../firebase/vehicles');
              await updateVehicle(fullBooking.vehicleId, { availability: true });
              
              Alert.alert('Success', 'Booking rejected and vehicle marked as available');
              loadBookings(); // Reload bookings
            } else {
              Alert.alert('Error', result.error || 'Failed to reject booking');
            }
            setProcessingId(null);
          },
        },
      ]
    );
  };

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
                      <View className="flex-1">
                        <Button
                          title="Approve"
                          onPress={() => handleApprove(booking.id)}
                          variant="primary"
                          size="sm"
                          loading={processingId === booking.id}
                        />
                      </View>
                      <View className="flex-1">
                        <Button
                          title="Reject"
                          onPress={() => handleReject(booking.id)}
                          variant="outline"
                          size="sm"
                          loading={processingId === booking.id}
                        />
                      </View>
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
