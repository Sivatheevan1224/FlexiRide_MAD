// Login Screen
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import { signIn } from '../firebase/auth';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Validation
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    
    try {
      // Use Firebase authentication
      const result = await signIn(email, password);
      
      if (result.success && result.userData) {
        console.log('Login successful:', result.userData);
        
        // Navigate based on user role
        if (result.userData.role === 'admin') {
          console.log('Navigating to Admin Dashboard');
          router.replace('/admin/home' as any);
        } else {
          console.log('Navigating to User Home');
          router.replace('/home' as any);
        }
      } else {
        Alert.alert('Login Failed', result.error || 'Invalid credentials');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert('Error', error.message || 'An error occurred during login');
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
        <ScrollView
          className="flex-1 px-6 py-8"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="items-center mb-8 mt-12">
            <View className="bg-blue-600 rounded-full p-4 mb-4">
              <Ionicons name="log-in" size={40} color="#ffffff" />
            </View>
            <Text className="text-neutral-800 text-3xl font-bold">Welcome Back</Text>
            <Text className="text-neutral-600 text-base mt-2 text-center">
              Login to continue your journey
            </Text>
          </View>

          {/* Demo Credentials Card */}
          <View className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <View className="flex-row items-center mb-2">
              <Ionicons name="information-circle" size={20} color="#2563eb" />
              <Text className="text-blue-800 font-semibold text-sm ml-2">Test Credentials</Text>
            </View>
            
            <Text className="text-blue-700 text-xs leading-5 mb-2">
              Use these accounts to test the app:
            </Text>
            
            <View className="bg-white rounded-lg p-3 mb-2">
              <Text className="text-neutral-600 text-xs mb-1">👤 User Account:</Text>
              <Text className="text-neutral-800 font-medium text-sm">user@flexiride.com</Text>
              <Text className="text-neutral-500 text-xs">Password: REMOVED_SECRET</Text>
            </View>
            
            <View className="bg-white rounded-lg p-3">
              <Text className="text-neutral-600 text-xs mb-1">👨‍💼 Admin Account:</Text>
              <Text className="text-neutral-800 font-medium text-sm">admin@flexiride.com</Text>
              <Text className="text-neutral-500 text-xs">Password: REMOVED_SECRET</Text>
            </View>
          </View>

          {/* Form */}
          <View className="space-y-4">
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
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              icon="lock-closed-outline"
            />

            {/* Forgot Password */}
            <TouchableOpacity className="self-end">
              <Text className="text-blue-600 font-medium text-sm">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <View className="pt-4">
              <Button
                title="Login"
                onPress={handleLogin}
                size="lg"
                loading={loading}
              />
            </View>
          </View>

          {/* Signup Link */}
          <View className="flex-row justify-center items-center mt-8">
            <Text className="text-neutral-600 text-base">Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text className="text-blue-600 font-semibold text-base">Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Social Login Options (Optional) */}
          <View className="mt-12">
            <Text className="text-center text-neutral-500 text-sm mb-4">Or continue with</Text>
            <View className="flex-row justify-center space-x-4">
              <TouchableOpacity className="bg-white border border-slate-300 rounded-xl p-3 w-14 h-14 items-center justify-center">
                <Ionicons name="logo-google" size={24} color="#EA4335" />
              </TouchableOpacity>
              <TouchableOpacity className="bg-white border border-slate-300 rounded-xl p-3 w-14 h-14 items-center justify-center">
                <Ionicons name="logo-facebook" size={24} color="#1877F2" />
              </TouchableOpacity>
              <TouchableOpacity className="bg-white border border-slate-300 rounded-xl p-3 w-14 h-14 items-center justify-center">
                <Ionicons name="logo-apple" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
