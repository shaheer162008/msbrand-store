import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, ref, set, get } from 'firebase/database';
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

export async function GET(request: NextRequest) {
  try {
    const zonesRef = ref(db, 'foodHub/deliveryZones');
    const snapshot = await get(zonesRef);

    if (snapshot.exists()) {
      return NextResponse.json({ zones: snapshot.val() }, { status: 200 });
    } else {
      // Initialize default zones
      const defaultZones = {
        zone_karachi: {
          id: 'zone_karachi',
          city: 'Karachi',
          enabled: true,
          center: { latitude: 24.8615, longitude: 67.0099 },
          radiusKm: 30,
          description: 'Karachi metropolitan area',
        },
        zone_lahore: {
          id: 'zone_lahore',
          city: 'Lahore',
          enabled: false,
          center: { latitude: 31.5497, longitude: 74.3436 },
          radiusKm: 30,
          description: 'Lahore metropolitan area',
        },
        zone_islamabad: {
          id: 'zone_islamabad',
          city: 'Islamabad',
          enabled: false,
          center: { latitude: 33.7298, longitude: 73.1786 },
          radiusKm: 30,
          description: 'Islamabad metropolitan area',
        },
      };

      await set(zonesRef, defaultZones);
      return NextResponse.json({ zones: defaultZones }, { status: 200 });
    }
  } catch (error: any) {
    console.error('Error fetching delivery zones:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, zones, zoneId, enabled } = body;

    if (action === 'update-all') {
      // Update all zones
      const zonesRef = ref(db, 'foodHub/deliveryZones');
      await set(zonesRef, zones);
      return NextResponse.json(
        { success: true, message: 'Zones updated successfully' },
        { status: 200 }
      );
    } else if (action === 'toggle-zone') {
      // Toggle a single zone
      const zoneRef = ref(db, `foodHub/deliveryZones/${zoneId}`);
      const snapshot = await get(zoneRef);
      if (snapshot.exists()) {
        const zone = snapshot.val();
        zone.enabled = enabled;
        await set(zoneRef, zone);
        return NextResponse.json(
          { success: true, zone, message: `${zone.city} delivery ${enabled ? 'enabled' : 'disabled'}` },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { error: 'Zone not found' },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Error managing delivery zones:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
