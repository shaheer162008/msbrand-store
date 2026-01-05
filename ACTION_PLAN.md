# 🎬 DETAILED ACTION PLAN - PHASE 2A & 2B IMPLEMENTATION

**Status**: Ready to Execute  
**Focus**: Auth + Cart + Checkout (Working & Tested)

---

## 📋 EXACT FILES TO CREATE/UPDATE (IN ORDER)

### PHASE 2A: AUTHENTICATION (6 Files)

#### 1. `lib/firebase.ts` ✅ CREATE
**Purpose**: Firebase initialization  
**Lines**: ~40 lines

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);

export const messaging = isSupported()
  .then(yes => yes ? getMessaging(app) : null)
  .catch(() => null);

export default app;
```

**Time**: 10 minutes  
**Validation**: No import errors

---

#### 2. `lib/email-service.ts` ✅ CREATE
**Purpose**: Send OTP via Gmail/SendGrid  
**Lines**: ~100 lines

```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendOTPEmail(email: string, otp: string) {
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: 'MS Brand Store - OTP Verification',
      html: `
        <h2>Welcome to MS Brand Store!</h2>
        <p>Your OTP is: <strong>${otp}</strong></p>
        <p>This code expires in 10 minutes.</p>
        <p>Do not share this code with anyone.</p>
      `,
    });
    return true;
  } catch (error) {
    console.error('Failed to send OTP:', error);
    return false;
  }
}

export async function sendOrderConfirmationEmail(email: string, orderData: any) {
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: `Order Confirmation - ${orderData.orderId}`,
      html: `
        <h2>Order Confirmed!</h2>
        <p>Order ID: ${orderData.orderId}</p>
        <p>Total: Rs. ${orderData.total}</p>
        <p>Thank you for your order!</p>
      `,
    });
    return true;
  } catch (error) {
    console.error('Failed to send confirmation:', error);
    return false;
  }
}

export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
```

**Time**: 20 minutes  
**Validation**: OTP generates correctly

---

#### 3. `lib/auth-context.tsx` ✅ UPDATE/CREATE
**Purpose**: Firebase Auth + user management  
**Lines**: ~300 lines

```typescript
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { ref, set, get, update } from 'firebase/database';
import { auth, db } from './firebase';
import { sendOTPEmail, generateOTP } from './email-service';

interface UserProfile {
  email: string;
  name: string;
  phone?: string;
  userType: 'client' | 'admin' | 'super-admin';
  emailVerified: boolean;
  addresses: Address[];
  createdAt: number;
}

interface Address {
  id: string;
  label: string;
  address: string;
  city: string;
  zipCode: string;
  isDefault: boolean;
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  signup: (email: string, password: string, name: string, userType: string) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  addAddress: (address: Address) => Promise<void>;
  updateAddress: (addressId: string, address: Address) => Promise<void>;
  deleteAddress: (addressId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [otpStore, setOtpStore] = useState<{ [key: string]: { code: string; expiresAt: number } }>({});

  // Load user on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userRef = ref(db, `users/${firebaseUser.uid}`);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            setUser(snapshot.val());
          }
        } catch (error) {
          console.error('Failed to load user:', error);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string, name: string, userType: string) => {
    // Step 1: Send OTP
    const otp = generateOTP();
    await sendOTPEmail(email, otp);

    // Store OTP temporarily (10 min expiry)
    setOtpStore({
      ...otpStore,
      [email]: {
        code: otp,
        expiresAt: Date.now() + 10 * 60 * 1000,
      },
    });

    // Store signup data temporarily
    sessionStorage.setItem(`signup_${email}`, JSON.stringify({ email, password, name, userType }));
  };

  const verifyOTP = async (email: string, otp: string) => {
    const storedOtp = otpStore[email];
    if (!storedOtp || storedOtp.expiresAt < Date.now()) {
      return false;
    }

    if (storedOtp.code !== otp) {
      return false;
    }

    // OTP verified, create account
    const signupData = JSON.parse(sessionStorage.getItem(`signup_${email}`) || '{}');
    const { password, name, userType } = signupData;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      // Create user profile
      const userProfile: UserProfile = {
        email,
        name,
        userType,
        emailVerified: true,
        addresses: [],
        createdAt: Date.now(),
      };

      await set(ref(db, `users/${userId}`), userProfile);
      setUser(userProfile);

      // Clean up
      delete otpStore[email];
      sessionStorage.removeItem(`signup_${email}`);

      return true;
    } catch (error) {
      console.error('Failed to create account:', error);
      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      const userRef = ref(db, `users/${userId}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        setUser(snapshot.val());
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  const addAddress = async (address: Address) => {
    if (!user) return;

    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const newAddresses = [...(user.addresses || []), address];
    
    // If first address, make it default
    if (newAddresses.length === 1) {
      newAddresses[0].isDefault = true;
    }

    await update(ref(db, `users/${userId}`), {
      addresses: newAddresses,
    });

    setUser({ ...user, addresses: newAddresses });
  };

  const updateAddress = async (addressId: string, updatedAddress: Address) => {
    if (!user) return;

    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const newAddresses = user.addresses.map((addr) =>
      addr.id === addressId ? updatedAddress : addr
    );

    await update(ref(db, `users/${userId}`), {
      addresses: newAddresses,
    });

    setUser({ ...user, addresses: newAddresses });
  };

  const deleteAddress = async (addressId: string) => {
    if (!user) return;

    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const newAddresses = user.addresses.filter((addr) => addr.id !== addressId);

    await update(ref(db, `users/${userId}`), {
      addresses: newAddresses,
    });

    setUser({ ...user, addresses: newAddresses });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signup,
        verifyOTP,
        login,
        logout,
        addAddress,
        updateAddress,
        deleteAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

**Time**: 45 minutes  
**Validation**: Auth context exports correctly

---

#### 4. `app/login/page.tsx` ✅ UPDATE
**Purpose**: Login form with email/password  
**Key Changes**:
- Remove OTP for login (only for signup)
- Email/password form
- Auto-redirect to dashboard if admin
- Show Profile button in navbar when logged in

**Time**: 30 minutes

---

#### 5. `app/signup/page.tsx` ✅ CREATE
**Purpose**: Signup with OTP verification  
**Steps**:
1. Email/password form
2. Send OTP email
3. OTP verification modal
4. Show success
5. Auto-login
6. Redirect to address collection

**Time**: 45 minutes

---

#### 6. `components/navbar.tsx` ✅ UPDATE
**Purpose**: Add Profile dropdown when logged in  
**Changes**:
- When logged in: Show "Profile ▼" instead of "Sign In"
- Dropdown menu with options:
  - My Profile
  - My Orders
  - Settings
  - Addresses
  - Logout

**Time**: 30 minutes

---

### PHASE 2B: CART → CHECKOUT (5 Files)

#### 7. `lib/cart-context.tsx` ✅ UPDATE
**Purpose**: Firebase sync for logged-in users  
**Changes**:
- When user logs in: Sync localStorage → Firebase
- When adding items (logged in): Save to both
- When user logs out: Firebase → localStorage
- Real-time cart count update

**Time**: 30 minutes

---

#### 8. `app/cart/page.tsx` ✅ CREATE
**Purpose**: Shopping cart display  
**Features**:
- Display all items
- Update quantity
- Remove items
- Apply coupon
- Order summary
- Proceed to checkout button
- Continue shopping button

**Time**: 45 minutes

---

#### 9. `app/checkout/page.tsx` ✅ CREATE
**Purpose**: Checkout & order placement  
**Features**:
- Select delivery address OR add new
- Show coupon input
- Order summary
- Payment method selection (COD for now)
- Place order button

**Time**: 45 minutes

---

#### 10. `app/order-confirmation/page.tsx` ✅ CREATE
**Purpose**: Order confirmation page  
**Features**:
- Order ID
- Items ordered
- Total price
- Delivery address
- Estimated delivery
- Download invoice button
- Continue shopping button

**Time**: 30 minutes

---

#### 11. `components/InvoiceTemplate.tsx` ✅ CREATE
**Purpose**: Professional invoice component  
**Features**:
- Order header
- Customer details
- Item list with prices
- Subtotal, tax, total
- Payment method
- Thank you message
- Printable layout

**Time**: 30 minutes

---

### TOTAL FILES: 11
**Total Time**: ~4-5 hours
**Difficulty**: Intermediate (all code provided)

---

## ⚠️ CRITICAL VARIABLES NEEDED

You must provide:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_DATABASE_URL=

# Gmail (for OTP)
GMAIL_EMAIL=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password

# App
JWT_SECRET=your-secret-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**How to get Gmail App Password**:
1. Go to https://myaccount.google.com
2. Security > App passwords
3. Select Mail > Windows (or other device)
4. Copy app password
5. Use in .env.local

---

## 🧪 TESTING PLAN (After Each Phase)

### Phase 2A Testing
```
✅ Can signup with email
✅ OTP sent to email
✅ Can verify OTP
✅ Account created in Firebase
✅ Can login
✅ Profile shows in navbar
✅ Can logout
✅ Can add address
```

### Phase 2B Testing
```
✅ Can add items to cart
✅ Cart count updates
✅ Can view cart
✅ Can update quantity
✅ Can remove item
✅ Can checkout (redirects if not logged in)
✅ Can select address
✅ Can place order
✅ Order appears in Firebase
✅ Order confirmation shows
✅ Invoice generates
```

---

## 🎯 SUCCESS CHECKLIST

After all 11 files implemented:

- [ ] Signup flow works end-to-end
- [ ] OTP email arrives
- [ ] Login works
- [ ] Navbar shows Profile dropdown
- [ ] Cart persists on refresh
- [ ] Checkout flow works
- [ ] Orders save to Firebase
- [ ] Invoices generate
- [ ] All links work
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Ready for demo

---

## 📅 TIMELINE

```
Now - 1 hour:   Setup Firebase, create .env.local
1-2 hours:      Create lib/firebase.ts + auth-context.tsx
2-3 hours:      Create login/signup pages
3-4 hours:      Create cart/checkout pages
4-5 hours:      Testing & bug fixes

Total: ~5 hours for working app!
```

---

## 🚀 START HERE

1. Gather Firebase credentials ✅ (you doing)
2. Create .env.local ✅ (you doing)
3. I'll create all 11 files
4. Test together
5. Deploy together

---

**WAITING FOR .env.local WITH FIREBASE CREDENTIALS**

