// lib/logger.ts
export function logInfo(message: string, data?: any) {
  console.log(`[INFO] ${message}`, data || '');
}

export function logError(message: string, error?: any) {
  console.error(`[ERROR] ${message}`, error || '');
}