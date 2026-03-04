'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const body = {
      firstName: formData.get('firstName')?.toString()?.trim() ?? '',
      lastName: formData.get('lastName')?.toString()?.trim() ?? '',
      email: formData.get('email')?.toString()?.trim() ?? '',
      subject: formData.get('subject')?.toString() ?? 'other',
      message: formData.get('message')?.toString()?.trim() ?? '',
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok !== false) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-muted font-semibold uppercase tracking-wider mb-1.5">{t('firstName')}</label>
          <input
            name="firstName"
            type="text"
            placeholder={t('firstNamePlaceholder')}
            className="w-full bg-dark border border-border rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-muted/50 focus:outline-none focus:border-brand/60 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs text-muted font-semibold uppercase tracking-wider mb-1.5">{t('lastName')}</label>
          <input
            name="lastName"
            type="text"
            placeholder={t('lastNamePlaceholder')}
            className="w-full bg-dark border border-border rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-muted/50 focus:outline-none focus:border-brand/60 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs text-muted font-semibold uppercase tracking-wider mb-1.5">{t('email')}</label>
        <input
          name="email"
          type="email"
          required
          placeholder={t('emailPlaceholder')}
          className="w-full bg-dark border border-border rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-muted/50 focus:outline-none focus:border-brand/60 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs text-muted font-semibold uppercase tracking-wider mb-1.5">{t('subject')}</label>
        <select
          name="subject"
          className="w-full bg-dark border border-border rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand/60 transition-colors"
        >
          <option value="">{t('subjectPlaceholder')}</option>
          <option value="order">{t('orderQuestion')}</option>
          <option value="product">{t('productInquiry')}</option>
          <option value="shipping">{t('shippingDelivery')}</option>
          <option value="payment">{t('paymentIssue')}</option>
          <option value="returns">{t('returnsRefunds')}</option>
          <option value="other">{t('other')}</option>
        </select>
      </div>

      <div>
        <label className="block text-xs text-muted font-semibold uppercase tracking-wider mb-1.5">{t('message')}</label>
        <textarea
          name="message"
          rows={5}
          required
          placeholder={t('messagePlaceholder')}
          className="w-full bg-dark border border-border rounded-lg px-3 py-2.5 text-white text-sm placeholder:text-muted/50 focus:outline-none focus:border-brand/60 transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand/90 disabled:opacity-70 disabled:cursor-not-allowed text-dark font-bold py-3 px-6 rounded-xl transition-colors text-sm"
      >
        <Send className="w-4 h-4" />
        {status === 'sending' ? t('sending') : t('sendViaEmail')}
      </button>

      {status === 'success' && (
        <p className="text-sm text-success text-center">{t('sendSuccess')}</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-400 text-center">{t('sendError')}</p>
      )}

      <p className="text-xs text-muted text-center">
        {t('emailHint')}
      </p>
    </form>
  );
}
