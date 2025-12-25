// lib/queue.ts
import { Queue, Worker } from 'bullmq';
import Redis from 'ioredis';
import { webhookHandlers } from './webhook-handlers';
import { prisma } from './prisma';
import { logError, logInfo } from './logger';

// Prefer explicit REDIS_URL, fallback to localhost (docker compose exposes port)
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const redisConnection = new Redis(redisUrl);

export const webhookQueue = new Queue('webhooks', {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 2000 },
    removeOnComplete: true
  }
});

// Worker process
export const webhookWorker = new Worker(
  'webhooks',
  async (job) => {
    const { eventId, eventType, payload } = job.data;

    try {
      const handler = webhookHandlers[eventType];

      if (!handler) {
        logError(`No handler for event type: ${eventType}`);
        return;
      }

      const result = await handler(payload);

      await prisma.webhookEvent.update({
        where: { id: eventId },
        data: {
          status: 'completed',
          processedAt: new Date()
        }
      });

      logInfo(`Webhook ${eventId} processed successfully`);
      return result;

    } catch (error) {
      logError(`Error processing webhook ${eventId}:`, error);

      await prisma.webhookEvent.update({
        where: { id: eventId },
        data: {
          status: 'failed',
          errorMessage: error instanceof Error ? error.message : 'Unknown error'
        }
      });

      throw error;
    }
  },
  {
    connection: redisConnection,
    concurrency: 5
  }
);

webhookWorker.on('failed', (job, error) => {
  logError(`Job ${job?.id} failed:`, error);
});