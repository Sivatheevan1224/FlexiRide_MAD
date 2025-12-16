// Booking Screen
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/ui/button';
import Card from '../components/ui/card';
import { getCurrentUser } from '../firebase/auth';
import { checkAvailability, createBooking } from '../firebase/bookings';

export default function BookingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  // Data from params
  const vehicleId = params.id as string || '';
  const vehicleName = params.name || 'Honda City';
  const pricePerDay = Number(params.price) || 1500;
  
  let vehicleImage = 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400';
  try {
    if (params.image) {
      vehicleImage = decodeURIComponent(params.image as string);
    }
  } catch (error) {
    console.log('Error decoding image URL:', error);
  }

  // Date states - start with today
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to midnight
  
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const [pickupDate, setPickupDate] = useState(today);
  const [returnDate, setReturnDate] = useState(nextWeek);
  const [showPickupPicker, setShowPickupPicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);

  // Payment states
  const [showPayment, setShowPayment] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const formatDateISO = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const numberOfDays = Math.max(1, Math.ceil((returnDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24)));
  const totalPrice = pricePerDay * numberOfDays;

  const onPickupDateChange = (event: any, selectedDate?: Date) => {
    console.log('Pickup date change:', event.type, selectedDate);
    
    if (Platform.OS === 'android') {
      setShowPickupPicker(false);
    }
    
    if (selectedDate && event.type !== 'dismissed') {
      setPickupDate(selectedDate);
      // If return date is before or same as new pickup date, adjust it
      if (selectedDate >= returnDate) {
        const newReturnDate = new Date(selectedDate);
        newReturnDate.setDate(selectedDate.getDate() + 7);
        setReturnDate(newReturnDate);
      }
      if (Platform.OS === 'ios') {
        setShowPickupPicker(false);
      }
    } else if (event.type === 'dismissed') {
      // User cancelled
      if (Platform.OS === 'ios') {
        setShowPickupPicker(false);
      }
    }
  };

  const onReturnDateChange = (event: any, selectedDate?: Date) => {
    console.log('Return date change:', event.type, selectedDate);
    
    if (Platform.OS === 'android') {
      setShowReturnPicker(false);
    }
    
    if (selectedDate && event.type !== 'dismissed') {
      if (selectedDate > pickupDate) {
        setReturnDate(selectedDate);
        if (Platform.OS === 'ios') {
          setShowReturnPicker(false);
        }
      } else {
        Alert.alert('Invalid Date', 'Return date must be after pickup date');
        if (Platform.OS === 'ios') {
          setShowReturnPicker(false);
        }
      }
    } else if (event.type === 'dismissed') {
      // User cancelled
      if (Platform.OS === 'ios') {
        setShowReturnPicker(false);
      }
    }
  };

  const handleProceedToPayment = async () => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      Alert.alert('Error', 'Please login to book a vehicle');
      router.push('/login');
      return;
    }

    if (!vehicleId) {
      Alert.alert('Error', 'Invalid vehicle selected');
      return;
    }

    setLoading(true);

    try {
      // Check availability first
      const availability = await checkAvailability(vehicleId, formatDateISO(pickupDate), formatDateISO(returnDate));
      
      if (!availability.available) {
        Alert.alert('Not Available', 'Vehicle is not available for selected dates. Please choose different dates.');
        setLoading(false);
        return;
      }

      setLoading(false);
      setShowPayment(true);
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Error', error.message || 'An error occurred');
    }
  };

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted.substring(0, 19); // Max 16 digits + 3 spaces
  };

  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/\//g, '');
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
    }
    return cleaned;
  };

  const handlePayment = async () => {
    // Validate payment details
    if (!cardNumber || cardNumber.replace(/\s/g, '').length !== 16) {
      Alert.alert('Invalid Card', 'Please enter a valid 16-digit card number');
      return;
    }
    if (!cardName) {
      Alert.alert('Invalid Name', 'Please enter cardholder name');
      return;
    }
    if (!expiryDate || expiryDate.length !== 5) {
      Alert.alert('Invalid Expiry', 'Please enter expiry date (MM/YY)');
      return;
    }
    if (!cvv || cvv.length !== 3) {
      Alert.alert('Invalid CVV', 'Please enter 3-digit CVV');
      return;
    }

    setLoading(true);

    try {
      const currentUser = getCurrentUser();
      
      // Create booking after payment validation
      const result = await createBooking({
        userId: currentUser!.uid,
        vehicleId: vehicleId,
        vehicleName: vehicleName as string,
        pickupDate: formatDateISO(pickupDate),
        returnDate: formatDateISO(returnDate),
        totalPrice: totalPrice + 100, // Including service fee
      });

      setLoading(false);

      if (result.success) {
        Alert.alert('Payment Successful', 'Your booking has been confirmed!');
        router.replace('/booking-success');
      } else {
        Alert.alert('Booking Failed', result.error || 'Failed to create booking');
      }
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Error', error.message || 'An error occurred');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-blue-600 px-6 pt-6 pb-8 rounded-b-3xl">
          <View className="flex-row items-center mb-4" style={{ gap: 16 }}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold">Confirm Booking</Text>
          </View>
        </View>

        <View className="px-6 py-6" style={{ gap: 24 }}>
          {/* Vehicle Info Card */}
          <Card>
            <Text className="text-neutral-800 font-semibold text-lg mb-4">Vehicle Details</Text>
            <View className="flex-row" style={{ gap: 16 }}>
              <View className="w-24 h-24 rounded-lg bg-slate-100 overflow-hidden">
                <Image
                  source={{ uri: vehicleImage }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <View className="flex-1 justify-center">
                <Text className="text-neutral-800 font-semibold text-lg">{vehicleName}</Text>
                <Text className="text-blue-600 font-bold text-xl mt-1">
                  Rs. {pricePerDay}/day
                </Text>
              </View>
            </View>
          </Card>

          {/* Booking Details */}
          <Card>
            <Text className="text-neutral-800 font-semibold text-lg mb-4">Booking Details</Text>
            <View style={{ gap: 12 }}>
              {/* Pickup Date */}
              <TouchableOpacity 
                onPress={() => setShowPickupPicker(true)}
                activeOpacity={0.7}
                className="flex-row justify-between items-center py-3 px-4 bg-blue-50 rounded-lg border-2 border-blue-200"
              >
                <View className="flex-row items-center" style={{ gap: 12 }}>
                  <Ionicons name="calendar" size={22} color="#2563eb" />
                  <View>
                    <Text className="text-neutral-500 text-xs mb-1">Pickup Date</Text>
                    <Text className="text-neutral-800 font-semibold text-base">{formatDate(pickupDate)}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-down" size={20} color="#2563eb" />
              </TouchableOpacity>

              {showPickupPicker && (
                <DateTimePicker
                  value={pickupDate}
                  mode="date"
                  display="default"
                  onChange={onPickupDateChange}
                  minimumDate={new Date()}
                  maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                />
              )}

              {/* Return Date */}
              <TouchableOpacity 
                onPress={() => setShowReturnPicker(true)}
                activeOpacity={0.7}
                className="flex-row justify-between items-center py-3 px-4 bg-blue-50 rounded-lg border-2 border-blue-200"
              >
                <View className="flex-row items-center" style={{ gap: 12 }}>
                  <Ionicons name="calendar" size={22} color="#2563eb" />
                  <View>
                    <Text className="text-neutral-500 text-xs mb-1">Return Date</Text>
                    <Text className="text-neutral-800 font-semibold text-base">{formatDate(returnDate)}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-down" size={20} color="#2563eb" />
              </TouchableOpacity>

              {showReturnPicker && (
                <DateTimePicker
                  value={returnDate}
                  mode="date"
                  display="default"
                  onChange={onReturnDateChange}
                  minimumDate={new Date(pickupDate.getTime() + 86400000)}
                  maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                />
              )}

              <View className="flex-row justify-between items-center py-2">
                <View className="flex-row items-center" style={{ gap: 12 }}>
                  <Ionicons name="time-outline" size={20} color="#2563eb" />
                  <Text className="text-neutral-600">Duration</Text>
                </View>
                <Text className="text-neutral-800 font-semibold">{numberOfDays} days</Text>
              </View>
            </View>
          </Card>

          {/* Price Breakdown */}
          <Card>
            <Text className="text-neutral-800 font-semibold text-lg mb-4">Price Breakdown</Text>
            <View style={{ gap: 12 }}>
              <View className="flex-row justify-between items-center">
                <Text className="text-neutral-600">Rental ({numberOfDays} days)</Text>
                <Text className="text-neutral-800 font-medium">
                  Rs. {pricePerDay} × {numberOfDays} days
                </Text>
                <Text className="text-neutral-800 font-medium">Rs. {pricePerDay * numberOfDays}</Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-neutral-600">Service Fee</Text>
                <Text className="text-neutral-800 font-medium">Rs. 100</Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-neutral-600">Insurance</Text>
                <Text className="text-green-600 font-medium">Included</Text>
              </View>

              <View className="border-t border-slate-200 pt-3 mt-2">
                <View className="flex-row justify-between items-center">
                  <Text className="text-neutral-800 font-bold text-lg">Total Amount</Text>
                  <Text className="text-blue-600 font-bold text-2xl">
                    Rs. {totalPrice + 100}
                  </Text>
                </View>
              </View>
            </View>
          </Card>

          {/* Payment Method */}
          {!showPayment ? (
            <View style={{ gap: 24 }}>
              <Card>
                <Text className="text-neutral-800 font-semibold text-lg mb-4">Payment Method</Text>
                <View className="flex-row items-center justify-between bg-slate-50 rounded-lg p-4">
                  <View className="flex-row items-center" style={{ gap: 12 }}>
                    <Ionicons name="card-outline" size={24} color="#2563eb" />
                    <View>
                      <Text className="text-neutral-800 font-medium">Credit/Debit Card</Text>
                      <Text className="text-neutral-500 text-sm">Pay securely</Text>
                    </View>
                  </View>
                  <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                </View>
              </Card>

              {/* Terms */}
              <View className="bg-blue-50 rounded-xl p-4">
                <View className="flex-row items-start" style={{ gap: 8 }}>
                  <Ionicons name="information-circle" size={20} color="#2563eb" />
                  <Text className="text-neutral-600 text-sm flex-1">
                    By proceeding, you agree to our terms and conditions. Cancellation charges may apply.
                  </Text>
                </View>
              </View>

              {/* Proceed Button */}
              <Button
                title="Proceed to Payment"
                onPress={handleProceedToPayment}
                size="lg"
                loading={loading}
              />
            </View>
          ) : (
            <View style={{ gap: 24 }}>
              {/* Payment Form */}
              <Card>
                <View className="flex-row items-center justify-between mb-4">
                  <Text className="text-neutral-800 font-semibold text-lg">Payment Details</Text>
                  <TouchableOpacity onPress={() => setShowPayment(false)}>
                    <Text className="text-blue-600 font-medium">Back</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ gap: 16 }}>
                  {/* Card Number */}
                  <View>
                    <Text className="text-neutral-700 font-medium mb-2">Card Number</Text>
                    <View className="flex-row items-center bg-slate-50 border border-slate-300 rounded-lg px-4 py-3">
                      <Ionicons name="card-outline" size={20} color="#64748b" />
                      <TextInput
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                        keyboardType="numeric"
                        maxLength={19}
                        className="flex-1 ml-3 text-neutral-800"
                      />
                    </View>
                  </View>

                  {/* Card Holder Name */}
                  <View>
                    <Text className="text-neutral-700 font-medium mb-2">Cardholder Name</Text>
                    <View className="flex-row items-center bg-slate-50 border border-slate-300 rounded-lg px-4 py-3">
                      <Ionicons name="person-outline" size={20} color="#64748b" />
                      <TextInput
                        placeholder="JOHN DOE"
                        value={cardName}
                        onChangeText={(text) => setCardName(text.toUpperCase())}
                        autoCapitalize="characters"
                        className="flex-1 ml-3 text-neutral-800"
                      />
                    </View>
                  </View>

                  {/* Expiry and CVV */}
                  <View className="flex-row" style={{ gap: 12 }}>
                    <View className="flex-1">
                      <Text className="text-neutral-700 font-medium mb-2">Expiry Date</Text>
                      <View className="flex-row items-center bg-slate-50 border border-slate-300 rounded-lg px-4 py-3">
                        <Ionicons name="calendar-outline" size={20} color="#64748b" />
                        <TextInput
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChangeText={(text) => setExpiryDate(formatExpiry(text))}
                          keyboardType="numeric"
                          maxLength={5}
                          className="flex-1 ml-3 text-neutral-800"
                        />
                      </View>
                    </View>

                    <View className="flex-1">
                      <Text className="text-neutral-700 font-medium mb-2">CVV</Text>
                      <View className="flex-row items-center bg-slate-50 border border-slate-300 rounded-lg px-4 py-3">
                        <Ionicons name="lock-closed-outline" size={20} color="#64748b" />
                        <TextInput
                          placeholder="123"
                          value={cvv}
                          onChangeText={setCvv}
                          keyboardType="numeric"
                          maxLength={3}
                          secureTextEntry
                          className="flex-1 ml-3 text-neutral-800"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </Card>

              {/* Payment Amount */}
              <View className="bg-blue-600 rounded-xl p-4">
                <View className="flex-row justify-between items-center">
                  <View>
                    <Text className="text-blue-100 text-sm">Total Amount to Pay</Text>
                    <Text className="text-white text-3xl font-bold mt-1">Rs. {totalPrice + 100}</Text>
                  </View>
                  <Ionicons name="shield-checkmark" size={48} color="#ffffff" opacity={0.3} />
                </View>
              </View>

              {/* Pay Button */}
              <Button
                title={`Pay Rs. ${totalPrice + 100}`}
                onPress={handlePayment}
                size="lg"
                loading={loading}
              />
            </View>
          )}

          <View className="h-4" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
