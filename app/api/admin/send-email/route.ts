import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    if (cookieStore.get('admin_session')?.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { to, subject, body } = await req.json();
    if (!to || !subject || !body) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const nodemailer = (await import('nodemailer')).default;
    const transporter = nodemailer.createTransport({
      host: (process.env.SMTP_HOST ?? 'mail.inbox.eu').trim(),
      port: Number((process.env.SMTP_PORT ?? '587').trim()),
      secure: false,
      auth: {
        user: process.env.SMTP_USER?.trim(),
        pass: process.env.SMTP_PASSWORD?.trim(),
      },
    });

    const html = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#111;font-family:Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:32px 16px;">
    <div style="text-align:center;margin-bottom:24px;">
      <div style="display:inline-block;background:#F97316;border-radius:10px;padding:10px 16px;">
        <span style="color:#111;font-weight:900;font-size:20px;">⚡ PharmaForce</span>
      </div>
    </div>
    <div style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:16px;padding:28px 28px;">
      <div style="color:#ddd;font-size:15px;line-height:1.7;white-space:pre-wrap;">${body.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
    </div>
    <p style="text-align:center;color:#444;font-size:12px;margin:24px 0 0;">
      © ${new Date().getFullYear()} PharmaForce · pharmaforce@inbox.eu
    </p>
  </div>
</body>
</html>`;

    await transporter.sendMail({
      from: `"PharmaForce" <${process.env.SMTP_USER}>`,
      to,
      bcc: process.env.SMTP_USER, // silent copy to admin
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[admin/send-email]', e instanceof Error ? e.message : String(e));
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
