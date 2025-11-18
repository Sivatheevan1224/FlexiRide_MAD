// Edit Profile Screen
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/ui/button';
import Card from '../components/ui/card';
import Input from '../components/ui/input';
import { getCurrentUser, getCurrentUserData } from '../firebase/auth';
import { db } from '../firebase/config';

export default function EditProfileScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      const result = await getCurrentUserData(currentUser.uid);
      if (result.success && result.userData) {
        setName(result.userData.name || '');
        setEmail(result.userData.email || '');
        setAvatar(`https://ui-avatars.com/api/?name=${encodeURIComponent(result.userData.name)}&size=200&background=2563eb&color=fff`);
      }
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    const currentUser = getCurrentUser();
    if (!currentUser) {
      Alert.alert('Error', 'User not found');
      return;
    }

    setLoading(true);
    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        name: name.trim(),
        updatedAt: new Date().toISOString()
      });

      Alert.alert('Success', 'Profile updated successfully', [
        {
          text: 'OK',
          onPress: () => router.back()
        }
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="bg-blue-600 px-6 pt-6 pb-8 rounded-b-3xl">
            <View className="flex-row items-center space-x-4">
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#ffffff" />
              </TouchableOpacity>
              <Text className="text-white text-2xl font-bold">Edit Profile</Text>
            </View>
          </View>

          <View className="px-6 py-6 space-y-6">
            {/* Avatar */}
            <Card>
              <View className="items-center py-4">
                <View className="mb-4">
                  <Image
                    source={{ uri: avatar }}
                    className="w-32 h-32 rounded-full border-4 border-blue-100"
                  />
                </View>
                <Text className="text-neutral-500 text-sm">Avatar generated from your name</Text>
              </View>
            </Card>

            {/* Form */}
            <Card>
              <Text className="text-neutral-800 font-semibold text-lg mb-4">Personal Information</Text>
              <View className="space-y-4">
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={name}
                  onChangeText={setName}
                  icon="person-outline"
                />

                <View>
                  <Text className="text-neutral-700 font-medium text-base mb-2">Email Address</Text>
                  <View className="bg-slate-100 rounded-xl px-4 py-3 flex-row items-center space-x-3">
                    <Ionicons name="mail-outline" size={20} color="#64748b" />
                    <Text className="flex-1 text-neutral-600">{email}</Text>
                    <View className="bg-slate-200 px-2 py-1 rounded">
                      <Text className="text-neutral-600 text-xs">Verified</Text>
                    </View>
                  </View>
                  <Text className="text-neutral-500 text-xs mt-1">Email cannot be changed</Text>
                </View>
              </View>
            </Card>

            {/* Save Button */}
            <Button
              title="Save Changes"
              onPress={handleSave}
              size="lg"
              loading={loading}
            />

            <View className="h-4" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
