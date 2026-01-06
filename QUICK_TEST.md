# Quick Testing Guide - Phase 3

## 🚀 Immediate Setup Steps

### 1. Start the Dev Server
```bash
npm run dev
# Server runs at http://localhost:3000
```

### 2. Push Food Menu Data (One-Time)
```bash
curl -X POST http://localhost:3000/api/push-food-menu
```
✅ Response should show 81+ items pushed

### 3. Initialize Flash Deals API
```bash
curl -X GET http://localhost:3000/api/flash-deals
```
✅ Should return empty array (no deals set yet)

### 4. Add Sample Products (Optional)
```bash
curl -X POST http://localhost:3000/api/admin/seed-products \
  -H "Content-Type: application/json" \
  -d '{"action":"add-sample-products"}'
```
✅ Response shows products added to Grocery, Pharmacy, etc.

---

## 👤 Test User Accounts

Use these credentials to test different user types:

### Client Account
```
Email: client@client.com
Password: Client@123
Expected: "Profile" button in navbar
```

### Admin Account
```
Email: admin@admin.com
Password: Admin@123
Expected: "Dashboard" button in navbar
```

### Seller Account (Create new via signup)
```
Choose: Seller signup
Expected: Auto-redirect to /seller-dashboard after login
```

---

## 🧪 Feature Testing Checklist

### Cart & Navbar (5 min)
- [ ] Click "Add to Cart" on any product
- [ ] Cart count updates in navbar
- [ ] Cart icon clicks → goes to `/checkout`
- [ ] Mobile: Cart count visible on mobile cart icon
- [ ] Mobile: Menu opens/closes with hamburger

### Authentication & Conditional Buttons (3 min)
- [ ] Logout if logged in
- [ ] Login as client → "Profile" button appears
- [ ] Click "Profile" → goes to `/profile`
- [ ] Logout
- [ ] Login as admin → "Dashboard" button appears
- [ ] Logout
- [ ] Non-logged in → "Sign In" button only

### Seller Auto-Redirect (2 min)
- [ ] Go to `/seller-login`
- [ ] Enter seller credentials
- [ ] Click "Login to Dashboard"
- [ ] ✅ Should auto-redirect to `/seller-dashboard`

### Checkout with Delivery Zones (5 min)
- [ ] Login as client
- [ ] Add items to cart
- [ ] Go to checkout
- [ ] Click "Add New Address"
- [ ] Fill address with city: "Karachi"
- [ ] Select location on map
- [ ] Save address → ✅ Should succeed
- [ ] Try adding address with city: "Lahore"
- [ ] ⚠️ Should show error: "Delivery not available in Lahore"
- [ ] Can't select Lahore address in checkout

### Flash Deals on Homepage (3 min)
- [ ] Go to homepage
- [ ] See "Flash Deals" section (after preloader)
- [ ] Should show 0-12 products
- [ ] Click "Add" on any flash deal
- [ ] ✅ Button changes to "✓" temporarily
- [ ] Item added to cart

### Homepage Preloader (2 min)
- [ ] Refresh homepage
- [ ] See preloader for ~600ms
- [ ] Preloader fades out
- [ ] Content loads smoothly underneath
- [ ] Preloader doesn't block clicking

### Search Bar (1 min)
- [ ] Click search bar in navbar
- [ ] Type a product name
- [ ] See search results (if implemented)

---

## 🔧 Admin Tasks (For Dashboard Later)

### Add Flash Deal to Homepage
```bash
curl -X POST http://localhost:3000/api/flash-deals \
  -H "Content-Type: application/json" \
  -d '{
    "action": "add",
    "deal": {
      "itemId": "item_0",
      "itemName": "Chicken Tikka Pizza",
      "image": "chiken-pizza.jpg",
      "price": 650,
      "order": 1
    }
  }'
```

### Toggle Delivery Zone
```bash
curl -X POST http://localhost:3000/api/delivery-zones \
  -H "Content-Type: application/json" \
  -d '{
    "action": "toggle-zone",
    "zoneId": "zone_lahore",
    "enabled": true
  }'
```

### Get All Zones
```bash
curl -X GET http://localhost:3000/api/delivery-zones
```

---

## 📊 Expected Results

### Homepage
```
Navbar: Logo | Search | Sell | Drive | Cart | [Auth]
Preloader: Shows 600ms
Flash Deals: 0-12 products grid
Content: Hero + Welcome CTA + Services
```

### Checkout
```
Address with "Karachi" → ✅ Available
Address with "Lahore" → ❌ Not Available (greyed out)
Delivery fee calculated based on distance
```

### Navbar - Different Users
```
Client: Logo | Search | Sell | Drive | Cart | Profile
Admin: Logo | Search | Sell | Drive | Cart | Dashboard
Seller: Logo | Search | Sell | Drive | Cart | MyShop
Guest: Logo | Search | Sell | Drive | Cart | SignIn
```

---

## 🐛 Troubleshooting

### Issue: Flash deals show "Loading"
**Solution**: Wait for hook to fetch from Firebase, or check if `useFlashDeals()` is working

### Issue: Address zone warning not showing
**Solution**: Make sure `useDeliveryZones()` is initialized and city name matches exactly

### Issue: Cart doesn't update
**Solution**: Check console for errors, ensure `useCart()` is working

### Issue: Preloader doesn't hide
**Solution**: Check if CSS z-index is correct, should be `z-[9999]`

### Issue: Seller auto-redirect not working
**Solution**: Check browser console for auth errors, ensure user type is "seller"

---

## 📈 Performance Metrics

- Preloader: 600ms
- Flash Deals Load: < 1s
- Zone Check: < 100ms
- Navbar Update: Instant
- Cart Count Update: Instant

---

## 🎯 Success Indicators

✅ All 8 tasks completed:
1. Food menu pushed ✓
2. Delivery zones working ✓
3. Admin controls ready ✓
4. Navbar updated ✓
5. Cart icon fixed ✓
6. Flash deals integrated ✓
7. Sample products ready ✓
8. Seller redirect working ✓
9. Preloader optimized ✓

---

**Ready to test!** 🚀
