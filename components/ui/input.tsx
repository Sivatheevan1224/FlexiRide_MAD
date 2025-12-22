// Reusable Input Component
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  multiline?: boolean;
  numberOfLines?: number;
  className?: string;
}

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  icon,
  multiline = false,
  numberOfLines = 1,
  className = '',
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={className} style={{ marginBottom: 16 }}>
      {label && <Text className="text-neutral-700 font-medium text-base" style={{ marginBottom: 8 }}>{label}</Text>}
      
      <View className="relative">
        {icon && (
          <View className="absolute left-4 top-4 z-10">
            <Ionicons name={icon} size={20} color="#64748b" />
          </View>
        )}
        
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          className={`bg-white border border-slate-300 rounded-xl px-4 py-3.5 text-neutral-800 ${
            icon ? 'pl-12' : ''
          } ${multiline ? 'h-24' : ''} ${error ? 'border-red-500' : ''}`}
        />
        
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4"
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#64748b"
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text className="text-red-500 text-sm">{error}</Text>}
    </View>
  );
}
