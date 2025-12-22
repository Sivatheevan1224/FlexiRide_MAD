/**
 * FIREBASE AUTHENTICATION (Client SDK)
 * =====================================
 * 
 * PURPOSE: Handle user authentication on the MOBILE APP side.
 * This file manages signup, login, logout, and user data retrieval.
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │                         AUTHENTICATION FLOW                                │
 * ├─────────────────────────────────────────────────────────────────────────────┤
 * │                                                                             │
 * │   SIGNUP:                                                                   │
 * │   1. User enters email, password, name                                      │
 * │   2. Firebase Auth creates user account                                     │
 * │   3. We create a user document in Firestore (with role, name, etc.)         │
 * │   4. User is automatically logged in                                        │
 * │                                                                             │
 * │   LOGIN:                                                                    │
 * │   1. User enters email, password                                           │
 * │   2. Firebase Auth verifies credentials                                     │
 * │   3. We fetch user data from Firestore (to get role: user/admin)           │
 * │   4. App redirects based on role (user → home, admin → admin/home)         │
 * │                                                                             │
 * │   LOGOUT:                                                                   │
 * │   1. Firebase Auth signs out user                                          │
 * │   2. App redirects to login screen                                         │
 * │                                                                             │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * WHY STORE USER DATA IN FIRESTORE?
 * - Firebase Auth only stores: email, password, displayName, photoURL
 * - We need extra fields: role (user/admin), createdAt, etc.
 * - Firestore allows us to store any custom fields
 * 
 * SECURITY:
 * - Passwords are NEVER stored in Firestore (only in Firebase Auth)
 * - Firebase Auth handles password hashing and security
 * - Client SDK respects Security Rules
 */

import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
  updateProfile,
  User
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './config';

// User role type - determines what screens user can access
export type UserRole = 'user' | 'admin';

// User data interface - what we store in Firestore 'users' collection
export interface UserData {
  uid: string;      // Firebase Auth user ID (unique identifier)
  email: string;    // User's email address
  name: string;     // Display name
  role: UserRole;   // 'user' = regular customer, 'admin' = has admin panel access
  createdAt: string; // When account was created (ISO date string)
  isDisabled?: boolean; // true = account disabled
}

/**
 * Sign up a new user
 * Creates both Firebase Auth account AND Firestore user document
 * 
 * @param email - User's email address
 * @param password - User's password (min 6 characters)
 * @param name - User's display name
 * @returns User object and user data if successful
 */
export const signUp = async (email: string, password: string, name: string): Promise<{
  success: boolean;
  user?: User;
  userData?: UserData;
  error?: string;
}> => {
  try {
    // Step 1: Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Step 2: Update the user's profile with their name
    await updateProfile(user, { displayName: name });

    // Step 3: Determine role based on email
    // If email contains 'admin', give admin role (simple approach)
    const role: UserRole = email.toLowerCase().includes('admin') ? 'admin' : 'user';

    // Step 4: Create user document in Firestore 'users' collection
    // This stores additional data that Firebase Auth doesn't have
    const userData: UserData = {
      uid: user.uid,
      email: email,
      name: name,
      role: role,
      createdAt: new Date().toISOString(),
    };

    // setDoc creates or overwrites the document with the user's UID as the document ID
    await setDoc(doc(db, 'users', user.uid), userData);

    return { success: true, user, userData };
  } catch (error: any) {
    console.error('Signup error:', error);
    return { success: false, error: error.message || 'Signup failed' };
  }
};

/**
 * Sign in existing user
 * Authenticates with Firebase Auth and fetches user data from Firestore
 * 
 * @param email - User's email address
 * @param password - User's password
 * @returns User object and user data (including role) if successful
 */
export const signIn = async (email: string, password: string): Promise<{
  success: boolean;
  user?: User;
  userData?: UserData;
  error?: string;
}> => {
  try {
    // Step 1: Authenticate with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Step 2: Fetch user's extra data from Firestore (to get role)
    const userDoc = await getDoc(doc(db, 'users', user.uid));

    if (userDoc.exists()) {
      // User document exists - return it
      const userData = userDoc.data() as UserData;
      return { success: true, user, userData };
    } else {
      // User document doesn't exist (legacy user created before Firestore)
      // Create the document now
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
 * Clears the authentication session
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
 * Used to check user's role when app loads
 * 
 * @param uid - The user's Firebase Auth UID
 * @returns User data including role
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
 * Returns null if no user is logged in
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};
