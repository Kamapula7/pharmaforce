'use client';

import { useState } from 'react';
import { CheckCircle, Copy, Check, ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

const BANK_DETAILS = {
  bankName: 'Deutsche Bank',
  iban: 'DE89 3704 0044 0532 0130 00',
  bic: 'COBADEFFXXX',
  accountHolder: 'PharmaForce Ltd.',
};

interface OrderConfirmationClientProps {
  locale: string;
  orderRef: string;
  total: number;
}

export default function OrderConfirmationClient({ locale, orderRef, total }: OrderConfirmationClientProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const CopyButton = ({ text, field }: { text: string; field: string }) => (
    <button
      onClick={() => copy(text, field)}
      className="ml-2 p-1 text-muted hover:text-brand transition-colors rounded"
      title="Copy"
    >
      {copied === field ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
    </button>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Success header */}
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-10 h-10 text-success" />
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-2">Order Confirmed!</h1>
        <p className="text-muted">
          Thank you for your order. Please complete the bank transfer using the details below.
        </p>
      </div>

      {/* Order reference */}
      <div className="bg-surface border border-border rounded-2xl p-5 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted text-sm mb-1">Order Reference</p>
            <p className="text-white font-bold text-xl tracking-wider">{orderRef}</p>
          </div>
          <div className="text-right">
            <p className="text-muted text-sm mb-1">Amount to pay</p>
            <p className="text-brand font-extrabold text-2xl">{formatPrice(total)}</p>
          </div>
        </div>
      </div>

      {/* Bank details */}
      <div className="bg-surface border border-brand/30 rounded-2xl p-6 mb-6">
        <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
          🏦 Bank Transfer Details
        </h2>

        <div className="space-y-4">
          {[
            { label: 'Account Holder', value: BANK_DETAILS.accountHolder, field: 'holder' },
            { label: 'Bank', value: BANK_DETAILS.bankName, field: 'bank' },
            { label: 'IBAN', value: BANK_DETAILS.iban, field: 'iban' },
            { label: 'BIC / SWIFT', value: BANK_DETAILS.bic, field: 'bic' },
            { label: 'Payment Reference', value: orderRef, field: 'ref', highlight: true },
            { label: 'Amount', value: formatPrice(total), field: 'amount' },
          ].map(({ label, value, field, highlight }) => (
            <div key={field} className={`flex items-center justify-between py-3 border-b border-border last:border-0 ${highlight ? 'bg-brand/5 -mx-2 px-2 rounded-lg' : ''}`}>
              <div>
                <p className="text-muted text-xs mb-0.5">{label}</p>
                <p className={`font-semibold ${highlight ? 'text-brand' : 'text-white'}`}>{value}</p>
              </div>
              <CopyButton text={value} field={field} />
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-surface-2 rounded-2xl p-5 mb-8 space-y-3">
        <h3 className="text-white font-semibold">Important Instructions</h3>
        {[
          { icon: '📋', text: `Include "${orderRef}" as the payment reference (Verwendungszweck/Reference)` },
          { icon: '⏱️', text: 'Your order will be shipped 1–2 business days after payment is received' },
          { icon: '📧', text: 'A confirmation email has been sent to your email address' },
          { icon: '❓', text: 'Questions? Contact us at support@pharmaforce.eu' },
        ].map(({ icon, text }) => (
          <div key={text} className="flex items-start gap-3 text-sm text-muted">
            <span className="text-lg shrink-0">{icon}</span>
            <p>{text}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href={`/${locale}/products`}
          className="flex-1 flex items-center justify-center gap-2 bg-brand text-dark font-bold py-3 rounded-xl hover:bg-brand-dark transition-colors"
        >
          Continue Shopping
          <ArrowRight className="w-4 h-4" />
        </Link>
        <button
          onClick={() => window.print()}
          className="flex-1 flex items-center justify-center gap-2 border border-border text-white font-semibold py-3 rounded-xl hover:bg-surface-2 transition-colors"
        >
          🖨️ Print Details
        </button>
      </div>
    </div>
  );
}
