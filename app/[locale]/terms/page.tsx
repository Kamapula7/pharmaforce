interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

const SECTIONS = [
  {
    title: '1. About PharmaForce',
    body: `PharmaForce ("Company", "we", "us") operates an online store at pharmaforce.eu specialising in sports pharmacology, dietary supplements, vitamins, and performance products. By accessing or using our website and placing an order, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.

Contact: pharmaforce@gmail.com`,
  },
  {
    title: '2. Eligibility',
    body: `You must be at least 18 years of age to purchase from PharmaForce. By placing an order, you confirm that you meet this age requirement and that you are legally permitted to purchase the products you have ordered in your country of residence.

Some products we sell are intended exclusively for research, sports supplementation, or health purposes. It is your sole responsibility to verify the legal status of any product in your jurisdiction before ordering.`,
  },
  {
    title: '3. Products and Descriptions',
    body: `We make every effort to ensure that product descriptions, images, and specifications are accurate. However, we do not warrant that product descriptions are error-free, complete, or current. Product packaging and formulation may occasionally differ from images shown on the website.

All products are sold for lawful purposes only. PharmaForce does not encourage, condone, or facilitate the use of any substance in violation of applicable sports federation rules, national laws, or medical guidelines. Customers are solely responsible for compliance with all applicable regulations.`,
  },
  {
    title: '4. Pricing and Payment',
    body: `All prices are displayed in Euros (€) and are inclusive of applicable taxes unless otherwise stated. Shipping costs are calculated at checkout and may vary based on destination and order weight.

We accept payment by bank transfer only. After placing an order, you will receive our bank account details (IBAN, BIC/SWIFT, and payment reference). Orders are processed only after full payment is confirmed. We do not accept cash, credit cards, or cryptocurrency.

We reserve the right to adjust prices at any time without prior notice. Price changes will not affect orders already confirmed.`,
  },
  {
    title: '5. Order Processing and Shipping',
    body: `Orders are processed within 1–2 business days after payment confirmation. Delivery times vary by destination:
• EU countries: 3–7 business days (standard)
• EEA and other European countries: 5–10 business days

All shipments are dispatched discreetly without product-identifying labels on the outer packaging. A tracking number is provided by email once the order has been dispatched.

PharmaForce is not responsible for delays caused by customs, postal services, or events beyond our control. Risk of loss and title for products passes to you upon delivery to the carrier.`,
  },
  {
    title: '6. Returns and Refunds',
    body: `Under EU consumer law, you have the right to withdraw from your order within 14 days of receiving the goods without giving any reason, provided the products are:
• Unopened and in original, undamaged packaging
• Not perishable or health/hygiene products that have been unsealed

To initiate a return, contact us at pharmaforce@gmail.com within 14 days of receipt. We will provide return instructions. Return shipping costs are borne by the customer unless the return is due to our error (wrong product or defective item).

Refunds are processed within 14 days of receiving the returned goods and are issued via bank transfer to the original payment account.`,
  },
  {
    title: '7. Disclaimer of Medical Advice',
    body: `The information provided on our website, including product descriptions, blog articles, and dosage guides, is for informational and educational purposes only. It does not constitute medical advice, diagnosis, or treatment recommendations.

Always consult a qualified healthcare professional before using any supplement, pharmacological agent, or performance compound, especially if you have a pre-existing medical condition, are taking medication, or are pregnant or breastfeeding. PharmaForce expressly disclaims any liability for adverse effects resulting from the use or misuse of our products.`,
  },
  {
    title: '8. Limitation of Liability',
    body: `To the maximum extent permitted by applicable law, PharmaForce shall not be liable for:
• Indirect, incidental, special, or consequential damages arising from the use of our products or website
• Any health complications, adverse reactions, or injuries resulting from product use
• Loss of data, profits, or business opportunities

Our total aggregate liability to you for any claim arising out of or relating to your order shall not exceed the total amount paid by you for that specific order.

Nothing in these Terms limits our liability for fraud, death or personal injury caused by our negligence, or any other liability that cannot be excluded under applicable law.`,
  },
  {
    title: '9. Intellectual Property',
    body: `All content on the PharmaForce website — including text, images, logos, product descriptions, blog articles, and design elements — is the intellectual property of PharmaForce or its content licensors and is protected by EU copyright law.

You may not reproduce, distribute, modify, or create derivative works from any content on our website without our prior written consent. You may share links to our content provided proper attribution is given.`,
  },
  {
    title: '10. Privacy',
    body: `Your use of our website is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our services, you consent to the collection and use of your personal data as described in the Privacy Policy.`,
  },
  {
    title: '11. Governing Law and Disputes',
    body: `These Terms of Service are governed by and construed in accordance with the laws of the European Union and the applicable national legislation of the country in which PharmaForce is registered.

In the event of a dispute, we encourage you to contact us first at pharmaforce@gmail.com to seek an amicable resolution. EU consumers also have access to the European Online Dispute Resolution (ODR) platform at https://ec.europa.eu/odr.

If a dispute cannot be resolved amicably, it shall be submitted to the competent courts of the jurisdiction applicable under EU consumer protection rules.`,
  },
  {
    title: '12. Changes to These Terms',
    body: `We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page with an updated effective date. Your continued use of our website and services after changes are posted constitutes your acceptance of the revised Terms. We recommend reviewing this page periodically.`,
  },
];

export default async function TermsPage({ params }: TermsPageProps) {
  await params;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Header */}
      <div className="mb-12">
        <p className="text-brand text-xs font-bold uppercase tracking-widest mb-3">Legal</p>
        <h1 className="text-4xl font-black text-white mb-3">Terms of Service</h1>
        <p className="text-muted text-sm">Last updated: 1 February 2026 · Effective date: 1 February 2026</p>
      </div>

      {/* Intro */}
      <div className="bg-brand/5 border border-brand/20 rounded-xl p-5 mb-10">
        <p className="text-white/80 text-sm leading-relaxed">
          Please read these Terms of Service carefully before using the PharmaForce website or placing an order. These terms constitute a legally binding agreement between you and PharmaForce.
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
        <h3 className="text-white font-semibold mb-2">Questions About These Terms?</h3>
        <p className="text-muted text-sm">
          Contact us at{' '}
          <a href="mailto:pharmaforce@gmail.com" className="text-brand hover:underline">
            pharmaforce@gmail.com
          </a>
          {' '}and we will respond within 2 business days.
        </p>
      </div>
    </div>
  );
}
