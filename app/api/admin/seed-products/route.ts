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

const SAMPLE_PRODUCTS = {
  Grocery: [
    { name: 'Organic Basmati Rice (5kg)', price: 850, img: 'https://source.unsplash.com/400x300/?rice' },
    { name: 'Whole Wheat Flour (5kg)', price: 450, img: 'https://source.unsplash.com/401x300/?flour' },
  ],
  Pharmacy: [
    { name: 'Multivitamin Tablets (30 pieces)', price: 599, img: 'https://source.unsplash.com/400x300/?vitamins' },
    { name: 'Paracetamol 500mg (10 tablets)', price: 45, img: 'https://source.unsplash.com/401x300/?medicine' },
  ],
  'Electronics': [
    { name: 'USB-C Cable (2m)', price: 299, img: 'https://source.unsplash.com/400x300/?usb' },
    { name: 'Wireless Mouse', price: 1299, img: 'https://source.unsplash.com/401x300/?mouse' },
  ],
  'Fashion': [
    { name: 'Cotton T-Shirt (Mens)', price: 599, img: 'https://source.unsplash.com/400x300/?tshirt' },
    { name: 'Sports Shoes (Unisex)', price: 2499, img: 'https://source.unsplash.com/401x300/?shoes' },
  ],
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'add-sample-products') {
      // Add sample products to various categories
      let totalAdded = 0;
      
      for (const [category, products] of Object.entries(SAMPLE_PRODUCTS)) {
        const categoryRef = ref(db, `products/${category}`);
        const snapshot = await get(categoryRef);
        
        let items: any = snapshot.exists() ? snapshot.val() : {};
        
        // Add products
        products.forEach((product: any, index: number) => {
          const itemId = `item_${Date.now()}_${index}`;
          items[itemId] = {
            id: itemId,
            ...product,
            category,
            isAvailable: true,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };
          totalAdded++;
        });

        // Save to Firebase
        await set(categoryRef, items);
      }

      return NextResponse.json(
        { 
          success: true, 
          message: `${totalAdded} sample products added successfully`,
          categories: Object.keys(SAMPLE_PRODUCTS),
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Error managing products:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
