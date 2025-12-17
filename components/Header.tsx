import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import Button from './UI/Button';
import { DEFAULT_CURRENCY } from '../data/mockData';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, cartSubtotal, setFilterState, products, availableCategories } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const searchRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live Search Logic
  useEffect(() => {
    if (searchTerm.length > 2) {
      const results = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5); // Limit to 5 results
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, products]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Clear existing filters and apply only search
    setFilterState({
        category: '',
        minPrice: 0,
        maxPrice: 50000,
        brand: [],
        searchQuery: searchTerm,
        filterSearchQuery: ''
    });
    setSearchResults([]);
    setSearchTerm(''); // Clean search bar after submit
    navigate('/shop');
  };

  const handleResultClick = () => {
    setSearchResults([]);
    setSearchTerm(''); // Clean search bar after click
  };

  return (
    <>
      {/* Top Bar Announcement */}
      <div className="bg-main text-white text-xs py-2 px-4 flex justify-between items-center z-50 relative">
        <p className="animate-pulse">Limited Time: Extra 10% Off on Pre-Paid Orders!</p>
        <div className="flex gap-4">
          <span className="cursor-pointer hover:text-accent font-bold">Join Community</span>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 w-full z-40 transition-all duration-300 border-b border-gray-100 ${isScrolled ? 'bg-white/95 backdrop-blur-md py-3 shadow-sm' : 'bg-white py-5'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between gap-8">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tight uppercase">Omni<span className="text-accent">Luxe</span></Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium hover:text-accent transition-colors">Home</Link>
            <div className="group relative">
                <Link to="/shop" className="text-sm font-medium hover:text-accent transition-colors py-4">Shop</Link>
                {/* Mega Menu Dropdown */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-8 grid grid-cols-3 gap-6 rounded-b-lg">
                    <div>
                        <h4 className="font-bold mb-4 text-xs uppercase text-gray-400">Top Categories</h4>
                        <ul className="space-y-2">
                            {availableCategories.slice(0, 5).map(cat => (
                                <li key={cat}>
                                    <button onClick={() => { setFilterState(prev => ({...prev, category: cat})); navigate('/shop'); }} className="text-sm hover:text-accent hover:translate-x-1 transition-transform block text-left">
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                         <h4 className="font-bold mb-4 text-xs uppercase text-gray-400">Collections</h4>
                         <ul className="space-y-2 text-sm">
                            <li className="hover:text-accent cursor-pointer">New Arrivals</li>
                            <li className="hover:text-accent cursor-pointer">Best Sellers</li>
                         </ul>
                    </div>
                </div>
            </div>
          </nav>

          {/* Search Bar */}
          <form ref={searchRef} onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-sm relative">
            <input 
                type="text" 
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-secondary border-none rounded-full py-2 px-4 pl-10 text-sm focus:ring-1 focus:ring-accent outline-none text-main placeholder-gray-400"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            
            {/* Live Search Results */}
            {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-xl mt-2 rounded-lg border border-gray-100 overflow-hidden z-50">
                    {searchResults.map(p => (
                        <Link 
                            key={p.id} 
                            to={`/product/${p.id}`} 
                            onClick={handleResultClick}
                            className="flex items-center gap-4 p-3 hover:bg-gray-50 transition-colors border-b last:border-0"
                        >
                            <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded" />
                            <div>
                                <p className="text-sm font-medium line-clamp-1">{p.name}</p>
                                <p className="text-xs text-accent font-bold">{DEFAULT_CURRENCY}{p.price}</p>
                            </div>
                        </Link>
                    ))}
                    <button onClick={handleSearchSubmit} className="w-full text-center text-xs py-2 text-gray-500 hover:text-main">
                        View all results
                    </button>
                </div>
            )}
          </form>

          {/* Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button 
                className="hover:text-accent transition-colors relative"
                onClick={() => setIsCartOpen(true)}
            >
                <ShoppingBag size={20} />
                {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                        {cart.length}
                    </span>
                )}
            </button>
            <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mini Cart Drawer */}
      <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />
        <div className={`relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
                <h2 className="text-xl font-bold">Shopping Cart ({cart.length})</h2>
                <button onClick={() => setIsCartOpen(false)} className="hover:text-red-500"><X size={24} /></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20">Your cart is empty.</div>
                ) : (
                    cart.map((item, idx) => (
                        <div key={`${item.id}-${idx}`} className="flex gap-4">
                            <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded bg-gray-50" />
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-medium line-clamp-1">{item.name}</h4>
                                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                                </div>
                                <p className="text-sm text-gray-500">{item.selectedColor} / {item.selectedSize}</p>
                                <div className="flex justify-between items-center mt-3">
                                    <span className="font-medium text-accent">{DEFAULT_CURRENCY}{item.price}</span>
                                    <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="p-6 border-t border-gray-100 bg-secondary">
                <div className="flex justify-between mb-4 text-lg font-bold">
                    <span>Subtotal</span>
                    <span>{DEFAULT_CURRENCY}{cartSubtotal}</span>
                </div>
                <Button fullWidth onClick={() => { setIsCartOpen(false); navigate('/checkout'); }}>Checkout Now</Button>
            </div>
        </div>
      </div>

       {/* Mobile Menu Overlay */}
       {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 p-6 lg:hidden">
             <div className="flex justify-between items-center mb-8">
                 <span className="text-2xl font-bold">Menu</span>
                 <button onClick={() => setIsMobileMenuOpen(false)}><X size={24}/></button>
             </div>
             <nav className="flex flex-col gap-6 text-xl">
                 <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                 <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
                 {availableCategories.map(cat => (
                     <span key={cat} className="ml-4 text-base text-gray-500" onClick={() => {
                        setFilterState(prev => ({...prev, category: cat})); 
                        navigate('/shop');
                        setIsMobileMenuOpen(false);
                     }}>{cat}</span>
                 ))}
             </nav>
        </div>
       )}
    </>
  );
};

export default Header;