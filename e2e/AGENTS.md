# Regras Locais — `e2e/`

- Testes E2E rodam em Chromium Desktop e Pixel 7 Mobile (`playwright.config.ts`).
- Nunca dependa de credenciais reais commitadas; use variáveis de ambiente de teste.
- Cubra fluxos críticos: login, bloqueio RBAC (`/403`), CRUD principal e responsividade mobile.

