import { Truck, Clock, Globe, Package, AlertCircle, CheckCircle } from 'lucide-react';

interface ShippingPageProps {
  params: Promise<{ locale: string }>;
}

const DELIVERY_ZONES = [
  {
    zone: 'Zone 1 — Core EU',
    countries: 'Germany, Austria, Netherlands, Belgium, Luxembourg',
    time: '3–5 business days',
    cost: '€9.90',
    freeFrom: '€150',
  },
  {
    zone: 'Zone 2 — EU West',
    countries: 'France, Spain, Portugal, Italy',
    time: '4–7 business days',
    cost: '€12.90',
    freeFrom: '€150',
  },
  {
    zone: 'Zone 3 — EU North',
    countries: 'Sweden, Denmark, Finland, Norway',
    time: '5–8 business days',
    cost: '€14.90',
    freeFrom: '€150',
  },
  {
    zone: 'Zone 4 — EU East & South',
    countries: 'Poland, Czech Republic, Hungary, Romania, Bulgaria, Croatia, Slovakia, Slovenia, Greece',
    time: '5–10 business days',
    cost: '€14.90',
    freeFrom: '€150',
  },
  {
    zone: 'Zone 5 — Baltics & Rest of EU',
    countries: 'Estonia, Latvia, Lithuania, Ireland, Malta, Cyprus',
    time: '6–12 business days',
    cost: '€16.90',
    freeFrom: '€150',
  },
];

const STEPS = [
  {
    step: '1',
    title: 'Place your order',
    desc: 'Fill out the checkout form with your shipping address and receive bank transfer details by email.',
  },
  {
    step: '2',
    title: 'Make payment',
    desc: 'Transfer the payment to our bank account (IBAN). Use your order number as reference.',
  },
  {
    step: '3',
    title: 'Order processing',
    desc: 'After payment confirmation (1–2 business days), we pack and ship your order discreetly.',
  },
  {
    step: '4',
    title: 'Delivery',
    desc: 'You receive your tracking number by email. Packages are delivered to your door.',
  },
];

export default async function ShippingPage({ params }: ShippingPageProps) {
  await params;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Header */}
      <div className="mb-12">
        <p className="text-brand text-xs font-bold uppercase tracking-widest mb-3">Shipping & Delivery</p>
        <h1 className="text-4xl font-black text-white mb-3">Shipping Information</h1>
        <p className="text-muted text-base leading-relaxed max-w-2xl">
          We ship across 30+ European countries. All orders are packed discreetly with no product names on the outside.
        </p>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[
          { icon: Truck, label: 'Free from €150', sub: 'Free EU shipping' },
          { icon: Package, label: 'Discreet packing', sub: 'No product labels outside' },
          { icon: Globe, label: '30+ countries', sub: 'Pan-European delivery' },
          { icon: Clock, label: '3–12 business days', sub: 'Depending on country' },
        ].map(({ icon: Icon, label, sub }) => (
          <div key={label} className="bg-surface border border-border rounded-xl p-4 text-center">
            <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center mx-auto mb-2">
              <Icon className="w-5 h-5 text-brand" />
            </div>
            <p className="text-white font-semibold text-sm">{label}</p>
            <p className="text-muted text-xs mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">How it works</h2>
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border hidden sm:block" />
          <div className="space-y-6">
            {STEPS.map((s) => (
              <div key={s.step} className="flex gap-4">
                <div className="w-10 h-10 bg-brand rounded-full flex items-center justify-center text-dark font-black text-sm shrink-0 relative z-10">
                  {s.step}
                </div>
                <div className="bg-surface border border-border rounded-xl p-4 flex-1">
                  <h3 className="text-white font-semibold mb-1">{s.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery zones table */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-white mb-6">Delivery zones & prices</h2>
        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="grid grid-cols-4 px-4 py-3 border-b border-border text-xs text-muted font-semibold uppercase tracking-wider">
            <span className="col-span-2">Zone / Countries</span>
            <span>Delivery time</span>
            <span>Cost</span>
          </div>
          {DELIVERY_ZONES.map((zone, i) => (
            <div
              key={zone.zone}
              className={`grid grid-cols-4 px-4 py-4 gap-2 ${i < DELIVERY_ZONES.length - 1 ? 'border-b border-border' : ''}`}
            >
              <div className="col-span-2">
                <p className="text-white text-sm font-medium">{zone.zone}</p>
                <p className="text-muted text-xs mt-0.5">{zone.countries}</p>
              </div>
              <div className="flex items-center">
                <span className="text-white text-sm">{zone.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-white text-sm font-semibold">{zone.cost}</span>
                <span className="text-muted text-xs">· free from {zone.freeFrom}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-muted text-xs mt-3">* All prices include VAT. Free shipping applies to orders over €150.</p>
      </div>

      {/* Customs & tracking */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success" />
            Order tracking
          </h3>
          <p className="text-muted text-sm leading-relaxed">
            Once your order is shipped, you will receive a tracking number by email. You can track your parcel directly on the carrier&apos;s website. Most parcels are shipped via standard EU postal services.
          </p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-brand" />
            Customs & packaging
          </h3>
          <p className="text-muted text-sm leading-relaxed">
            All shipments are sent from within the EU — no customs fees for EU residents. Packages are plain, discreet boxes with no product names or brand logos on the outside.
          </p>
        </div>
      </div>

      {/* FAQ link */}
      <div className="bg-brand/5 border border-brand/20 rounded-xl p-6">
        <p className="text-white/80 text-sm leading-relaxed">
          Have more questions?{' '}
          <a href="mailto:pharmaforce@inbox.eu" className="text-brand font-semibold hover:underline">
            pharmaforce@inbox.eu
          </a>
          {' '}— we typically respond within 2–6 hours on business days.
        </p>
      </div>
    </div>
  );
}
