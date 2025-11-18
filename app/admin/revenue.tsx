// Revenue Dashboard Screen (Admin)
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/ui/card';
import { getAllBookings } from '../../firebase/bookings';

interface RevenueStats {
  totalRevenue: number;
  completedBookings: number;
  activeBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
  monthlyRevenue: { [key: string]: number };
}

export default function RevenueScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<RevenueStats>({
    totalRevenue: 0,
    completedBookings: 0,
    activeBookings: 0,
    pendingBookings: 0,
    cancelledBookings: 0,
    monthlyRevenue: {},
  });

  useEffect(() => {
    loadRevenue();
  }, []);

  const loadRevenue = async () => {
    setLoading(true);
    const result = await getAllBookings();
    
    if (result.success && result.bookings) {
      let totalRevenue = 0;
      let completedBookings = 0;
      let activeBookings = 0;
      let pendingBookings = 0;
      let cancelledBookings = 0;
      const monthlyRevenue: { [key: string]: number } = {};

      result.bookings.forEach((booking) => {
        // Count bookings by status
        if (booking.status === 'completed') {
          completedBookings++;
          totalRevenue += booking.totalPrice || 0;
        } else if (booking.status === 'active') {
          activeBookings++;
          totalRevenue += booking.totalPrice || 0;
        } else if (booking.status === 'pending') {
          pendingBookings++;
        } else if (booking.status === 'cancelled') {
          cancelledBookings++;
        }

        // Calculate monthly revenue (only completed and active)
        if (booking.status === 'completed' || booking.status === 'active') {
          const bookingDate = new Date(booking.pickupDate);
          const monthKey = bookingDate.toLocaleString('en-US', { month: 'short', year: 'numeric' });
          monthlyRevenue[monthKey] = (monthlyRevenue[monthKey] || 0) + (booking.totalPrice || 0);
        }
      });

      setStats({
        totalRevenue,
        completedBookings,
        activeBookings,
        pendingBookings,
        cancelledBookings,
        monthlyRevenue,
      });
    }
    setLoading(false);
  };

  const StatCard = ({ icon, label, value, color }: { icon: string; label: string; value: string | number; color: string }) => (
    <Card>
      <View className="flex-row items-center space-x-3">
        <View className={`${color} p-3 rounded-full`}>
          <Ionicons name={icon as any} size={24} color="#ffffff" />
        </View>
        <View className="flex-1">
          <Text className="text-neutral-500 text-sm">{label}</Text>
          <Text className="text-neutral-800 text-xl font-bold mt-1">{value}</Text>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-blue-600 px-6 pt-6 pb-8 rounded-b-3xl">
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold">Revenue Dashboard</Text>
          </View>
        </View>

        <View className="px-6 py-6">
          {loading ? (
            <View className="py-12">
              <ActivityIndicator size="large" color="#2563eb" />
              <Text className="text-center text-neutral-500 mt-4">Loading revenue data...</Text>
            </View>
          ) : (
            <View className="space-y-4">
              {/* Total Revenue Card */}
              <Card>
                <View className="items-center py-4">
                  <Text className="text-neutral-500 text-base mb-2">Total Revenue</Text>
                  <Text className="text-blue-600 text-4xl font-bold">Rs. {stats.totalRevenue.toLocaleString()}</Text>
                  <Text className="text-neutral-400 text-sm mt-1">
                    From {stats.completedBookings + stats.activeBookings} bookings
                  </Text>
                </View>
              </Card>

              {/* Booking Statistics */}
              <View className="space-y-3">
                <Text className="text-neutral-800 font-semibold text-lg">Booking Statistics</Text>
                
                <StatCard
                  icon="checkmark-circle"
                  label="Completed Bookings"
                  value={stats.completedBookings}
                  color="bg-green-500"
                />
                
                <StatCard
                  icon="time"
                  label="Active Bookings"
                  value={stats.activeBookings}
                  color="bg-blue-500"
                />
                
                <StatCard
                  icon="hourglass"
                  label="Pending Bookings"
                  value={stats.pendingBookings}
                  color="bg-orange-500"
                />
                
                <StatCard
                  icon="close-circle"
                  label="Cancelled Bookings"
                  value={stats.cancelledBookings}
                  color="bg-red-500"
                />
              </View>

              {/* Monthly Revenue */}
              {Object.keys(stats.monthlyRevenue).length > 0 && (
                <View className="space-y-3 mt-4">
                  <Text className="text-neutral-800 font-semibold text-lg">Monthly Revenue</Text>
                  {Object.entries(stats.monthlyRevenue)
                    .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
                    .map(([month, revenue]) => (
                      <Card key={month}>
                        <View className="flex-row items-center justify-between">
                          <View className="flex-row items-center space-x-3">
                            <View className="bg-blue-100 p-2 rounded-lg">
                              <Ionicons name="calendar" size={20} color="#2563eb" />
                            </View>
                            <Text className="text-neutral-800 font-medium">{month}</Text>
                          </View>
                          <Text className="text-blue-600 font-bold text-lg">Rs. {revenue.toLocaleString()}</Text>
                        </View>
                      </Card>
                    ))}
                </View>
              )}

              {/* Average Booking Value */}
              {stats.completedBookings + stats.activeBookings > 0 && (
                <Card>
                  <View className="items-center py-4">
                    <Text className="text-neutral-500 text-base mb-2">Average Booking Value</Text>
                    <Text className="text-green-600 text-2xl font-bold">
                      Rs. {Math.round(stats.totalRevenue / (stats.completedBookings + stats.activeBookings)).toLocaleString()}
                    </Text>
                  </View>
                </Card>
              )}
            </View>
          )}

          <View className="h-4" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
