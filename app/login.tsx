// Login Screen
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import { useAuth } from '../context/AuthContext';
import { signIn } from '../firebase/auth';

export default function LoginScreen() {
  const router = useRouter();
  const { setSession } = useAuth();
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
      
      if (result.success && result.user && result.userData) {
        console.log('Login successful:', result.userData);
        
        // Save session to AsyncStorage
        await setSession(result.user, result.userData);
        
        // Navigate based on user role
        if (result.userData.role === 'admin') {
          console.log('Navigating to Admin Dashboard');
          router.replace('/admin/home' as any);
        } else {
          console.log('Navigating to User Home');
          router.replace('/home' as any);
        }
      } else {
        const errorMessage = result.error || '';
        let message = 'Invalid email or password.'; // Generic message for safety
        
        if (errorMessage.includes('auth/network-request-failed')) {
          message = 'Network error. Please check your internet connection.';
        } else if (errorMessage.includes('auth/too-many-requests')) {
          message = 'Access blocked due to too many failed attempts. Follow instructions sent to your email or try again later.';
        }
        
        Alert.alert('Login Failed', message);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      let message = 'An error occurred during login';
      const errorMessage = error.message || '';

      if (errorMessage.includes('auth/network-request-failed')) {
        message = 'Network error. Please check your internet connection.';
      } else if (errorMessage.includes('auth/too-many-requests')) {
        message = 'Access blocked due to too many failed attempts. Try again later.';
      } else {
        message = 'Invalid email or password.';
      }

      Alert.alert('Login Failed', message);
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
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.replace('/')}
            className="bg-blue-100 rounded-full p-3 self-start"
          >
            <Ionicons name="arrow-back" size={24} color="#2563eb" />
          </TouchableOpacity>

          {/* Header */}
          <View className="items-center mb-8 mt-4">
            <View className="bg-blue-600 rounded-full p-4 mb-4">
              <Ionicons name="log-in" size={40} color="#ffffff" />
            </View>
            <Text className="text-neutral-800 text-3xl font-bold">Welcome Back</Text>
            <Text className="text-neutral-600 text-base mt-2 text-center">
              Login to continue your journey
            </Text>
          </View>

          {/* Form */}
          <View>
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
            <TouchableOpacity className="self-end" style={{ marginBottom: 16 }}>
              <Text className="text-blue-600 font-medium text-sm">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <View>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
