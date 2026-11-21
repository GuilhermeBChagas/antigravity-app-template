# Spec: <Nome do Componente ou Fluxo>

## Propósito
O que resolve e onde deve ser usado (e onde **não** deve).

## API / Contrato (Props ou Assinatura)
| Prop / Campo | Tipo | Padrão | Obrigatório | Descrição |
|---|---|---|---|---|
| `isLoading` | `boolean` | `false` | Não | Exibe estado de carregamento |

## Estados e Comportamento
- **Default / Loading / Empty / Error / Disabled**
- **Mobile (< 640px):** como adapta ergonomia de toque e layout.
- **Desktop (>= 768px):** como aproveita espaço horizontal e teclado.

## Invariantes e Acessibilidade
- Atributos ARIA, foco, atalho `ESC`, alvos `>= 44x44px`.

## Critérios de Teste
- Casos mínimos cobertos por Vitest/Testing Library.

