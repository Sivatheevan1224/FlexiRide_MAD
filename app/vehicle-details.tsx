// Vehicle Details Screen
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/ui/button';
import Card from '../components/ui/card';
import { getVehicleById } from '../firebase/vehicles';

export default function VehicleDetailsScreen() {
  const router = useRouter();
  const navigation = useNavigation(); // Use navigation for safe back check
  const params = useLocalSearchParams();
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVehicle();
  }, [params.id]);

  const loadVehicle = async () => {
    if (!params.id) return;
    
    setLoading(true);
    const result = await getVehicleById(params.id as string);
    
    if (result.success && result.vehicle) {
      const vehicleData = result.vehicle as any; // Cast to access additional fields
      setVehicle({
        id: result.vehicle.id,
        name: result.vehicle.name,
        type: result.vehicle.type,
        price: result.vehicle.pricePerDay,
        image: result.vehicle.imageUrl || 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600',
        fuel: vehicleData.fuelType || vehicleData.fuel || 'Petrol',
        gear: vehicleData.transmission || vehicleData.gear || 'Manual',
        seats: result.vehicle.type === 'car' ? 5 : 2,
        rating: 4.8,
        reviews: 124,
        description: result.vehicle.description || 'A reliable vehicle perfect for your journey.',
      });
    }
    setLoading(false);
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      router.replace('/home');
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50 justify-center items-center">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="text-neutral-500 mt-4">Loading vehicle details...</Text>
      </SafeAreaView>
    );
  }

  if (!vehicle) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50 justify-center items-center px-6">
        <Ionicons name="alert-circle" size={64} color="#ef4444" />
        <Text className="text-neutral-800 text-xl font-bold mt-4">Vehicle Not Found</Text>
        <Text className="text-neutral-500 text-center mt-2">Unable to load vehicle details</Text>
        <Button title="Go Back" onPress={handleBack} className="mt-6" />
      </SafeAreaView>
    );
  }

  const specs = [
    { icon: 'speedometer-outline', label: 'Fuel', value: vehicle.fuel },
    { icon: 'settings-outline', label: 'Gear', value: vehicle.gear },
    { icon: 'people-outline', label: 'Seats', value: vehicle.seats.toString() },
    { icon: 'shield-checkmark-outline', label: 'Insurance', value: 'Included' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header with Back Button */}
        <View className="relative">
          <Image
            source={{ uri: vehicle.image }}
            className="w-full h-72"
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={handleBack}
            className="absolute top-4 left-4 bg-white/90 rounded-full p-2"
          >
            <Ionicons name="arrow-back" size={24} color="#1f2937" />
          </TouchableOpacity>
          <TouchableOpacity className="absolute top-4 right-4 bg-white/90 rounded-full p-2">
            <Ionicons name="heart-outline" size={24} color="#ef4444" />
          </TouchableOpacity>
        </View>

        <View className="px-6 py-6" style={{ gap: 24 }}>
          {/* Title and Rating */}
          <View>
            <View className="flex-row justify-between items-start mb-2">
              <Text className="text-neutral-800 text-2xl font-bold flex-1">
                {vehicle.name}
              </Text>
              <View className="flex-row items-center" style={{ gap: 4 }}>
                <Ionicons name="star" size={20} color="#fbbf24" />
                <Text className="text-neutral-700 font-semibold">{vehicle.rating}</Text>
                <Text className="text-neutral-500 text-sm">({vehicle.reviews})</Text>
              </View>
            </View>
            <Text className="text-blue-600 text-3xl font-bold">Rs. {vehicle.price}/day</Text>
          </View>

          {/* Specs */}
          <Card>
            <Text className="text-neutral-800 font-semibold text-lg mb-4">Specifications</Text>
            <View className="flex-row flex-wrap -mx-2">
              {specs.map((spec, index) => (
                <View key={index} className="w-1/2 px-2 mb-4">
                  <View className="bg-slate-50 rounded-lg p-3" style={{ gap: 4 }}>
                    <Ionicons name={spec.icon as any} size={24} color="#2563eb" />
                    <Text className="text-neutral-500 text-xs">{spec.label}</Text>
                    <Text className="text-neutral-800 font-semibold">{spec.value}</Text>
                  </View>
                </View>
              ))}
            </View>
          </Card>

          {/* Description */}
          <Card>
            <Text className="text-neutral-800 font-semibold text-lg mb-3">Description</Text>
            <Text className="text-neutral-600 leading-6">{vehicle.description}</Text>
          </Card>

          {/* Book Now Button */}
          <Button
            title="Book Now"
            onPress={() =>
              router.push(`/booking?id=${vehicle.id}&name=${vehicle.name}&price=${vehicle.price}`)
            }
            size="lg"
          />

          <View className="h-4" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
