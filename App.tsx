import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import StyleGuide from './pages/StyleGuide';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ShippingReturns from './pages/ShippingReturns';
import Terms from './pages/Terms';
import FAQ from './pages/FAQ';
import { ShopProvider, useShop } from './context/ShopContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Main App Content wrapped to use Shop Context for loading state
const AppContent: React.FC = () => {
  const { isLoading } = useShop();

  if (isLoading) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-white z-50">
              <div className="text-4xl font-bold tracking-tight uppercase mb-4 animate-pulse">Omni<span className="text-accent">Luxe</span></div>
              <div className="w-16 h-16 border-4 border-gray-200 border-t-accent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500">Curating Catalogue...</p>
          </div>
      );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-main bg-primary">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/style-guide" element={<StyleGuide />} />
          
          {/* Legal & Support Routes */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/shipping-returns" element={<ShippingReturns />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

const App: React.FC = () => {
  return (
    <ShopProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </ShopProvider>
  );
};

export default App;