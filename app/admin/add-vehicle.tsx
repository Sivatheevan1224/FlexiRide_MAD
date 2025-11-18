// Add Vehicle Screen
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/ui/button';
import Card from '../../components/ui/card';
import Input from '../../components/ui/input';
import { addVehicle, updateVehicle } from '../../firebase/vehicles';

export default function AddVehicleScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [vehicleImage, setVehicleImage] = useState<string | null>(null);
  
  // Check if editing
  const isEditing = !!params.id;
  
  // Form states
  const [name, setName] = useState('');
  const [type, setType] = useState<'car' | 'bike'>('car');
  const [price, setPrice] = useState('');
  const [fuel, setFuel] = useState('');
  const [gear, setGear] = useState('');
  const [seats, setSeats] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isEditing && params.id) {
      // Populate form with existing data
      if (params.name) setName(decodeURIComponent(params.name as string));
      if (params.type) setType(params.type as 'car' | 'bike');
      if (params.price) setPrice(String(params.price));
      if (params.image) setVehicleImage(decodeURIComponent(params.image as string));
      if (params.fuel) setFuel(decodeURIComponent(params.fuel as string));
      if (params.gear) setGear(decodeURIComponent(params.gear as string));
      if (params.seats) setSeats(String(params.seats));
      if (params.description) setDescription(decodeURIComponent(params.description as string));
    }
  }, [isEditing, params.id]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setVehicleImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!name || !price || !fuel || !gear || !seats) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    const vehicleData: any = {
      name,
      type,
      pricePerDay: parseInt(price),
      imageUrl: vehicleImage || 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400',
      fuelType: fuel,
      transmission: gear,
      seats: parseInt(seats),
      availability: true,
    };

    // Only add description if it's not empty
    if (description) {
      vehicleData.description = description;
    }

    let result;
    if (isEditing) {
      result = await updateVehicle(params.id as string, vehicleData);
    } else {
      result = await addVehicle(vehicleData);
    }

    setLoading(false);
    if (result.success) {
      Alert.alert('Success', isEditing ? 'Vehicle updated successfully' : 'Vehicle added successfully');
      router.back();
    } else {
      Alert.alert('Error', result.error || 'Failed to add vehicle');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-blue-600 px-6 pt-6 pb-8 rounded-b-3xl">
          <View className="flex-row items-center space-x-4">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold">{isEditing ? 'Edit Vehicle' : 'Add Vehicle'}</Text>
          </View>
        </View>

        <View className="px-6 py-6 space-y-6">
          {/* Image Upload */}
          <Card>
            <Text className="text-neutral-800 font-semibold text-lg mb-4">Vehicle Image</Text>
            <TouchableOpacity
              onPress={pickImage}
              className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl h-48 items-center justify-center overflow-hidden"
            >
              {vehicleImage ? (
                <Image source={{ uri: vehicleImage }} className="w-full h-full" resizeMode="cover" />
              ) : (
                <View className="items-center">
                  <Ionicons name="cloud-upload-outline" size={48} color="#94a3b8" />
                  <Text className="text-neutral-500 mt-2">Tap to upload image</Text>
                </View>
              )}
            </TouchableOpacity>
          </Card>

          {/* Basic Information */}
          <Card>
            <Text className="text-neutral-800 font-semibold text-lg mb-4">Basic Information</Text>
            <View className="space-y-4">
              <Input
                label="Vehicle Name"
                placeholder="e.g., Honda City"
                value={name}
                onChangeText={setName}
                icon="car-sport-outline"
              />

              {/* Type Selection */}
              <View>
                <Text className="text-neutral-700 font-medium text-base mb-2">Vehicle Type</Text>
                <View className="flex-row space-x-3">
                  <TouchableOpacity
                    onPress={() => setType('car')}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 ${
                      type === 'car'
                        ? 'bg-blue-50 border-blue-600'
                        : 'bg-white border-slate-300'
                    }`}
                  >
                    <Text
                      className={`text-center font-semibold ${
                        type === 'car' ? 'text-blue-600' : 'text-neutral-600'
                      }`}
                    >
                      Car
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setType('bike')}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 ${
                      type === 'bike'
                        ? 'bg-blue-50 border-blue-600'
                        : 'bg-white border-slate-300'
                    }`}
                  >
                    <Text
                      className={`text-center font-semibold ${
                        type === 'bike' ? 'text-blue-600' : 'text-neutral-600'
                      }`}
                    >
                      Bike
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Input
                label="Price per Day (Rs.)"
                placeholder="e.g., 1500"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
                icon="cash-outline"
              />
            </View>
          </Card>

          {/* Specifications */}
          <Card>
            <Text className="text-neutral-800 font-semibold text-lg mb-4">Specifications</Text>
            <View className="space-y-4">
              <Input
                label="Fuel Type"
                placeholder="e.g., Petrol, Diesel, Electric"
                value={fuel}
                onChangeText={setFuel}
                icon="speedometer-outline"
              />

              <Input
                label="Gear Type"
                placeholder="e.g., Automatic, Manual"
                value={gear}
                onChangeText={setGear}
                icon="settings-outline"
              />

              <Input
                label="Number of Seats"
                placeholder="e.g., 5"
                value={seats}
                onChangeText={setSeats}
                keyboardType="numeric"
                icon="people-outline"
              />
            </View>
          </Card>

          {/* Description */}
          <Card>
            <Text className="text-neutral-800 font-semibold text-lg mb-4">Description</Text>
            <Input
              placeholder="Enter vehicle description..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
          </Card>

          {/* Save Button */}
          <Button 
            title={isEditing ? "Update Vehicle" : "Save Vehicle"} 
            onPress={handleSave} 
            size="lg" 
            loading={loading} 
          />

          <View className="h-4" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
