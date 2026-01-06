'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
} from 'firebase/auth';
import { ref, set, get, update, remove } from 'firebase/database';
import { auth, db } from './firebase';
import { sendOTPAction } from './send-otp-action';

// Types
export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
  // Location coordinates for distance calculation
  latitude?: number;
  longitude?: number;
}

export interface SellerProfile {
  sellerId: string;
  restaurantName: string;
  cuisineType: string;
  address: string;
  city: string;
  phone: string;
  description: string;
  logo?: string;
  isActive: boolean;
  // Location coordinates for distance calculation
  latitude?: number;
  longitude?: number;
  registeredAt: number;
  updatedAt: number;
  // CNIC Verification
  status: 'pending' | 'approved' | 'rejected';
  cnic?: {
    number: string;
    frontImage: string; // base64 or URL
    backImage: string; // base64 or URL
    uploadedAt: number;
  };
  approvedAt?: number;
  rejectionReason?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  phone: string;
  userType: 'client' | 'seller' | 'admin' | 'superadmin';
  emailVerified: boolean;
  addresses: Address[];
  profilePicture?: string;
  sellerProfile?: SellerProfile;
  createdAt: number;
  updatedAt: number;
}

interface OTPData {
  otp: string;
  createdAt: number;
  expiresAt: number;
  attempts: number;
}

export interface AuthContextType {
  user: UserProfile | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  
  // Auth methods
  signup: (email: string, password: string, name: string, userType: 'client' | 'seller' | 'admin', phone: string, sellerData?: SellerProfile) => Promise<void>;
  sendOTP: (email: string) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  
  // Address methods
  addAddress: (address: Omit<Address, 'id'>) => Promise<void>;
  updateAddress: (addressId: string, address: Omit<Address, 'id'>) => Promise<void>;
  deleteAddress: (addressId: string) => Promise<void>;
  setDefaultAddress: (addressId: string) => Promise<void>;
  
  // Seller methods
  updateSellerProfile: (sellerData: SellerProfile) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from Firebase on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          const userRef = ref(db, `users/${firebaseUser.uid}`);
          const snapshot = await get(userRef);
          
          if (snapshot.exists()) {
            const userData = snapshot.val() as UserProfile;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
          }
        } catch (error) {
          console.error('Error loading user profile:', error);
        }
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Signup with OTP
  const signup = async (
    email: string,
    password: string,
    name: string,
    userType: 'client' | 'seller' | 'admin',
    phone: string,
    sellerData?: SellerProfile
  ) => {
    try {
      // Check if user already exists
      const userRef = ref(db, `users`);
      const snapshot = await get(userRef);
      const users = snapshot.val() || {};
      
      const existingUser = Object.values(users).find(
        (u: any) => u.email === email
      );
      
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create Firebase auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Create OTP for verification
      const otp = await sendOTPAction(email, name);
      const now = Date.now();
      const otpData: OTPData = {
        otp,
        createdAt: now,
        expiresAt: now + 10 * 60 * 1000, // 10 minutes
        attempts: 0,
      };

      // Save OTP to database
      const otpRef = ref(db, `otp/${newUser.uid}`);
      await set(otpRef, otpData);

      // Save temporary user data to localStorage
      localStorage.setItem('tempSignup', JSON.stringify({
        uid: newUser.uid,
        email,
        name,
        userType,
        phone,
        sellerData,
        createdAt: now,
      }));

      console.log('OTP sent to email');
    } catch (error: any) {
      console.error('Signup error:', error);
      throw new Error(error.message || 'Failed to create account');
    }
  };

  // Send OTP for existing email
  const sendOTP = async (email: string) => {
    try {
      const otp = await sendOTPAction(email, '');
      const now = Date.now();
      const otpData: OTPData = {
        otp,
        createdAt: now,
        expiresAt: now + 10 * 60 * 1000,
        attempts: 0,
      };

      // Generate a temporary ID for the email
      const tempId = `temp_${Date.now()}`;
      const otpRef = ref(db, `otp/${tempId}`);
      await set(otpRef, otpData);

      // Save temp info
      localStorage.setItem('tempOTP', JSON.stringify({
        tempId,
        email,
        createdAt: now,
      }));

      console.log('OTP sent');
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  };

  // Verify OTP
  const verifyOTP = async (email: string, otp: string) => {
    try {
      const tempSignup = localStorage.getItem('tempSignup');
      if (!tempSignup) {
        throw new Error('Signup session expired. Please sign up again.');
      }

      const signupData = JSON.parse(tempSignup);
      const otpRef = ref(db, `otp/${signupData.uid}`);
      const snapshot = await get(otpRef);

      if (!snapshot.exists()) {
        throw new Error('OTP not found');
      }

      const otpData: OTPData = snapshot.val();
      const now = Date.now();

      // Check if OTP expired
      if (now > otpData.expiresAt) {
        throw new Error('OTP expired');
      }

      // Check if max attempts exceeded
      if (otpData.attempts > 5) {
        throw new Error('Too many failed attempts. Please request a new OTP.');
      }

      // Verify OTP
      if (otpData.otp !== otp) {
        // Increment attempts
        await update(otpRef, { attempts: otpData.attempts + 1 });
        throw new Error('Invalid OTP');
      }

      // Create user profile in database
      const userProfile: UserProfile = {
        uid: signupData.uid,
        email: signupData.email,
        name: signupData.name,
        phone: signupData.phone,
        userType: signupData.userType,
        emailVerified: true,
        addresses: [],
        sellerProfile: signupData.sellerData,
        createdAt: now,
        updatedAt: now,
      };

      const userRef = ref(db, `users/${signupData.uid}`);
      await set(userRef, userProfile);

      // If seller, also create seller entry for quick access
      if (signupData.userType === 'seller' && signupData.sellerData) {
        const sellerRef = ref(db, `sellers/${signupData.uid}`);
        await set(sellerRef, signupData.sellerData);
      }

      // Delete OTP
      await remove(otpRef);

      // Clear temp data
      localStorage.removeItem('tempSignup');

      // Update auth user profile
      await updateProfile(auth.currentUser!, {
        displayName: signupData.name,
      });

      setUser(userProfile);
      console.log('Email verified and account created');
    } catch (error: any) {
      console.error('OTP verification error:', error);
      throw new Error(error.message || 'Failed to verify OTP');
    }
  };

  // Login
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Load user profile
      const userRef = ref(db, `users/${firebaseUser.uid}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        throw new Error('User profile not found');
      }

      const userData: UserProfile = snapshot.val();
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('Login successful');
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Failed to login');
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setFirebaseUser(null);
      localStorage.removeItem('user');
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Add address
  const addAddress = async (address: Omit<Address, 'id'>) => {
    if (!firebaseUser) throw new Error('User not authenticated');

    try {
      const addressId = `addr_${Date.now()}`;
      const addressRef = ref(db, `users/${firebaseUser.uid}/addresses/${addressId}`);
      
      const newAddress: Address = {
        ...address,
        id: addressId,
      };

      await set(addressRef, newAddress);

      // Update local state
      const updatedUser = user ? { ...user } : null;
      if (updatedUser) {
        updatedUser.addresses = [...updatedUser.addresses, newAddress];
        updatedUser.updatedAt = Date.now();
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      console.log('Address added');
    } catch (error) {
      console.error('Error adding address:', error);
      throw error;
    }
  };

  // Update address
  const updateAddress = async (addressId: string, address: Omit<Address, 'id'>) => {
    if (!firebaseUser) throw new Error('User not authenticated');

    try {
      const addressRef = ref(db, `users/${firebaseUser.uid}/addresses/${addressId}`);
      const updatedAddress: Address = { ...address, id: addressId };
      await set(addressRef, updatedAddress);

      // Update local state
      const updatedUser = user ? { ...user } : null;
      if (updatedUser) {
        updatedUser.addresses = updatedUser.addresses.map((addr) =>
          addr.id === addressId ? updatedAddress : addr
        );
        updatedUser.updatedAt = Date.now();
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      console.log('Address updated');
    } catch (error) {
      console.error('Error updating address:', error);
      throw error;
    }
  };

  // Delete address
  const deleteAddress = async (addressId: string) => {
    if (!firebaseUser) throw new Error('User not authenticated');

    try {
      const addressRef = ref(db, `users/${firebaseUser.uid}/addresses/${addressId}`);
      await remove(addressRef);

      // Update local state
      const updatedUser = user ? { ...user } : null;
      if (updatedUser) {
        updatedUser.addresses = updatedUser.addresses.filter(
          (addr) => addr.id !== addressId
        );
        updatedUser.updatedAt = Date.now();
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      console.log('Address deleted');
    } catch (error) {
      console.error('Error deleting address:', error);
      throw error;
    }
  };

  // Set default address
  const setDefaultAddress = async (addressId: string) => {
    if (!firebaseUser) throw new Error('User not authenticated');

    try {
      const updatedAddresses = user?.addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      })) || [];

      for (const addr of updatedAddresses) {
        const addressRef = ref(db, `users/${firebaseUser.uid}/addresses/${addr.id}`);
        await set(addressRef, addr);
      }

      // Update local state
      const updatedUser = user ? { ...user } : null;
      if (updatedUser) {
        updatedUser.addresses = updatedAddresses;
        updatedUser.updatedAt = Date.now();
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

      console.log('Default address updated');
    } catch (error) {
      console.error('Error setting default address:', error);
      throw error;
    }
  };

  // Update seller profile
  const updateSellerProfile = async (sellerData: SellerProfile) => {
    if (!firebaseUser) throw new Error('User not authenticated');
    if (!user) throw new Error('User profile not found');

    try {
      const updatedProfile = { ...user, sellerProfile: sellerData, updatedAt: Date.now() };
      const userRef = ref(db, `users/${firebaseUser.uid}`);
      await set(userRef, updatedProfile);

      // Update seller entry for quick access
      const sellerRef = ref(db, `sellers/${firebaseUser.uid}`);
      await set(sellerRef, sellerData);

      setUser(updatedProfile);
      localStorage.setItem('user', JSON.stringify(updatedProfile));
      console.log('Seller profile updated');
    } catch (error) {
      console.error('Error updating seller profile:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    firebaseUser,
    loading,
    isAuthenticated: !!user,
    signup,
    sendOTP,
    verifyOTP,
    login,
    logout,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    updateSellerProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
