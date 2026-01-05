import { initializeApp, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getMessaging, isSupported } from 'firebase/messaging';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error: unknown) {
  const err = error as Record<string, unknown>;
  if (!/already exists/.test(String(err.message))) {
    throw error;
  }
  app = getApp();
}

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Realtime Database
export const db = getDatabase(app);

// Initialize Storage
export const storage = getStorage(app);

// Initialize Cloud Messaging (if supported)
let messaging = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      messaging = getMessaging(app);
    }
  }).catch(() => {
    // Messaging not supported
  });
}
export { messaging };

export default app;

// Helper function to check if user is authenticated
export const isAuthenticated = () => {
  return auth.currentUser !== null;
};

// Helper function to get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};
