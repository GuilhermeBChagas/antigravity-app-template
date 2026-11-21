# DESIGN.md — Identidade Visual Base

Guia de referência rápida para manter consistência visual em todas as telas criadas sobre este template.

## Tipografia
- **Sans principal:** `Plus Jakarta Sans` (`--font-sans`), com `font-feature-settings: "cv02", "cv03", "cv04", "cv11"`.
- **Mono:** `JetBrains Mono` (`--font-mono`) para códigos, chaves de permissão e IDs.
- **Números:** use `tabular-nums` em KPIs, contadores e colunas numéricas.

## Cores e Superfícies (Tokens `@theme`)
- **Light:** fundo `bg-surface` (`#f8fafc`), cards `bg-surface-elevated` (`#ffffff`), apoio `bg-surface-muted` (`#f1f5f9`).
- **Dark:** fundo `bg-surface` (`#070b14`), cards `bg-surface-elevated` (`#0f1623`), bordas translúcidas `rgba(148, 163, 184, 0.16)`.
- **Acento:** `--color-primary` (`#2563eb` light / `#3b82f6` dark). Personalize aqui para trocar a marca do app inteiro.

## Forma e Espaçamento
- **Cartões:** `rounded-2xl` (`1rem`), borda `border-border`.
- **Modais:** `rounded-t-3xl sm:rounded-3xl` no `DetailModal` (bottom-sheet mobile); tela cheia no mobile para `FormModal`.
- **Alvos de toque:** mínimo `44x44px` (`min-h-11`) em botões, inputs e links de navegação.

## Movimento (`motion`)
- `<MotionConfig reducedMotion="user">` envolve toda a aplicação.
- Entradas de modais usam transição curta (`0.16s–0.20s`) com curva `[0.22, 1, 0.36, 1]`.
- Abas segmentadas usam `layoutId` com mola rápida (`stiffness: 420, damping: 32`).
- Botões usam micro-feedback tátil (`active:scale-[0.98]`).

