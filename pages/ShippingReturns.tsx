import React from 'react';

const ShippingReturns: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Shipping & Returns</h1>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-main mb-4">Shipping Policy</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>We offer free shipping on all orders over ₹2000.</li>
            <li>Standard shipping takes 5-7 business days within India.</li>
            <li>Expedited shipping options are available at checkout.</li>
            <li>Once your order is shipped, you will receive a tracking number via email/WhatsApp.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-main mb-4">Return Policy</h2>
          <p className="mb-4">
            We want you to love your purchase. If you are not completely satisfied, you may return items within 30 days of delivery.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Items must be unworn, unwashed, and in their original condition with tags attached.</li>
            <li>Footwear must be returned in the original box.</li>
            <li>Final sale items cannot be returned or exchanged.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-main mb-4">How to Initiate a Return</h2>
          <p>
            To initiate a return, please contact our support team at support@omniluxe.com or via WhatsApp with your order number. We will provide you with a return shipping label.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ShippingReturns;