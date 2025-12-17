import React, { useState, useEffect, useRef } from 'react';
import { Filter, ChevronDown, Grid, List, Loader2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { DEFAULT_CURRENCY, ENABLE_INFINITE_SCROLL } from '../data/mockData';
import Button from '../components/UI/Button';

const Shop: React.FC = () => {
  const { filteredProducts, filterState, setFilterState, sortOption, setSortOption, availableBrands, availableCategories } = useShop();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  
  // Pagination / Load More State
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerTarget = useRef(null);

  // Reset filters on component unmount to ensure fresh state when navigating back
  useEffect(() => {
    return () => {
      setFilterState({
        category: '',
        minPrice: 0,
        maxPrice: 50000,
        brand: [],
        searchQuery: '',
        filterSearchQuery: ''
      });
    };
  }, [setFilterState]);

  // Handle Infinite Scroll
  useEffect(() => {
    if (!ENABLE_INFINITE_SCROLL) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredProducts.length) {
          handleLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [visibleCount, filteredProducts, ENABLE_INFINITE_SCROLL]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterState(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }));
  };

  const toggleBrand = (brand: string) => {
    setFilterState(prev => {
      const newBrands = prev.brand.includes(brand) 
        ? prev.brand.filter(b => b !== brand)
        : [...prev.brand, brand];
      return { ...prev, brand: newBrands };
    });
  };

  const handleLoadMore = () => {
    if (isLoadingMore || visibleCount >= filteredProducts.length) return;
    
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 12);
      setIsLoadingMore(false);
    }, 1000); // 1 Second delay
  };

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
           <h1 className="text-3xl font-bold mb-2">Shop All</h1>
           <p className="text-gray-500">Showing {displayedProducts.length} of {filteredProducts.length} results</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
           <button 
             className="md:hidden flex items-center gap-2 border px-4 py-2 bg-white"
             onClick={() => setShowFiltersMobile(!showFiltersMobile)}
           >
             <Filter size={16} /> Filters
           </button>
           
           <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 border p-1 rounded">
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded ${viewMode === 'grid' ? 'bg-secondary text-main' : 'text-gray-400'}`}
                    >
                        <Grid size={18}/>
                    </button>
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded ${viewMode === 'list' ? 'bg-secondary text-main' : 'text-gray-400'}`}
                    >
                        <List size={18}/>
                    </button>
                </div>
                <div className="relative group border-b border-gray-200">
                    <select 
                        className="appearance-none bg-transparent pr-8 py-1 focus:outline-none cursor-pointer"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="featured">Sort by: Featured</option>
                        <option value="newest">Sort by: Newest</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
                </div>
           </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className={`w-full md:w-64 flex-shrink-0 bg-white z-10 ${showFiltersMobile ? 'block' : 'hidden md:block'}`}>
           
           {/* Sidebar Search */}
           <div className="mb-8">
               <h3 className="font-bold mb-4 uppercase text-xs tracking-wider">Search Filter</h3>
               <input 
                 type="text"
                 placeholder="Search within results..." 
                 className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-main bg-white text-main placeholder-gray-400"
                 value={filterState.filterSearchQuery}
                 onChange={(e) => setFilterState(prev => ({...prev, filterSearchQuery: e.target.value}))}
               />
           </div>

           {/* Categories */}
           <div className="mb-8">
               <h3 className="font-bold mb-4 uppercase text-xs tracking-wider">Categories</h3>
               <ul className="space-y-2 text-sm max-h-64 overflow-y-auto no-scrollbar">
                   <li>
                       <button 
                         onClick={() => setFilterState(prev => ({...prev, category: ''}))}
                         className={`${filterState.category === '' ? 'text-accent font-bold' : 'text-gray-600 hover:text-main'}`}
                       >
                           All Categories
                       </button>
                   </li>
                   {availableCategories.map(cat => (
                       <li key={cat}>
                           <button 
                             onClick={() => setFilterState(prev => ({...prev, category: cat}))}
                             className={`${filterState.category === cat ? 'text-accent font-bold' : 'text-gray-600 hover:text-main'} text-left block w-full truncate`}
                           >
                               {cat}
                           </button>
                       </li>
                   ))}
               </ul>
           </div>

           {/* Price */}
           <div className="mb-8">
               <h3 className="font-bold mb-4 uppercase text-xs tracking-wider">Max Price</h3>
               <input 
                 type="range" 
                 min="0" 
                 max="50000" 
                 step="500" 
                 value={filterState.maxPrice} 
                 onChange={handlePriceChange}
                 className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
               />
               <div className="flex justify-between text-xs text-gray-500 mt-2">
                   <span>{DEFAULT_CURRENCY}0</span>
                   <span>{DEFAULT_CURRENCY}{filterState.maxPrice}</span>
               </div>
           </div>

           {/* Brands */}
           <div className="mb-8">
               <h3 className="font-bold mb-4 uppercase text-xs tracking-wider">Brands</h3>
               <ul className="space-y-2 max-h-64 overflow-y-auto no-scrollbar">
                   {availableBrands.map(brand => (
                       <li key={brand} className="flex items-center gap-2">
                           <input 
                             type="checkbox" 
                             id={brand} 
                             checked={filterState.brand.includes(brand)}
                             onChange={() => toggleBrand(brand)}
                             className="rounded border-gray-300 text-main focus:ring-accent bg-white"
                             style={{ backgroundColor: 'white' }} 
                           />
                           <label htmlFor={brand} className="text-sm text-gray-600 cursor-pointer">{brand}</label>
                       </li>
                   ))}
               </ul>
           </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
            {filteredProducts.length === 0 ? (
                <div className="text-center py-24 bg-secondary rounded">
                    <h3 className="text-xl font-bold mb-2">No products found</h3>
                    <p className="text-gray-500">Try adjusting your filters.</p>
                </div>
            ) : (
                <>
                    <div className={`grid gap-4 md:gap-8 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                        {displayedProducts.map(p => (
                            viewMode === 'grid' ? (
                                <ProductCard key={p.id} product={p} />
                            ) : (
                                <div key={p.id} className="flex flex-col sm:flex-row gap-6 border p-4 hover:shadow-lg transition-shadow bg-white">
                                    <img src={p.image} alt={p.name} className="w-full sm:w-48 h-48 object-cover bg-gray-100" />
                                    <div className="flex-1 py-2 sm:py-4">
                                        <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                                        <p className="text-accent font-bold mb-4">{DEFAULT_CURRENCY}{p.price}</p>
                                        <p className="text-gray-500 mb-6 line-clamp-2">{p.description}</p>
                                        <button className="bg-main text-white px-6 py-2 text-sm hover:bg-accent transition-colors">View Details</button>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>

                    {/* Load More / Loading State */}
                    {visibleCount < filteredProducts.length && (
                        <div className="mt-12 text-center" ref={observerTarget}>
                            {isLoadingMore ? (
                                <div className="flex justify-center items-center gap-2">
                                    <Loader2 className="animate-spin text-accent" />
                                    <span className="text-gray-500">Loading more products...</span>
                                </div>
                            ) : (
                                !ENABLE_INFINITE_SCROLL && (
                                    <Button variant="outline" onClick={handleLoadMore}>
                                        Load More
                                    </Button>
                                )
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default Shop;