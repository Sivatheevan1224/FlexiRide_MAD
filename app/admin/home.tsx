// Admin Home Screen
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/ui/card';
import { useAuth } from '../../context/AuthContext';
import { signOut } from '../../firebase/auth';
import { getAllBookings } from '../../firebase/bookings';
import { db } from '../../firebase/config';
import { getAllVehicles } from '../../firebase/vehicles';

export default function AdminHomeScreen() {
  const router = useRouter();
  const { clearSession } = useAuth();
  const [stats, setStats] = useState([
    { label: 'Total Vehicles', value: '0', icon: 'car-sport', color: 'bg-blue-500' },
    { label: 'Active Bookings', value: '0', icon: 'calendar', color: 'bg-green-500' },
    { label: 'Total Users', value: '0', icon: 'people', color: 'bg-purple-500' },
    { label: 'Revenue', value: 'Rs. 0', icon: 'cash', color: 'bg-yellow-500' },
  ]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    loadStats();
  }, []);

  const getTimeAgo = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  const loadStats = async () => {
    try {
      // Load vehicles
      const vehiclesResult = await getAllVehicles();
      const vehicles = vehiclesResult.success && vehiclesResult.vehicles ? vehiclesResult.vehicles : [];
      const totalVehicles = vehicles.length;

      // Load bookings
      const bookingsResult = await getAllBookings();
      const bookings = bookingsResult.success && bookingsResult.bookings ? bookingsResult.bookings : [];
      
      let activeBookings = 0;
      let revenue = 0;

      activeBookings = bookings.filter(b => b.status === 'active' || b.status === 'pending').length;
      revenue = bookings
        .filter(b => b.status === 'completed' || b.status === 'active')
        .reduce((sum, b) => sum + b.totalPrice, 0);

      // Load users
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const totalUsers = usersSnapshot.size;
      const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));

      setStats([
        { label: 'Total Vehicles', value: totalVehicles.toString(), icon: 'car-sport', color: 'bg-blue-500' },
        { label: 'Active Bookings', value: activeBookings.toString(), icon: 'calendar', color: 'bg-green-500' },
        { label: 'Total Users', value: totalUsers.toString(), icon: 'people', color: 'bg-purple-500' },
        { label: 'Revenue', value: `Rs. ${(revenue / 1000).toFixed(1)}K`, icon: 'cash', color: 'bg-yellow-500' },
      ]);

      // Process Recent Activity
      let activityList: any[] = [];

      // Add recent bookings
      bookings.forEach(b => {
        activityList.push({
          id: b.id,
          type: 'booking',
          title: 'New booking confirmed',
          subtitle: `${b.vehicleName}`,
          createdAt: b.createdAt,
          icon: 'checkmark',
          color: 'bg-green-100',
          iconColor: '#22c55e'
        });
      });

      // Add recent vehicles
      vehicles.forEach(v => {
        activityList.push({
          id: v.id,
          type: 'vehicle',
          title: 'Vehicle added',
          subtitle: v.name,
          createdAt: v.createdAt,
          icon: 'car-sport',
          color: 'bg-blue-100',
          iconColor: '#2563eb'
        });
      });

      // Add recent users
      users.forEach(u => {
        activityList.push({
          id: u.uid || u.id,
          type: 'user',
          title: 'New user registered',
          subtitle: u.name || u.email,
          createdAt: u.createdAt,
          icon: 'person-add',
          color: 'bg-purple-100',
          iconColor: '#9333ea'
        });
      });

      // Sort by date descending
      activityList.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA;
      });

      // Take top 5
      setRecentActivity(activityList.slice(0, 5));

    } catch (error) {
      console.error('Error loading admin stats:', error);
    }
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
              onPress={() => {
                const performLogout = async () => {
                  const result = await signOut();
                  if (result.success) {
                    await clearSession();
                    router.replace('/' as any);
                  } else {
                    Alert.alert('Error', result.error || 'Failed to logout');
                  }
                };

                if (Platform.OS === 'web') {
                  const confirmed = window.confirm('Are you sure you want to logout?');
                  if (confirmed) {
                    performLogout();
                  }
                } else {
                  Alert.alert(
                    'Logout',
                    'Are you sure you want to logout?',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Logout', style: 'destructive', onPress: performLogout }
                    ]
                  );
                }
              }}
              className="bg-white/20 rounded-full p-2"
            >
              <Ionicons name="log-out" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="px-6 py-6">
          {/* Stats Cards */}
          <View style={{ marginBottom: 24 }}>
            <Text className="text-neutral-800 text-xl font-bold mb-4">Overview</Text>
            <View className="flex-row flex-wrap" style={{ marginHorizontal: -8 }}>
              {stats.map((stat, index) => (
                <View key={index} className="w-1/2" style={{ paddingHorizontal: 8, marginBottom: 16 }}>
                  <Card padding="md">
                    <View>
                      <View className={`${stat.color} w-12 h-12 rounded-xl items-center justify-center`}>
                        <Ionicons name={stat.icon as any} size={24} color="#ffffff" />
                      </View>
                      <Text className="text-neutral-600 text-sm" style={{ marginTop: 8 }}>{stat.label}</Text>
                      <Text className="text-neutral-800 text-2xl font-bold" style={{ marginTop: 4 }}>{stat.value}</Text>
                    </View>
                  </Card>
                </View>
              ))}
            </View>
          </View>

          {/* Menu Items */}
          <View>
            <Text className="text-neutral-800 text-xl font-bold mb-4">Quick Actions</Text>
            <View>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => router.push(item.route as any)}
                  activeOpacity={0.7}
                  style={{ marginBottom: 12 }}
                >
                  <Card>
                    <View className="flex-row items-center" style={{ gap: 16 }}>
                      <View className={`${item.color} w-14 h-14 rounded-xl items-center justify-center`}>
                        <Ionicons name={item.icon as any} size={28} color="#ffffff" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-neutral-800 font-semibold text-base">
                          {item.title}
                        </Text>
                        <Text className="text-neutral-500 text-sm" style={{ marginTop: 2 }}>{item.description}</Text>
                      </View>
                      <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
                    </View>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Recent Activity */}
          {/* Recent Activity */}
          <View style={{ marginTop: 24 }}>
            <Text className="text-neutral-800 text-xl font-bold mb-4">Recent Activity</Text>
            <Card>
              <View>
                {recentActivity.length > 0 ? (
                  recentActivity.map((item, index) => (
                    <View 
                      key={index} 
                      className={`flex-row items-center pb-3 ${index !== recentActivity.length - 1 ? 'border-b border-slate-100' : ''}`} 
                      style={{ gap: 12, marginTop: index === 0 ? 0 : 12 }}
                    >
                      <View className={`${item.color} w-10 h-10 rounded-full items-center justify-center`}>
                        <Ionicons name={item.icon as any} size={20} color={item.iconColor} />
                      </View>
                      <View className="flex-1">
                        <Text className="text-neutral-800 font-medium">{item.title}</Text>
                        <Text className="text-neutral-500 text-xs">{item.subtitle} • {getTimeAgo(item.createdAt)}</Text>
                      </View>
                    </View>
                  ))
                ) : (
                  <Text className="text-neutral-500 text-center py-4">No recent activity</Text>
                )}
              </View>
            </Card>
          </View>

          <View className="h-4" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
