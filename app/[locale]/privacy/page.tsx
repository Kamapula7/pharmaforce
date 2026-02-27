import type { Metadata } from 'next';

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Privacy Policy | PharmaForce',
    description: 'PharmaForce Privacy Policy. How we collect, use and protect your personal data in accordance with GDPR.',
    alternates: {
      canonical: `https://pharmaforce-store.com/${locale}/privacy`,
      languages: {
        'en': 'https://pharmaforce-store.com/en/privacy',
        'de': 'https://pharmaforce-store.com/de/privacy',
        'fr': 'https://pharmaforce-store.com/fr/privacy',
        'it': 'https://pharmaforce-store.com/it/privacy',
        'pl': 'https://pharmaforce-store.com/pl/privacy',
        'es': 'https://pharmaforce-store.com/es/privacy',
      },
    },
  };
}

const SECTIONS = [
  {
    title: '1. Who We Are',
    body: `PharmaForce ("we", "us", "our") is an e-commerce business operating at pharmaforce.eu, supplying sports pharmacology, dietary supplements, and performance products to customers across the European Union. Our contact email is pharmaforce@inbox.eu.`,
  },
  {
    title: '2. What Data We Collect',
    body: `When you place an order or contact us, we may collect the following personal data:
• Full name and surname
• Email address
• Shipping address (country, city, street, postal code)
• Phone number (optional)
• Payment reference details (bank transfer only — we do not collect card data)
• IP address and browser information (collected automatically via server logs)
• Communications you send us (email, live chat messages)

We do not collect sensitive personal data such as health records, biometric data, or financial account numbers.`,
  },
  {
    title: '3. How We Use Your Data',
    body: `We use your personal data for the following purposes:
• Processing and fulfilling your order (legal basis: contract performance)
• Sending order confirmations and shipping updates (legal basis: contract performance)
• Responding to your customer service inquiries (legal basis: legitimate interest)
• Complying with applicable EU laws and regulations (legal basis: legal obligation)
• Improving our website and services through aggregated analytics (legal basis: legitimate interest)

We do not use your data for automated decision-making or profiling that produces legal effects.`,
  },
  {
    title: '4. Data Sharing',
    body: `We do not sell, rent, or trade your personal data to third parties. We may share your data only with:
• Shipping and logistics partners (for order delivery purposes only)
• Payment processors (we use bank transfer only; no third-party payment gateway receives your card data)
• IT infrastructure providers (hosting, email delivery) acting as data processors under GDPR-compliant contracts
• Law enforcement or regulatory bodies when required by law

All third-party processors are contractually bound to use your data solely for the services they provide to us.`,
  },
  {
    title: '5. Data Retention',
    body: `We retain your personal data for as long as necessary to fulfil the purposes for which it was collected:
• Order data: 7 years (EU accounting and tax obligations)
• Customer communications: 2 years from last contact
• Website analytics data: 12 months (aggregated, anonymised)

After the retention period, data is securely deleted or anonymised.`,
  },
  {
    title: '6. Your Rights Under GDPR',
    body: `As an EU resident, you have the following rights regarding your personal data:
• Right of access — request a copy of the data we hold about you
• Right to rectification — correct inaccurate or incomplete data
• Right to erasure — request deletion of your data ("right to be forgotten")
• Right to restrict processing — limit how we use your data
• Right to data portability — receive your data in a machine-readable format
• Right to object — object to processing based on legitimate interest
• Right to withdraw consent — where processing is consent-based

To exercise any of these rights, contact us at pharmaforce@inbox.eu. We will respond within 30 days. You also have the right to lodge a complaint with your national data protection authority.`,
  },
  {
    title: '7. Cookies',
    body: `Our website uses the following types of cookies:
• Strictly necessary cookies: required for the website to function (session management, cart)
• Analytical cookies: anonymised usage statistics (no personal identification)

We do not use advertising or tracking cookies. You can manage cookie preferences through your browser settings at any time.`,
  },
  {
    title: '8. Data Security',
    body: `We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, or disclosure. These include:
• HTTPS encryption for all data transmitted to and from our website
• Access controls limiting data access to authorised personnel only
• Regular security reviews of our systems

No system is 100% secure. If you suspect a security incident involving your data, contact us immediately at pharmaforce@inbox.eu.`,
  },
  {
    title: '9. International Transfers',
    body: `We primarily process data within the European Economic Area (EEA). If any data is transferred outside the EEA (e.g., via third-party software tools), we ensure appropriate safeguards are in place, such as Standard Contractual Clauses approved by the European Commission.`,
  },
  {
    title: '10. Changes to This Policy',
    body: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. We will notify you of material changes by posting the updated policy on this page with a revised date. Continued use of our website after changes constitutes acceptance of the updated policy.`,
  },
];

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  await params;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Header */}
      <div className="mb-12">
        <p className="text-brand text-xs font-bold uppercase tracking-widest mb-3">Legal</p>
        <h1 className="text-4xl font-black text-white mb-3">Privacy Policy</h1>
        <p className="text-muted text-sm">Last updated: 1 February 2026 · Effective date: 1 February 2026</p>
      </div>

      {/* Intro */}
      <div className="bg-brand/5 border border-brand/20 rounded-xl p-5 mb-10">
        <p className="text-white/80 text-sm leading-relaxed">
          This Privacy Policy explains how PharmaForce collects, uses, and protects your personal data in accordance with the EU General Data Protection Regulation (GDPR — Regulation 2016/679) and applicable national data protection laws.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {SECTIONS.map((section) => (
          <section key={section.title}>
            <h2 className="text-lg font-bold text-white mb-3 pb-2 border-b border-border">
              {section.title}
            </h2>
            <p className="text-muted text-sm leading-relaxed whitespace-pre-line">
              {section.body}
            </p>
          </section>
        ))}
      </div>

      {/* Contact */}
      <div className="mt-14 bg-surface border border-border rounded-xl p-6">
        <h3 className="text-white font-semibold mb-2">Data Protection Contact</h3>
        <p className="text-muted text-sm">
          For any privacy-related questions or requests, contact us at{' '}
          <a href="mailto:pharmaforce@inbox.eu" className="text-brand hover:underline">
            pharmaforce@inbox.eu
          </a>
          . We will respond within 30 calendar days.
        </p>
      </div>
    </div>
  );
}
