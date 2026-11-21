## Objetivo e Contexto
<!-- O que este PR resolve ou entrega? -->

## Arquivos e Módulos Afetados
<!-- Liste componentes, hooks, services ou migrations alterados -->

## Possíveis Efeitos Adversos Negativos e Riscos
- **Regressão:**
- **Performance / Egress:**
- **Mobile × Desktop:**
- **Contratos / Tipos:**
- **RBAC / Segurança:**

## Checklist Pré-Merge
- [ ] `npm run preflight` passou (Biome + TypeScript + Vitest)
- [ ] `npm run build` passou
- [ ] Novos menus/rotas/módulos seguem RBAC Default Deny (só `admin` hardcoded)
- [ ] Nenhum `SELECT *` / `.select('*')` adicionado
- [ ] Testado em viewport mobile e desktop
- [ ] Documentação (JSDoc / `.md` / specs) atualizada

