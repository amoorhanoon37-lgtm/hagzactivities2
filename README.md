# HagzActivities — Cairo Recreational Activity Booking Engine

An ultra-premium, mobile-first web application designed for discovering and instantly booking recreational activities in Greater Cairo (Bowling, Billiards & Pool, Go-Karting, PlayStation / Gaming Lounges, Escape Rooms, and Ping Pong) with zero phone calls or WhatsApp friction.

Built according to the **Flexora Design System**, the **Product Requirements Specification**, and the **100% Audit Remediation Plan**.

---

## 🌟 Key Features

### 1. Egyptian Payment Rails
- **Mobile Wallets**: Vodafone Cash, Orange Cash, Etisalat Cash, WE Pay with Egyptian phone number (`010/011/012/015`) validation.
- **InstaPay**: Instant Transfers via `@instapay` IPA address handle or National Payments QR.
- **Meeza / Credit Cards**: 3D-Secure local debit and credit cards.
- **Apple Pay**: Biometric 1-tap checkout.

### 2. Loyalty Rewards Program (Exact Math & UI)
- **Earning Formula**: For every **50 EGP** paid, earn **100 points**.
- **Redemption Formula**: Every **100 points** = **1.00 EGP** discount.
- **Minimum Threshold**: Minimum redeemable discount is **10 EGP** (1,000 points).
- **Interactive UI**: Accordion toggle, warning banner (`⚠️ Use points or a promo code — not both`), percentage quick-chips (`[25%]`, `[50%]`, `[75%]`, `[100%]`), numeric point input, and transparent price breakdown deduction.

### 3. Multi-Step "Suggest a Place" Flow
- Accessible from Header, Explore screen, and Profile.
- **Step 1**: Role selection modal — *"Are you the venue owner or a customer suggesting a spot?"*
- **Step 2**: Conditional validation:
  - **Owner**: All fields mandatory (Venue Name, Category, Cairo District, Exact Street Address, Google Maps link, Egyptian Phone Number `010/011/012/015`, Business Email).
  - **Customer**: Only Venue Name and District are required; address, maps link, phone, and email are optional.

### 4. Bookings Hub & Passbook
- Tabbed segmentation: **Upcoming**, **Past**, and **Cancelled** bookings.
- **Live Scannable QR Codes** generated dynamically with booking reference copy-to-clipboard.
- **Tiered Cancellation Policy Modal**:
  - `> 24 hours` before booking: **100% refund**.
  - `4 - 24 hours` before booking: **50% refund**.
  - `< 4 hours` before booking: **Non-refundable**.
- **Verified 5-Star Review Modal**: Leave ratings on cleanliness, equipment, staff, value, and comments for past completed bookings.

### 5. Flexora Design Tokens
- **Background**: Dark Espresso `#0F0503`
- **Surface**: Card Surface `#29211F`
- **Primary Accent**: Safety Orange `#F96A24`
- **Secondary Accent**: Neon Lime `#F0F66E`
- **Typography**: Anton (Display Uppercase) & Inter Tight (Body/UI)
- **Bottom Dock**: 72px fixed dock with twin safety-orange indicator dots

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build production bundle
npm run build
```

---

## 📜 Egyptian E-Commerce Compliance
© 2026 HagzActivities Egypt. All rights reserved. Registered recreational activity marketplace under Egyptian E-Commerce Law No. 151/2020. Powered by Flexora Engine.
