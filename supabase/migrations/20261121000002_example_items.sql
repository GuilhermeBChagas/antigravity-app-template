-- Tabela de exemplo para o módulo features/_example (CRUD com RBAC Default Deny e Soft Delete)

CREATE TABLE IF NOT EXISTS public.example_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'active',
  created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_example_items_active
  ON public.example_items (created_at DESC)
  WHERE deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_example_items_created_by
  ON public.example_items (created_by)
  WHERE deleted_at IS NULL;

ALTER TABLE public.example_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "example_items_select" ON public.example_items;
CREATE POLICY "example_items_select" ON public.example_items
  FOR SELECT TO authenticated
  USING (deleted_at IS NULL AND public.has_permission('items.read'));

DROP POLICY IF EXISTS "example_items_insert" ON public.example_items;
CREATE POLICY "example_items_insert" ON public.example_items
  FOR INSERT TO authenticated
  WITH CHECK (public.has_permission('items.write'));

DROP POLICY IF EXISTS "example_items_update" ON public.example_items;
CREATE POLICY "example_items_update" ON public.example_items
  FOR UPDATE TO authenticated
  USING (deleted_at IS NULL AND public.has_permission('items.write'))
  WITH CHECK (public.has_permission('items.write'));

