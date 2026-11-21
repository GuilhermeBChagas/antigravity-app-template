# Regras Locais — `src/features/`

Organize cada domínio em `src/features/<dominio>/`:
- `components/` — telas e modais específicos da feature (compondo `src/components/ui`).
- `hooks/` — estado de UI, cache local, paginação e toasts.
- `services/` — comunicação exclusiva com Supabase/APIs (zero `SELECT *`, sempre paginado).
- `types/` — tipos e schemas `zod` da feature.

Use `src/features/_example/` como referência de CRUD antes de criar uma nova feature.
Toda rota/ação nova nasce bloqueada (RBAC Default Deny).

