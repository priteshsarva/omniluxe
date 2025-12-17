import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold uppercase mb-6">Omni<span className="text-accent">Luxe</span></h3>
            <p className="text-gray-500 leading-relaxed mb-6">
              Redefining luxury through minimalist design and exceptional craftsmanship. We source the finest materials from around the globe.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-main hover:text-white transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6">Shop</h4>
            <ul className="space-y-4 text-gray-500">
              <li><Link to="/shop" className="hover:text-accent transition-colors">All Products</Link></li>
              <li><Link to="/shop" className="hover:text-accent transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop" className="hover:text-accent transition-colors">Best Sellers</Link></li>
              <li><Link to="/style-guide" className="hover:text-accent transition-colors">Style Guide</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-6">Customer Care</h4>
            <ul className="space-y-4 text-gray-500">
              <li><Link to="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
              <li><Link to="/shipping-returns" className="hover:text-accent transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/terms" className="hover:text-accent transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-gray-500">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="shrink-0 mt-1" />
                <span>123 Luxury Lane, Fashion District, Mumbai, India 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="shrink-0" />
                <span>support@omniluxe.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">© 2024 OmniLuxe Universal Store. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-500">
             <Link to="/terms" className="hover:text-main">Terms</Link>
             <Link to="/privacy-policy" className="hover:text-main">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;