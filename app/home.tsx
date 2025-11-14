// Home Screen
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import VehicleCard, { Vehicle } from '../components/ui/vehicle-card';

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'cars' | 'bikes'>('all');

  // Sample data - replace with actual API call
  const vehicles: Vehicle[] = [
    {
      id: '1',
      name: 'Honda City',
      type: 'car',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400',
      fuel: 'Petrol',
      gear: 'Automatic',
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Royal Enfield',
      type: 'bike',
      price: 800,
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400',
      fuel: 'Petrol',
      gear: 'Manual',
      rating: 4.6,
    },
    {
      id: '3',
      name: 'Hyundai Creta',
      type: 'car',
      price: 2000,
      image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=400',
      fuel: 'Diesel',
      gear: 'Automatic',
      rating: 4.9,
    },
    {
      id: '4',
      name: 'Yamaha R15',
      type: 'bike',
      price: 600,
      image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=400',
      fuel: 'Petrol',
      gear: 'Manual',
      rating: 4.7,
    },
  ];

  const filteredVehicles = vehicles.filter((vehicle) => {
    if (activeTab === 'all') return true;
    return vehicle.type === activeTab.slice(0, -1); // 'cars' -> 'car', 'bikes' -> 'bike'
  });

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-blue-600 px-6 pt-6 pb-8 rounded-b-3xl">
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-blue-100 text-sm">Welcome back,</Text>
              <Text className="text-white text-2xl font-bold">John Doe</Text>
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
        <View className="flex-row space-x-3 px-6 mt-6">
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
          <View className="space-y-4 pb-6">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onPress={() => router.push(`/vehicle-details?id=${vehicle.id}`)}
              />
            ))}
          </View>
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
