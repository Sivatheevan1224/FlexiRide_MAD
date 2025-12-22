// Help & Support Screen
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Linking, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/ui/button';
import Card from '../components/ui/card';
import Input from '../components/ui/input';

export default function SupportScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 'booking', label: 'Booking Issue', icon: 'calendar-outline' },
    { id: 'payment', label: 'Payment Problem', icon: 'card-outline' },
    { id: 'vehicle', label: 'Vehicle Issue', icon: 'car-sport-outline' },
    { id: 'account', label: 'Account Help', icon: 'person-outline' },
    { id: 'other', label: 'Other', icon: 'help-circle-outline' },
  ];

  const contactOptions = [
    {
      icon: 'mail',
      label: 'Email Support',
      value: 'support@flexiride.com',
      action: () => Linking.openURL('mailto:support@flexiride.com'),
      color: 'bg-blue-500',
    },
    {
      icon: 'call',
      label: 'Phone Support',
      value: '+94 11 234 5678',
      action: () => Linking.openURL('tel:+94112345678'),
      color: 'bg-green-500',
    },
    {
      icon: 'logo-whatsapp',
      label: 'WhatsApp',
      value: '+94 77 123 4567',
      action: () => Linking.openURL('https://wa.me/94771234567'),
      color: 'bg-emerald-500',
    },
  ];

  const faqItems = [
    {
      question: 'How do I cancel my booking?',
      answer: 'Go to My Bookings, select the booking, and tap Cancel. Refunds are processed within 5-7 business days.',
    },
    {
      question: 'What documents do I need?',
      answer: 'You need a valid driving license, ID proof (National ID/Passport), and a credit/debit card for payment.',
    },
    {
      question: 'Can I extend my rental period?',
      answer: 'Yes, you can extend your rental through the app if the vehicle is available. Additional charges will apply.',
    },
    {
      question: 'What if the vehicle breaks down?',
      answer: 'Contact our 24/7 support immediately. We provide roadside assistance and replacement vehicles when needed.',
    },
  ];

  const handleSubmit = async () => {
    if (!selectedCategory) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    if (!message.trim()) {
      Alert.alert('Error', 'Please enter your message');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert(
        'Success',
        'Your message has been sent. Our support team will contact you within 24 hours.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    }, 1500);
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
            <View className="flex-row items-center mb-4" style={{ gap: 16 }}>
              <TouchableOpacity onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#ffffff" />
              </TouchableOpacity>
              <Text className="text-white text-2xl font-bold">Help & Support</Text>
            </View>
            <Text className="text-blue-100 text-sm">
              We're here to help! Choose how you'd like to get in touch.
            </Text>
          </View>

          <View className="px-6 py-6" style={{ gap: 24 }}>
            {/* Quick Contact Options */}
            <View>
              <Text className="text-neutral-800 text-lg font-bold mb-3">Contact Us</Text>
              <View style={{ gap: 12 }}>
                {contactOptions.map((option, index) => (
                  <TouchableOpacity key={index} onPress={option.action}>
                    <Card>
                      <View className="flex-row items-center" style={{ gap: 16 }}>
                        <View className={`${option.color} w-12 h-12 rounded-xl items-center justify-center`}>
                          <Ionicons name={option.icon as any} size={24} color="#ffffff" />
                        </View>
                        <View className="flex-1">
                          <Text className="text-neutral-800 font-semibold text-base">
                            {option.label}
                          </Text>
                          <Text className="text-neutral-500 text-sm">{option.value}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
                      </View>
                    </Card>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Send Message */}
            <Card>
              <Text className="text-neutral-800 font-semibold text-lg mb-4">Send us a Message</Text>
              
              {/* Category Selection */}
              <View className="mb-4">
                <Text className="text-neutral-700 font-medium text-base mb-2">Category</Text>
                <View className="flex-row flex-wrap -mx-1">
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category.id}
                      onPress={() => setSelectedCategory(category.id)}
                      className={`m-1 px-3 py-2 rounded-lg border ${
                        selectedCategory === category.id
                          ? 'bg-blue-50 border-blue-600'
                          : 'bg-white border-slate-300'
                      }`}
                    >
                      <View className="flex-row items-center" style={{ gap: 4 }}>
                        <Ionicons
                          name={category.icon as any}
                          size={16}
                          color={selectedCategory === category.id ? '#2563eb' : '#64748b'}
                        />
                        <Text
                          className={`text-sm ${
                            selectedCategory === category.id ? 'text-blue-600 font-medium' : 'text-neutral-600'
                          }`}
                        >
                          {category.label}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Message Input */}
              <Input
                label="Message"
                placeholder="Describe your issue or question..."
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
              />

              <View className="mt-4">
                <Button title="Send Message" onPress={handleSubmit} loading={loading} />
              </View>
            </Card>

            {/* FAQ */}
            <View>
              <Text className="text-neutral-800 text-lg font-bold mb-3">
                Frequently Asked Questions
              </Text>
              <View style={{ gap: 12 }}>
                {faqItems.map((item, index) => (
                  <Card key={index}>
                    <View className="flex-row items-start" style={{ gap: 12 }}>
                      <View className="bg-blue-50 rounded-full p-2 mt-1">
                        <Ionicons name="help-circle" size={20} color="#2563eb" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-neutral-800 font-semibold text-base mb-2">
                          {item.question}
                        </Text>
                        <Text className="text-neutral-600 text-sm leading-5">
                          {item.answer}
                        </Text>
                      </View>
                    </View>
                  </Card>
                ))}
              </View>
            </View>

            {/* Business Hours */}
            <Card>
              <View className="flex-row items-start" style={{ gap: 12 }}>
                <View className="bg-green-50 rounded-full p-2">
                  <Ionicons name="time" size={20} color="#22c55e" />
                </View>
                <View className="flex-1">
                  <Text className="text-neutral-800 font-semibold text-base mb-2">
                    Support Hours
                  </Text>
                  <Text className="text-neutral-600 text-sm">
                    Monday - Friday: 8:00 AM - 8:00 PM{'\n'}
                    Saturday - Sunday: 9:00 AM - 6:00 PM{'\n'}
                    Emergency Support: 24/7
                  </Text>
                </View>
              </View>
            </Card>

            <View className="h-4" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
