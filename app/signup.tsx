// Signup Screen
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/ui/button';
import Input from '../components/ui/input';

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    
    // Demo signup logic - In production, replace with actual registration
    setTimeout(() => {
      setLoading(false);
      // After signup, direct to user home (normal user flow)
      router.replace('/home' as any);
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-6 py-8"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="items-center mb-8">
            <View className="bg-blue-600 rounded-full p-4 mb-4">
              <Ionicons name="person-add" size={40} color="#ffffff" />
            </View>
            <Text className="text-neutral-800 text-3xl font-bold">Create Account</Text>
            <Text className="text-neutral-600 text-base mt-2 text-center">
              Sign up to start your journey
            </Text>
          </View>

          {/* Demo Info Card */}
          <View className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
            <View className="flex-row items-center mb-2">
              <Ionicons name="checkmark-circle" size={20} color="#22c55e" />
              <Text className="text-green-800 font-semibold text-sm ml-2">Quick Demo</Text>
            </View>
            <Text className="text-green-700 text-xs leading-5">
              For demo purposes, any credentials will work! After signup, you'll be logged in as a normal user. To test admin features, use the login page with admin credentials.
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
              icon="person-outline"
            />

            <Input
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              icon="mail-outline"
            />

            <Input
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              icon="lock-closed-outline"
            />

            <Input
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              icon="lock-closed-outline"
            />

            {/* Signup Button */}
            <View className="pt-4">
              <Button
                title="Create Account"
                onPress={handleSignup}
                size="lg"
                loading={loading}
              />
            </View>
          </View>

          {/* Login Link */}
          <View className="flex-row justify-center items-center mt-8">
            <Text className="text-neutral-600 text-base">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text className="text-blue-600 font-semibold text-base">Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
