# Antigravity App Template

Template base limpo (React 19 + Vite + TypeScript strict + Tailwind CSS v4 + Supabase) pronto para iniciar qualquer novo aplicativo sem partir do zero.

## Inicialização Rápida

1. **Crie um repositório a partir deste template** (ou clone).
2. **Instale dependências:**
   ```bash
   npm install
   ```
3. **Configure variáveis de ambiente:**
   ```bash
   cp .env.example .env
   ```
   Preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`. Nunca commite `.env`.
4. **Injete o cérebro de agentes (`antigravity-ai-brain`):**
   ```powershell
   ..\antigravity-ai-brain\scripts\inject.ps1 -Target .
   ```
   Ou via `degit`: `npx degit <seu-usuario>/antigravity-ai-brain .agents`
5. **Suba o banco local (opcional, requer Docker):**
   ```bash
   npm run supabase:start
   npm run db:push
   npm run db:types
   ```
6. **Rode em desenvolvimento:**
   ```bash
   npm run dev
   ```

## Comandos Principais
- `npm run dev` — servidor Vite local.
- `npm run preflight` — roda `biome check`, `tsc --noEmit` e `vitest run`.
- `npm run build` — build de produção em `dist/`.
- `npm run test:e2e` — smoke tests com Playwright.

## Estrutura
```
src/
  components/ui/       # Primitivos genéricos sem regra de negócio (AGENTS.md próprio)
  components/layout/   # AppShell (Sidebar desktop + MobileBottomNav + Topbar + ThemeToggle)
  config/              # app.ts e navigation.ts (itens com permission obrigatória)
  contexts/            # AuthContext, ThemeContext, ModalContext
  features/_example/   # CRUD completo de exemplo (DataTable + FormModal + ConfirmModal)
  hooks/               # Hooks utilitários (usePermissions, useDebounce, useIsMobile, etc.)
  lib/                 # env.ts (zod), supabase.ts, cn.ts, logger.ts, permissions.ts
  pages/               # LoginPage, DashboardPage, SettingsPage, ForbiddenPage, NotFoundPage
  services/            # baseService, authService, permissionService
  styles/index.css     # Tokens @theme (Tailwind v4) + light/dark + @media (hover: hover)
supabase/
  migrations/          # RBAC Default Deny + tabela de exemplo com RLS
```

## Modelo RBAC (Default Deny)
- Todo menu, rota e módulo nasce **bloqueado por padrão**.
- Em código, **apenas `admin`** tem bypass fixo (`isAdmin`).
- Qualquer outro papel recebe permissões dinamicamente via tabela `role_permissions` (gerenciada no painel de permissões).
- Itens de navegação sem `permission` explícito ficam restritos a `admin`.

