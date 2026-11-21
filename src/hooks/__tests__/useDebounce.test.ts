import { hasAccess } from '@/lib/permissions';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
  it('atualiza o valor somente após o intervalo configurado', () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'inicial' },
    });

    expect(result.current).toBe('inicial');
    rerender({ value: 'novo' });
    expect(result.current).toBe('inicial');

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe('novo');
    vi.useRealTimers();
  });
});

describe('hasAccess (RBAC Default Deny)', () => {
  it('libera tudo apenas para o papel admin', () => {
    expect(hasAccess({ roles: ['admin'], permissions: [] }, 'qualquer.coisa')).toBe(true);
    expect(hasAccess({ roles: ['admin'], permissions: [] })).toBe(true);
  });

  it('bloqueia outros papéis por padrão se não houver permissão explícita', () => {
    expect(hasAccess({ roles: ['operador'], permissions: ['items.read'] }, 'items.write')).toBe(
      false
    );
    expect(hasAccess({ roles: ['operador'], permissions: ['items.read'] })).toBe(false);
    expect(hasAccess({ roles: ['operador'], permissions: ['items.read'] }, 'items.read')).toBe(
      true
    );
  });
});
