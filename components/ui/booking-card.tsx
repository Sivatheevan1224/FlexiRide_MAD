// Booking Card Component
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, View } from 'react-native';
import Card from './card';

export interface Booking {
  id: string;
  vehicleName: string;
  vehicleImage: string;
  pickupDate: string;
  returnDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

interface BookingCardProps {
  booking: Booking;
  className?: string;
}

export default function BookingCard({ booking, className = '' }: BookingCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'confirmed':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <Card padding="md" className={className}>
      <View className="space-y-3">
        {/* Header with Status */}
        <View className="flex-row justify-between items-center">
          <Text className="text-neutral-800 font-semibold text-base">
            {booking.vehicleName}
          </Text>
          <View className={`px-3 py-1 rounded-full ${getStatusColor(booking.status)}`}>
            <Text className={`text-xs font-medium capitalize ${getStatusColor(booking.status).split(' ')[1]}`}>
              {booking.status}
            </Text>
          </View>
        </View>

        {/* Vehicle Info */}
        <View className="flex-row space-x-3">
          <View className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden">
            <Image
              source={{ uri: booking.vehicleImage }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <View className="flex-1 justify-center">
            <Text className="text-blue-600 font-bold text-lg">
              Rs. {booking.totalPrice}
            </Text>
            <Text className="text-neutral-500 text-sm mt-1">
              Total Amount
            </Text>
          </View>
        </View>

        {/* Dates */}
        <View className="flex-row justify-between pt-3 border-t border-slate-200">
          <View className="flex-row items-center space-x-2">
            <Ionicons name="calendar-outline" size={16} color="#64748b" />
            <View>
              <Text className="text-neutral-500 text-xs">Pickup</Text>
              <Text className="text-neutral-700 text-sm font-medium">
                {booking.pickupDate}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center space-x-2">
            <Ionicons name="calendar-outline" size={16} color="#64748b" />
            <View>
              <Text className="text-neutral-500 text-xs">Return</Text>
              <Text className="text-neutral-700 text-sm font-medium">
                {booking.returnDate}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Card>
  );
}
