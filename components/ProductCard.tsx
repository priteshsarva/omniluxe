import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import Button from './UI/Button';
import { DEFAULT_CURRENCY } from '../data/mockData';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useShop();
  const [isHovered, setIsHovered] = useState(false);

  // Fallback if images are missing
  const mainImage = product.image || 'https://via.placeholder.com/300';
  const secondaryImage = product.hoverImage || mainImage;

  const handleQuickAdd = (e: React.MouseEvent, size?: string) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.colors[0], size || (product.sizes.length > 0 ? product.sizes[0] : undefined));
  };

  return (
    <div 
      className="group relative flex flex-col bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Area */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <Link to={`/product/${product.id}`}>
          <img 
            src={isHovered ? secondaryImage : mainImage} 
            alt={product.name} 
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && <span className="bg-main text-white text-[10px] uppercase font-bold px-2 py-1 tracking-wider">New</span>}
        </div>

        {/* Quick Actions Overlay */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0 flex flex-col gap-3 bg-white/95 backdrop-blur-sm border-t border-gray-100`}>
             {/* Sizes Grid */}
             {product.sizes && product.sizes.length > 0 ? (
                 <div className="flex flex-wrap gap-2 mb-2">
                     {product.sizes.slice(0, 5).map(size => (
                         <button 
                            key={size}
                            onClick={(e) => handleQuickAdd(e, size)}
                            className="text-[10px] font-bold border border-gray-300 text-main hover:bg-main hover:text-white px-2 py-1 rounded-sm transition-colors flex-1 text-center min-w-[30px]"
                         >
                             {size}
                         </button>
                     ))}
                     {product.sizes.length > 5 && <span className="text-[10px] text-gray-500 self-center">+</span>}
                 </div>
             ) : (
                 <Button 
                    variant="primary" 
                    size="sm" 
                    fullWidth 
                    onClick={(e) => handleQuickAdd(e)}
                    className="shadow-lg"
                 >
                    <ShoppingBag size={16} className="mr-2" /> Quick Add
                 </Button>
             )}
             
             {/* View Details Link */}
             <Link to={`/product/${product.id}`} className="text-xs text-center text-gray-500 hover:text-accent font-medium">
                 View Details
             </Link>
        </div>
      </div>

      {/* Info Area */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-1">
            <Star size={12} className="fill-accent text-accent" />
            <span className="text-xs text-gray-500">{product.rating}</span>
        </div>
        <Link to={`/product/${product.id}`} className="mb-1 block">
          <h3 className="font-medium text-main text-base leading-tight group-hover:text-accent transition-colors line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-xs text-gray-500 mb-auto uppercase tracking-wide">{product.brand}</p>
        <div className="mt-2 flex items-center gap-3">
          <span className="font-bold text-main">{DEFAULT_CURRENCY}{product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;