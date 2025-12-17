# OmniLuxe Replication & Generation Guide

This document serves as a "Black Box" manual for this codebase. It contains the context of our development process and a **Master Prompt** you can use to generate similar high-quality e-commerce templates for different niches (e.g., Electronics, Skincare, Furniture) using this exact architecture.

---

## 1. Project Context & Philosophy
We built **OmniLuxe**, a production-ready, highly adaptable e-commerce template.

**Key Technical Decisions:**
- **Tech:** React 18 (Vite), Tailwind CSS, GSAP, Lucide Icons.
- **State:** React Context API (`ShopContext`) + Cookies for persistence.
- **Design:** "Luxury Minimalist" (Heavy whitespace, typography focus, 'Manrope' font).
- **Logic:** 
  - **Omni-Filter:** A centralized filtering hook that handles Category + Price + Brand + Search simultaneously.
  - **WhatsApp Checkout:** Bypasses complex backend payment gateways by generating a pre-filled WhatsApp message for order completion.
  - **Mock Data Layer:** All data drives from `mockData.ts` or an API, making the template niche-agnostic.

---

## 2. The Master Prompt
To generate a new version of this site for a different brand, copy the text between the lines below and paste it into an AI coding assistant.

**Instructions:**
1. Replace `[Bracketed Text]` with your specific needs.
2. Keep the technical stack requirements to ensure code quality matches OmniLuxe.
3. **API Integration:** The prompt now explicitly asks for a data adapter, so you can easily plug in your own API URL and map your specific JSON fields (like `product_name` vs `name`) without rewriting the whole app.

---

### [COPY FROM HERE]

**Role:** Act as a Lead Frontend Architect and Creative Director. You are an expert in React 18, Tailwind CSS, GSAP Animations, and Conversion Rate Optimization (CRO).

**Objective:** Build a complete, production-ready E-Commerce Web Application.
**Constraint:** The architecture must strictly follow the specifications below (Logic Layer), but the visual design must be creatively adapted to match the specific **Brand Identity** defined below (Visual Layer).

---

### PART 1: BRAND IDENTITY & CONFIGURATION (USER INPUT)

**1. Project Metadata:**
*   **Brand Name:** `[INSERT BRAND NAME]` (e.g., "NeonDrift", "PurePetals", "IronForge")
*   **Niche/Industry:** `[INSERT NICHE]` (e.g., Cyberpunk Streetwear, Organic Skincare, Heavy Industrial Tools)
*   **Target Audience:** `[INSERT AUDIENCE]` (e.g., Gen Z Gamers, Eco-conscious Moms, Professional Contractors)

**2. Visual Aesthetic (The "Vibe"):**
*   **Design Style:** `[INSERT STYLE]` (e.g., "Brutalist & High Contrast", "Soft & Airy Minimalist", "Dark Mode Futuristic")
*   **Key Visual Elements:** `[INSERT ELEMENTS]` (e.g., "Rounded corners and drop shadows", "Sharp edges and neon borders", "Glassmorphism and gradients")

**3. Color Palette (Tailwind Configuration):**
*   **Primary (Background):** `[HEX CODE]`
*   **Secondary (Sections/Cards):** `[HEX CODE]`
*   **Main (Text/Borders):** `[HEX CODE]`
*   **Accent (Brand Color):** `[HEX CODE]`
*   **Accent Hover:** `[HEX CODE]`

**4. Typography:**
*   **Font Family:** `[INSERT FONT NAME]` (Must be a Google Font, e.g., 'Inter', 'Playfair Display', 'Space Mono').

---

### PART 2: TECHNICAL STACK (STRICT)

*   **Framework:** React 18+ (Vite)
*   **Language:** TypeScript (Strict Mode)
*   **Styling:** Tailwind CSS (configured with the palette above)
*   **Animation:** GSAP (ScrollTrigger, Tween) - *Animations must match the Design Style (e.g., smooth for luxury, snappy for tech).*
*   **State:** React Context API (`ShopContext`)
*   **Icons:** Lucide-React
*   **Persistence:** Vanilla Cookies (`utils/storage.ts`)

---

### PART 3: FUNCTIONAL LOGIC SPECIFICATIONS (THE "BRAIN")

You must implement the following logic features exactly as described:

**1. The API Data Adapter (Crucial for Reusability):**
*   In `context/ShopContext.tsx`, you must implement a `mapApiDataToProduct(data: any): Product` function.
*   **Requirement:** The app must fetch from a configurable `API_ENDPOINT`. The adapter must handle the transformation of raw API data into the app's internal `Product` interface.
*   **Fallback:** If the API fails, the app must silently switch to the `mockData` array.

**2. "Dirty Data" Normalization Engine:**
*   In `data/mockData.ts`, define `BRAND_RULES` and `CATEGORY_RULES` objects.
    *   *Keys:* Clean, Canonical Names (e.g., "Nike").
    *   *Values:* Arrays of dirty substrings/prefixes (e.g., `["nik", "nke", "air max"]`).
*   **Logic:** Implement a `normalizeData` function. It must:
    - Replace `+` characters with spaces.
    - Safely wrap `decodeURIComponent` in a try-catch to prevent "URI malformed" errors from literal `%` characters.
    - **Strict Matching:** Use exact string comparison (`===`) after lowercasing and trimming both the input and the rule variants. This prevents generic terms like "Shoes" from capturing specific categories like "Women's Shoes". Do not use `.includes()`.

**3. The Omni-Filter:**
*   A single `useShop` hook that exposes a `filteredProducts` array.
*   It must filter by **Category**, **Price Range**, **Brand** (Multi-select), and **Search Query** simultaneously.
*   **Smart Search:** If I search "Red Shoes", it should check product names, categories, and brands.

**4. WhatsApp Checkout System:**
*   No backend payment gateway.
*   The checkout button generates a deep link (`wa.me`) containing a pre-filled WhatsApp message with: Item List, Sizes, Quantities, Subtotal, and the User's Shipping Details.

---

### PART 4: UI/UX & COMPONENT ARCHITECTURE (THE "BODY")

*Style these components according to the **Visual Aesthetic** defined in Part 1.*

**1. Global Layout:**
*   **Header:** Responsive. Contains Logo, Nav, Search Bar (with live dropdown results), Cart Icon (with badge), and Mobile Menu toggle.
*   **Cart Drawer:** slides in from the right. Shows items, quick delete, and "Checkout" button.
*   **Footer:** Links to Shop, Legal Pages, Socials, and Newsletter signup.

**2. Page Views:**

*   **`Home.tsx`:**
    *   **Hero Section:** High-impact introduction. Use GSAP to animate elements on load.
    *   **Infinite Ticker:** A marquee band scrolling brand names or USPs.
    *   **Category Grid:** Visual navigation to specific filtered shop views.
    *   **Best Sellers:** Horizontal scroll section (hide scrollbars).
    *   **New Arrivals:** A grid of the latest items.

*   **`Shop.tsx`:**
    *   **Sidebar:** Contains Filters (Search within results, Categories list, Price Range slider, Brand checkboxes).
    *   **Grid:** Responsive Product Cards.
    *   **Pagination:** A "Load More" button or Infinite Scroll trigger.

*   **`ProductDetails.tsx` (PDP):**
    *   **Gallery:** Main image + Thumbnails.
    *   **Configurator:** Size selector, Color selector, Quantity stepper.
    *   **Smart Recommendations:** A "You May Also Like" section that finds items in the same Category first, then falls back to the same Brand.

*   **`Checkout.tsx`:**
    *   Simple form (Name, Address, Phone).
    *   Order Summary sidebar.
    *   **Action:** "Confirm Order on WhatsApp" button.

*   **`StyleGuide.tsx` (Mandatory):**
    *   A documentation page rendering all atomic components (Buttons, Inputs, Colors, Typography) and the Product Card.
    *   Include a "Customization Manual" text block explaining how to change the theme colors in `tailwind.config`.

---

### PART 5: IMPLEMENTATION ORDER

Please generate the code in the following order. Ensure all files are complete.

1.  **`index.html`** (Include Fonts & Tailwind Config script).
2.  **`types.ts`** (Product, CartItem, FilterState).
3.  **`data/mockData.ts`** (Mock Products, Normalization Rules, API Config).
4.  **`utils/storage.ts` & `utils/whatsapp.ts`** (Helpers).
5.  **`context/ShopContext.tsx`** (State, Logic, API Adapter).
6.  **`components/UI/Button.tsx`** (Themed buttons).
7.  **`components/ProductCard.tsx`** (Themed card with hover effects).
8.  **`components/Header.tsx`** & **`components/Footer.tsx`**.
9.  **`pages/Home.tsx`** (Apply GSAP & Theme).
10. **`pages/Shop.tsx`**, **`pages/ProductDetails.tsx`**, **`pages/Checkout.tsx`**.
11. **`pages/StyleGuide.tsx`**.
12. **`App.tsx`** (Routing).

**[END OF COPY]**