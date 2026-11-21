type LogLevel = 'info' | 'warn' | 'error';

function formatMessage(scope: string, message: string): string {
  return `[${scope}] ${message}`;
}

/**
 * Logger estruturado para desenvolvimento e diagnóstico sem vazar dados sensíveis em produção.
 */
export const logger = {
  info(scope: string, message: string, meta?: unknown): void {
    if (import.meta.env.DEV) {
      console.info(formatMessage(scope, message), meta ?? '');
    }
  },
  warn(scope: string, message: string, meta?: unknown): void {
    console.warn(formatMessage(scope, message), meta ?? '');
  },
  error(scope: string, message: string, error?: unknown): void {
    console.error(formatMessage(scope, message), error ?? '');
  },
  log(level: LogLevel, scope: string, message: string, meta?: unknown): void {
    this[level](scope, message, meta);
  },
};

