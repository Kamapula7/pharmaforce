'use client';

import { useState } from 'react';
import { X, Send, Loader2, CheckCircle } from 'lucide-react';

interface Props {
  order: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    bankRef: string | null;
    total: number;
    status: string;
  };
  onClose: () => void;
}

const TEMPLATES = [
  {
    label: '💳 Оплата получена',
    subject: (ref: string) => `Zahlung erhalten — Bestellung ${ref}`,
    body: (name: string, ref: string, total: string) =>
      `Hallo ${name},\n\nvielen Dank! Wir haben Ihre Zahlung für Bestellung ${ref} über ${total} erhalten.\n\nIhre Bestellung wird nun bearbeitet und in 1–2 Werktagen versandt.\n\nMit freundlichen Grüßen,\nPharmaForce Team`,
  },
  {
    label: '❓ Уточнить оплату',
    subject: (ref: string) => `Zahlungsbestätigung — Bestellung ${ref}`,
    body: (name: string, ref: string, total: string) =>
      `Hallo ${name},\n\nvielen Dank für Ihre Bestellung ${ref} über ${total}.\n\nKönnten Sie uns bitte mitteilen, ob Sie die Banküberweisung bereits durchgeführt haben?\n\nSobald wir Ihre Zahlung erhalten, versenden wir Ihre Bestellung innerhalb von 1–2 Werktagen.\n\nMit freundlichen Grüßen,\nPharmaForce Team`,
  },
  {
    label: '🚚 Заказ отправлен',
    subject: (ref: string) => `Ihre Bestellung ${ref} wurde versandt`,
    body: (name: string, ref: string) =>
      `Hallo ${name},\n\nIhre Bestellung ${ref} wurde heute versandt.\n\nGeschätzte Lieferzeit: 3–8 Werktage, je nach Ihrem Standort.\n\nAlle Pakete werden in diskreter Verpackung ohne Produktnamen versandt.\n\nBei Fragen stehen wir Ihnen gerne zur Verfügung.\n\nMit freundlichen Grüßen,\nPharmaForce Team`,
  },
  {
    label: '📦 Задержка доставки',
    subject: (ref: string) => `Update zu Ihrer Bestellung ${ref}`,
    body: (name: string, ref: string) =>
      `Hallo ${name},\n\nwir möchten Sie über den aktuellen Status Ihrer Bestellung ${ref} informieren.\n\nAufgrund erhöhten Aufkommens kann es zu einer leichten Verzögerung von 2–3 zusätzlichen Werktagen kommen. Wir entschuldigen uns für die Unannehmlichkeiten.\n\nBei Fragen stehen wir Ihnen gerne zur Verfügung.\n\nMit freundlichen Grüßen,\nPharmaForce Team`,
  },
];

function formatPrice(n: number) {
  return `€${n.toFixed(2)}`;
}

export default function SendEmailModal({ order, onClose }: Props) {
  const ref = order.bankRef ?? `#${order.id.slice(-8).toUpperCase()}`;
  const name = order.firstName;
  const total = formatPrice(order.total);

  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const applyTemplate = (tpl: (typeof TEMPLATES)[0]) => {
    setSubject(tpl.subject(ref));
    setBody(tpl.body(name, ref, total));
  };

  const send = async () => {
    if (!subject.trim() || !body.trim()) return;
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/admin/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: order.email, subject, body }),
      });
      if (res.ok) {
        setSent(true);
        setTimeout(onClose, 1800);
      } else {
        setError('Ошибка отправки. Проверь SMTP.');
      }
    } catch {
      setError('Ошибка сети.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#111118] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
          <div>
            <p className="text-white font-semibold text-sm">Написать клиенту</p>
            <p className="text-muted text-xs mt-0.5">{order.firstName} {order.lastName} · {order.email}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/8 text-muted hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Templates */}
          <div>
            <p className="text-muted text-xs mb-2">Шаблоны</p>
            <div className="flex flex-wrap gap-2">
              {TEMPLATES.map(tpl => (
                <button
                  key={tpl.label}
                  onClick={() => applyTemplate(tpl)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-muted hover:text-white transition-colors border border-white/8"
                >
                  {tpl.label}
                </button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="text-muted text-xs mb-1.5 block">Тема письма</label>
            <input
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="Subject..."
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand"
            />
          </div>

          {/* Body */}
          <div>
            <label className="text-muted text-xs mb-1.5 block">Сообщение</label>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={8}
              placeholder="Текст письма..."
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-brand resize-none"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
          )}

          {/* Send */}
          <button
            onClick={send}
            disabled={sending || sent || !subject.trim() || !body.trim()}
            className="w-full flex items-center justify-center gap-2 bg-brand text-dark font-bold py-2.5 rounded-xl hover:bg-brand-dark transition-colors disabled:opacity-50 text-sm"
          >
            {sent ? (
              <><CheckCircle className="w-4 h-4" /> Отправлено!</>
            ) : sending ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Отправка...</>
            ) : (
              <><Send className="w-4 h-4" /> Отправить письмо</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
