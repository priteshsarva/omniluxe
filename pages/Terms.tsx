import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-main mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-main mb-4">2. Product Availability</h2>
          <p>
            All products are subject to availability. We reserve the right to limit the quantity of products we supply or discontinue any product at any time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-main mb-4">3. Pricing</h2>
          <p>
            Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-main mb-4">4. User Conduct</h2>
          <p>
            You agree not to use the website for any unlawful purpose or in any way that interrupts, damages, impairs, or renders the website less efficient.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;