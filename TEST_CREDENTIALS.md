# 🔐 TEST CREDENTIALS & ENVIRONMENT SETUP

**Last Updated**: January 5, 2026  
**Status**: Ready for Testing

---

## 👥 TEST ACCOUNTS

### CLIENT ACCOUNT
```
Email: client@client.com
Password: Client@123
Name: Test Client
Phone: +92-300-1234567
Type: Customer/Client
Role: Regular buyer

Address (Pre-filled):
Label: Home
Address: 123 Main Street, Karachi
City: Karachi
Zip: 75000
Default: Yes
```

### ADMIN ACCOUNT
```
Email: admin@admin.com
Password: Admin@123
Name: Admin User
Phone: +92-300-9876543
Type: Admin
Role: Order & Product Management

Permissions:
- View all orders
- Confirm/Complete orders
- Manage products
- View analytics
- User management
```

### SUPER ADMIN ACCOUNT
```
Email: superadmin@superadmin.com
Password: SuperAdmin@123
Name: Super Admin
Phone: +92-300-5555555
Type: Super Admin
Role: Full system access

Permissions:
- All admin permissions
- Admin user management
- System settings
- Billing & payments
- Reports & analytics
```

---

## 🔧 ENVIRONMENT VARIABLES (.env.local)

Copy this to your `.env.local` file in root directory:

```env
# ===== FIREBASE CONFIGURATION =====
# Get these from Firebase Console > Project Settings
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY_HERE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
FIREBASE_ADMIN_SDK_KEY=YOUR_ADMIN_KEY_JSON

# ===== SENDGRID (EMAIL & OTP) =====
# Get from https://app.sendgrid.com/settings/api_keys
SENDGRID_API_KEY=SG.your_sendgrid_key_here
SENDGRID_FROM_EMAIL=noreply@msbrandstore.com

# ===== TWILIO (WhatsApp) =====
# Get from https://www.twilio.com/console
TWILIO_ACCOUNT_SID=ACyour_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_NUMBER=+14155552671

# ===== JWT & SESSION =====
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars
SESSION_TIMEOUT=3600
NEXT_PUBLIC_APP_URL=http://localhost:3000

# ===== DATABASE =====
# Firebase Realtime Database URL (auto-generated)
NEXT_PUBLIC_DATABASE_URL=https://YOUR_PROJECT.firebaseio.com

# ===== TEST CREDENTIALS (Development Only) =====
TEST_CLIENT_EMAIL=client@client.com
TEST_CLIENT_PASSWORD=Client@123
TEST_ADMIN_EMAIL=admin@admin.com
TEST_ADMIN_PASSWORD=Admin@123

# ===== STRIPE (Payment Processing - Optional) =====
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
# STRIPE_SECRET_KEY=sk_test_your_key

# ===== ANALYTICS (Optional) =====
# NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

---

## 🚀 QUICK START STEPS

### 1. Setup Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create Project"
3. Project Name: `ms-brand-store`
4. Enable Google Analytics (optional)
5. Create project

### 2. Setup Firebase Services

**Realtime Database:**
- Go to Build > Realtime Database
- Click "Create Database"
- Start in test mode (for development)
- Click "Enable"

**Authentication:**
- Go to Build > Authentication
- Click "Get Started"
- Enable "Email/Password" provider
- Enable "Google" (optional)

**Storage:**
- Go to Build > Storage
- Click "Get Started"
- Accept default rules for development
- Click "Done"

**Cloud Messaging (FCM):**
- Go to Project Settings > Cloud Messaging
- Copy Server Key and Sender ID

### 3. Get API Keys

After creating the project:
1. Go to Project Settings (⚙️ icon)
2. Click "Your apps"
3. Click "Web" app
4. Copy the config object
5. Fill in your `.env.local` file

---

## ✅ TESTING CHECKLIST

### Authentication Tests
- [ ] Signup with client email
- [ ] Verify email with OTP
- [ ] Login with client account
- [ ] Logout
- [ ] Login with admin account
- [ ] Switch between accounts
- [ ] Reset password flow

### Cart Tests
- [ ] Add product to cart (not logged in) → uses localStorage
- [ ] View cart
- [ ] Update quantity
- [ ] Remove item
- [ ] Clear cart
- [ ] Login → cart syncs to database
- [ ] Add item while logged in → saves to database
- [ ] Logout → cart becomes localStorage again

### Checkout Tests
- [ ] Click checkout (not logged in) → redirect to login
- [ ] Login → back to checkout
- [ ] Select saved address OR enter new address
- [ ] Apply coupon code
- [ ] Review order summary
- [ ] Place order
- [ ] See order confirmation page

### Admin Tests
- [ ] Login as admin
- [ ] Go to /admin-dashboard
- [ ] View pending orders
- [ ] Click order details
- [ ] Confirm order
- [ ] Mark as completed
- [ ] View order count badges
- [ ] Logout

### Product Tests
- [ ] Browse food-hub
- [ ] Filter by price & rating
- [ ] Search products
- [ ] Click product → detail page
- [ ] View images
- [ ] See discount percentage
- [ ] See coupon code
- [ ] Add to cart
- [ ] Click WhatsApp floating button → opens chat
- [ ] Click Cart floating button → goes to cart

### Image Tests
- [ ] All product images load
- [ ] Category hub images load
- [ ] Product detail images load
- [ ] Admin product images load
- [ ] No broken image links

### Mobile Tests
- [ ] Test on iPhone (375px width)
- [ ] Test on iPad (768px width)
- [ ] Test on Android (360px width)
- [ ] All buttons clickable
- [ ] All forms responsive
- [ ] Navigation works on mobile

---

## 🐛 TROUBLESHOOTING

### Images not loading?
- Check Firebase Storage permissions
- Verify image URLs in database
- Check browser console for errors
- Clear browser cache

### Cart not saving?
- Check browser localStorage
- Verify Firebase connection
- Check user authentication status
- Look for errors in console

### Push notifications not working?
- Enable notifications in browser
- Check FCM configuration
- Verify service worker is loaded
- Check browser DevTools > Application > Service Workers

### Email/OTP not arriving?
- Check SendGrid API key
- Verify email domain is verified in SendGrid
- Check spam folder
- Check SendGrid activity log

### Login/Signup issues?
- Verify Firebase Auth is enabled
- Check email format
- Verify password meets requirements
- Check user doesn't already exist
- Look at Firebase Console > Authentication > Users

---

## 📱 FLOATING BUTTONS

### WhatsApp Button (Right Bottom)
- Click to open WhatsApp chat
- Green button with WhatsApp icon
- Always visible on right side
- Links to: https://wa.me/923001234567

### Cart Button (Right Bottom)
- Click to go to cart page
- #FFD600 (Brand yellow) button
- Shows cart item count
- Above WhatsApp button

---

## 🎨 BRAND COLORS

```css
/* Primary (Brand Yellow) */
#FFD600 - Main buttons, highlights, accents

/* Secondary (Black) */
#000000 - Text, headers, navbar background

/* Accent (Orange) */
#FF6B35 - Secondary buttons, hover states

/* Neutral */
#F8FAFC - Background
#94A3B8 - Secondary text
#475569 - Body text
#FFFFFF - Card backgrounds
```

---

## 📂 IMPORTANT FILES TO UPDATE

```
✅ .env.local - Add all environment variables
✅ lib/firebase.ts - Firebase initialization (create)
✅ lib/auth-context.tsx - Update with Firebase Auth
✅ lib/email-service.ts - SendGrid integration (create)
✅ app/layout.tsx - Add providers wrapper
✅ app/login/page.tsx - Update with OTP flow
✅ app/signup/page.tsx - Create with address collection
✅ app/cart/page.tsx - Create cart page
✅ app/checkout/page.tsx - Create checkout
✅ app/order-confirmation/page.tsx - Create confirmation
✅ tailwind.config.ts - Update with brand colors
```

---

## 🔄 NEXT STEPS

1. **Copy test credentials above**
2. **Create `.env.local` file** with Firebase keys
3. **Run `npm run dev`**
4. **Test signup with client account**
5. **Test login with admin account**
6. **Verify Firebase is connected**
7. **Start building features**

---

## 📞 API KEY SOURCES

| Service | Source |
|---------|--------|
| Firebase | https://console.firebase.google.com |
| SendGrid | https://app.sendgrid.com/settings/api_keys |
| Twilio | https://www.twilio.com/console |
| Stripe | https://dashboard.stripe.com/apikeys |

---

**Ready to start building! 🚀**

