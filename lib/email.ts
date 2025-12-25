// lib/email.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export async function sendEmail({
  to,
  template,
  data
}: {
  to: string;
  template: string;
  data: any;
}) {
  const templates: Record<string, any> = {
    payment_succeeded: {
      subject: 'Payment Received ✓',
      html: `<p>Thank you! Your payment of ₹${data.amount} has been received.</p>`
    },
    subscription_activated: {
      subject: `Welcome to ${data.plan} Plan!`,
      html: `<p>Your subscription to the ${data.plan} plan is now active.</p>`
    },
    subscription_renewed: {
      subject: 'Subscription Renewed',
      html: '<p>Your subscription has been renewed successfully.</p>'
    }
  };

  const template_ = templates[template];
  if (!template_) return;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject: template_.subject,
    html: template_.html
  });
}