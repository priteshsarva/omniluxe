import { Product } from '../types';

export const WHATSAPP_NUMBER = "919876543210"; 
export const MARKUP_PERCENTAGE = 1.20; 
export const DEFAULT_CURRENCY = "₹";
export const ENABLE_INFINITE_SCROLL = false;

export const API_ENDPOINT = 'https://kicksmaniaserver.onrender.com/product/all?result=9999';

export const BRAND_RULES: Record<string, string[]> = {
  "Nike": ["nik", "nke", "air max", "jordan", "jumpman", "Nike"],
  "Adidas": ["adi", "das", "yeezy", "samba", "gazelle", "superstar", "Adidas"],
  "Puma": ["pum", "Puma"],
  "Reebok": ["ree", "rbk", "Reebok"],
  "New Balance": ["new", "bal", "nb", "550", "9060", "2002r", "New Balance"],
  "Asics": ["asi", "onitsuka", "tiger", "Asics"],
  "Versace": ["ver", "Versace"],
  "Gucci": ["guc", "Gucci"],
  "Balenciaga": ["bal", "Balenciaga"],
  "Louis Vuitton": ["lou", "lv", "vuitton", "Louis Vuitton"],
  "Vans": ["van", "old skool", "Vans"],
  "Converse": ["con", "chuck", "Converse"],
  "Crocs": ["croc", "clog", "Crocs"],
  "Under Armour": ["under", "armour", "ua", "Under Armour"],
  "Skechers": ["skech", "Skechers"],
  "Bata": ["bata", "Bata"],
  "Timberland": ["timb", "Timberland"],
  "Lacoste": ["lacoste", "Lacoste"]
};

/**
 * CATEGORY RULES
 * Order matters! However, with exact matching, the order is less critical 
 * for correctness but helpful for performance.
 */
export const CATEGORY_RULES: Record<string, string[]> = {
  "Women's Shoe": [
    "WOMANS+SHOES", "Women Sports Shoes", "Women's Kick", "womens", "Ladies Shoes",
    "Women's Shoes", "shoes+for+women", "shoes+for+girls", "Shoe for girls", "PREMIUM+HEELS",
    "Shoes For Her", "Womans shoes", "women shoes", "Womens+Shoes", "women%27s+%26+men%27s+",
    "Womens's Sneakers", "WOMEN’S SHOES", "Women’s Shoes", "Women’s Footwear", "WOMENS SHOES",
    "DIWALI+WOMEN+SELL", "Ladies+Shoes", "womens Kicks"
  ],
  "Slides/Crocs": [
    "FLIPFLOP", "Flipflops/Crocs", "Flip+flops", "Flip-Flop", "Foam&Slide&Crocs",
    "Crocs+", "CROCS+SLIDE", "slide+", "crocs+%2B+slide+", "Crocs", "crocs+%2B+slide",
    "Flip-flops & Slides", "Birkenstock slide", "Slides+", "crocs", "FLIP/FLOPS",
    "Flip-flop", "Flipflops", "FLIP FLOP / SANDALS", "Flip Flops", "FlipFlop & CLOG",
    "flip flops", "Flip Flops & Crocs"
  ],
  "Formal": [
    "Loafers Or Formals", "Formals", "Party Wear Shoes"
  ],
  "UA Quality": [
    "UA+QUALITY+SHOE", "UA QUALITY SHOES", "Men Sports Shoes", "wall+Clock",
    "UA+Quality+Shoes", "Premium Shoes", "UA Quality", "Bottle", "Premium Shoe",
    "UA+Models", "UA+QUALITY+SHOES", "Ua Quality", "Premium Article", "Premium kicks"
  ],
  "Men's Shoe": [
    "MENS+SHOES", "EID SALE", "Exclusive Offer", "Diwali Dhamaka Sale", "Winter+Dhamaka+Sale",
    "Men's Kick", "Diwali Special Sale", "PREMIUM SHOES", "Biggest Sale", "Diwali sale shoes",
    "End Of Season Sale", "Shoes", "Diwali Offer 2022", "Men's shoes", "shoes+for+men",
    "Shoe for men", "Biggest sale 2025", "DIWALI SALE", "Shoes for Men", "MENS SHOES",
    "DIWALI+SALE+", "Men’s Shoes", "Bumper Sale", "Diwali Sale", "Mens+Shoes",
    "Mega Sale", "Mens's Sneakers", "Men Shoes", "Sale Product", "Slides-Crocs",
    "Sale Products", "MEN’S SHOES", "SPECIAL SALE", "Men’s Footwear", "sell+itam",
    "DIWALI+MEN+", "Sale", "Onitsuka+Tiger+Models", "MENS KICKS", "Sale Article"
  ],
  "Accessories": [
    "Casual Shoes", "KeyChain", "BAG PACK", "Hoodie Unisex", "50% Off", "Lace", 
    "Bags", "Hand bags", "Jackets", "FORMAL", "LOFFER", "mojdi", "long+boots", 
    "SANDAL", "SPORTS", "Belt+", "Wallet+", "Sport Jersey", "Loafer/Formal Shoes", 
    "Yeezy Foam Runner", "SALE % SALE % SALE", "T-Shirts", "Travelling Bags", "Wallet", 
    "Belts", "Hoodies", "Clothing", "SALE", "Mens Accessories", "Mens Watch", "Cap", 
    "Accessories", "Stoles"
  ]
};

/**
 * Normalizes dirty API strings into clean Canonical Keys using strict exact matching.
 */
export const normalizeData = (raw: string | undefined | null, rules: Record<string, string[]>): string => {
  if (!raw) return "Other";
  
  // Replace URL-style pluses with spaces first
  let cleanRaw = raw.replace(/\+/g, ' ');
  
  // Safely attempt to decode URI components
  try {
    cleanRaw = decodeURIComponent(cleanRaw);
  } catch (e) {
    // If decoding fails, we use the current string as-is
  }
  
  // Strict lowercase and trim for the comparison
  const normalizedInput = cleanRaw.toLowerCase().trim();

  // Iterate through all rules to find an EXACT match
  for (const [canonical, variants] of Object.entries(rules)) {
    for (const variant of variants) {
      let cleanVariant = variant.replace(/\+/g, ' ');
      try {
        cleanVariant = decodeURIComponent(cleanVariant);
      } catch (e) {}
      
      const normalizedVariant = cleanVariant.toLowerCase().trim();
      
      // Perform strict exact match comparison
      if (normalizedInput === normalizedVariant) {
        return canonical;
      }
    }
  }
  
  return "Other"; 
};

export const mapApiDataToProduct = (item: any): Product => {
    let parsedImages: string[] = [];
    try {
        parsedImages = JSON.parse(item.imageUrl);
    } catch (e) {
        parsedImages = item.featuredimg ? [item.featuredimg] : [];
    }

    let parsedSizes: string[] = [];
    try {
        parsedSizes = JSON.parse(item.sizeName);
    } catch (e) {
        parsedSizes = ["UK 7", "UK 8", "UK 9"];
    }

    const price = Math.round((item.productOriginalPrice || 2500) * MARKUP_PERCENTAGE);

    // Normalize using our clean Keys with strict exact matching
    const normalizedBrand = normalizeData(item.productBrand, BRAND_RULES);
    const normalizedCategory = normalizeData(item.catName, CATEGORY_RULES);

    return {
      id: item.productId.toString(),
      name: item.productName,
      category: normalizedCategory, // Store the CLEAN Key
      price: price,
      salePrice: undefined,
      rating: 4.5,
      reviews: Math.floor(Math.random() * 100),
      brand: normalizedBrand, // Store the CLEAN Key
      colors: [], 
      sizes: parsedSizes,
      image: item.featuredimg || 'https://via.placeholder.com/300',
      images: parsedImages,
      hoverImage: parsedImages.length > 1 ? parsedImages[1] : (item.featuredimg || 'https://via.placeholder.com/300'),
      description: item.productDescription || item.productShortDescription || item.productName,
      tags: [normalizedCategory, normalizedBrand],
      stock: 20,
      isNew: Math.random() > 0.8 
    };
};

export const CATEGORIES = Object.keys(CATEGORY_RULES); 
export const BRANDS = Object.keys(BRAND_RULES); 
export const PRODUCTS: Product[] = [];
