// Platform-aware Image Component
import React from 'react';
import { ImageSourcePropType, Platform, Image as RNImage, ImageProps as RNImageProps } from 'react-native';

interface PlatformImageProps extends Omit<RNImageProps, 'source'> {
  source: string | ImageSourcePropType;
  fallbackSource?: ImageSourcePropType;
}

export default function PlatformImage({ source, fallbackSource, ...props }: PlatformImageProps) {
  // Handle different image sources for web vs mobile
  const getImageSource = () => {
    if (typeof source === 'string') {
      // URL string - works on all platforms
      return { uri: source };
    } else if (typeof source === 'number') {
      // require() returns number on mobile, works fine
      return source;
    } else if (source && typeof source === 'object' && 'uri' in source) {
      // Already formatted as { uri: string }
      return source;
    } else {
      // Local image (require())
      if (Platform.OS === 'web' && fallbackSource) {
        // Use fallback for web if provided
        return fallbackSource;
      }
      return source;
    }
  };

  return <RNImage {...props} source={getImageSource()} />;
}
