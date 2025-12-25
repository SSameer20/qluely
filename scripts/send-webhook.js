// scripts/send-webhook.js
const fetch = require('node-fetch');
const { Webhook: Signer } = require('standardwebhooks');

async function main() {
  const key = process.env.DODO_PAYMENTS_WEBHOOK_KEY;
  if (!key) throw new Error('Set DODO_PAYMENTS_WEBHOOK_KEY in env');

  const payload = {
    id: `wh_test_${Date.now()}`,
    type: 'payment.succeeded',
    data: {
      object: {
        id: `pay_${Date.now()}`,
        amount: 49900,
        currency: 'INR',
        subscription_id: null,
        metadata: { app_user_id: process.env.TEST_APP_USER_ID || '', plan_slug: 'pro', product_id: 'prd_123' }
      }
    }
  };

  const raw = JSON.stringify(payload);
  const signer = new Signer(key);
  const headers = signer.sign(raw);

  const res = await fetch('http://localhost:3000/api/webhooks/dodo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'webhook-id': headers['webhook-id'],
      'webhook-signature': headers['webhook-signature'],
      'webhook-timestamp': headers['webhook-timestamp']
    },
    body: raw
  });

  console.log('Response status:', res.status);
  console.log('Body:', await res.text());
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
