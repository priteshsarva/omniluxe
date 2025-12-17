import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { Product, CartItem, FilterState } from '../types';
import { setCookie, getCookie } from '../utils/storage';
import { 
  API_ENDPOINT, 
  mapApiDataToProduct, 
  BRAND_RULES, 
  CATEGORY_RULES, 
  normalizeData 
} from '../data/mockData';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filteredProducts: Product[];
  cartSubtotal: number;
  isLoading: boolean;
  availableBrands: string[];
  availableCategories: string[];
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState('featured');
  const [filterState, setFilterState] = useState<FilterState>({
    category: '',
    minPrice: 0,
    maxPrice: 50000,
    brand: [],
    searchQuery: '',
    filterSearchQuery: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        const mappedProducts: Product[] = data.map(mapApiDataToProduct);
        setProducts(mappedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const savedCart = getCookie('omni_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart cookie", e);
      }
    }
  }, []);

  useEffect(() => {
    setCookie('omni_cart', JSON.stringify(cart), 7);
  }, [cart]);

  const addToCart = (product: Product, quantity: number, color?: string, size?: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedColor === color && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedColor === color && item.selectedSize === size)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity, selectedColor: color, selectedSize: size }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  /**
   * EXTRACT AVAILABLE BRANDS
   * We only show Keys from BRAND_RULES that have at least one product.
   */
  const availableBrands = useMemo(() => {
    const ruleKeys = Object.keys(BRAND_RULES);
    return ruleKeys.filter(key => products.some(p => p.brand === key)).sort();
  }, [products]);

  /**
   * EXTRACT AVAILABLE CATEGORIES
   * We only show Keys from CATEGORY_RULES that have at least one product.
   */
  const availableCategories = useMemo(() => {
    const ruleKeys = Object.keys(CATEGORY_RULES);
    return ruleKeys.filter(key => products.some(p => p.category === key)).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchCategory = filterState.category ? p.category === filterState.category : true;
      const matchPrice = p.price <= filterState.maxPrice; 
      const matchBrand = filterState.brand.length > 0 ? filterState.brand.includes(p.brand) : true;
      
      let matchGlobalSearch = true;
      if (filterState.searchQuery) {
        const cleanQuery = filterState.searchQuery.toLowerCase().trim();
        matchGlobalSearch = 
            p.name.toLowerCase().includes(cleanQuery) || 
            p.brand.toLowerCase().includes(cleanQuery) ||
            p.category.toLowerCase().includes(cleanQuery);
      }

      const matchFilterSearch = filterState.filterSearchQuery
        ? p.name.toLowerCase().includes(filterState.filterSearchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(filterState.filterSearchQuery.toLowerCase())
        : true;

      return matchCategory && matchPrice && matchBrand && matchGlobalSearch && matchFilterSearch;
    });

    return result.sort((a, b) => {
      switch (sortOption) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'featured':
        default:
          return b.rating - a.rating; 
      }
    });
  }, [products, filterState, sortOption]);

  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <ShopContext.Provider value={{
      products,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      filterState,
      setFilterState,
      sortOption,
      setSortOption,
      isCartOpen,
      setIsCartOpen,
      filteredProducts,
      cartSubtotal,
      isLoading,
      availableBrands,
      availableCategories
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used within a ShopProvider");
  return context;
};
