// scripts/start-worker.ts
import './lib/queue';
import { logInfo } from '../lib/logger';

logInfo('Webhook worker started');

// Keep process alive
setInterval(() => {}, 1000 * 60 * 60);
