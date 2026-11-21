import { createRoleSchema } from '@/features/admin/types/admin.types';
import { describe, expect, it } from 'vitest';
import { calculateScaledDimensions } from '../imageUtils';

describe('calculateScaledDimensions', () => {
  it('mantém dimensões quando menores que o limite', () => {
    expect(calculateScaledDimensions(800, 600, 1600, 1600)).toEqual({ width: 800, height: 600 });
  });

  it('reduz proporcionalmente mantendo proporção', () => {
    expect(calculateScaledDimensions(3200, 1600, 1600, 1600)).toEqual({
      width: 1600,
      height: 800,
    });
  });
});

describe('createRoleSchema', () => {
  it('aceita slug válido e rejeita caracteres inválidos', () => {
    expect(createRoleSchema.safeParse({ slug: 'operador_1', name: 'Operador' }).success).toBe(true);
    expect(createRoleSchema.safeParse({ slug: 'Inválido!', name: 'Teste' }).success).toBe(false);
  });
});
