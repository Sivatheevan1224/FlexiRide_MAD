// firebase/auth.ts
// Firebase Authentication functions for the mobile app

import {
    createUserWithEmailAndPassword,
    signOut as firebaseSignOut,
    signInWithEmailAndPassword,
    updateProfile,
    User
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './config';

// User role type
export type UserRole = 'user' | 'admin';

// User data interface
export interface UserData {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

/**
 * Sign up a new user
 */
export const signUp = async (email: string, password: string, name: string): Promise<{
  success: boolean;
  user?: User;
  userData?: UserData;
  error?: string;
}> => {
  try {
    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update profile with name
    await updateProfile(user, { displayName: name });
    
    // Determine role (admin if email contains 'admin', otherwise 'user')
    const role: UserRole = email.toLowerCase().includes('admin') ? 'admin' : 'user';
    
    // Create user document in Firestore
    const userData: UserData = {
      uid: user.uid,
      email: email,
      name: name,
      role: role,
      createdAt: new Date().toISOString(),
    };
    
    await setDoc(doc(db, 'users', user.uid), userData);
    
    return { success: true, user, userData };
  } catch (error: any) {
    console.error('Signup error:', error);
    return { success: false, error: error.message || 'Signup failed' };
  }
};

/**
 * Sign in existing user
 */
export const signIn = async (email: string, password: string): Promise<{
  success: boolean;
  user?: User;
  userData?: UserData;
  error?: string;
}> => {
  try {
    // Sign in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Fetch user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (userDoc.exists()) {
      const userData = userDoc.data() as UserData;
      return { success: true, user, userData };
    } else {
      // If user doc doesn't exist, create it (for legacy users)
      const role: UserRole = email.toLowerCase().includes('admin') ? 'admin' : 'user';
      const userData: UserData = {
        uid: user.uid,
        email: user.email || email,
        name: user.displayName || 'User',
        role: role,
        createdAt: new Date().toISOString(),
      };
      await setDoc(doc(db, 'users', user.uid), userData);
      return { success: true, user, userData };
    }
  } catch (error: any) {
    console.error('Login error:', error);
    return { success: false, error: error.message || 'Login failed' };
  }
};

/**
 * Sign out current user
 */
export const signOut = async (): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    await firebaseSignOut(auth);
    return { success: true };
  } catch (error: any) {
    console.error('Signout error:', error);
    return { success: false, error: error.message || 'Signout failed' };
  }
};

/**
 * Get current user data from Firestore
 */
export const getCurrentUserData = async (uid: string): Promise<{
  success: boolean;
  userData?: UserData;
  error?: string;
}> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    
    if (userDoc.exists()) {
      const userData = userDoc.data() as UserData;
      return { success: true, userData };
    } else {
      return { success: false, error: 'User data not found' };
    }
  } catch (error: any) {
    console.error('Get user data error:', error);
    return { success: false, error: error.message || 'Failed to get user data' };
  }
};

/**
 * Get current Firebase auth user
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};
