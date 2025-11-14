// Profile Screen
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/ui/button';
import Card from '../components/ui/card';

export default function ProfileScreen() {
  const router = useRouter();

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&size=200&background=2563eb&color=fff',
  };

  const menuItems = [
    { icon: 'person-outline', label: 'Edit Profile', route: '/edit-profile' },
    { icon: 'card-outline', label: 'Payment Methods', route: '/payment-methods' },
    { icon: 'notifications-outline', label: 'Notifications', route: '/notifications' },
    { icon: 'help-circle-outline', label: 'Help & Support', route: '/support' },
    { icon: 'document-text-outline', label: 'Terms & Conditions', route: '/terms' },
    { icon: 'shield-checkmark-outline', label: 'Privacy Policy', route: '/privacy' },
  ];

  const handleLogout = () => {
    // Add logout logic here
    router.replace('/');
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-blue-600 px-6 pt-6 pb-12 rounded-b-3xl">
          <View className="flex-row items-center space-x-4 mb-8">
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold">Profile</Text>
          </View>

          {/* User Info */}
          <View className="items-center">
            <View className="mb-4">
              <Image
                source={{ uri: user.avatar }}
                className="w-24 h-24 rounded-full border-4 border-white"
              />
              <TouchableOpacity className="absolute bottom-0 right-0 bg-white rounded-full p-2">
                <Ionicons name="camera" size={16} color="#2563eb" />
              </TouchableOpacity>
            </View>
            <Text className="text-white text-xl font-bold">{user.name}</Text>
            <Text className="text-blue-100 text-sm mt-1">{user.email}</Text>
          </View>
        </View>

        <View className="px-6 py-6 space-y-6">
          {/* Stats Card */}
          <Card>
            <View className="flex-row justify-around">
              <View className="items-center">
                <Text className="text-blue-600 font-bold text-2xl">12</Text>
                <Text className="text-neutral-500 text-sm">Total Trips</Text>
              </View>
              <View className="w-px bg-slate-200" />
              <View className="items-center">
                <Text className="text-blue-600 font-bold text-2xl">3</Text>
                <Text className="text-neutral-500 text-sm">Upcoming</Text>
              </View>
              <View className="w-px bg-slate-200" />
              <View className="items-center">
                <Text className="text-blue-600 font-bold text-2xl">4.8</Text>
                <Text className="text-neutral-500 text-sm">Rating</Text>
              </View>
            </View>
          </Card>

          {/* Contact Info */}
          <Card>
            <Text className="text-neutral-800 font-semibold text-lg mb-4">Contact Information</Text>
            <View className="space-y-3">
              <View className="flex-row items-center space-x-3">
                <View className="bg-blue-50 rounded-full p-2">
                  <Ionicons name="mail-outline" size={20} color="#2563eb" />
                </View>
                <View className="flex-1">
                  <Text className="text-neutral-500 text-xs">Email</Text>
                  <Text className="text-neutral-800 font-medium">{user.email}</Text>
                </View>
              </View>
              <View className="flex-row items-center space-x-3">
                <View className="bg-blue-50 rounded-full p-2">
                  <Ionicons name="call-outline" size={20} color="#2563eb" />
                </View>
                <View className="flex-1">
                  <Text className="text-neutral-500 text-xs">Phone</Text>
                  <Text className="text-neutral-800 font-medium">{user.phone}</Text>
                </View>
              </View>
            </View>
          </Card>

          {/* Menu Items */}
          <Card padding="sm">
            <View className="space-y-1">
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => router.push(item.route as any)}
                  className="flex-row items-center justify-between p-3 rounded-lg active:bg-slate-50"
                >
                  <View className="flex-row items-center space-x-3">
                    <Ionicons name={item.icon as any} size={22} color="#64748b" />
                    <Text className="text-neutral-700 font-medium">{item.label}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          {/* Logout Button */}
          <Button
            title="Logout"
            onPress={handleLogout}
            variant="outline"
            size="lg"
            className="border-red-500"
          />

          <View className="h-4" />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="bg-white border-t border-slate-200 px-6 py-3">
        <View className="flex-row justify-between items-center">
          <TouchableOpacity className="items-center" onPress={() => router.push('/home')}>
            <Ionicons name="home" size={24} color="#64748b" />
            <Text className="text-neutral-500 text-xs mt-1">Home</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center" onPress={() => router.push('/my-bookings')}>
            <Ionicons name="calendar" size={24} color="#64748b" />
            <Text className="text-neutral-500 text-xs mt-1">Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center" onPress={() => router.push('/profile')}>
            <Ionicons name="person" size={24} color="#2563eb" />
            <Text className="text-blue-600 text-xs mt-1 font-medium">Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
