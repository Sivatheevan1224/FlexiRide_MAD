// Manage Vehicles Screen
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/ui/card';

interface Vehicle {
  id: string;
  name: string;
  type: 'car' | 'bike';
  price: number;
  image: string;
  status: 'available' | 'rented';
}

export default function ManageVehiclesScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'available' | 'rented'>('all');

  // Sample data
  const vehicles: Vehicle[] = [
    {
      id: '1',
      name: 'Honda City',
      type: 'car',
      price: 1500,
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400',
      status: 'available',
    },
    {
      id: '2',
      name: 'Royal Enfield',
      type: 'bike',
      price: 800,
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400',
      status: 'rented',
    },
    {
      id: '3',
      name: 'Hyundai Creta',
      type: 'car',
      price: 2000,
      image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=400',
      status: 'available',
    },
  ];

  const filteredVehicles = vehicles.filter((vehicle) => {
    if (activeTab === 'all') return true;
    return vehicle.status === activeTab;
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
            <Text className="text-white text-2xl font-bold">Manage Vehicles</Text>
          </View>

          {/* Tabs */}
          <View className="flex-row space-x-3">
            {(['all', 'available', 'rented'] as const).map((tab) => (
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
          {/* Add Vehicle Button */}
          <TouchableOpacity
            onPress={() => router.push('/admin/add-vehicle')}
            activeOpacity={0.7}
            className="mb-6"
          >
            <Card>
              <View className="flex-row items-center justify-center space-x-2 py-2">
                <Ionicons name="add-circle" size={24} color="#2563eb" />
                <Text className="text-blue-600 font-semibold text-base">Add New Vehicle</Text>
              </View>
            </Card>
          </TouchableOpacity>

          {/* Vehicle List */}
          <View className="space-y-4">
            {filteredVehicles.map((vehicle) => (
              <Card key={vehicle.id}>
                <View className="flex-row space-x-4">
                  {/* Vehicle Image */}
                  <Image
                    source={{ uri: vehicle.image }}
                    className="w-24 h-24 rounded-lg"
                    resizeMode="cover"
                  />

                  {/* Vehicle Info */}
                  <View className="flex-1 justify-between">
                    <View>
                      <View className="flex-row items-center justify-between mb-1">
                        <Text className="text-neutral-800 font-semibold text-base">
                          {vehicle.name}
                        </Text>
                        <View
                          className={`px-2 py-1 rounded-full ${
                            vehicle.status === 'available'
                              ? 'bg-green-100'
                              : 'bg-orange-100'
                          }`}
                        >
                          <Text
                            className={`text-xs font-medium ${
                              vehicle.status === 'available'
                                ? 'text-green-700'
                                : 'text-orange-700'
                            }`}
                          >
                            {vehicle.status}
                          </Text>
                        </View>
                      </View>
                      <Text className="text-neutral-500 text-sm capitalize">{vehicle.type}</Text>
                      <Text className="text-blue-600 font-bold text-lg mt-1">
                        ₹{vehicle.price}/day
                      </Text>
                    </View>

                    {/* Action Buttons */}
                    <View className="flex-row space-x-2">
                      <TouchableOpacity className="bg-blue-50 px-3 py-1.5 rounded-lg flex-row items-center space-x-1">
                        <Ionicons name="create-outline" size={16} color="#2563eb" />
                        <Text className="text-blue-600 text-xs font-medium">Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="bg-red-50 px-3 py-1.5 rounded-lg flex-row items-center space-x-1">
                        <Ionicons name="trash-outline" size={16} color="#ef4444" />
                        <Text className="text-red-600 text-xs font-medium">Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Card>
            ))}
          </View>

          <View className="h-4" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
