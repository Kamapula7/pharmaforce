'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_SECTIONS = [
  {
    section: 'Orders & Payment',
    items: [
      {
        q: 'How do I place an order?',
        a: 'Browse our catalogue, add items to cart, and proceed to checkout. Fill in your shipping address and you\'ll receive bank transfer details by email. Your order is confirmed once we receive your payment.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept bank transfer (IBAN) only. After placing your order, you receive our banking details. Once your transfer is confirmed (typically 1–2 business days), we ship your order.',
      },
      {
        q: 'How long does payment confirmation take?',
        a: 'SEPA bank transfers within the EU are typically confirmed within 1–2 business days. Once confirmed, your order moves to processing and ships within 24 hours.',
      },
      {
        q: 'Can I cancel my order?',
        a: 'You can cancel your order before payment is confirmed. Once payment is received, cancellations are not possible as the order enters processing. Contact us at pharmaforce@inbox.eu immediately if you need to cancel.',
      },
      {
        q: 'Is there a minimum order amount?',
        a: 'There is no minimum order. However, shipping is free on orders over €150. For smaller orders, shipping costs are calculated at checkout based on your country.',
      },
    ],
  },
  {
    section: 'Shipping & Delivery',
    items: [
      {
        q: 'Which countries do you ship to?',
        a: 'We ship to 30+ European countries including Germany, France, Spain, Italy, Poland, Netherlands, Belgium, Austria, Sweden, Denmark, Finland, Czech Republic, Hungary, Romania, and more.',
      },
      {
        q: 'How long does delivery take?',
        a: 'Delivery times depend on your location: Core EU (DE, AT, NL) — 3–5 days; Western EU (FR, ES, IT) — 4–7 days; Northern EU — 5–8 days; Eastern/Southern EU — 5–10 days.',
      },
      {
        q: 'How are orders packaged?',
        a: 'All orders are shipped in plain, discreet packaging with no product names, brand logos, or identifying information on the outside. The sender name is a neutral business name.',
      },
      {
        q: 'Do I need to pay customs fees?',
        a: 'No. All shipments are sent from within the European Union, so there are no customs fees or import duties for EU residents.',
      },
      {
        q: 'How do I track my order?',
        a: 'Once shipped, you receive a tracking number by email. You can track your parcel on the carrier\'s website. The tracking link is also available in your account under My Orders.',
      },
    ],
  },
  {
    section: 'Products & Quality',
    items: [
      {
        q: 'Are your products lab tested?',
        a: 'Yes. All products we carry are pharmaceutical-grade or verified by third-party laboratory testing. We only work with reputable manufacturers that provide Certificates of Analysis (COA).',
      },
      {
        q: 'Do I need a prescription?',
        a: 'No prescription is required to purchase from our store. We operate as a B2C supplier for research and performance purposes.',
      },
      {
        q: 'What is the shelf life of products?',
        a: 'All products are shipped with at least 12 months remaining shelf life. Expiry dates are printed on each product. Some pharmaceutical products have shelf lives of 2–3 years.',
      },
      {
        q: 'How should I store my order?',
        a: 'Most supplements should be stored in a cool, dry place away from direct sunlight. Peptides, growth hormones, and some medications require refrigeration after reconstitution. Specific storage instructions are on each product label.',
      },
    ],
  },
  {
    section: 'Returns & Refunds',
    items: [
      {
        q: 'Can I return a product?',
        a: 'Due to the nature of pharmaceutical and supplement products, we do not accept returns for health and safety reasons. If you received a damaged or incorrect item, contact us within 48 hours of delivery.',
      },
      {
        q: 'What if my order arrives damaged?',
        a: 'If your order arrives damaged, take photos immediately and email us at pharmaforce@inbox.eu within 48 hours. We will arrange a replacement or refund depending on the situation.',
      },
      {
        q: 'What if my order doesn\'t arrive?',
        a: 'If your order has not arrived within the estimated delivery window, contact us. We will investigate with the carrier. For lost parcels confirmed by the carrier, we offer a full replacement or refund.',
      },
    ],
  },
  {
    section: 'Account & Privacy',
    items: [
      {
        q: 'Do I need an account to order?',
        a: 'No, you can order as a guest. However, creating an account allows you to track your orders, view order history, and save your shipping address for future orders.',
      },
      {
        q: 'How is my personal data handled?',
        a: 'We process personal data in accordance with GDPR. Your data is used solely for order fulfillment and is never sold to third parties. See our Privacy Policy for full details.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Yes. We use bank transfer only — we never store card numbers or payment credentials. Bank transfers are processed securely through your own bank.',
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4"
      >
        <span className={`text-sm font-medium leading-snug ${open ? 'text-brand' : 'text-white'}`}>{q}</span>
        <ChevronDown className={`w-4 h-4 text-muted shrink-0 transition-transform duration-200 ${open ? 'rotate-180 text-brand' : ''}`} />
      </button>
      {open && (
        <p className="text-muted text-sm leading-relaxed pb-4 pr-8">{a}</p>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Header */}
      <div className="mb-12">
        <p className="text-brand text-xs font-bold uppercase tracking-widest mb-3">Support</p>
        <h1 className="text-4xl font-black text-white mb-3">Frequently Asked Questions</h1>
        <p className="text-muted text-base leading-relaxed">
          Everything you need to know about ordering, shipping, and products at PharmaForce.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {FAQ_SECTIONS.map((section) => (
          <div key={section.section}>
            <h2 className="text-brand text-xs font-bold uppercase tracking-widest mb-1">{section.section}</h2>
            <div className="bg-surface border border-border rounded-xl px-5">
              {section.items.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Still have questions */}
      <div className="mt-12 bg-brand/5 border border-brand/20 rounded-xl p-6 text-center">
        <p className="text-white font-semibold mb-2">Still have questions?</p>
        <p className="text-muted text-sm mb-4">Our team responds within 2–6 hours on business days.</p>
        <a
          href="mailto:pharmaforce@inbox.eu"
          className="inline-flex items-center gap-2 bg-brand text-dark font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-brand/90 transition-colors"
        >
          pharmaforce@inbox.eu
        </a>
      </div>
    </div>
  );
}
