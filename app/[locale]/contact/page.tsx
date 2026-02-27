import type { Metadata } from 'next';
import { Mail, MessageSquare, Clock, Send } from 'lucide-react';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: 'Contact PharmaForce — Customer Support Europe',
    description: 'Get in touch with PharmaForce. Questions about orders, products or shipping? Our support team responds within a few hours.',
    alternates: {
      canonical: `https://pharmaforce-store.com/${locale}/contact`,
      languages: {
        'en': 'https://pharmaforce-store.com/en/contact',
        'de': 'https://pharmaforce-store.com/de/contact',
        'fr': 'https://pharmaforce-store.com/fr/contact',
        'it': 'https://pharmaforce-store.com/it/contact',
        'pl': 'https://pharmaforce-store.com/pl/contact',
        'es': 'https://pharmaforce-store.com/es/contact',
      },
    },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  await params;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-brand text-xs font-bold uppercase tracking-widest mb-3">Get in Touch</p>
        <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">Contact Us</h1>
        <p className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
          Have questions about products, orders, or shipping? We typically respond within a few hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Contact form */}
        <div className="bg-surface border border-border rounded-2xl p-8">
          <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
            <Send className="w-5 h-5 text-brand" />
            Send a Message
          </h2>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-muted font-semibold uppercase tracking-wider mb-1.5">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full bg-dark border border-border rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-muted/50 focus:outline-none focus:border-brand/60 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-muted font-semibold uppercase tracking-wider mb-1.5">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full bg-dark border border-border rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-muted/50 focus:outline-none focus:border-brand/60 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-muted font-semibold uppercase tracking-wider mb-1.5">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-dark border border-border rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-muted/50 focus:outline-none focus:border-brand/60 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs text-muted font-semibold uppercase tracking-wider mb-1.5">Subject</label>
              <select className="w-full bg-dark border border-border rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand/60 transition-colors">
                <option value="">Select a topic...</option>
                <option>Order question</option>
                <option>Product inquiry</option>
                <option>Shipping & delivery</option>
                <option>Payment issue</option>
                <option>Returns & refunds</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-muted font-semibold uppercase tracking-wider mb-1.5">Message</label>
              <textarea
                rows={5}
                placeholder="Write your message here..."
                className="w-full bg-dark border border-border rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-muted/50 focus:outline-none focus:border-brand/60 transition-colors resize-none"
              />
            </div>

            <a
              href="mailto:pharmaforce@inbox.eu"
              className="w-full inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand/90 text-dark font-bold py-3 px-6 rounded-xl transition-colors cursor-pointer text-sm"
            >
              <Send className="w-4 h-4" />
              Send via Email
            </a>
            <p className="text-xs text-muted text-center">
              Clicking will open your email client with this address pre-filled.
            </p>
          </form>
        </div>

        {/* Info cards */}
        <div className="space-y-5">

          {/* Email */}
          <div className="bg-surface border border-border rounded-2xl p-6 hover:border-brand/40 transition-colors group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-brand/20 transition-colors">
                <Mail className="w-6 h-6 text-brand" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Email Support</h3>
                <p className="text-muted text-sm mb-2">For orders, products, and general inquiries</p>
                <a
                  href="mailto:pharmaforce@inbox.eu"
                  className="text-brand font-semibold hover:underline text-sm"
                >
                  pharmaforce@inbox.eu
                </a>
              </div>
            </div>
          </div>

          {/* Live chat */}
          <div className="bg-surface border border-border rounded-2xl p-6 hover:border-brand/40 transition-colors group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-brand/20 transition-colors">
                <MessageSquare className="w-6 h-6 text-brand" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Live Chat</h3>
                <p className="text-muted text-sm mb-2">Get instant answers from our team</p>
                <p className="text-xs text-muted flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-success inline-block animate-pulse" />
                  Online now — click the chat icon
                </p>
              </div>
            </div>
          </div>

          {/* Response time */}
          <div className="bg-surface border border-border rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-brand" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Response Time</h3>
                <ul className="space-y-1 text-sm text-muted">
                  <li>📧 Email — within <span className="text-white">2–6 hours</span></li>
                  <li>💬 Live chat — <span className="text-white">immediate</span></li>
                  <li>🕐 Working hours: <span className="text-white">Mon–Fri 9:00–20:00 CET</span></li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ hint */}
          <div className="bg-brand/5 border border-brand/20 rounded-2xl p-5">
            <p className="text-sm text-white/80 leading-relaxed">
              <span className="text-brand font-bold">Before writing</span> — check our{' '}
              <span className="text-brand font-semibold">Blog</span> for dosage guides, cycle protocols,
              and product comparisons. Most common questions are answered there.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
