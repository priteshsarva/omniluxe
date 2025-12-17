import React from 'react';
import Button from '../components/UI/Button';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';

const StyleGuide: React.FC = () => {
  const { products } = useShop();
  
  // Create a dummy product for display if fetch hasn't finished
  const demoProduct = products.length > 0 ? products[0] : {
      id: 'demo-1',
      name: 'Luxury Demo Product',
      category: 'Accessories',
      price: 4500,
      rating: 4.8,
      reviews: 124,
      brand: 'OmniBrand',
      colors: ['Black'],
      sizes: ['S', 'M', 'L'],
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80',
      images: [],
      hoverImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80',
      description: 'A placeholder product to demonstrate the card layout.',
      tags: [],
      stock: 10,
      isNew: true
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-bold mb-4">OmniLuxe Design System</h1>
        <p className="text-gray-500 text-lg">Component Library & Customization Manual</p>
      </div>

      {/* --- COMPONENTS SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <section>
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b">1. Color Palette</h2>
            <p className="text-sm text-gray-500 mb-4">Defined in <code>tailwind.config</code> within <code>index.html</code></p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary border rounded shadow-sm"></div>
                  <div>
                      <p className="font-bold">Primary (Background)</p>
                      <p className="text-xs text-gray-500">#ffffff</p>
                  </div>
              </div>
              <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-secondary rounded shadow-sm"></div>
                  <div>
                      <p className="font-bold">Secondary (Sections)</p>
                      <p className="text-xs text-gray-500">#f8f9fa</p>
                  </div>
              </div>
              <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-main text-white rounded shadow-sm"></div>
                  <div>
                      <p className="font-bold">Main (Text/UI)</p>
                      <p className="text-xs text-gray-500">#1a1a1a</p>
                  </div>
              </div>
              <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-accent text-white rounded shadow-sm"></div>
                  <div>
                      <p className="font-bold">Accent (Brand)</p>
                      <p className="text-xs text-gray-500">#C5A059 (Gold)</p>
                  </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b">2. Typography</h2>
            <p className="text-sm text-gray-500 mb-4">Font Family: <strong>Manrope</strong> (Google Fonts)</p>
            <div className="space-y-6">
                <div>
                    <h1 className="text-6xl font-bold">Heading 1</h1>
                    <span className="text-xs text-gray-400">text-6xl font-bold</span>
                </div>
                <div>
                    <h2 className="text-4xl font-bold">Heading 2</h2>
                    <span className="text-xs text-gray-400">text-4xl font-bold</span>
                </div>
                <div>
                    <h3 className="text-2xl font-bold">Heading 3</h3>
                    <span className="text-xs text-gray-400">text-2xl font-bold</span>
                </div>
                <div>
                    <p className="text-base text-gray-600 leading-relaxed">
                        Body Text. Minimalist design relies heavily on good typography. 
                        Ensure adequate line-height and whitespace for readability.
                    </p>
                    <span className="text-xs text-gray-400">text-base text-gray-600</span>
                </div>
            </div>
          </section>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <section>
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b">3. Interactive Elements</h2>
            <div className="space-y-8">
                <div>
                    <h4 className="font-bold mb-4 text-sm uppercase">Buttons</h4>
                    <div className="flex flex-wrap gap-4 mb-4">
                        <Button variant="primary">Primary Action</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="outline">Outline</Button>
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                        <Button size="sm">Small</Button>
                        <Button size="md">Medium</Button>
                        <Button size="lg">Large</Button>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold mb-4 text-sm uppercase">Inputs</h4>
                    <input type="text" placeholder="Standard Input" className="w-full border p-3 rounded bg-secondary mb-2" />
                    <select className="w-full border p-3 rounded bg-secondary">
                        <option>Dropdown Selection</option>
                    </select>
                </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b">4. Product Card Component</h2>
            <div className="max-w-xs mx-auto md:mx-0">
                 <ProductCard product={demoProduct} />
            </div>
            <p className="mt-4 text-sm text-gray-500">
                Features: Hover effect for secondary image, Quick Add overlay (desktop) / button (mobile), Sale badges, and responsive scaling.
            </p>
          </section>
      </div>

      {/* --- MANUAL SECTION --- */}
      <div className="bg-secondary rounded-xl p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-8 text-center uppercase tracking-widest">Customization Manual</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
                <div className="bg-white p-6 rounded shadow-sm">
                    <h3 className="font-bold text-lg mb-2 text-accent">1. Changing the Brand Color</h3>
                    <p className="text-sm text-gray-600 mb-2">
                        Go to <code>index.html</code> and look for the <code>tailwind.config</code> script.
                    </p>
                    <pre className="bg-gray-800 text-white p-3 rounded text-xs overflow-x-auto">
{`colors: {
  accent: '#C5A059', // Change this hex code
  'accent-hover': '#b08d48',
}`}
                    </pre>
                </div>

                <div className="bg-white p-6 rounded shadow-sm">
                    <h3 className="font-bold text-lg mb-2 text-accent">2. Configuration (WhatsApp, Currency)</h3>
                    <p className="text-sm text-gray-600 mb-2">
                        Open <code>data/mockData.ts</code>. This file controls global constants.
                    </p>
                    <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                        <li><strong>WHATSAPP_NUMBER:</strong> Target number for checkout messages.</li>
                        <li><strong>MARKUP_PERCENTAGE:</strong> Global price multiplier (e.g., 1.2 for 20% increase).</li>
                        <li><strong>DEFAULT_CURRENCY:</strong> Symbol used across the app (₹, $, etc).</li>
                        <li><strong>ENABLE_INFINITE_SCROLL:</strong> Set true/false to toggle between scroll and "Load More" button.</li>
                    </ul>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-white p-6 rounded shadow-sm">
                    <h3 className="font-bold text-lg mb-2 text-accent">3. Data Source & Products</h3>
                    <p className="text-sm text-gray-600 mb-2">
                        The app currently fetches data from an API in <code>context/ShopContext.tsx</code>.
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                        To use your own JSON file instead of the API:
                    </p>
                    <ol className="list-decimal pl-5 text-sm text-gray-600 space-y-1">
                        <li>Open <code>data/mockData.ts</code> and populate the <code>PRODUCTS</code> array with your items.</li>
                        <li>In <code>ShopContext.tsx</code>, comment out the <code>fetchData</code> useEffect.</li>
                        <li>Initialize state with your import: <code>useState(PRODUCTS)</code>.</li>
                    </ol>
                </div>

                <div className="bg-white p-6 rounded shadow-sm">
                    <h3 className="font-bold text-lg mb-2 text-accent">4. Folder Structure</h3>
                    <ul className="text-sm text-gray-600 space-y-2">
                        <li><code>/components</code>: Reusable UI (Header, Footer, Cards).</li>
                        <li><code>/pages</code>: Main route views (Home, Shop, Checkout).</li>
                        <li><code>/context</code>: State management (Cart, Filter logic).</li>
                        <li><code>/utils</code>: Helper functions (WhatsApp link generator).</li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StyleGuide;