import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-main mb-4">1. Information We Collect</h2>
          <p>
            At OmniLuxe, we collect information that you provide directly to us when you make a purchase, create an account, or contact our support team. This includes your name, email address, shipping address, and payment information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-main mb-4">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to process your orders, communicate with you about your purchase, and improve our services. We do not sell your personal data to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-main mb-4">3. Cookies</h2>
          <p>
            We use cookies to enhance your browsing experience and store items in your cart. You can choose to disable cookies in your browser settings, but this may affect the functionality of our website.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold text-main mb-4">4. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@omniluxe.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;