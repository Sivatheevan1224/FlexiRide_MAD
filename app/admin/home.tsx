// Admin Home Screen
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/ui/card';
import { signOut } from '../../firebase/auth';
import { getAllBookings } from '../../firebase/bookings';
import { db } from '../../firebase/config';
import { getAllVehicles } from '../../firebase/vehicles';

export default function AdminHomeScreen() {
  const router = useRouter();
  const [stats, setStats] = useState([
    { label: 'Total Vehicles', value: '0', icon: 'car-sport', color: 'bg-blue-500' },
    { label: 'Active Bookings', value: '0', icon: 'calendar', color: 'bg-green-500' },
    { label: 'Total Users', value: '0', icon: 'people', color: 'bg-purple-500' },
    { label: 'Revenue', value: 'Rs. 0', icon: 'cash', color: 'bg-yellow-500' },
  ]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    // Load vehicles
    const vehiclesResult = await getAllVehicles();
    const totalVehicles = vehiclesResult.success && vehiclesResult.vehicles ? vehiclesResult.vehicles.length : 0;

    // Load bookings
    const bookingsResult = await getAllBookings();
    let activeBookings = 0;
    let revenue = 0;

    if (bookingsResult.success && bookingsResult.bookings) {
      activeBookings = bookingsResult.bookings.filter(b => b.status === 'active' || b.status === 'pending').length;
      revenue = bookingsResult.bookings
        .filter(b => b.status === 'completed' || b.status === 'active')
        .reduce((sum, b) => sum + b.totalPrice, 0);
    }

    // Load users count
    let totalUsers = 0;
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      totalUsers = usersSnapshot.size;
    } catch (error) {
      console.error('Error loading users:', error);
    }

    setStats([
      { label: 'Total Vehicles', value: totalVehicles.toString(), icon: 'car-sport', color: 'bg-blue-500' },
      { label: 'Active Bookings', value: activeBookings.toString(), icon: 'calendar', color: 'bg-green-500' },
      { label: 'Total Users', value: totalUsers.toString(), icon: 'people', color: 'bg-purple-500' },
      { label: 'Revenue', value: `Rs. ${(revenue / 1000).toFixed(1)}K`, icon: 'cash', color: 'bg-yellow-500' },
    ]);
  };

  const menuItems = [
    {
      icon: 'add-circle',
      title: 'Add Vehicle',
      description: 'Add a new vehicle to inventory',
      route: '/admin/add-vehicle',
      color: 'bg-blue-600',
    },
    {
      icon: 'car-sport',
      title: 'Manage Vehicles',
      description: 'View and edit vehicle details',
      route: '/admin/manage-vehicles',
      color: 'bg-green-600',
    },
    {
      icon: 'calendar',
      title: 'View Bookings',
      description: 'Manage all bookings',
      route: '/admin/view-bookings',
      color: 'bg-purple-600',
    },
    {
      icon: 'cash',
      title: 'Revenue Dashboard',
      description: 'View earnings and statistics',
      route: '/admin/revenue',
      color: 'bg-yellow-600',
    },
    {
      icon: 'people',
      title: 'Manage Users',
      description: 'View and manage users',
      route: '/admin/manage-users',
      color: 'bg-orange-600',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-blue-600 px-6 pt-6 pb-8 rounded-b-3xl">
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-blue-100 text-sm">Admin Panel</Text>
              <Text className="text-white text-2xl font-bold">FlexiRide</Text>
            </View>
            <TouchableOpacity
              onPress={async () => {
                const result = await signOut();
                if (result.success) {
                  router.replace('/' as any);
                } else {
                  Alert.alert('Error', result.error || 'Failed to logout');
                }
              }}
              className="bg-white/20 rounded-full p-2"
            >
              <Ionicons name="log-out" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-6 py-6 space-y-6">
          {/* Stats Cards */}
          <View>
            <Text className="text-neutral-800 text-xl font-bold mb-4">Overview</Text>
            <View className="flex-row flex-wrap -mx-2">
              {stats.map((stat, index) => (
                <View key={index} className="w-1/2 px-2 mb-4">
                  <Card padding="md">
                    <View className="space-y-2">
                      <View className={`${stat.color} w-12 h-12 rounded-xl items-center justify-center`}>
                        <Ionicons name={stat.icon as any} size={24} color="#ffffff" />
                      </View>
                      <Text className="text-neutral-600 text-sm">{stat.label}</Text>
                      <Text className="text-neutral-800 text-2xl font-bold">{stat.value}</Text>
                    </View>
                  </Card>
                </View>
              ))}
            </View>
          </View>

          {/* Menu Items */}
          <View>
            <Text className="text-neutral-800 text-xl font-bold mb-4">Quick Actions</Text>
            <View className="space-y-3">
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => router.push(item.route as any)}
                  activeOpacity={0.7}
                >
                  <Card>
                    <View className="flex-row items-center space-x-4">
                      <View className={`${item.color} w-14 h-14 rounded-xl items-center justify-center`}>
                        <Ionicons name={item.icon as any} size={28} color="#ffffff" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-neutral-800 font-semibold text-base">
                          {item.title}
                        </Text>
                        <Text className="text-neutral-500 text-sm">{item.description}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Activity */}
          <View>
            <Text className="text-neutral-800 text-xl font-bold mb-4">Recent Activity</Text>
            <Card>
              <View className="space-y-3">
                <View className="flex-row items-center space-x-3 pb-3 border-b border-slate-100">
                  <View className="bg-green-100 w-10 h-10 rounded-full items-center justify-center">
                    <Ionicons name="checkmark" size={20} color="#22c55e" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-neutral-800 font-medium">New booking confirmed</Text>
                    <Text className="text-neutral-500 text-xs">2 minutes ago</Text>
                  </View>
                </View>
                <View className="flex-row items-center space-x-3 pb-3 border-b border-slate-100">
                  <View className="bg-blue-100 w-10 h-10 rounded-full items-center justify-center">
                    <Ionicons name="car-sport" size={20} color="#2563eb" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-neutral-800 font-medium">Honda City added</Text>
                    <Text className="text-neutral-500 text-xs">1 hour ago</Text>
                  </View>
                </View>
                <View className="flex-row items-center space-x-3">
                  <View className="bg-purple-100 w-10 h-10 rounded-full items-center justify-center">
                    <Ionicons name="person-add" size={20} color="#9333ea" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-neutral-800 font-medium">New user registered</Text>
                    <Text className="text-neutral-500 text-xs">3 hours ago</Text>
                  </View>
                </View>
              </View>
            </Card>
          </View>

          <View className="h-4" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
