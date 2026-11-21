# Regras Locais — `src/components/ui/`

- **Zero regra de negócio:** nunca importe `services/`, `features/` ou contextos de domínio aqui.
- **API consistente:**
  - Props booleanas começam com `is` ou `has` (`isLoading`, `isDisabled`, `isOpen`, `hasError`).
  - Sempre defina `displayName`.
- **Tokens e CSS:** use apenas tokens semânticos (`bg-surface`, `text-content`, `border-border`, `bg-primary`). Proibido `#hex` fixo ou largura rígida.
- **Mobile × Desktop:** alvos de toque `>= 44x44px` no mobile; `DetailModal` ancora embaixo no mobile (`items-end sm:items-center`) e `FormModal` usa tela cheia no mobile (`h-[100dvh] md:h-auto`).
- **Testes:** todo novo componente público ganha teste em `src/components/ui/__tests__/`.

