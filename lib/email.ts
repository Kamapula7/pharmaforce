import nodemailer from 'nodemailer';

const BANK_DETAILS = {
  accountHolder: 'Antonietta Ferrara',
  iban: 'DE90 2022 0800 0058 7073 15',
  bic: 'SXPYDEHHXXX',
  bank: 'Banking Circle - German Branch',
};

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? 'smtp.inbox.eu',
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

interface OrderItem { name: string; qty: number; price: number }

function itemsTable(items: OrderItem[]) {
  return items.map(item => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#ccc;font-size:14px;">${item.name}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#ccc;font-size:14px;text-align:center;">×${item.qty}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#fff;font-size:14px;text-align:right;font-weight:600;">€${(item.price * item.qty).toFixed(2)}</td>
    </tr>`).join('');
}

function baseLayout(content: string) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#111;font-family:Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:32px 16px;">
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;background:#F97316;border-radius:10px;padding:10px 16px;">
        <span style="color:#111;font-weight:900;font-size:20px;letter-spacing:-0.5px;">⚡ PharmaForce</span>
      </div>
    </div>
    ${content}
    <p style="text-align:center;color:#444;font-size:12px;margin:24px 0 0;">
      © ${new Date().getFullYear()} PharmaForce · EU-wide Shipping · GDPR Compliant
    </p>
  </div>
</body>
</html>`;
}

export async function sendOrderConfirmation({
  customerEmail,
  customerName,
  orderRef,
  total,
  items,
}: {
  customerEmail: string;
  customerName: string;
  orderRef: string;
  total: number;
  items: OrderItem[];
}) {
  const transporter = createTransporter();

  const html = baseLayout(`
    <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:16px;padding:32px;text-align:center;margin-bottom:24px;">
      <div style="font-size:48px;margin-bottom:16px;">✅</div>
      <h1 style="color:#fff;font-size:24px;font-weight:900;margin:0 0 8px;">Order Confirmed!</h1>
      <p style="color:#999;font-size:15px;margin:0;">Hi ${customerName}, your order has been successfully received.</p>
    </div>

    <div style="background:#F97316;border-radius:12px;padding:16px 24px;text-align:center;margin-bottom:24px;">
      <p style="color:#111;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:0 0 4px;">Order Reference</p>
      <p style="color:#111;font-size:28px;font-weight:900;font-family:monospace;margin:0;">${orderRef}</p>
    </div>

    <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-left:4px solid #22c55e;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
      <p style="color:#22c55e;font-weight:700;font-size:14px;margin:0 0 8px;">🏦 Bank Transfer Details</p>
      <table style="width:100%;font-size:13px;color:#ccc;">
        <tr><td style="padding:4px 0;color:#888;">Account Holder:</td><td style="color:#fff;font-weight:600;">${BANK_DETAILS.accountHolder}</td></tr>
        <tr><td style="padding:4px 0;color:#888;">IBAN:</td><td style="color:#F97316;font-weight:700;font-family:monospace;">${BANK_DETAILS.iban}</td></tr>
        <tr><td style="padding:4px 0;color:#888;">BIC/SWIFT:</td><td style="color:#fff;">${BANK_DETAILS.bic}</td></tr>
        <tr><td style="padding:4px 0;color:#888;">Bank:</td><td style="color:#fff;">${BANK_DETAILS.bank}</td></tr>
        <tr><td style="padding:4px 0;color:#888;">Reference:</td><td style="color:#F97316;font-weight:700;">${orderRef}</td></tr>
        <tr><td style="padding:4px 0;color:#888;">Amount:</td><td style="color:#F97316;font-weight:900;font-size:16px;">€${total.toFixed(2)}</td></tr>
      </table>
    </div>

    <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;overflow:hidden;margin-bottom:24px;">
      <div style="padding:16px 24px;border-bottom:1px solid #2a2a2a;">
        <h2 style="color:#fff;font-size:16px;font-weight:700;margin:0;">Order Summary</h2>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        <thead><tr style="background:#222;">
          <th style="padding:8px 12px;text-align:left;color:#666;font-size:11px;text-transform:uppercase;">Product</th>
          <th style="padding:8px 12px;text-align:center;color:#666;font-size:11px;text-transform:uppercase;">Qty</th>
          <th style="padding:8px 12px;text-align:right;color:#666;font-size:11px;text-transform:uppercase;">Price</th>
        </tr></thead>
        <tbody>${itemsTable(items)}</tbody>
        <tfoot><tr>
          <td colspan="2" style="padding:12px;color:#999;font-size:14px;text-align:right;font-weight:700;">Total:</td>
          <td style="padding:12px;color:#F97316;font-size:18px;font-weight:900;text-align:right;">€${total.toFixed(2)}</td>
        </tr></tfoot>
      </table>
    </div>

    <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:20px 24px;text-align:center;margin-bottom:24px;">
      <p style="color:#999;font-size:13px;margin:0 0 8px;">Questions? We respond within a few hours.</p>
      <a href="mailto:pharmaforce@inbox.eu" style="color:#F97316;font-weight:700;font-size:14px;text-decoration:none;">pharmaforce@inbox.eu</a>
    </div>
  `);

  await transporter.sendMail({
    from: `"PharmaForce" <${process.env.SMTP_USER}>`,
    to: customerEmail,
    subject: `✅ Order Confirmed — ${orderRef} | PharmaForce`,
    html,
  });
}

export async function sendShippedNotification({
  customerEmail,
  customerName,
  orderRef,
  total,
}: {
  customerEmail: string;
  customerName: string;
  orderRef: string;
  total: number;
}) {
  const transporter = createTransporter();

  const html = baseLayout(`
    <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:16px;padding:32px;text-align:center;margin-bottom:24px;">
      <div style="font-size:48px;margin-bottom:16px;">🚚</div>
      <h1 style="color:#fff;font-size:24px;font-weight:900;margin:0 0 8px;">Your Order Is On Its Way!</h1>
      <p style="color:#999;font-size:15px;margin:0;">Hi ${customerName}, your order has been dispatched.</p>
    </div>

    <div style="background:#F97316;border-radius:12px;padding:16px 24px;text-align:center;margin-bottom:24px;">
      <p style="color:#111;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:0 0 4px;">Order Reference</p>
      <p style="color:#111;font-size:28px;font-weight:900;font-family:monospace;margin:0;">${orderRef}</p>
    </div>

    <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-left:4px solid #3b82f6;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
      <p style="color:#3b82f6;font-weight:700;font-size:14px;margin:0 0 12px;">📦 Shipping Information</p>
      <p style="color:#ccc;font-size:14px;line-height:1.6;margin:0;">
        Your order of <strong style="color:#fff;">€${total.toFixed(2)}</strong> has been packed and dispatched from our EU warehouse.<br/><br/>
        Estimated delivery: <strong style="color:#fff;">3–8 business days</strong> depending on your location.<br/><br/>
        All parcels are shipped in <strong style="color:#fff;">plain, discreet packaging</strong> with no product names on the outside.
      </p>
    </div>

    <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:20px 24px;text-align:center;margin-bottom:24px;">
      <p style="color:#999;font-size:13px;margin:0 0 8px;">Questions about your shipment?</p>
      <a href="mailto:pharmaforce@inbox.eu" style="color:#F97316;font-weight:700;font-size:14px;text-decoration:none;">pharmaforce@inbox.eu</a>
    </div>
  `);

  await transporter.sendMail({
    from: `"PharmaForce" <${process.env.SMTP_USER}>`,
    to: customerEmail,
    subject: `🚚 Your Order ${orderRef} Has Been Shipped | PharmaForce`,
    html,
  });
}
