-- Seed mínimo de RBAC (sem dados sensíveis)
-- Papel supremo 'admin' e permissões base registradas.

INSERT INTO public.roles (slug, name, description, is_system)
VALUES ('admin', 'Administrador', 'Acesso total ao sistema', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.permissions (key, module, description)
VALUES
  ('dashboard.read', 'dashboard', 'Visualizar painel inicial'),
  ('items.read', 'items', 'Visualizar itens de exemplo'),
  ('items.write', 'items', 'Criar, editar e excluir itens de exemplo'),
  ('settings.read', 'settings', 'Acessar configurações da conta'),
  ('ai.use', 'ai', 'Utilizar proxy de inteligência artificial'),
  ('admin.users.read', 'admin', 'Visualizar usuários do sistema'),
  ('admin.roles.manage', 'admin', 'Gerenciar papéis e permissões no painel')
ON CONFLICT (key) DO NOTHING;

