const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const numberFormatter = new Intl.NumberFormat('pt-BR');

/** Formata valor numérico para moeda BRL (`R$ 1.234,56`). */
export function formatCurrencyBRL(value: number): string {
  return brlFormatter.format(value);
}

/** Formata número inteiro ou decimal com separadores pt-BR. */
export function formatNumberBR(value: number): string {
  return numberFormatter.format(value);
}

/** Formata CPF genérico (`000.000.000-00`) sem validar dígito verificador. */
export function formatCpfMask(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

