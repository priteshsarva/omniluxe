import { CartItem, Product } from "../types";
import { WHATSAPP_NUMBER, DEFAULT_CURRENCY } from "../data/mockData";

export const createWhatsAppLink = (
  items: CartItem[] | Product[], 
  total: number, 
  customerDetails?: { name: string; address: string; city?: string; zip?: string }
) => {
  let message = `*New Order Request - OmniLuxe*%0A%0A`;

  items.forEach((item) => {
    const qty = 'quantity' in item ? item.quantity : 1;
    const size = 'selectedSize' in item && item.selectedSize ? ` | Size: ${item.selectedSize}` : '';
    const price = item.price;
    
    message += `• ${item.name}%0A  Qty: ${qty}${size} | Price: ${DEFAULT_CURRENCY}${price}%0A`;
  });

  message += `%0A*Total Order Value: ${DEFAULT_CURRENCY}${total}*%0A`;

  if (customerDetails) {
    message += `%0A----------------------------%0A*Shipping Details:*%0A`;
    message += `Name: ${customerDetails.name}%0A`;
    message += `Address: ${customerDetails.address}%0A`;
  }
  
  message += `%0APlease confirm availability and payment options.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
};