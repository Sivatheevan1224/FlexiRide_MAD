// Manage Vehicles Screen
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Image, ImageSourcePropType, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/ui/card';
import { deleteVehicle, getAllVehicles } from '../../firebase/vehicles';

interface Vehicle {
  id: string;
  name: string;
  type: 'car' | 'bike';
  price: number;
  image: string | ImageSourcePropType;
  fuel?: string;
  gear?: string;
  description?: string;
  availability?: boolean;
  status: 'available' | 'rented';
}

export default function ManageVehiclesScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'available' | 'rented'>('all');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [rawVehicles, setRawVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadVehicles();
    }, [])
  );

  const loadVehicles = async () => {
    setLoading(true);
    const result = await getAllVehicles();
    
    if (result.success && result.vehicles) {
      setRawVehicles(result.vehicles);
      const formattedVehicles: Vehicle[] = result.vehicles.map(v => {
        const vehicleData = v as any; // Cast to access additional fields
        console.log(`Vehicle ${v.name}: availability = ${vehicleData.availability}`);
        return {
          id: v.id || '',
          name: v.name,
          type: v.type,
          price: v.pricePerDay,
          image: v.imageUrl || 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400',
          fuel: vehicleData.fuelType || vehicleData.fuel,
          gear: vehicleData.transmission || vehicleData.gear,
          description: v.description,
          availability: vehicleData.availability !== undefined ? vehicleData.availability : true,
          status: (vehicleData.availability !== undefined ? vehicleData.availability : true) ? 'available' : 'rented',
        };
      });
      console.log(`Total vehicles: ${formattedVehicles.length}, Available: ${formattedVehicles.filter(v => v.status === 'available').length}, Rented: ${formattedVehicles.filter(v => v.status === 'rented').length}`);
      setVehicles(formattedVehicles);
    }
    setLoading(false);
  };

  const handleDelete = (vehicleId: string, vehicleName: string) => {
    Alert.alert(
      'Delete Vehicle',
      `Are you sure you want to delete ${vehicleName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const result = await deleteVehicle(vehicleId);
            if (result.success) {
              Alert.alert('Success', 'Vehicle deleted successfully');
              loadVehicles();
            } else {
              Alert.alert('Error', result.error || 'Failed to delete vehicle');
            }
          },
        },
      ]
    );
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    if (activeTab === 'all') return true;
    return vehicle.status === activeTab;
  });

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-blue-600 px-6 pt-6 pb-8 rounded-b-3xl">
          <View className="flex-row items-center mb-6" style={{ gap: 16 }}>
            <TouchableOpacity onPress={() => router.canGoBack() ? router.back() : router.replace('/admin/home')}>
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold">Manage Vehicles</Text>
          </View>

          {/* Tabs */}
          <View className="flex-row" style={{ gap: 12 }}>
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
              <View className="flex-row items-center justify-center py-2" style={{ gap: 8 }}>
                <Ionicons name="add-circle" size={24} color="#2563eb" />
                <Text className="text-blue-600 font-semibold text-base">Add New Vehicle</Text>
              </View>
            </Card>
          </TouchableOpacity>

          {/* Vehicle List */}
          {loading ? (
            <View className="py-12">
              <ActivityIndicator size="large" color="#2563eb" />
              <Text className="text-center text-neutral-500 mt-4">Loading vehicles...</Text>
            </View>
          ) : (
            <View>
              {filteredVehicles.map((vehicle) => (
                <View key={vehicle.id} style={{ marginBottom: 16 }}>
                  <Card>
                  <View className="flex-row" style={{ gap: 16 }}>
                    {/* Vehicle Image */}
                    <Image
                      source={typeof vehicle.image === 'string' ? { uri: vehicle.image } : vehicle.image}
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
                          Rs. {vehicle.price}/day
                        </Text>
                      </View>

                      {/* Action Buttons */}
                      <View className="flex-row" style={{ gap: 8 }}>
                        <TouchableOpacity 
                          onPress={() => {
                            const vehicleData = rawVehicles.find(v => v.id === vehicle.id);
                            console.log('Raw vehicle data for edit:', vehicleData);
                            const seats = (vehicleData as any)?.seats || '';
                            console.log('Seats value:', seats);
                            const params = new URLSearchParams({
                              id: vehicle.id,
                              name: vehicle.name,
                              type: vehicle.type,
                              price: vehicle.price.toString(),
                              image: typeof vehicle.image === 'string' ? vehicle.image : '',
                              fuel: vehicle.fuel || '',
                              gear: vehicle.gear || '',
                              seats: seats.toString(),
                              description: vehicle.description || '',
                            });
                            console.log('Edit params:', params.toString());
                            router.push(`/admin/add-vehicle?${params.toString()}`);
                          }}
                          className="bg-blue-50 px-3 py-1.5 rounded-lg flex-row items-center"
                          style={{ gap: 4 }}
                        >
                          <Ionicons name="create-outline" size={16} color="#2563eb" />
                          <Text className="text-blue-600 text-xs font-medium">Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                          onPress={() => handleDelete(vehicle.id, vehicle.name)}
                          className="bg-red-50 px-3 py-1.5 rounded-lg flex-row items-center"
                          style={{ gap: 4 }}
                        >
                          <Ionicons name="trash-outline" size={16} color="#ef4444" />
                          <Text className="text-red-600 text-xs font-medium">Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  </Card>
                </View>
              ))}
            </View>
          )}

          <View className="h-4" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
