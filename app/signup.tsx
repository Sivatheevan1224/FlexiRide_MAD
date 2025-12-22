// Signup Screen
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import { useAuth } from '../context/AuthContext';
import { signUp } from '../firebase/auth';

export default function SignupScreen() {
  const router = useRouter();
  const { setSession } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    
    try {
      // Use Firebase authentication
      const result = await signUp(email, password, name);
      
      if (result.success && result.userData && result.user) {
        console.log('Signup successful:', result.userData);
        
        // Set session in AuthContext
        await setSession(result.user, result.userData);
        
        Alert.alert(
          'Success', 
          'Account created successfully!',
          [
            {
              text: 'OK',
              onPress: () => {
                // Navigate based on role
                if (result.userData!.role === 'admin') {
                  router.replace('/admin/home' as any);
                } else {
                  router.replace('/home' as any);
                }
              }
            }
          ]
        );
      } else {
        let message = result.error || 'Failed to create account';
        const errorMessage = result.error || '';
        
        if (errorMessage.includes('auth/email-already-in-use')) {
          message = 'This email is already in use. Please use a different email or login.';
        } else if (errorMessage.includes('auth/weak-password')) {
          message = 'Password should be at least 6 characters.';
        } else if (errorMessage.includes('auth/invalid-email')) {
          message = 'Please enter a valid email address.';
        } else if (errorMessage.includes('auth/network-request-failed')) {
          message = 'Network error. Please check your internet connection.';
        }
        
        Alert.alert('Signup Failed', message);
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      
      let message = 'An error occurred during signup';
      const errorMessage = error.message || '';
      
      if (errorMessage.includes('auth/email-already-in-use')) {
        message = 'This email is already in use. Please use a different email or login.';
      } else if (errorMessage.includes('auth/weak-password')) {
        message = 'Password should be at least 6 characters.';
      } else if (errorMessage.includes('auth/invalid-email')) {
        message = 'Please enter a valid email address.';
      } else if (errorMessage.includes('auth/network-request-failed')) {
        message = 'Network error. Please check your internet connection.';
      }

      Alert.alert('Signup Error', message);
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
              <Ionicons name="person-add" size={40} color="#ffffff" />
            </View>
            <Text className="text-neutral-800 text-3xl font-bold">Create Account</Text>
            <Text className="text-neutral-600 text-base mt-2 text-center">
              Sign up to start your journey
            </Text>
          </View>

          {/* Form */}
          <View>
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
            <View>
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
