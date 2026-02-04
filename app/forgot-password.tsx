// Forgot Password Screen
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/ui/button';
import Input from '../components/ui/input';
import { sendPasswordReset } from '../firebase/auth';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleReset = async () => {
    // Validation
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    setLoading(true);
    
    try {
      console.log('Attempting to send reset email to:', email);
      const result = await sendPasswordReset(email);
      console.log('Reset email result:', result);
      
      if (result.success) {
        setSubmitted(true);
      } else {
        const errorMessage = result.error || '';
        let message = 'Failed to send reset link.';

        if (errorMessage.includes('auth/user-not-found')) {
          message = 'No account found with this email address.';
        } else if (errorMessage.includes('auth/invalid-email')) {
          message = 'Please enter a valid email address.';
        }

        Alert.alert('Error', message);
      }
    } catch (error: any) {
      console.error('Reset password error:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
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
            onPress={() => router.back()}
            className="bg-blue-100 rounded-full p-3 self-start"
          >
            <Ionicons name="arrow-back" size={24} color="#2563eb" />
          </TouchableOpacity>

          {/* Header */}
          <View className="items-center mb-8 mt-4">
            <View className="bg-blue-600 rounded-full p-4 mb-4">
              <Ionicons name="key" size={40} color="#ffffff" />
            </View>
            <Text className="text-neutral-800 text-3xl font-bold">Forgot Password</Text>
            <Text className="text-neutral-600 text-base mt-2 text-center">
              Enter your email to receive a reset link
            </Text>
          </View>

          {/* Form */}
          {!submitted ? (
            <View>
              <Input
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                icon="mail-outline"
                autoCapitalize="none"
              />

              <View className="mt-4">
                <Button
                  title="Send Reset Link"
                  onPress={handleReset}
                  size="lg"
                  loading={loading}
                />
              </View>
            </View>
          ) : (
            <View className="bg-green-50 p-6 rounded-2xl border border-green-100 items-center">
              <Ionicons name="checkmark-circle" size={48} color="#16a34a" />
              <Text className="text-green-800 text-xl font-bold mt-4 mb-2">Check your email</Text>
              <Text className="text-green-700 text-center mb-6">
                We have sent a password reset link to <Text className="font-semibold">{email}</Text>
              </Text>
              
              <Button
                title="Back to Login"
                onPress={() => router.replace('/login')}
                variant="outline"
                className="w-full"
              />
            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
