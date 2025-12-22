// Welcome Screen (Main Landing Page)
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, LayoutChangeEvent, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderWidth, setSliderWidth] = useState(400); // Default width

  const slides = [
    {
      image: { uri: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600' },
      title: 'Premium Cars',
      description: 'Choose from luxury and economy cars',
    },
    {
      image: { uri: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600' },
      title: 'Powerful Bikes',
      description: 'Adventure on two wheels',
    },
    {
      image: { uri: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600' },
      title: 'Luxury Fleet',
      description: 'Drive in style and comfort',
    },
  ];

  // Get actual container width on layout
  const onSliderLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setSliderWidth(width);
  };

  // Auto-scroll slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % slides.length;
        scrollViewRef.current?.scrollTo({
          x: nextIndex * sliderWidth,
          animated: true,
        });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [sliderWidth]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Image Slider */}
        <View className="h-80 bg-slate-100" onLayout={onSliderLayout}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / sliderWidth);
              setCurrentIndex(index);
            }}
          >
            {slides.map((slide, index) => (
              <View key={index} className="relative" style={{ width: sliderWidth, height: 320 }}>
                <Image
                  source={slide.image}
                  style={{ width: sliderWidth, height: 320 }}
                  resizeMode="cover"
                />
                {/* Overlay */}
                <View className="absolute inset-0 bg-black/30 justify-end p-6">
                  <Text className="text-white text-3xl font-bold mb-2">{slide.title}</Text>
                  <Text className="text-white/90 text-base">{slide.description}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Pagination Dots */}
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center" style={{ gap: 8 }}>
            {slides.map((_, index) => (
              <View
                key={index}
                className={`h-2 rounded-full ${
                  currentIndex === index ? 'bg-white w-8' : 'bg-white/50 w-2'
                }`}
              />
            ))}
          </View>
        </View>

        {/* Header with Logo */}
        <View className="px-6 pt-8 pb-6 items-center border-b border-slate-200">
          <View className="bg-blue-600 rounded-full p-4 mb-3">
            <Ionicons name="car-sport" size={40} color="#ffffff" />
          </View>
          <Text className="text-neutral-800 text-3xl font-bold mb-1">FlexiRide</Text>
          <Text className="text-neutral-600 text-sm text-center">
            Premium Car & Bike Rental Service
          </Text>
        </View>

        {/* Main Content */}
        <View className="px-6 py-6">
          {/* Welcome Message */}
          <View className="mb-6">
            <Text className="text-neutral-800 text-xl font-bold mb-2 text-center">
              Welcome to FlexiRide
            </Text>
            <Text className="text-neutral-600 text-sm text-center leading-5">
              Your trusted partner for hassle-free vehicle rentals
            </Text>
          </View>

          {/* Features */}
          <View className="mb-6">
            <View className="flex-row items-center bg-blue-50 p-3 rounded-xl" style={{ marginBottom: 12 }}>
              <View className="bg-blue-600 rounded-full p-2.5" style={{ marginRight: 12 }}>
                <Ionicons name="car-sport" size={20} color="#ffffff" />
              </View>
              <View className="flex-1">
                <Text className="text-neutral-800 font-semibold text-sm">Wide Selection</Text>
                <Text className="text-neutral-600 text-xs">Cars and bikes for every need</Text>
              </View>
            </View>

            <View className="flex-row items-center bg-green-50 p-3 rounded-xl" style={{ marginBottom: 12 }}>
              <View className="bg-green-600 rounded-full p-2.5" style={{ marginRight: 12 }}>
                <Ionicons name="shield-checkmark" size={20} color="#ffffff" />
              </View>
              <View className="flex-1">
                <Text className="text-neutral-800 font-semibold text-sm">Safe & Secure</Text>
                <Text className="text-neutral-600 text-xs">All vehicles are insured</Text>
              </View>
            </View>

            <View className="flex-row items-center bg-purple-50 p-3 rounded-xl" style={{ marginBottom: 12 }}>
              <View className="bg-purple-600 rounded-full p-2.5" style={{ marginRight: 12 }}>
                <Ionicons name="cash" size={20} color="#ffffff" />
              </View>
              <View className="flex-1">
                <Text className="text-neutral-800 font-semibold text-sm">Best Prices</Text>
                <Text className="text-neutral-600 text-xs">Affordable rental rates</Text>
              </View>
            </View>

            <View className="flex-row items-center bg-orange-50 p-3 rounded-xl">
              <View className="bg-orange-600 rounded-full p-2.5" style={{ marginRight: 12 }}>
                <Ionicons name="time" size={20} color="#ffffff" />
              </View>
              <View className="flex-1">
                <Text className="text-neutral-800 font-semibold text-sm">24/7 Support</Text>
                <Text className="text-neutral-600 text-xs">Always here to help you</Text>
              </View>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={() => router.push('/login')}
            className="bg-blue-600 py-4 rounded-xl active:opacity-80 mb-4"
            style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Get Started
            </Text>
          </TouchableOpacity>

          {/* Signup Link */}
          <View className="flex-row justify-center items-center mb-4">
            <Text className="text-neutral-600 text-sm">Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text className="text-blue-600 font-semibold text-sm">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
