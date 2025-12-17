import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import Button from '../components/UI/Button';
import { createWhatsAppLink } from '../utils/whatsapp';
import { DEFAULT_CURRENCY } from '../data/mockData';

const Checkout: React.FC = () => {
  const { cart, cartSubtotal } = useShop();
  const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      phone: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppCheckout = () => {
      const customerDetails = {
          name: `${formData.firstName} ${formData.lastName}`,
          address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.zip}`,
          city: formData.city, // Redundant but keeping signature
          zip: formData.zip    // Redundant but keeping signature
      };
      const link = createWhatsAppLink(cart, cartSubtotal, customerDetails);
      window.open(link, '_blank');
  };

  if (cart.length === 0) return <div className="text-center py-24">Your cart is empty.</div>;

  return (
    <div className="container mx-auto px-4 py-12">
       <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
       
       <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
           {/* Main Form Area */}
           <div className="flex-1">
               <h3 className="font-bold text-xl mb-6">1. Shipping Details</h3>
               <form className="space-y-6 animate-fade-in" onSubmit={(e) => { e.preventDefault(); handleWhatsAppCheckout(); }}>
                   <div className="grid grid-cols-2 gap-4">
                       <div>
                           <label className="block text-sm mb-1">First Name</label>
                           <input required name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" className="w-full border p-3 rounded bg-secondary" placeholder="Rahul" />
                       </div>
                       <div>
                           <label className="block text-sm mb-1">Last Name</label>
                           <input required name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" className="w-full border p-3 rounded bg-secondary" placeholder="Sharma" />
                       </div>
                   </div>
                   <div>
                        <label className="block text-sm mb-1">Phone Number</label>
                        <input required name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="w-full border p-3 rounded bg-secondary" placeholder="9876543210" />
                   </div>
                   <div>
                       <label className="block text-sm mb-1">Address</label>
                       <input required name="address" value={formData.address} onChange={handleInputChange} type="text" className="w-full border p-3 rounded bg-secondary" placeholder="Flat No, Street, Landmark" />
                   </div>
                   <div className="grid grid-cols-3 gap-4">
                       <div className="col-span-1">
                           <label className="block text-sm mb-1">City</label>
                           <input required name="city" value={formData.city} onChange={handleInputChange} type="text" className="w-full border p-3 rounded bg-secondary" />
                       </div>
                       <div className="col-span-1">
                           <label className="block text-sm mb-1">State</label>
                           <input required name="state" value={formData.state} onChange={handleInputChange} type="text" className="w-full border p-3 rounded bg-secondary" />
                       </div>
                       <div className="col-span-1">
                           <label className="block text-sm mb-1">Zip</label>
                           <input required name="zip" value={formData.zip} onChange={handleInputChange} type="text" className="w-full border p-3 rounded bg-secondary" />
                       </div>
                   </div>
                   
                   <div className="mt-8">
                       <h3 className="font-bold text-xl mb-4">2. Payment & Confirmation</h3>
                       <p className="mb-4 text-gray-500 text-sm">
                           By clicking below, you will be redirected to WhatsApp to send your order details directly to our team. Payment will be coordinated there.
                       </p>
                       <button 
                            type="submit"
                            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition-colors text-lg"
                        >
                            <MessageCircle size={24} /> Confirm Order on WhatsApp
                        </button>
                   </div>
               </form>
           </div>

           {/* Order Summary */}
           <div className="w-full lg:w-96 bg-secondary p-8 rounded-lg h-fit sticky top-24">
               <h3 className="font-bold text-lg mb-6">Order Summary</h3>
               <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto custom-scrollbar">
                   {cart.map((item, idx) => (
                       <div key={`${item.id}-${idx}`} className="flex justify-between items-center">
                           <div className="flex items-center gap-3">
                               <div className="w-12 h-12 bg-white rounded overflow-hidden">
                                   <img src={item.image} className="w-full h-full object-cover"/>
                               </div>
                               <div>
                                   <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                                   <p className="text-xs text-gray-500">x{item.quantity} {item.selectedSize ? `(${item.selectedSize})` : ''}</p>
                               </div>
                           </div>
                           <span className="text-sm font-medium">{DEFAULT_CURRENCY}{item.price * item.quantity}</span>
                       </div>
                   ))}
               </div>
               <div className="border-t border-gray-200 pt-4 space-y-2">
                   <div className="flex justify-between text-sm"><span>Subtotal</span><span>{DEFAULT_CURRENCY}{cartSubtotal}</span></div>
                   <div className="flex justify-between text-sm"><span>Shipping</span><span>TBD</span></div>
                   <div className="flex justify-between text-lg font-bold mt-4"><span>Total</span><span>{DEFAULT_CURRENCY}{cartSubtotal}</span></div>
               </div>
           </div>
       </div>
    </div>
  );
};

export default Checkout;