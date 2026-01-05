# 🔑 FIREBASE API TOKENS - DETAILED GUIDE

**YEH GUIDE HAI FIREBASE KEYS NIKALNE KAY LIYE**  
**(Firebase Console se exact tokens kahan se lene hain)**

---

## 🚀 STEP 1: Firebase Console Kholo

1. **Browser mein jao**: https://console.firebase.google.com
2. **Login karo** apna Google account se (jo email use karna hai)
3. **"Go to console"** click karo (agar new user ho)

---

## 📋 STEP 2: Naya Project Banao (FIRST TIME)

Agar koi project nahi hai:

1. Click **"Create a project"** (ya "+ Add project")
2. **Project Name**: `ms-brand-store` (exactly likha likho)
3. Click **"Continue"**
4. **"Disable Google Analytics"** (checkbox uncheck karo)
5. Click **"Create project"**
6. **Wait 1-2 minutes...**

---

## ⚙️ STEP 3: FIREBASE KEYS NIKALO (YEH IMPORTANT HAI!)

Jab project create ho jaye:

### 👉 Project Settings Mein Jao:
1. **Top right** mein click karo **⚙️ (Gear icon)**
2. Select **"Project settings"**

### 👉 "Your apps" Section Dekho:
1. **"Your apps"** tab click karo
2. Agar koi app nahi hai, **"Web"** icon (+) click karo
3. App nickname: `ms-brand-store`
4. Click **"Register app"**
5. **Next** click karo (Firebase SDK auto-add)

### 👉 CONFIG OBJECT MILEGA (YEH IMPORTANT HAI!):

Screen pe likha hoga:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDxxxxx...",           // ✅ COPY KARO (API_KEY)
  authDomain: "ms-brand-store.firebaseapp.com",  // ✅ COPY KARO
  projectId: "ms-brand-store",        // ✅ COPY KARO
  storageBucket: "ms-brand-store.appspot.com",  // ✅ COPY KARO
  messagingSenderId: "123456789012",  // ✅ COPY KARO
  appId: "1:123456789012:web:abcdef..."  // ✅ COPY KARO
};
```

---

## 📝 KEYS KO KAHAN PASTE KARO:

`.env.local` file mein likha likho:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDxxxxx...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ms-brand-store.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ms-brand-store
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ms-brand-store.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef...
NEXT_PUBLIC_DATABASE_URL=https://ms-brand-store-default-rtdb.firebaseio.com
```

---

## 🔥 DATABASE URL KAHAN SE MILE:

**YEH FIREBASE CONSOLE MEIN:**

1. **Left side mein** "Realtime Database" click karo
2. **"Create Database"** click karo
3. **Location**: Apna nearest select karo
4. **Test mode** select karo
5. **"Enable"** click karo

**Jab database create ho, uska URL yeh hoga:**
```
https://ms-brand-store-default-rtdb.firebaseio.com
```

(Project name ke jagah "ms-brand-store" likha ho)

---

## 📧 GMAIL APP PASSWORD (OTP EMAILS KAY LIYE)

### Step 1: 2-Factor Authentication Enable Karo
1. Go: https://myaccount.google.com/security
2. Left menu mein **"2-Step Verification"** click karo
3. ✅ **"Turn on 2-Step Verification"** (agar off hai)
4. Phone number dalo
5. Complete karo

### Step 2: App Password Generate Karo
1. Wapis jao: https://myaccount.google.com/security
2. Left menu mein **"App passwords"** (ab visible hoga)
3. **Select App**: "Mail"
4. **Select Device**: "Windows" (ya apka device)
5. Click **"Generate"**
6. **16-character password** copy karo (spaces remove karo)

**Example:**
```
Gmail App Password: abcd efgh ijkl mnop
                   ↓
.env.local mein: abcdefghijklmnop
```

---

## 🔐 Authentication Enable Karo

**Firebase Console mein:**

1. **Left menu** → **"Authentication"**
2. Click **"Get Started"**
3. **"Email/Password"** provider click karo
4. **Toggle "Enable"** (blue karo)
5. Click **"Save"**

---

## 📂 FINAL .env.local FILE:

```env
# Firebase Keys (Firebase Console se copy kiye huey)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ms-brand-store.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ms-brand-store
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ms-brand-store.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdefghijk
NEXT_PUBLIC_DATABASE_URL=https://ms-brand-store-default-rtdb.firebaseio.com

# Gmail (Gmail account se generate kia)
GMAIL_EMAIL=your-email@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop

# App Config (same rakho)
JWT_SECRET=your_very_long_secret_key_minimum_32_characters
SESSION_TIMEOUT=3600
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Test Credentials (same rakho)
TEST_CLIENT_EMAIL=client@client.com
TEST_CLIENT_PASSWORD=Client@123
TEST_ADMIN_EMAIL=admin@admin.com
TEST_ADMIN_PASSWORD=Admin@123
```

---

## ❌ COMMON MISTAKES:

❌ **apiKey** copy nahi kiya → API authentication fail  
❌ **authDomain** galat likha → Auth nahi chalega  
❌ **projectId** galat likha → Database connect nahi hoga  
❌ **Gmail app password** spaces ke saath → Email service fail  
❌ **DATABASE_URL** likha nahi → Realtime database fail  

---

## ✅ TEST KARO:

```bash
npm run dev
```

**Browser mein jao:**
- http://localhost:3000/signup
- http://localhost:3000/login

Agar signup page load ho → **Firebase keys sahi hain!** ✅

---

## 🆘 STILL NOT WORKING?

**Yeh check karo:**

1. ✅ `.env.local` file **root folder** mein hai?
2. ✅ **NEXT_PUBLIC_** prefix laga hai sab keys pe?
3. ✅ **Spaces nahi** hain keys mein?
4. ✅ **Dev server restart** kia: `npm run dev`
5. ✅ **Browser cache clear** kia (Ctrl+Shift+Delete)
6. ✅ Firebase Console mein **project nikl raha hai** (top left)?

---

## 📸 SCREENSHOT LOCATIONS:

### Firebase Config Object:
```
Firebase Console 
  → Project Settings (⚙️)
    → Your apps 
      → Web app
        → firebaseConfig object (copy karo)
```

### Gmail App Password:
```
https://myaccount.google.com/security
  → App passwords (left menu)
    → Mail + Your Device
      → Generate
        → Copy 16-character password
```

### Database URL:
```
Firebase Console
  → Build > Realtime Database
    → Database URL (uper likha hota hai)
```

---

**Jab sab setup ho jaye, message bhejo:**
**"FIREBASE SETUP DONE ✅"**

**Phir mein immediately Phase 2B banaunga!** 🚀

