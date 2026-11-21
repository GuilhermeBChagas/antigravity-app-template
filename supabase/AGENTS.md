# Regras Locais — `supabase/`

Ao editar qualquer arquivo em `supabase/`:
1. Rode `npm run db:pull` antes de criar novas migrations quando houver banco remoto.
2. Migrations devem ser **100% idempotentes** (`IF NOT EXISTS`, `IF EXISTS`, `DROP POLICY IF EXISTS`).
3. **Proibido `SELECT *` e `RETURNING *`.**
4. Toda tabela nova exige `ENABLE ROW LEVEL SECURITY` e políticas usando `(select auth.uid())` + `public.has_permission(...)`.
5. Toda função `SECURITY DEFINER` exige `SET search_path = ''`.
6. Indexe todas as Foreign Keys e use índices parciais `WHERE deleted_at IS NULL` em tabelas com soft delete.
7. Nunca coloque dados reais ou segredos em `seed.sql`.

