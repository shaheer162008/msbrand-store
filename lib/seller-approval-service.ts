/**
 * Seller Approval Service
 * Manages seller verification, CNIC validation, and approval workflow
 */

import { db } from './firebase';
import { ref, get, set, update, query, orderByChild, equalTo } from 'firebase/database';
import { SellerProfile } from './auth-context';

export interface PendingSeller {
  userId: string;
  email: string;
  phone: string;
  restaurantName: string;
  city: string;
  cnic: {
    number: string;
    frontImage: string;
    backImage: string;
    uploadedAt: number;
  };
  registeredAt: number;
  status: 'pending' | 'approved' | 'rejected';
}

/**
 * Get all pending sellers awaiting admin approval
 */
export async function getPendingSellers(): Promise<PendingSeller[]> {
  try {
    const sellersRef = ref(db, 'sellers');
    const snapshot = await get(sellersRef);

    if (!snapshot.exists()) {
      return [];
    }

    const sellers: PendingSeller[] = [];
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      if (data.status === 'pending' && data.cnic) {
        sellers.push({
          userId: childSnapshot.key || '',
          email: data.email || '',
          phone: data.phone || '',
          restaurantName: data.restaurantName || '',
          city: data.city || '',
          cnic: data.cnic,
          registeredAt: data.registeredAt || 0,
          status: 'pending',
        });
      }
    });

    // Sort by registration date (newest first)
    return sellers.sort((a, b) => b.registeredAt - a.registeredAt);
  } catch (error) {
    console.error('Error fetching pending sellers:', error);
    throw error;
  }
}

/**
 * Get a specific seller's profile
 */
export async function getSellerProfile(userId: string): Promise<SellerProfile | null> {
  try {
    const sellerRef = ref(db, `sellers/${userId}`);
    const snapshot = await get(sellerRef);

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.val() as SellerProfile;
  } catch (error) {
    console.error('Error fetching seller profile:', error);
    throw error;
  }
}

/**
 * Approve a seller account
 */
export async function approveSeller(userId: string): Promise<void> {
  try {
    const sellerRef = ref(db, `sellers/${userId}`);
    await update(sellerRef, {
      status: 'approved',
      approvedAt: Date.now(),
      isActive: true,
      rejectionReason: null,
    });
  } catch (error) {
    console.error('Error approving seller:', error);
    throw error;
  }
}

/**
 * Reject a seller account with reason
 */
export async function rejectSeller(userId: string, reason: string): Promise<void> {
  try {
    const sellerRef = ref(db, `sellers/${userId}`);
    await update(sellerRef, {
      status: 'rejected',
      rejectionReason: reason,
      isActive: false,
    });
  } catch (error) {
    console.error('Error rejecting seller:', error);
    throw error;
  }
}

/**
 * Validate CNIC number format (Pakistan)
 * Format: XXXXX-XXXXXXX-X (5 digits, hyphen, 7 digits, hyphen, 1 digit)
 */
export function validateCNICFormat(cnicNumber: string): boolean {
  const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
  return cnicRegex.test(cnicNumber.trim());
}

/**
 * Check if CNIC is already registered
 */
export async function isCNICRegistered(cnicNumber: string): Promise<boolean> {
  try {
    const sellersRef = ref(db, 'sellers');
    const snapshot = await get(sellersRef);

    if (!snapshot.exists()) {
      return false;
    }

    let isRegistered = false;
    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      if (data.cnic?.number === cnicNumber.trim()) {
        isRegistered = true;
      }
    });

    return isRegistered;
  } catch (error) {
    console.error('Error checking CNIC registration:', error);
    throw error;
  }
}

/**
 * Update seller CNIC information
 */
export async function updateSellerCNIC(
  userId: string,
  cnicNumber: string,
  frontImage: string,
  backImage: string
): Promise<void> {
  try {
    // Validate CNIC format
    if (!validateCNICFormat(cnicNumber)) {
      throw new Error('Invalid CNIC format. Expected: 12345-1234567-8');
    }

    // Check if CNIC already registered
    const isRegistered = await isCNICRegistered(cnicNumber);
    if (isRegistered) {
      throw new Error('This CNIC is already registered');
    }

    const sellerRef = ref(db, `sellers/${userId}`);
    await update(sellerRef, {
      cnic: {
        number: cnicNumber.trim(),
        frontImage,
        backImage,
        uploadedAt: Date.now(),
      },
      status: 'pending',
    });
  } catch (error) {
    console.error('Error updating CNIC:', error);
    throw error;
  }
}

/**
 * Get seller approval count by status
 */
export async function getSellerApprovalStats(): Promise<{
  pending: number;
  approved: number;
  rejected: number;
}> {
  try {
    const sellersRef = ref(db, 'sellers');
    const snapshot = await get(sellersRef);

    const stats = {
      pending: 0,
      approved: 0,
      rejected: 0,
    };

    if (!snapshot.exists()) {
      return stats;
    }

    snapshot.forEach((childSnapshot) => {
      const data = childSnapshot.val();
      const status = data.status || 'pending';
      if (status in stats) {
        stats[status as keyof typeof stats]++;
      }
    });

    return stats;
  } catch (error) {
    console.error('Error getting seller approval stats:', error);
    throw error;
  }
}
