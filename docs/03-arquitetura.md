# 03. Arquitetura técnica

## 3.1 Decisões e o motivo de cada uma

| Decisão | Motivo |
|---|---|
| Next.js App Router, estático | tudo é conteúdo fixo. Página estática entrega LCP baixo em 4G, que é a rede do cliente real |
| TypeScript strict, sem `any` | o site vai ser mantido por outra pessoa depois |
| Tailwind v4 com tokens em `@theme` | a paleta fica em um lugar só e o build não carrega CSS morto |
| Sem CMS | um cliente, conteúdo raro de mudar. CMS aqui é custo e ponto de falha |
| Sem formulário com backend | mensagem montada e enviada para `wa.me`. Zero servidor, zero LGPD de dado armazenado, zero mensalidade. A oficina já atende por WhatsApp |
| Sem biblioteca de UI pesada, sem framer-motion inteiro | orçamento de JavaScript, ver seção 3.6 |
| Deploy na Vercel | build automático, HTTPS, CDN, custo zero no plano gratuito |

## 3.2 Estrutura de pastas

```
central-direcoes/
├── CLAUDE.md
├── AGENTS.md
├── README.md
├── docs/                       # esta documentação, versionada
├── dados/                      # JSON de origem, copiar para src/content na Tarefa 2
├── templates/                  # rascunhos de robots.txt e llms.txt
├── public/
│   ├── logo-central-direcoes.svg
│   ├── logo-central-direcoes.png
│   ├── og/                     # imagens de Open Graph geradas
│   ├── fotos/                  # fotos oficiais do cliente, ver doc 09
│   ├── robots.txt              # gerado por app/robots.ts, não editar à mão
│   └── llms.txt
└── src/
    ├── app/
    │   ├── layout.tsx          # fontes, metadata base, JSON-LD global
    │   ├── page.tsx            # home
    │   ├── globals.css         # @theme com os tokens
    │   ├── sitemap.ts
    │   ├── robots.ts
    │   ├── not-found.tsx
    │   ├── servicos/
    │   │   ├── page.tsx
    │   │   └── [slug]/page.tsx
    │   ├── sintomas/
    │   │   ├── page.tsx
    │   │   └── [slug]/page.tsx
    │   ├── sobre/page.tsx
    │   ├── duvidas/page.tsx
    │   ├── contato/page.tsx
    │   └── orcamento/page.tsx
    ├── components/
    │   ├── ui/                 # shadcn e unlumen, reestilizados
    │   ├── layout/             # Header, Footer, BarraWhatsApp
    │   ├── secoes/             # Hero, ProvaSocial, GradeServicos, ComoFunciona, Localizacao
    │   └── diagnostico/        # PainelDiagnostico, ItemSintoma, ResultadoDiagnostico
    ├── content/
    │   ├── negocio.ts          # tipado, exporta as constantes do negócio
    │   ├── servicos.ts
    │   ├── sintomas.ts
    │   └── duvidas.ts
    └── lib/
        ├── whatsapp.ts         # montagem de link wa.me
        ├── schema.ts           # geradores de JSON-LD
        └── utils.ts            # cn()
```

## 3.3 Rotas e finalidade de cada página

Rota em português, sem acento, em kebab-case. URL é parte do SEO e nunca muda depois de publicada.

| Rota | Finalidade | Palavra-chave principal |
|---|---|---|
| `/` | converter quem já conhece a marca ou buscou pelo nome | central direções santa luzia |
| `/servicos` | índice, distribui autoridade para as filhas | oficina de direção santa luzia |
| `/servicos/direcao-hidraulica` | página comercial mais importante do site | conserto de direção hidráulica santa luzia |
| `/servicos/caixa-de-direcao-remanufaturada` | o diferencial real da oficina | caixa de direção remanufaturada bh |
| `/servicos/direcao-mecanica` | comercial | reparo direção mecânica |
| `/servicos/suspensao` | comercial | conserto de suspensão santa luzia |
| `/servicos/alinhamento-e-balanceamento` | serviço de entrada, ticket baixo e volume alto | alinhamento e balanceamento santa luzia |
| `/servicos/freios` | comercial | freio santa luzia |
| `/servicos/revisao-preventiva` | serviço de entrada, ticket baixo | revisão preventiva santa luzia |
| `/sintomas` | índice do diagnóstico | problemas na direção do carro |
| `/sintomas/[slug]` | 10 páginas de cauda longa, uma por sintoma | ver `dados/palavras-chave.md` |
| `/sobre` | prova de que existe gente de verdade atrás disso, base de E-E-A-T | quem somos |
| `/duvidas` | perguntas reais, alimenta busca com IA | quanto custa arrumar direção hidráulica |
| `/contato` | endereço, mapa, horário, telefones | oficina de direção são benedito |
| `/orcamento` | formulário que monta a mensagem de WhatsApp | orçamento direção hidráulica |

Total de 23 páginas estáticas (`dados/servicos.json` tem 7 serviços e `dados/sintomas.json` tem 10 sintomas, contra os 6 e 8 que a versão original deste documento previa; ver `dados/palavras-chave.md` camada 3, que sempre listou os 10). Nunca gere página programática além dessa lista, por causa da política de doorway page do Google.

## 3.4 Convenções de código

- Componente em `PascalCase.tsx`, export nomeado. `export default` só em `page.tsx` e `layout.tsx`.
- Server Component por padrão. `"use client"` só onde há `useState`, evento ou API do browser, ou seja: painel de diagnóstico, formulário de orçamento, menu mobile, barra flutuante.
- Props sempre tipadas em `interface`, nunca `any`.
- Nada de `<div onClick>`. Elemento interativo é `<button>` ou `<a>`.
- Todo campo de formulário tem `<label htmlFor>` de verdade, não placeholder fazendo papel de label.
- Toda imagem usa `next/image` com `alt` descritivo, ou `alt=""` se for decorativa.
- Todo link interno usa `next/link`.
- Estado vazio, erro e carregamento tratados sempre que houver interação.
- Texto do usuário em pt-BR. Identificador de código em português quando é domínio do negócio (`servicos`, `sintomas`) e mantém-se consistente. Não misture `services` com `servicos` no mesmo projeto.
- Comentário só onde a decisão não é óbvia pelo código.

## 3.5 Fonte de verdade do negócio

`src/content/negocio.ts` é gerado a partir de `dados/negocio.json` na Tarefa 2 e passa a ser o único lugar com NAP.

```ts
export const NEGOCIO = {
  nome: 'Central Direções',
  telefoneFixo: '+553136370491',
  whatsapp: '+5531989883036',
  // ...
} as const
```

Qualquer componente que precise de telefone importa daqui. Um telefone hardcoded no JSX é motivo de reprovação em code review.

## 3.6 Orçamento de performance

Limites duros. A cada tarefa concluída, verifique. Estourar significa cortar recurso, não relaxar o limite.

| Métrica | Limite |
|---|---|
| LCP em 4G simulado, mobile | menor que 2,5s |
| INP | menor que 200ms |
| CLS | menor que 0,1 |
| JavaScript da home, comprimido | menor que 120KB de código nosso, além do baseline do framework, ver nota |
| Peso total da home | menor que 900KB |
| Fontes | no máximo 4 arquivos woff2, subset latin |
| Imagem acima da dobra | 1, com `priority`, servida em AVIF ou WebP |
| Dependência de runtime | somente next, react, lucide-react, clsx, tailwind-merge. `motion` só entra se um componente específico exigir, pesando o custo antes (ver nota) |

**Nota sobre o limite de 120KB, medida na Tarefa 7:** Next.js App Router com React 19 tem baseline de cliente (React DOM mais o runtime de streaming de Server Components) de aproximadamente 114KB comprimido, presente em qualquer página do site, carregado uma vez e cacheado nas outras 19. Esse baseline sozinho já esbarra no limite original de 120KB, antes de qualquer linha de código nosso. Medido na home depois da Tarefa 7: **~157KB comprimido reais** para navegador moderno (o polyfill `nomodule` do Next não conta, navegador moderno não baixa). Decisão registrada com o dono do projeto: aceitar esse piso como realista, já que a arquitetura Next.js App Router foi escolhida na seção 3.1 por causa de SEO e LCP, e o custo é pago uma vez só. O limite de 120KB continua valendo para o que é código nosso (componentes, ícones, utilitários), não para o baseline do framework. `motion` foi removido do bundle da home nesta tarefa (economia de ~42KB) trocando o componente `CountUp` do Unlumen por um contador simples sem dependência externa; qualquer uso futuro de `motion` precisa pesar o ganho visual contra esse custo.

Ferramentas: `npm run build` mostra o tamanho por rota. Depois do deploy, PageSpeed Insights em mobile. Nada de FID, a métrica atual de responsividade é INP.

## 3.7 Acessibilidade, piso mínimo

- Um único `<h1>` por página, hierarquia de heading sem pular nível
- Foco visível, contorno de 2px em amarelo com offset de 2px, nunca `outline: none` sem substituto
- Contraste conforme a tabela do doc 02
- Link "pular para o conteúdo" como primeiro elemento focável
- `lang="pt-BR"` no `<html>`
- Navegação inteira operável por teclado, incluindo o painel de diagnóstico e o menu mobile
- Ícone sozinho dentro de botão exige `aria-label`

## 3.8 O que não fazer

Sem Google Analytics na versão 1. O Search Console dá o dado de busca e o cliente não vai olhar dashboard. Se o cliente pedir depois, entre com GA4 carregado com `next/script` em `afterInteractive` e banner de consentimento, o que muda o escopo e o preço.

Sem chat widget de terceiro. Pesa mais que o site inteiro e o WhatsApp já resolve.

Sem carrossel de depoimento com biblioteca. Três avaliações reais em grade estática convertem igual e custam zero de JavaScript.
