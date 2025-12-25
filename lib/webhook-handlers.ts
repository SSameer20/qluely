// lib/webhook-handlers.ts
import { prisma } from './prisma';
import { sendEmail } from './email';
import { logInfo, logError } from './logger';

export const webhookHandlers: Record<string, (payload: any) => Promise<any>> = {
  'payment.succeeded': handlePaymentSucceeded,
  'subscription.active': handleSubscriptionActive,
  'subscription.renewed': handleSubscriptionRenewed,
  'subscription.on_hold': handleSubscriptionOnHold,
  'subscription.cancelled': handleSubscriptionCancelled
};

export async function handlePaymentSucceeded(payload: any) {
  const { id, amount, currency, metadata } = payload;

  // Normalize and validate amount (expecting cents)
  const amountCents = Number(amount);
  if (Number.isNaN(amountCents) || amountCents < 0) {
    throw new Error(`Invalid payment amount: ${amount}`);
  }

  try {
    const userId = metadata?.app_user_id;
    if (!userId) throw new Error('Missing app_user_id in metadata');

    // Create or update payment (idempotent by dodoPaymentId)
    const payment = await prisma.payment.upsert({
      where: { dodoPaymentId: id },
      create: {
        userId,
        dodoPaymentId: id,
        amountCents,
        status: 'succeeded',
        processedAt: new Date()
      },
      update: {
        // make sure retries/duplicates update status/timestamp
        status: 'succeeded',
        amountCents,
        processedAt: new Date()
      }
    });

    // If subscription payment
    if (payload.subscription_id) {
      const subscription = await prisma.subscription.upsert({
        where: { dodoSubId: payload.subscription_id },
        create: {
          userId,
          dodoSubId: payload.subscription_id,
          planSlug: metadata?.plan_slug || 'pro',
          productId: metadata?.product_id || 'unknown',
          amountCents: amountCents,
          status: 'pending'
        },
        update: { status: 'pending' }
      });

      await prisma.payment.update({
        where: { id: payment.id },
        data: { subscriptionId: subscription.id }
      });
    }

    // Send email
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user?.email) {
      await sendEmail({
        to: user.email,
        template: 'payment_succeeded',
        data: { amount: (amount / 100).toFixed(2) }
      });
    }

    logInfo('Payment succeeded:', id);
    return { success: true };

  } catch (error) {
    logError('Error in handlePaymentSucceeded:', error);
    throw error;
  }
}

export async function handleSubscriptionActive(payload: any) {
  const { id, current_period_start, current_period_end } = payload;

  try {
    const subscription = await prisma.subscription.findUnique({
      where: { dodoSubId: id }
    });

    if (!subscription) throw new Error(`Subscription not found: ${id}`);

    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: 'active',
        startedAt: new Date(current_period_start),
        nextBillingDate: new Date(current_period_end)
      }
    });

    // Update user tier
    await prisma.user.update({
      where: { id: subscription.userId },
      data: { subscriptionTier: subscription.planSlug }
    });

    // Send email
    const user = await prisma.user.findUnique({
      where: { id: subscription.userId }
    });

    if (user?.email) {
      await sendEmail({
        to: user.email,
        template: 'subscription_activated',
        data: { plan: subscription.planSlug }
      });
    }

    logInfo('Subscription activated:', id);
    return { success: true };

  } catch (error) {
    logError('Error in handleSubscriptionActive:', error);
    throw error;
  }
}

export async function handleSubscriptionRenewed(payload: any) {
  const { id, current_period_start, current_period_end, amount } = payload;

  try {
    const subscription = await prisma.subscription.findUnique({
      where: { dodoSubId: id }
    });

    if (!subscription) throw new Error(`Subscription not found: ${id}`);

    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        nextBillingDate: new Date(current_period_end)
      }
    });

    // Create invoice
    await prisma.invoice.create({
      data: {
        userId: subscription.userId,
        subscriptionId: subscription.id,
        invoiceNumber: `INV-${Date.now()}`,
        totalCents: amount,
        status: 'paid',
        paidAt: new Date()
      }
    });

    logInfo('Subscription renewed:', id);
    return { success: true };

  } catch (error) {
    logError('Error in handleSubscriptionRenewed:', error);
    throw error;
  }
}

export async function handleSubscriptionOnHold(payload: any) {
  const { id } = payload;

  try {
    const subscription = await prisma.subscription.findUnique({
      where: { dodoSubId: id }
    });

    if (!subscription) throw new Error(`Subscription not found: ${id}`);

    await prisma.subscription.update({
      where: { id: subscription.id },
      data: { status: 'on_hold' }
    });

    logInfo('Subscription on hold:', id);
    return { success: true };

  } catch (error) {
    logError('Error in handleSubscriptionOnHold:', error);
    throw error;
  }
}

export async function handleSubscriptionCancelled(payload: any) {
  const { id } = payload;

  try {
    const subscription = await prisma.subscription.findUnique({
      where: { dodoSubId: id }
    });

    if (!subscription) throw new Error(`Subscription not found: ${id}`);

    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: 'cancelled',
        cancelledAt: new Date()
      }
    });

    // Downgrade user
    await prisma.user.update({
      where: { id: subscription.userId },
      data: { subscriptionTier: 'free' }
    });

    logInfo('Subscription cancelled:', id);
    return { success: true };

  } catch (error) {
    logError('Error in handleSubscriptionCancelled:', error);
    throw error;
  }
}