import { env } from '@/lib/env';

/** Metadados globais da aplicação. */
export const appConfig = {
  name: env.VITE_APP_NAME,
  version: '1.0.0',
  defaultLocale: 'pt-BR',
} as const;

