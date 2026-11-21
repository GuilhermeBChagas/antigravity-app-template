/** Extrai mensagem amigável de um erro desconhecido sem expor detalhes internos. */
export function getErrorMessage(error: unknown, fallback = 'Ocorreu um erro inesperado.'): string {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }
  if (typeof error === 'string' && error.trim().length > 0) {
    return error;
  }
  return fallback;
}

/** Indica se um erro parece ser falha de conectividade/offline. */
export function isNetworkError(error: unknown): boolean {
  const msg = getErrorMessage(error, '').toLowerCase();
  return msg.includes('failed to fetch') || msg.includes('network') || msg.includes('offline');
}

