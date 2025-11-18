// Vehicle Card Component
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';
import Card from './card';

export interface Vehicle {
  id: string;
  name: string;
  type: 'car' | 'bike';
  price: number;
  image: string | ImageSourcePropType;
  fuel: string;
  gear: string;
  rating?: number;
}

interface VehicleCardProps {
  vehicle: Vehicle;
  onPress: () => void;
  className?: string;
}

export default function VehicleCard({ vehicle, onPress, className = '' }: VehicleCardProps) {
  return (
    <TouchableOpacity onPress={onPress} className={className} activeOpacity={0.7}>
      <Card padding="sm">
        <View className="space-y-3">
          {/* Vehicle Image */}
          <View className="w-full h-40 bg-slate-100 rounded-lg overflow-hidden">
            <Image
              source={typeof vehicle.image === 'string' ? { uri: vehicle.image } : vehicle.image}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          {/* Vehicle Info */}
          <View className="space-y-2">
            <View className="flex-row justify-between items-start">
              <Text className="text-neutral-800 font-semibold text-lg flex-1">
                {vehicle.name}
              </Text>
              {vehicle.rating && (
                <View className="flex-row items-center space-x-1">
                  <Ionicons name="star" size={16} color="#fbbf24" />
                  <Text className="text-neutral-600 text-sm">{vehicle.rating}</Text>
                </View>
              )}
            </View>

            {/* Specs */}
            <View className="flex-row space-x-4">
              <View className="flex-row items-center space-x-1">
                <Ionicons name="speedometer-outline" size={16} color="#64748b" />
                <Text className="text-neutral-600 text-sm">{vehicle.fuel}</Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <Ionicons name="settings-outline" size={16} color="#64748b" />
                <Text className="text-neutral-600 text-sm">{vehicle.gear}</Text>
              </View>
            </View>

            {/* Price */}
            <View className="flex-row items-center justify-between pt-2 border-t border-slate-200">
              <View>
                <Text className="text-blue-600 font-bold text-xl">Rs. {vehicle.price}</Text>
                <Text className="text-neutral-500 text-xs">per day</Text>
              </View>
              <View className="bg-blue-600 px-4 py-2 rounded-lg">
                <Text className="text-white font-semibold">Book Now</Text>
              </View>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}
