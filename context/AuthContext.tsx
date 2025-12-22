/**
 * AUTH CONTEXT
 * =============
 * 
 * This context manages user authentication state across the app.
 * It uses AsyncStorage to persist session data so users stay logged in
 * even after closing the app.
 * 
 * FEATURES:
 * - Persists login session using AsyncStorage
 * - Automatically checks if user is logged in on app start
 * - Provides user data (including role) to all screens
 * - Handles logout by clearing session
 * - Protects routes based on auth state
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useSegments } from 'expo-router';
import { signOut as firebaseSignOut, onAuthStateChanged, User } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { getCurrentUserData, UserData } from '../firebase/auth';
import { auth } from '../firebase/config';

// Session storage keys
const SESSION_KEY = '@flexiride_session';
const USER_DATA_KEY = '@flexiride_user_data';

// Auth context type
interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  setSession: (user: User, userData: UserData) => Promise<void>;
  clearSession: () => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  // Save session to AsyncStorage
  const setSession = async (firebaseUser: User, data: UserData) => {
    try {
      await AsyncStorage.setItem(SESSION_KEY, firebaseUser.uid);
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(data));
      setUser(firebaseUser);
      setUserData(data);
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  // Clear session from AsyncStorage
  const clearSession = async () => {
    try {
      await AsyncStorage.removeItem(SESSION_KEY);
      await AsyncStorage.removeItem(USER_DATA_KEY);
      setUser(null);
      setUserData(null);
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  };

  // Check for existing session on app load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const savedUserData = await AsyncStorage.getItem(USER_DATA_KEY);
        
        if (savedUserData) {
          const parsedUserData = JSON.parse(savedUserData) as UserData;
          setUserData(parsedUserData);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };

    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        
        // Try to get user data from storage first, then Firebase
        let currentData: UserData | null = null;
        const savedUserData = await AsyncStorage.getItem(USER_DATA_KEY);
        
        if (savedUserData) {
          currentData = JSON.parse(savedUserData);
        } else {
          // Fetch from Firestore
          const result = await getCurrentUserData(firebaseUser.uid);
          if (result.success && result.userData) {
            currentData = result.userData;
          }
        }

        // Check if account is disabled
        if (currentData && currentData.isDisabled) {
           console.log('Account is disabled. Logging out.');
           setUser(null);
           setUserData(null);
           await clearSession();
           await firebaseSignOut(auth);
           Alert.alert('Account Disabled', 'Your account has been disabled by an administrator.');
        } else if (currentData) {
           setUser(firebaseUser);
           setUserData(currentData);
           await setSession(firebaseUser, currentData);
        }

      } else {
        // User is signed out
        setUser(null);
        setUserData(null);
        await clearSession();
      }
      setIsLoading(false);
    });

    checkSession();

    return () => unsubscribe();
  }, []);

  // Handle route protection
  useEffect(() => {
    if (isLoading) return;

    const currentSegment = segments[0] as string | undefined;
    const inAuthGroup = currentSegment === 'login' || currentSegment === 'signup';
    const inAdminGroup = currentSegment === 'admin';
    const inUserGroup = currentSegment === 'home' || currentSegment === 'profile' || 
                        currentSegment === 'my-bookings' || currentSegment === 'vehicle-details' ||
                        currentSegment === 'booking' || currentSegment === 'booking-success' ||
                        currentSegment === 'edit-profile' || currentSegment === 'support';
    const inWelcome = currentSegment === undefined || currentSegment === 'index' || currentSegment === '(index)';

    if (!user && !userData) {
      // Not logged in - redirect to welcome if trying to access protected routes
      if (inAdminGroup || inUserGroup) {
        router.replace('/');
      }
    } else if (userData) {
      // Logged in - redirect based on role
      if (inWelcome || inAuthGroup) {
        // Redirect to appropriate home based on role
        if (userData.role === 'admin') {
          router.replace('/admin/home');
        } else {
          router.replace('/home');
        }
      } else if (inAdminGroup && userData.role !== 'admin') {
        // Non-admin trying to access admin routes
        router.replace('/home');
      }
    }
  }, [user, userData, segments, isLoading]);

  const value: AuthContextType = {
    user,
    userData,
    isLoading,
    isLoggedIn: !!user && !!userData,
    setSession,
    clearSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
