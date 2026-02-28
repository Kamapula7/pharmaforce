const BANK_DETAILS = {
  accountHolder: 'Antonietta Ferrara',
  iban: 'DE90 2022 0800 0058 7073 15',
  bic: 'SXPYDEHHXXX',
  bank: 'Banking Circle - German Branch',
};

async function createTransporter() {
  const nodemailer = (await import('nodemailer')).default;
  return nodemailer.createTransport({
    host: (process.env.SMTP_HOST ?? 'mail.inbox.eu').trim(),
    port: Number((process.env.SMTP_PORT ?? '587').trim()),
    secure: false,
    auth: {
      user: process.env.SMTP_USER?.trim(),
      pass: process.env.SMTP_PASSWORD?.trim(),
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
  const transporter = await createTransporter();

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
  const transporter = await createTransporter();

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

export async function sendAbandonedCartEmail({
  customerEmail,
  customerName,
  items,
  total,
  locale = 'en',
}: {
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  locale?: string;
}) {
  const transporter = await createTransporter();
  const firstName = customerName?.split(' ')[0] || 'Athlete';

  const html = baseLayout(`
    <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:16px;padding:32px;text-align:center;margin-bottom:24px;">
      <div style="font-size:48px;margin-bottom:16px;">🛒</div>
      <h1 style="color:#fff;font-size:24px;font-weight:900;margin:0 0 8px;">You Left Something Behind!</h1>
      <p style="color:#999;font-size:15px;margin:0;">Hi ${firstName}, you have items waiting in your cart.</p>
    </div>

    <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;overflow:hidden;margin-bottom:24px;">
      <div style="padding:16px 24px;border-bottom:1px solid #2a2a2a;">
        <h2 style="color:#fff;font-size:16px;font-weight:700;margin:0;">Your Cart</h2>
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

    <div style="text-align:center;margin-bottom:24px;">
      <a href="https://pharmaforce-store.com/${locale}/cart"
        style="display:inline-block;background:#F97316;color:#111;font-weight:900;font-size:16px;text-decoration:none;padding:16px 40px;border-radius:14px;">
        Complete Your Order →
      </a>
    </div>

    <div style="background:#1f1300;border:1px solid #F97316;border-radius:14px;padding:16px 20px;text-align:center;margin-bottom:24px;">
      <p style="color:#F97316;font-weight:800;font-size:14px;margin:0 0 4px;">🚚 Free Shipping on Orders Over €150</p>
      <p style="color:#ccc;font-size:13px;margin:0;">Your items are reserved but stock is limited.</p>
    </div>

    <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:18px 24px;text-align:center;">
      <p style="color:#999;font-size:13px;margin:0 0 6px;">Need help? We respond within a few hours.</p>
      <a href="mailto:pharmaforce@inbox.eu" style="color:#F97316;font-weight:700;font-size:14px;text-decoration:none;">pharmaforce@inbox.eu</a>
    </div>
  `);

  await transporter.sendMail({
    from: `"PharmaForce" <${process.env.SMTP_USER}>`,
    to: customerEmail,
    subject: `🛒 You left items in your cart — PharmaForce`,
    html,
  });
}

export async function sendWelcomeEmail({
  customerEmail,
  customerName,
}: {
  customerEmail: string;
  customerName: string;
}) {
  const transporter = await createTransporter();
  const firstName = customerName?.split(' ')[0] || 'Athlete';

  const html = baseLayout(`
    <!-- Hero -->
    <div style="background:linear-gradient(135deg,#1a1a1a 0%,#1f1a0e 100%);border:1px solid #2a2a2a;border-radius:20px;padding:40px 32px;text-align:center;margin-bottom:24px;position:relative;overflow:hidden;">
      <div style="font-size:52px;margin-bottom:16px;">⚡</div>
      <h1 style="color:#fff;font-size:26px;font-weight:900;margin:0 0 10px;letter-spacing:-0.5px;">
        Welcome to PharmaForce,<br/><span style="color:#F97316;">${firstName}!</span>
      </h1>
      <p style="color:#999;font-size:15px;margin:0;line-height:1.6;">
        Your account is ready. You now have access to<br/>pharmaceutical-grade performance products across Europe.
      </p>
    </div>

    <!-- What you get -->
    <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:16px;padding:24px;margin-bottom:24px;">
      <p style="color:#F97316;font-weight:700;font-size:13px;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 16px;">What's included with your account</p>
      <table style="width:100%;">
        ${[
          ['📦', 'Order History', 'Track all your past and current orders in one place'],
          ['🚚', 'Fast EU Delivery', 'Discreet shipping to 30+ European countries in 3–8 days'],
          ['✅', 'Lab-Certified Products', '165+ pharmaceutical-grade products from verified suppliers'],
          ['💬', 'Priority Support', 'Direct access to our expert team at pharmaforce@inbox.eu'],
        ].map(([icon, title, desc]) => `
        <tr>
          <td style="padding:8px 0;vertical-align:top;width:40px;">
            <span style="font-size:22px;">${icon}</span>
          </td>
          <td style="padding:8px 0 8px 10px;vertical-align:top;">
            <p style="color:#fff;font-weight:700;font-size:14px;margin:0 0 3px;">${title}</p>
            <p style="color:#888;font-size:13px;margin:0;">${desc}</p>
          </td>
        </tr>`).join('')}
      </table>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:24px;">
      <a href="https://pharmaforce-store.com/en/products"
        style="display:inline-block;background:#F97316;color:#111;font-weight:900;font-size:16px;text-decoration:none;padding:16px 40px;border-radius:14px;letter-spacing:-0.3px;">
        Browse Products →
      </a>
    </div>

    <!-- Categories strip -->
    <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:16px;padding:20px 24px;margin-bottom:24px;">
      <p style="color:#666;font-size:12px;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 14px;font-weight:700;">Popular categories</p>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">
        ${['AAS & Steroids', 'GLP-1 Weight Loss', 'Peptides & HGH', 'Antidepressants', 'Women\'s Health', 'Sexual Health', 'Protein', 'Creatine'].map(cat =>
          `<span style="background:#222;border:1px solid #333;color:#ccc;font-size:12px;padding:5px 12px;border-radius:20px;">${cat}</span>`
        ).join('')}
      </div>
    </div>

    <!-- Promo note -->
    <div style="background:#F97316/10;border:1px solid #F97316;border-radius:14px;padding:16px 20px;text-align:center;margin-bottom:24px;background-color:#1f1300;">
      <p style="color:#F97316;font-weight:800;font-size:14px;margin:0 0 4px;">🎁 Buy 2 — Get 3rd FREE</p>
      <p style="color:#ccc;font-size:13px;margin:0;">On selected products across the store. <a href="https://pharmaforce-store.com/en/products?promo=true" style="color:#F97316;text-decoration:none;font-weight:700;">See promo products →</a></p>
    </div>

    <!-- Support -->
    <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:18px 24px;text-align:center;">
      <p style="color:#999;font-size:13px;margin:0 0 6px;">Questions? We typically respond within a few hours.</p>
      <a href="mailto:pharmaforce@inbox.eu" style="color:#F97316;font-weight:700;font-size:14px;text-decoration:none;">pharmaforce@inbox.eu</a>
    </div>
  `);

  await transporter.sendMail({
    from: `"PharmaForce" <${process.env.SMTP_USER}>`,
    to: customerEmail,
    subject: `⚡ Welcome to PharmaForce, ${firstName}!`,
    html,
  });
}
