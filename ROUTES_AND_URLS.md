# System Routes & URLs

## Public Routes (No Auth Required)

### Authentication
- `/login` - Customer login
- `/signup` - Customer signup
- `/forgot-password` - Password reset
- `/password-reset-success` - Password reset confirmation
- `/two-factor` - 2FA verification

### Seller Authentication
- `/seller-login` - Seller login
- `/seller-signup` - Seller registration/signup

### Shopping
- `/` - Home page
- `/food-hub` - Food hub / Menu browsing
- `/product/[id]` - Product detail page
- `/shop` - Shop page
- `/cart` - Shopping cart
- `/grocery-hub` - Grocery hub
- `/pharmacy-hub` - Pharmacy hub
- `/coming-soon` - Coming soon page

### Support
- `/order-confirmation` - Order confirmation page (after checkout)
- `/product-success` - Product purchase success

---

## Protected Routes (Auth Required)

### Customer Routes
- `/checkout` - Checkout page
- `/profile` - Customer profile
- `/admin-dashboard` - Admin dashboard (admin only)

### Seller Routes
- `/seller-dashboard` - Seller main dashboard (seller only)
- `/seller-dashboard/add-item` - Add menu item (seller only)
- `/seller-dashboard/edit-item/[itemId]` - Edit menu item (seller only)
- `/seller-dashboard/edit-profile` - Edit restaurant profile (seller only)

---

## API Routes (Backend)

### Authentication & Data
- `POST /api/setup-test-users` - Create test users
- `POST /api/sync-firebase` - Sync Firebase data
- `POST /api/sync-products` - Sync products
- `POST /api/update-user-addresses` - Update user addresses

### Food Hub
- `POST /api/push-food-menu` - Push menu items and delivery charges to database

---

## User Type Access Control

### Client (Regular User)
```
✅ Can access: /, /food-hub, /grocery-hub, /pharmacy-hub, /shop, /product/*, /cart, /checkout, /profile
❌ Cannot access: /seller-dashboard, /admin-dashboard
```

### Seller
```
✅ Can access: /food-hub (browsing), /seller-dashboard/*, /profile
❌ Cannot access: /admin-dashboard, /checkout (can't order own items)
```

### Admin
```
✅ Can access: /admin-dashboard, /seller-dashboard (for testing), /food-hub, all customer routes
❌ None - has full access
```

### Superadmin
```
✅ Has full access to everything
```

---

## Environment Configuration

Required `.env` variables:
```
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_DATABASE_URL=...

# Gmail (for OTP)
GMAIL_EMAIL=...
GMAIL_APP_PASSWORD=...

# App
JWT_SECRET=...
SESSION_TIMEOUT=3600
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Test Credentials
TEST_CLIENT_EMAIL=client@client.com
TEST_CLIENT_PASSWORD=Client@123
TEST_ADMIN_EMAIL=admin@admin.com
TEST_ADMIN_PASSWORD=Admin@123
```

---

## Database Structure Overview

### Collections
```
/users/{userId}
  - uid, email, name, phone, userType, addresses[], sellerProfile?, createdAt, updatedAt

/sellers/{userId}
  - sellerId, restaurantName, cuisineType, address, city, phone, description, isActive, registeredAt, updatedAt

/foodMenu/{sellerId}/{itemId}
  - id, name, category, image, price?, sizes?, toppings[], sellerId, isAvailable, createdAt, updatedAt

/products/{productId}
  - For non-food products (grocery, pharmacy, etc.)

/orders/{orderId}
  - Order details, items, status, delivery address, payment method, etc.

/foodHub/deliveryCharges
  - taxPerItem, baseFee, freeDeliveryKm, distanceBased
```

---

## Quick Commands

### Start Development Server
```bash
npm run dev
```

### Push Food Menu Data
```bash
curl -X POST http://localhost:3000/api/push-food-menu
```

### Test URLs
- Local: http://localhost:3000
- Food Hub: http://localhost:3000/food-hub
- Seller Signup: http://localhost:3000/seller-signup
- Seller Dashboard: http://localhost:3000/seller-dashboard
- Checkout: http://localhost:3000/checkout

---

## Test Accounts

### Customer Account
```
Email: client@client.com
Password: Client@123
```

### Admin Account
```
Email: admin@admin.com
Password: Admin@123
```

---

## Important Notes

1. **Seller Status**: New sellers are inactive by default until admin approval
2. **Distance Calculation**: Customers must enter distance at checkout for accurate delivery charges
3. **Multi-Seller**: Food hub combines items from all active sellers
4. **Real-time Updates**: Menu changes reflect immediately in food hub
5. **Toppings**: Optional - sellers don't have to add them
6. **Sizes**: Items can have either fixed price OR multiple sizes, not both

---

## Troubleshooting

### Issue: Can't access seller dashboard
**Solution**: Make sure you're logged in as a seller (userType: 'seller')

### Issue: Menu items not showing in food hub
**Solution**: 
1. Push menu data via `/api/push-food-menu`
2. Make sure items are marked as `isAvailable: true`
3. Check that seller is `isActive: true`

### Issue: Delivery charges not calculating
**Solution**: Enter distance in km at checkout page

### Issue: OTP not received
**Solution**: Check Gmail spam folder, ensure GMAIL credentials are correct in .env
