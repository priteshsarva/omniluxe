import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Truck, Shield, MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import Button from '../components/UI/Button';
import ProductCard from '../components/ProductCard';
import { createWhatsAppLink } from '../utils/whatsapp';
import { DEFAULT_CURRENCY, normalizeData, CATEGORY_RULES, BRAND_RULES } from '../data/mockData';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useShop();
  const product = products.find(p => p.id === id);

  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('desc');

  useEffect(() => {
    if (product) {
        setSelectedImage(product.image);
        if (product.sizes.length > 0) setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (!product) return <div className="text-center py-24">Loading or Product not found...</div>;

  // --- SMART RELATED PRODUCTS LOGIC ---
  // 1. Normalize current product data
  const normalizedCurrentCategory = normalizeData(product.category, CATEGORY_RULES);
  const normalizedCurrentBrand = normalizeData(product.brand, BRAND_RULES);

  // 2. Filter: Prioritize Same Category
  let relatedItems = products.filter(p => 
      p.id !== product.id && 
      normalizeData(p.category, CATEGORY_RULES) === normalizedCurrentCategory
  );

  // 3. Fallback: If < 4 items, fill with Same Brand
  if (relatedItems.length < 4) {
      const brandMatches = products.filter(p => 
          p.id !== product.id &&
          normalizeData(p.brand, BRAND_RULES) === normalizedCurrentBrand &&
          !relatedItems.includes(p)
      );
      relatedItems = [...relatedItems, ...brandMatches];
  }

  // 4. Final Fallback: If still < 4, fill with New Arrivals
  if (relatedItems.length < 4) {
      const newArrivals = products.filter(p => 
          p.id !== product.id && 
          !relatedItems.includes(p)
      ).slice(0, 4 - relatedItems.length);
      relatedItems = [...relatedItems, ...newArrivals];
  }

  const relatedProducts = relatedItems.slice(0, 4);
  // -------------------------------------

  const handleWhatsAppBuy = () => {
    const tempItem = { 
        ...product, 
        quantity, 
        selectedColor: '', 
        selectedSize 
    };
    const total = product.price * quantity;
    const link = createWhatsAppLink([tempItem], total);
    window.open(link, '_blank');
  };

  // Gallery Logic: Ensure distinct images
  const galleryImages = Array.from(new Set([product.image, ...product.images]));

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-8">
        <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span className="text-main">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4">
           <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible no-scrollbar">
              {galleryImages.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 flex-shrink-0 border ${selectedImage === img ? 'border-main' : 'border-transparent'}`}
                  >
                      <img src={img} className="w-full h-full object-cover" alt="thumb"/>
                  </button>
              ))}
           </div>
           <div className="flex-1 bg-secondary aspect-square relative overflow-hidden group">
               <img src={selectedImage || product.image} className="w-full h-full object-cover" alt={product.name}/>
           </div>
        </div>

        {/* Info */}
        <div>
           <div className="flex items-center gap-2 mb-2">
                <div className="flex text-accent"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
                <span className="text-sm text-gray-500">{product.reviews} Reviews</span>
           </div>
           <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
           <div className="text-2xl font-medium mb-6">
               {DEFAULT_CURRENCY}{product.price} 
           </div>
           <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

           <div className="space-y-6 mb-8 border-t border-b border-gray-100 py-6">
               {/* Sizes */}
               {product.sizes.length > 0 && (
                   <div>
                       <span className="font-bold text-sm block mb-3">Size: {selectedSize}</span>
                       <div className="flex flex-wrap gap-3">
                           {product.sizes.map(size => (
                               <button 
                                 key={size}
                                 onClick={() => setSelectedSize(size)}
                                 className={`px-4 py-2 text-sm border ${selectedSize === size ? 'border-main bg-main text-white' : 'border-gray-200 hover:border-main'}`}
                               >
                                   {size}
                               </button>
                           ))}
                       </div>
                   </div>
               )}
           </div>

           {/* Actions */}
           <div className="flex flex-col gap-4 mb-8">
               <div className="flex gap-4">
                   <div className="flex border border-gray-200 w-32 items-center">
                       <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-100">-</button>
                       <input type="text" value={quantity} readOnly className="w-full text-center outline-none" />
                       <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-gray-100">+</button>
                   </div>
                   <Button 
                     fullWidth 
                     onClick={() => addToCart(product, quantity, '', selectedSize)}
                   >
                       Add to Cart
                   </Button>
               </div>
               <button 
                onClick={handleWhatsAppBuy}
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-6 rounded flex items-center justify-center gap-2 transition-colors"
               >
                   <MessageCircle size={20} /> Buy with WhatsApp
               </button>
           </div>

           {/* Meta */}
           <div className="space-y-3 text-sm text-gray-500">
               <p className="flex items-center gap-2"><Truck size={16}/> Free worldwide shipping</p>
               <p className="flex items-center gap-2"><Shield size={16}/> Certified Authentic</p>
           </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-24">
          <div className="flex border-b border-gray-200 mb-8">
              {['Description', 'Additional Info', 'Reviews'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
                    className={`px-8 py-4 font-bold text-sm uppercase tracking-wider border-b-2 transition-colors ${activeTab === tab.toLowerCase().split(' ')[0] ? 'border-main text-main' : 'border-transparent text-gray-400 hover:text-main'}`}
                  >
                      {tab}
                  </button>
              ))}
          </div>
          <div className="max-w-3xl">
              {activeTab === 'desc' && (
                  <div className="prose max-w-none">
                      <p>{product.description}</p>
                  </div>
              )}
              {activeTab === 'additional' && (
                  <table className="w-full text-sm text-left">
                      <tbody>
                          <tr className="border-b"><th className="py-2">Brand</th><td className="py-2">{product.brand}</td></tr>
                          <tr className="border-b"><th className="py-2">Category</th><td className="py-2">{product.category}</td></tr>
                      </tbody>
                  </table>
              )}
              {activeTab === 'reviews' && (
                  <div>
                      <h3 className="font-bold mb-4">Customer Reviews</h3>
                      <p className="text-gray-500">No reviews yet.</p>
                  </div>
              )}
          </div>
      </div>

      {/* Related */}
      <div>
          <h2 className="text-2xl font-bold mb-8">You may also like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {relatedProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
      </div>
    </div>
  );
};

export default ProductDetails;