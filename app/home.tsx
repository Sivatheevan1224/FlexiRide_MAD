// Home Screen
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import VehicleCard, { Vehicle } from '../components/ui/vehicle-card';
import { getCurrentUser, getCurrentUserData } from '../firebase/auth';
import { getAllVehicles } from '../firebase/vehicles';

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'cars' | 'bikes'>('all');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    
    // Load user data
    const currentUser = getCurrentUser();
    if (currentUser) {
      const userResult = await getCurrentUserData(currentUser.uid);
      if (userResult.success && userResult.userData) {
        setUserName(userResult.userData.name || 'User');
      }
    }

    // Load vehicles
    const vehiclesResult = await getAllVehicles();
    if (vehiclesResult.success && vehiclesResult.vehicles) {
      const formattedVehicles: Vehicle[] = vehiclesResult.vehicles.map(v => ({
        id: v.id || '',
        name: v.name,
        type: v.type,
        price: v.pricePerDay,
        image: v.imageUrl || 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400',
        fuel: v.fuelType || 'Petrol',
        gear: v.transmission || 'Manual',
        rating: 4.5,
      }));
      setVehicles(formattedVehicles);
    }
    setLoading(false);
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    // Filter by tab
    const matchesTab = activeTab === 'all' || vehicle.type === activeTab.slice(0, -1); // 'cars' -> 'car', 'bikes' -> 'bike'
    
    // Filter by search query
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = query === '' || 
      vehicle.name.toLowerCase().includes(query) ||
      vehicle.type.toLowerCase().includes(query) ||
      vehicle.fuel.toLowerCase().includes(query) ||
      vehicle.gear.toLowerCase().includes(query);
    
    return matchesTab && matchesSearch;
  });

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-blue-600 px-6 pt-6 pb-8 rounded-b-3xl">
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-blue-100 text-sm">Welcome back,</Text>
              <Text className="text-white text-2xl font-bold">{userName}</Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push('/profile')}
              className="bg-white/20 rounded-full p-2"
            >
              <Ionicons name="person" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View className="bg-white rounded-xl flex-row items-center px-4 py-3">
            <Ionicons name="search" size={20} color="#64748b" />
            <TextInput
              placeholder="Search vehicles..."
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 ml-3 text-neutral-800"
            />
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row px-6 mt-6" style={{ gap: 12 }}>
          {(['all', 'cars', 'bikes'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full ${
                activeTab === tab ? 'bg-blue-600' : 'bg-white'
              }`}
            >
              <Text
                className={`font-semibold capitalize ${
                  activeTab === tab ? 'text-white' : 'text-neutral-600'
                }`}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Section */}
        <View className="px-6 mt-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-neutral-800 text-xl font-bold">Available Vehicles</Text>
            <TouchableOpacity>
              <Text className="text-blue-600 font-medium">See All</Text>
            </TouchableOpacity>
          </View>

          {/* Vehicle Grid */}
          {loading ? (
            <View className="py-12">
              <ActivityIndicator size="large" color="#2563eb" />
              <Text className="text-center text-neutral-500 mt-4">Loading vehicles...</Text>
            </View>
          ) : filteredVehicles.length === 0 ? (
            <View className="py-12">
              <Text className="text-center text-neutral-500">No vehicles found</Text>
              {searchQuery && (
                <Text className="text-center text-neutral-400 text-sm mt-2">
                  Try a different search term
                </Text>
              )}
            </View>
          ) : (
            <View className="pb-6">
              {filteredVehicles.map((vehicle) => (
                <View key={vehicle.id} style={{ marginBottom: 16 }}>
                  <VehicleCard
                    vehicle={vehicle}
                    onPress={() => router.push(`/vehicle-details?id=${vehicle.id}`)}
                  />
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="bg-white border-t border-slate-200 px-6 py-3">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity className="items-center" onPress={() => router.push('/home')}>
            <Ionicons name="home" size={24} color="#2563eb" />
            <Text className="text-blue-600 text-xs mt-1 font-medium">Home</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center" onPress={() => router.push('/my-bookings')}>
            <Ionicons name="calendar" size={24} color="#64748b" />
            <Text className="text-neutral-500 text-xs mt-1">Bookings</Text>
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
