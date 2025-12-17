import React from 'react';

const FAQ: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h1>

      <div className="space-y-6">
        {[
          {
            q: "How do I track my order?",
            a: "Once your order ships, we will send you a confirmation email containing your tracking number. You can also track it via our WhatsApp support."
          },
          {
            q: "Do you ship internationally?",
            a: "Currently, we primarily ship within India. However, we are expanding to select international locations. Please contact support for specific inquiries."
          },
          {
            q: "What payment methods do you accept?",
            a: "We accept all major credit cards, debit cards, UPI, and Net Banking. We also coordinate payments via WhatsApp for a personalized experience."
          },
          {
            q: "Can I change or cancel my order?",
            a: "We process orders quickly, but if you need to make a change, please contact us immediately via WhatsApp. Once the order has shipped, we cannot make changes."
          },
          {
            q: "Are your products authentic?",
            a: "Yes, absolutely. We guarantee 100% authenticity on all products sold on OmniLuxe. We source directly from authorized retailers and verified partners."
          }
        ].map((item, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold text-main mb-2">{item.q}</h3>
            <p className="text-gray-600">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;