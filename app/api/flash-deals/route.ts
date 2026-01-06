import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, ref, set, get, remove } from 'firebase/database';
import { initializeApp, getApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
};

let app;
try {
  app = getApp();
} catch {
  app = initializeApp(firebaseConfig);
}

const db = getDatabase(app);
const MAX_FLASH_DEALS = 12;

export async function GET(request: NextRequest) {
  try {
    const dealsRef = ref(db, 'foodHub/flashDeals');
    const snapshot = await get(dealsRef);

    if (snapshot.exists()) {
      const deals = snapshot.val();
      // Sort by order
      const sortedDeals = Object.values(deals).sort((a: any, b: any) => a.order - b.order);
      return NextResponse.json({ deals: sortedDeals }, { status: 200 });
    }

    return NextResponse.json({ deals: [] }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching flash deals:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, deals, dealId, deal } = body;

    if (action === 'add') {
      // Add a new flash deal
      const dealsRef = ref(db, 'foodHub/flashDeals');
      const snapshot = await get(dealsRef);
      const currentDeals = snapshot.exists() ? Object.values(snapshot.val()) : [];

      if (currentDeals.length >= MAX_FLASH_DEALS) {
        return NextResponse.json(
          { error: `Maximum ${MAX_FLASH_DEALS} flash deals allowed` },
          { status: 400 }
        );
      }

      const dealId = `FD-${Date.now()}`;
      const dealRef = ref(db, `foodHub/flashDeals/${dealId}`);
      await set(dealRef, { ...deal, id: dealId, addedAt: Date.now() });

      return NextResponse.json(
        { success: true, dealId, message: 'Flash deal added successfully' },
        { status: 200 }
      );
    } else if (action === 'remove') {
      // Remove a flash deal
      const dealRef = ref(db, `foodHub/flashDeals/${dealId}`);
      await remove(dealRef);

      return NextResponse.json(
        { success: true, message: 'Flash deal removed successfully' },
        { status: 200 }
      );
    } else if (action === 'reorder') {
      // Reorder deals
      const dealsRef = ref(db, 'foodHub/flashDeals');
      await set(dealsRef, deals);

      return NextResponse.json(
        { success: true, message: 'Flash deals reordered successfully' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Error managing flash deals:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
