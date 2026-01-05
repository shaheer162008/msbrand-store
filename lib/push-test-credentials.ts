'use server';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, db } from './firebase';

export async function pushTestCredentials() {
  try {
    const testAccounts = [
      {
        email: 'client@client.com',
        password: 'Client@123',
        name: 'Test Client',
        phone: '+923001234567',
        userType: 'client',
      },
      {
        email: 'admin@admin.com',
        password: 'Admin@123',
        name: 'Test Admin',
        phone: '+923001234567',
        userType: 'admin',
      },
    ];

    const results = [];

    for (const account of testAccounts) {
      try {
        // Create Firebase Auth user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          account.email,
          account.password
        );

        const uid = userCredential.user.uid;

        // Save user profile to database
        const userRef = ref(db, `users/${uid}`);
        await set(userRef, {
          uid,
          email: account.email,
          name: account.name,
          phone: account.phone,
          userType: account.userType,
          emailVerified: true,
          addresses: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });

        results.push({
          email: account.email,
          success: true,
          message: 'Account created successfully',
        });
      } catch (error: any) {
        results.push({
          email: account.email,
          success: false,
          message: error.message || 'Failed to create account',
        });
      }
    }

    return {
      success: true,
      message: 'Test credentials setup completed',
      results,
    };
  } catch (error) {
    console.error('Error pushing test credentials:', error);
    throw error;
  }
}
