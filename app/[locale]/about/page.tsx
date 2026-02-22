import { FlaskConical, Truck, Award, Users } from 'lucide-react';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-white mb-4">About PharmaForce</h1>
        <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
          PharmaForce is a European-based supplier of professional sports pharmacology, supplements, and vitamins.
          Our mission is to give every athlete access to pharmaceutical-grade performance products.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        {[
          { icon: FlaskConical, title: 'Lab Certified', desc: 'Every batch tested for purity, potency, and safety by independent European laboratories.' },
          { icon: Truck, title: 'Pan-European Shipping', desc: 'Fast, discreet delivery to 30+ EU and EEA countries. Typical delivery: 3-7 business days.' },
          { icon: Award, title: 'Pro-Grade Quality', desc: 'We source directly from certified manufacturers, ensuring pharmaceutical-grade standards.' },
          { icon: Users, title: '2,400+ Athletes', desc: 'Trusted by competitive athletes, bodybuilders, and fitness enthusiasts across Europe.' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="p-6 bg-surface border border-border rounded-xl">
            <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 text-brand" />
            </div>
            <h3 className="text-white font-semibold mb-2">{title}</h3>
            <p className="text-muted text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Our Commitment</h2>
        <p className="text-muted leading-relaxed max-w-2xl mx-auto">
          All products sold through PharmaForce comply with EU regulations for food supplements and sports nutrition.
          We are fully GDPR compliant and committed to transparent business practices.
          Our bank transfer payment system ensures your financial data is never shared with third parties.
        </p>
      </div>
    </div>
  );
}
