export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  salePrice?: number;
  rating: number;
  reviews: number;
  brand: string;
  colors: string[];
  sizes: string[];
  image: string;
  images: string[]; // Added for gallery
  hoverImage: string;
  description: string;
  tags: string[];
  stock: number;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  brand: string[];
  searchQuery: string;
  filterSearchQuery: string; // New field for searching within filters
}

export interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  content: string;
  verified: boolean;
  helpful: number;
}