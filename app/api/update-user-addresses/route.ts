import { db } from '@/lib/firebase';
import { ref, update } from 'firebase/database';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { uid, addresses } = await request.json();

    if (!uid || !addresses) {
      return NextResponse.json(
        { error: 'Missing uid or addresses' },
        { status: 400 }
      );
    }

    // Update user addresses in Firebase
    const userRef = ref(db, `users/${uid}`);
    await update(userRef, { addresses });

    return NextResponse.json(
      { success: true, message: 'Addresses updated successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating addresses:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update addresses' },
      { status: 500 }
    );
  }
}
