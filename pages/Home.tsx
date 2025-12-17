import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Star, Play } from 'lucide-react';
import gsap from 'gsap';
import Button from '../components/UI/Button';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

const Home: React.FC = () => {
  const { products, setFilterState, availableBrands, availableCategories } = useShop();
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // GSAP Entrance
  useEffect(() => {
    if (!heroRef.current || !heroTextRef.current || !heroImageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(heroTextRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });
      gsap.from(heroImageRef.current, {
        x: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.4
      });
    }, heroRef);

    return () => ctx.revert();
  }, [products]);

  // Best Sellers Auto Scroll
  useEffect(() => {
    let animationId: number;
    const scroll = () => {
      if (scrollContainerRef.current && !isPaused) {
        if (scrollContainerRef.current.scrollLeft >= (scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth)) {
             scrollContainerRef.current.scrollLeft = 0;
        } else {
             scrollContainerRef.current.scrollLeft += 1;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };
    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  const bestSellers = products.slice(0, 8);
  const newArrivals = products.slice(8, 20);

  const handleBrandClick = (brand: string) => {
    setFilterState(prev => ({ ...prev, brand: [brand], category: '' }));
    navigate('/shop');
  };

  const handleCategoryClick = (cat: string) => {
    setFilterState(prev => ({ ...prev, category: cat, brand: [] }));
    navigate('/shop');
  }

  return (
    <div className="w-full overflow-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-[85vh] flex items-center bg-secondary relative px-4 md:px-0 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-200 to-transparent opacity-20 pointer-events-none"></div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div ref={heroTextRef} className="pl-4 md:pl-0 pt-10 md:pt-0">
            <span className="text-accent font-bold tracking-widest uppercase mb-4 block">New Collection 2024</span>
            <h1 className="text-5xl md:text-8xl font-bold leading-tight mb-6 text-main tracking-tighter">
              ELEVATE <br/> YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-600">STYLE</span>
            </h1>
            <p className="text-gray-500 text-lg mb-8 max-w-md border-l-4 border-accent pl-4">
              Discover the pinnacle of luxury streetwear and premium accessories. 
              Authenticity guaranteed.
            </p>
            <div className="flex gap-4">
              <Link to="/shop"><Button size="lg" className="shadow-xl shadow-accent/20">Shop Now</Button></Link>
              <Link to="/shop"><Button variant="outline" size="lg">Explore Trends</Button></Link>
            </div>
          </div>
          <div ref={heroImageRef} className="relative h-full flex justify-center md:justify-end pb-10 md:pb-0 items-center">
            <div className="relative w-[85%] md:w-[90%] aspect-[4/5] bg-white rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                 <img src={products[0]?.image || "https://via.placeholder.com/800"} alt="Hero" className="w-full h-full object-cover" />
            </div>
            {/* Parallax Element Decor */}
            <div className="absolute -bottom-10 left-10 w-40 h-40 bg-accent/30 rounded-full blur-3xl animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Brand Ticker */}
      <div className="bg-main py-6 overflow-hidden">
          <div className="flex gap-12 animate-marquee whitespace-nowrap text-white/50 text-xl font-bold uppercase tracking-widest">
              {/* Display availableBrands (which are now guaranteed clean Keys from BRAND_RULES) */}
              {availableBrands.concat(availableBrands).map((brand, i) => (
                  <span key={i} className="mx-8">
                    {brand}
                  </span>
              ))}
          </div>
      </div>

      {/* Features */}
      <section className="py-16 border-b border-gray-100 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-6 bg-secondary/30 rounded-lg hover:bg-secondary transition-colors">
                <div className="w-14 h-14 bg-white shadow-sm rounded-full flex items-center justify-center text-accent"><Truck size={28}/></div>
                <div><h4 className="font-bold text-lg">Free Global Shipping</h4><p className="text-sm text-gray-500">Tracked & Insured</p></div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-secondary/30 rounded-lg hover:bg-secondary transition-colors">
                <div className="w-14 h-14 bg-white shadow-sm rounded-full flex items-center justify-center text-accent"><ShieldCheck size={28}/></div>
                <div><h4 className="font-bold text-lg">100% Authentic</h4><p className="text-sm text-gray-500">Verified by Experts</p></div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-secondary/30 rounded-lg hover:bg-secondary transition-colors">
                <div className="w-14 h-14 bg-white shadow-sm rounded-full flex items-center justify-center text-accent"><RefreshCw size={28}/></div>
                <div><h4 className="font-bold text-lg">Easy Returns</h4><p className="text-sm text-gray-500">30-Day Policy</p></div>
            </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <span className="text-accent uppercase tracking-widest font-bold text-sm">Curated Collections</span>
                <h2 className="text-3xl font-bold mt-2">Browse by Category</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {availableCategories.map((cat) => {
                    // Use the clean Key directly to find a representative product
                    const repProduct = products.find(p => p.category === cat);
                    const bgImage = repProduct?.image || "https://via.placeholder.com/400";
                    
                    return (
                        <div 
                            key={cat} 
                            onClick={() => handleCategoryClick(cat)}
                            className="group relative h-80 rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all"
                        >
                            <img 
                                src={bgImage} 
                                alt={cat} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                                <h3 className="text-white text-xl font-bold mb-1">{cat}</h3>
                                <span className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
                                    Shop Now <ArrowRight size={14} />
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
      </section>

      {/* Best Sellers Sliding */}
      <section className="py-24 bg-gradient-to-b from-white to-secondary/30 overflow-hidden">
        <div className="container mx-auto px-4 mb-12">
            <div className="flex justify-between items-end">
                <div>
                    <span className="text-accent uppercase tracking-widest font-bold text-sm">Customer Favorites</span>
                    <h2 className="text-4xl font-bold mt-2">Best Sellers</h2>
                </div>
                <div className="hidden md:block w-32 h-1 bg-gray-200 rounded">
                    <div className="h-full bg-accent w-1/3"></div>
                </div>
            </div>
        </div>
        
        {/* Sliding Container - No Scrollbar */}
        <div 
            className="flex gap-8 overflow-x-auto pb-8 no-scrollbar px-4"
            ref={scrollContainerRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ scrollBehavior: 'auto' }} 
        >
            {bestSellers.map(p => (
                <div key={p.id} className="min-w-[280px] md:min-w-[320px]">
                    <ProductCard product={p} />
                </div>
            ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-20 bg-main text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                  <span className="bg-accent text-white px-3 py-1 text-xs font-bold uppercase rounded mb-4 inline-block">Limited Offer</span>
                  <h2 className="text-4xl md:text-6xl font-bold mb-6">Streetwear Icons</h2>
                  <p className="text-gray-400 text-lg mb-8 max-w-lg">
                      Grab the most hyped sneakers and apparel before they are gone. 
                      Exclusive drops happening now.
                  </p>
                  <Button variant="secondary" size="lg" onClick={() => navigate('/shop')}>Shop The Drop</Button>
              </div>
              <div className="flex gap-4 justify-end">
                  <div className="w-48 h-64 bg-gray-800 rounded-lg rotate-[-6deg] overflow-hidden border-2 border-gray-700">
                       <img src={products[2]?.image} className="w-full h-full object-cover opacity-80" alt="Promo 1"/>
                  </div>
                  <div className="w-48 h-64 bg-gray-800 rounded-lg rotate-[6deg] overflow-hidden border-2 border-gray-700 mt-12">
                       <img src={products[3]?.image} className="w-full h-full object-cover opacity-80" alt="Promo 2"/>
                  </div>
              </div>
          </div>
      </section>

      {/* Shop By Brand */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-12 uppercase tracking-wider">Premium Brands</h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                {/* Use slice to just show top brands */}
                {availableBrands.slice(0, 8).map(brand => (
                    <button 
                        key={brand} 
                        onClick={() => handleBrandClick(brand)}
                        className="text-xl md:text-3xl font-bold text-gray-300 hover:text-main transition-all uppercase hover:scale-110"
                    >
                        {brand}
                    </button>
                ))}
            </div>
        </div>
      </section>

      {/* New Arrivals Grid */}
      <section className="py-24 bg-secondary/10">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
                <span className="text-accent uppercase tracking-widest font-bold text-sm">Fresh Drops</span>
                <h2 className="text-4xl font-bold mt-2">New Arrivals</h2>
                <div className="w-16 h-1 bg-accent mx-auto mt-4"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="mt-16 text-center">
                 <Button size="lg" onClick={() => navigate('/shop')}>View All Products</Button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;