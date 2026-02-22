import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { customerEmail, customerName, orderRef, total, items } = await req.json();

    if (!customerEmail || !orderRef) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? 'smtp.inbox.eu',
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const itemsHtml = (items as { name: string; qty: number; price: number }[])
      .map(
        (item) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#ccc;font-size:14px;">${item.name}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#ccc;font-size:14px;text-align:center;">×${item.qty}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#fff;font-size:14px;text-align:right;font-weight:600;">€${(item.price * item.qty).toFixed(2)}</td>
        </tr>`
      )
      .join('');

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#111;font-family:Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:32px 16px;">

    <!-- Logo -->
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;background:#F97316;border-radius:10px;padding:10px 16px;">
        <span style="color:#111;font-weight:900;font-size:20px;letter-spacing:-0.5px;">⚡ PharmaForce</span>
      </div>
    </div>

    <!-- Hero -->
    <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:16px;padding:32px;text-align:center;margin-bottom:24px;">
      <div style="font-size:48px;margin-bottom:16px;">✅</div>
      <h1 style="color:#fff;font-size:24px;font-weight:900;margin:0 0 8px;">Order Confirmed!</h1>
      <p style="color:#999;font-size:15px;margin:0;">Hi ${customerName}, your order has been successfully received.</p>
    </div>

    <!-- Order ref -->
    <div style="background:#F97316;border-radius:12px;padding:16px 24px;text-align:center;margin-bottom:24px;">
      <p style="color:#111;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin:0 0 4px;">Order Reference</p>
      <p style="color:#111;font-size:28px;font-weight:900;font-family:monospace;margin:0;">${orderRef}</p>
    </div>

    <!-- Status message -->
    <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-left:4px solid #22c55e;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
      <p style="color:#22c55e;font-weight:700;font-size:14px;margin:0 0 8px;">🚀 What happens next?</p>
      <p style="color:#ccc;font-size:14px;line-height:1.6;margin:0;">
        Your payment has been registered in our system. As soon as we confirm the bank transfer, 
        we will process and dispatch your order within <strong style="color:#fff;">1–2 business days</strong>.<br/><br/>
        <strong style="color:#fff;">We will notify you when your parcel is on its way</strong> and again when it is close to your address.
      </p>
    </div>

    <!-- Order items -->
    <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;overflow:hidden;margin-bottom:24px;">
      <div style="padding:16px 24px;border-bottom:1px solid #2a2a2a;">
        <h2 style="color:#fff;font-size:16px;font-weight:700;margin:0;">Order Summary</h2>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr style="background:#222;">
            <th style="padding:8px 12px;text-align:left;color:#666;font-size:11px;text-transform:uppercase;font-weight:600;">Product</th>
            <th style="padding:8px 12px;text-align:center;color:#666;font-size:11px;text-transform:uppercase;font-weight:600;">Qty</th>
            <th style="padding:8px 12px;text-align:right;color:#666;font-size:11px;text-transform:uppercase;font-weight:600;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding:12px 12px 12px;color:#999;font-size:14px;text-align:right;font-weight:700;">Total:</td>
            <td style="padding:12px 12px 12px;color:#F97316;font-size:18px;font-weight:900;text-align:right;">€${Number(total).toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- Support -->
    <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:12px;padding:20px 24px;text-align:center;margin-bottom:24px;">
      <p style="color:#999;font-size:13px;margin:0 0 8px;">Questions? Our team is here to help.</p>
      <a href="mailto:pharmaforce@inbox.eu" style="color:#F97316;font-weight:700;font-size:14px;text-decoration:none;">pharmaforce@inbox.eu</a>
    </div>

    <!-- Footer -->
    <p style="text-align:center;color:#444;font-size:12px;margin:0;">
      © ${new Date().getFullYear()} PharmaForce · EU-wide Shipping · GDPR Compliant
    </p>

  </div>
</body>
</html>`;

    await transporter.sendMail({
      from: `"PharmaForce" <${process.env.SMTP_USER}>`,
      to: customerEmail,
      subject: `✅ Order Confirmed — ${orderRef} | PharmaForce`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Email send error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
