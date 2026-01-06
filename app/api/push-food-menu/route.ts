import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, ref, set } from 'firebase/database';
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

// Default admin seller ID (for food hub)
const ADMIN_SELLER_ID = 'admin_food_hub';

const DEFAULT_FOOD_MENU = {
  Pizzas: [
    { name: 'Chicken Tikka Pizza', img: 'chiken-pizza.jpg', sizes: { Small: 650, Medium: 1050, Large: 1550, Family: 2250 } },
    { name: 'BBQ Pizza', img: 'bbq-pizza.jpg', sizes: { Small: 650, Medium: 1050, Large: 1550, Family: 2250 } },
    { name: 'Chicken Fajita Pizza', img: 'chicken-fajita.jpg', sizes: { Small: 650, Medium: 1050, Large: 1550, Family: 2250 } },
    { name: 'Chicken Tandoori Pizza', img: 'vegetable-pizza.jpg', sizes: { Small: 650, Medium: 1050, Large: 1550, Family: 2250 } },
    { name: 'Hot & Spicy Pizza', img: 'cheese-lover.jpg', sizes: { Small: 650, Medium: 1050, Large: 1550, Family: 2250 } },
    { name: 'Vegetarian Pizza', img: 'vegetable-pizza.jpg', sizes: { Small: 650, Medium: 1050, Large: 1550, Family: 2250 } },
    { name: 'Chicken Lover Pizza', img: 'chiken-pizza.jpg', sizes: { Small: 650, Medium: 1050, Large: 1550, Family: 2250 } },
    { name: 'Cheese Lover Pizza', img: 'achari-pizza.jpg', sizes: { Small: 650, Medium: 1050, Large: 1550, Family: 2250 } },
    { name: '4 in 1 Pizza', img: 'cheese-lover.jpg', sizes: { Small: 650, Medium: 1050, Large: 1550, Family: 2250 } },
  ],
  'Pizzeria Special Pizza': [
    { name: 'Pizzeria Lover Pizza', img: 'achari-pizza.jpg', sizes: { Small: 650, Medium: 1050, Large: 1550, Family: 2250 } },
    { name: 'Creamy Pizza', img: 'creamy-pizza.jpg', sizes: { Small: 650, Medium: 1050, Large: 1550, Family: 2250 } },
    { name: 'Chicken Supereme Pizza', img: 'chicken-supereme.jpg', sizes: { Small: 650, Medium: 1050, Large: 1550, Family: 2250 } },
    { name: 'Arabian Special Pizza', img: 'arabian-special.jpg', sizes: { Small: 650, Medium: 1050, Large: 1550, Family: 2250 } },
    { name: 'Spam Cheese Pizza', img: 'spam-cheese.jpg', sizes: { Small: 650, Medium: 1050, Large: 1550, Family: 2250 } },
    { name: 'Kababish Pizza', img: 'kabab-pizza.jpg', sizes: { Small: 650, Medium: 1050, Large: 1550, Family: 2250 } },
    { name: '4 in 1 Pizza', img: '4-in-1.jpg', sizes: { Small: 650, Medium: 1050, Large: 1550, Family: 2250 } },
  ],
  'Crust Special': [
    { name: 'Cheese Crust Pizza', img: 'cheese-crust.jpg', sizes: { Small: 650, Medium: 1050, Large: 1550, Family: 2250 } },
    { name: 'Crown Crust Pizza', img: 'crown-crust.jpg', sizes: { Small: 650, Medium: 1050, Large: 1550, Family: 2250 } },
    { name: 'Kabab Crust Pizza', img: 'kabab-crust.jpg', sizes: { Small: 650, Medium: 1050, Large: 1550, Family: 2250 } },
  ],
  'Pizza Special Deals': [
    { name: '2 Small Pizza + Half Liter Drink', img: 'small-pizza-val-2-offer.jpg', price: 1300 },
    { name: '2 Large Pizza + 1.5 Liter Drink', img: 'large-pizza-val-2.jpg', price: 3040 },
    { name: '2 Medium Pizza + 1 Liter Drink', img: 'medium-pizza-val-2.jpg', price: 2150 },
  ],
  'Pizzeria Deals': [
    { name: '1 Small Pizza + 1 Small Zinger and 1 Tin Pack', img: 'small-pizza-and-burger-val-2.jpeg', price: 1050 },
  ],
  Burgers: [
    { name: 'Chicken Burger', img: 'https://source.unsplash.com/400x300/?burger', price: 350 },
    { name: 'Kabab Burger', img: 'https://source.unsplash.com/401x300/?burger', price: 300 },
    { name: 'Zinger Burger', img: 'https://source.unsplash.com/402x300/?burger', price: 350 },
    { name: 'Zinger Cheese Burger', img: 'https://source.unsplash.com/403x300/?burger', price: 420 },
    { name: 'Tender Fillet Burger', img: 'https://source.unsplash.com/404x300/?burger', price: 680 },
    { name: 'Pizzeria Special Burger', img: 'https://source.unsplash.com/405x300/?burger', price: 580 },
    { name: 'Grilled Burger', img: 'https://source.unsplash.com/406x300/?burger', price: 450 },
    { name: 'Tower Burger', img: 'https://source.unsplash.com/407x300/?burger', price: 690 },
    { name: 'Mighty Zinger Burger', img: 'https://source.unsplash.com/408x300/?burger', price: 590 },
    { name: 'Double Grilled Burger', img: 'https://source.unsplash.com/409x300/?burger', price: 630 },
  ],
  Fries: [
    { name: 'Regular Fries', img: 'https://source.unsplash.com/400x300/?fries', price: 200 },
    { name: 'Medium Fries', img: 'https://source.unsplash.com/401x300/?fries', price: 250 },
    { name: 'Family Fries', img: 'https://source.unsplash.com/402x300/?fries', price: 300 },
    { name: 'Mayo Fries', img: 'https://source.unsplash.com/403x300/?fries', price: 400 },
    { name: 'Cheese Fries', img: 'https://source.unsplash.com/404x300/?fries', price: 400 },
    { name: 'Masala Fries', img: 'https://source.unsplash.com/405x300/?fries', price: 400 },
    { name: 'Peri Peri Fries', img: 'https://source.unsplash.com/406x300/?fries', price: 400 },
    { name: 'Loaded Fries Half', img: 'https://source.unsplash.com/407x300/?fries', price: 500 },
    { name: 'Loaded Fries Full', img: 'https://source.unsplash.com/408x300/?fries', price: 850 },
  ],
  Wraps: [
    { name: 'Tikka Wrap', img: 'https://source.unsplash.com/400x300/?wrap', price: 350 },
    { name: 'Malai Boti Wrap', img: 'https://source.unsplash.com/401x300/?wrap', price: 370 },
    { name: 'Kababish Wrap', img: 'https://source.unsplash.com/402x300/?wrap', price: 380 },
    { name: 'Zinger Wrap', img: 'https://source.unsplash.com/403x300/?wrap', price: 400 },
    { name: 'Grill Chicken Wrap', img: 'https://source.unsplash.com/404x300/?wrap', price: 500 },
    { name: 'Pizzeria Wrap', img: 'https://source.unsplash.com/405x300/?wrap', price: 550 },
  ],
  Shawarma: [
    { name: 'Chicken Shawarma', img: 'https://source.unsplash.com/400x300/?shawarma', price: 280 },
    { name: 'Cheese Shawarma', img: 'https://source.unsplash.com/401x300/?shawarma', price: 320 },
    { name: 'Zinger Shawarma', img: 'https://source.unsplash.com/402x300/?shawarma', price: 350 },
  ],
  Pasta: [
    { name: 'Crunchy Pasta Half', img: 'https://source.unsplash.com/400x300/?pasta', price: 550 },
    { name: 'Crunchy Pasta Full', img: 'https://source.unsplash.com/401x300/?pasta', price: 750 },
    { name: 'Chicken Cheese Pasta Half', img: 'https://source.unsplash.com/402x300/?pasta', price: 500 },
    { name: 'Chicken Cheese Pasta Full', img: 'https://source.unsplash.com/403x300/?pasta', price: 680 },
  ],
  'Shakes & Ice Cream': [
    { name: 'Vanilla Shake', img: 'https://source.unsplash.com/400x300/?milkshake', price: 450 },
    { name: 'Strawberry Shake', img: 'https://source.unsplash.com/401x300/?milkshake', price: 450 },
    { name: 'Chocolate Shake', img: 'https://source.unsplash.com/402x300/?milkshake', price: 450 },
    { name: 'Mango Shake', img: 'https://source.unsplash.com/403x300/?milkshake', price: 450 },
    { name: 'Kulfa Shake', img: 'https://source.unsplash.com/404x300/?milkshake', price: 500 },
    { name: 'Caramel Crunch', img: 'https://source.unsplash.com/405x300/?icecream', price: 500 },
    { name: 'Tutti Frutti', img: 'https://source.unsplash.com/406x300/?icecream', price: 500 },
  ],
  'Deals & Family Boxes': [
    { name: 'Student Deal', img: 'https://source.unsplash.com/400x300/?fastfood', price: 999 },
    { name: 'Friends Deal', img: 'https://source.unsplash.com/401x300/?fastfood', price: 1799 },
    { name: 'Family Deal', img: 'https://source.unsplash.com/402x300/?fastfood', price: 2499 },
    { name: 'Mega Family Box', img: 'https://source.unsplash.com/403x300/?fastfood', price: 3299 },
  ],
};

export async function POST(request: NextRequest) {
  try {
    // Push food menu
    const menuItems: any = {};
    let itemCounter = 0;

    Object.entries(DEFAULT_FOOD_MENU).forEach(([category, items]) => {
      items.forEach((item: any) => {
        const itemId = `item_${itemCounter++}`;
        const menuItem: any = {
          id: itemId,
          name: item.name,
          category: category,
          image: item.img,
          sellerId: ADMIN_SELLER_ID,
          isAvailable: true,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          toppings: [
            { name: 'Extra Cheese', price: 50 },
            { name: 'Extra Sauce', price: 30 },
            { name: 'Extra Meat', price: 100 },
          ],
        };

        // Add price OR sizes based on what exists
        if (item.price) {
          menuItem.price = item.price;
        } else if (item.sizes) {
          menuItem.sizes = item.sizes;
        }

        menuItems[itemId] = menuItem;
      });
    });

    // Set menu in database
    const menuRef = ref(db, `foodMenu/${ADMIN_SELLER_ID}`);
    await set(menuRef, menuItems);

    // Set delivery charges configuration
    const deliveryCharges = {
      taxPerItem: 15,
      baseFee: 75,
      freeDeliveryKm: 1,
      distanceBased: {
        '10km': 75,
        '15km': 80,
        '20km': 95,
        '25plus': 250,
      },
    };

    const chargesRef = ref(db, 'foodHub/deliveryCharges');
    await set(chargesRef, deliveryCharges);

    return NextResponse.json(
      {
        success: true,
        message: 'Food menu and delivery charges pushed successfully',
        itemsCount: Object.keys(menuItems).length,
        charges: deliveryCharges,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error pushing data:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
