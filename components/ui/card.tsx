// Reusable Card Component
import React from 'react';
import { Platform, View } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

export default function Card({ children, className = '', padding = 'md' }: CardProps) {
  const getPaddingStyles = (): string => {
    switch (padding) {
      case 'sm':
        return 'p-3';
      case 'md':
        return 'p-4';
      case 'lg':
        return 'p-6';
      default:
        return 'p-4';
    }
  };

  // Use boxShadow for web, shadow classes for native
  const shadowStyle = Platform.OS === 'web' 
    ? { boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }
    : {};

  return (
    <View
      className={`bg-white rounded-xl ${Platform.OS !== 'web' ? 'shadow-md' : ''} ${getPaddingStyles()} ${className}`}
      style={shadowStyle}
    >
      {children}
    </View>
  );
}
