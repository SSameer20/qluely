// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { DodoPayments } from 'dodopayments';
import { prisma } from '@/lib/prisma';
import { validateCheckoutRequest } from '@/lib/validation';
import { logError } from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    // 1. Parse & validate request
    const body = await request.json();
    const validation = validateCheckoutRequest(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const { plan, userId } = validation.data;

    // 2. Get/create user & DodoPayments customer
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { dodoCustomer: true }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // 3. Create DodoPayments customer if doesn't exist
    let dodoCustomerId = user.dodoCustomer?.dodoCustomerId;
    
    if (!dodoCustomerId) {
      const dodoClient = new DodoPayments({
        bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
        environment: (process.env.DODO_PAYMENTS_ENVIRONMENT || 'test_mode') as any
      });

      const customer = await dodoClient.customers.create({
        email: user.email,
        name: user.name || 'User',
        metadata: { app_user_id: user.id }
      });

      dodoCustomerId = customer.id;

      await prisma.dodoCustomer.create({
        data: {
          userId: user.id,
          dodoCustomerId: customer.id,
          email: user.email,
          name: user.name
        }
      });
    }

    // 4. Get plan config
    const planConfig = getPlanConfig(plan);
    if (!planConfig) {
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      );
    }

    // 5. Create checkout session with DodoPayments
    const dodoClient = new DodoPayments({
      bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
      environment: (process.env.DODO_PAYMENTS_ENVIRONMENT || 'test_mode') as any
    });

    const checkoutSession = await dodoClient.checkoutSessions.create({
      customer: { customer_id: dodoCustomerId },
      product_cart: [
        {
          product_id: planConfig.productId,
          quantity: 1
        }
      ],
      return_url: process.env.DODO_PAYMENTS_RETURN_URL,
      metadata: {
        plan_slug: plan,
        app_user_id: user.id
      }
    });

    // 6. Store checkout session locally
    const localSession = await prisma.checkoutSession.create({
      data: {
        userId: user.id,
        dodoSessionId: checkoutSession.id,
        planSlug: plan,
        checkoutUrl: checkoutSession.url,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
      }
    });

    return NextResponse.json({
      checkout_url: checkoutSession.url,
      session_id: localSession.id,
      expires_at: localSession.expiresAt.toISOString(),
      amount: {
        cents: planConfig.priceCents,
        currency: 'INR'
      }
    });

  } catch (error) {
    logError('Checkout error:', error);
    return NextResponse.json(
      { error: 'Checkout creation failed' },
      { status: 500 }
    );
  }
}

function getPlanConfig(plan: string) {
  const configs: Record<string, any> = {
    starter: {
      productId: process.env.DODO_PRODUCT_ID_STARTER!,
      priceCents: 14900
    },
    pro: {
      productId: process.env.DODO_PRODUCT_ID_PRO!,
      priceCents: 49900
    },
    premium: {
      productId: process.env.DODO_PRODUCT_ID_PREMIUM!,
      priceCents: 129900
    },
    enterprise: {
      productId: process.env.DODO_PRODUCT_ID_ENTERPRISE!,
      priceCents: 199900
    }
  };

  return configs[plan] || null;
}
