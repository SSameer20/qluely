// lib/validation.ts
import { z } from 'zod';

const checkoutRequestSchema = z.object({
  plan: z.enum(['starter', 'pro', 'premium', 'enterprise']),
  userId: z.string().cuid()
});

export function validateCheckoutRequest(data: unknown) {
  try {
    const validated = checkoutRequestSchema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    return { success: false, error: 'Invalid request' };
  }
}