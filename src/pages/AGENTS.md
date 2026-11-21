# Regras Locais — `src/pages/`

- Páginas em `src/pages/` compõem layouts e componentes de `src/components/ui/`, sem chamadas diretas ao Supabase.
- Toda página autenticada deve ser registrada em `src/router.tsx` com `lazy()` + `<RequirePermission>`.
- Mantenha foco em responsividade (mobile `< 640px` e desktop `>= 768px`).

