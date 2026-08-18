# Refresh Visual Vivo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deixar o site (já completo, 27 páginas) visualmente mais vivo e alinhado com a identidade real da marca: paleta mais vermelha e menos vazia, Hero mais claro, mais fotos de banco público, e movimento no estilo Unlumen, sem quebrar o que já funciona (build, SEO, acessibilidade).

**Architecture:** Next.js App Router existente, Server Components por padrão. Movimento entra via a lib `motion` (reintroduzida) em componentes cliente isolados, com `MotionConfig reducedMotion="user"` global pra respeitar acessibilidade. Imagens novas seguem o padrão já estabelecido em `src/content/imagens.ts` e `public/fotos/temporarias/`.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, `motion` (Motion One / Framer Motion successor), componente `motion-faqs-accordion` do registry Unlumen (`@unlumen-ui`), fotos de Unsplash.

## Global Constraints

- Nenhum travessão (—) em texto do site (doc 04.2)
- Nenhuma palavra da lista proibida do doc 04.2 (soluções, excelência, diferencial, etc.)
- Mobile first, sem overflow horizontal entre 320px e 1920px, alvos de toque de 44px+
- `npx tsc --noEmit`, `npm run lint` e `npm run build` limpos antes de cada commit
- Nenhum telefone/endereço/horário fora de `src/content/negocio.ts`
- Toda imagem nova: licença Unsplash/Pexels/Pixabay, registrada em `public/fotos/temporarias/CREDITOS.md`, sem rosto reconhecível de terceiro, sem marca visível, sem fingir ser foto oficial da equipe/oficina (doc 09.3)
- Toda animação nova respeita `prefers-reduced-motion` (via `MotionConfig reducedMotion="user"` para tudo que usa `motion`, e o bloco CSS global já existente para o resto)
- `GradeServicos` continua em formato de lista, não vira grade de cards (decisão deliberada do doc 04.4, o feedback do cliente não pediu para mudar isso)
- Nada de Cursor Image Trail, Gooey SVG Filter, Matrix, Gravity Stars, Aurora Bars ou Tilt Card (doc 02.6 já proibia essa categoria de efeito decorativo sem função)

---

## Task 1: Reinstala `motion` e cria o provedor de acessibilidade

**Files:**
- Modify: `package.json`
- Create: `src/components/motion/ProvedorMotion.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: `ProvedorMotion` (componente cliente, `{ children: ReactNode }`), usado por todas as tasks seguintes que envolvem `motion`

- [ ] **Passo 1: Instalar a dependência**

```bash
npm install motion
```

- [ ] **Passo 2: Criar o provedor**

`src/components/motion/ProvedorMotion.tsx`:

```tsx
"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

export function ProvedorMotion({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
```

- [ ] **Passo 3: Envolver o body no layout raiz**

Em `src/app/layout.tsx`, importar `ProvedorMotion` e envolver o conteúdo do `<body>` (Header, main, Footer, BarraWhatsApp) com ele, mantendo os scripts de JSON-LD e o skip link fora (não precisam de motion).

- [ ] **Passo 4: Verificar**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

Esperado: os três limpos, sem erro.

- [ ] **Passo 5: Commit**

```bash
git add package.json package-lock.json src/components/motion/ProvedorMotion.tsx src/app/layout.tsx
git commit -m "reinstala motion e adiciona provedor de reduced-motion"
```

---

## Task 2: Componente de entrada animada ao rolar

**Files:**
- Create: `src/components/motion/EntradaAoRolar.tsx`

**Interfaces:**
- Consumes: `motion/react` (`motion.div`, prop `whileInView`)
- Produces: `EntradaAoRolar` — `{ children: ReactNode; className?: string; atraso?: number }`, usado pelas Tasks 7, 8, 11

- [ ] **Passo 1: Criar o componente**

```tsx
"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface EntradaAoRolarProps {
  children: ReactNode;
  className?: string;
  atraso?: number;
}

export function EntradaAoRolar({ children, className, atraso = 0 }: EntradaAoRolarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35, delay: atraso, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

Duração e deslocamento seguem exatamente o permitido pelo doc 02.6 ("Fade e translate de 12px para cima em entrada de seção, uma vez... duração de 300ms a 400ms").

- [ ] **Passo 2: Verificar**

```bash
npx tsc --noEmit && npm run lint
```

- [ ] **Passo 3: Commit**

```bash
git add src/components/motion/EntradaAoRolar.tsx
git commit -m "adiciona componente de entrada animada ao rolar"
```

---

## Task 3: Paleta mais vermelha e alternância de fundo na home

**Files:**
- Modify: `docs/02-identidade-visual.md`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Nenhuma nova, só uso dos tokens `bg-preto-oficina` / `bg-grafite` já existentes em `globals.css`

- [ ] **Passo 1: Atualizar o doc 02**

Adicionar uma seção nova (após a 2.9 existente), registrando a revisão:

```markdown
## 2.10 Revisão pós-feedback do dono, 2026-08-18

Depois de ver o site publicado, o dono da oficina revisou a identidade real da marca (logo em
close e o feed do Instagram) e pediu um site mais vivo: menos área escura vazia, mais vermelho,
mais foto. Proporção revisada: **55% preto/grafite, 20% branco/aço, 20% vermelho, 5% amarelo**
(a proporção original da seção 2.2 era 70/20/8/2). Na prática: seções alternam fundo
`--color-preto-oficina` e `--color-grafite` em vez de preto contínuo, e mais elementos usam
`.superficie` ou `border-vermelho`/`bg-vermelho` como destaque estrutural. Detalhe completo em
`docs/superpowers/specs/2026-08-18-refresh-visual-vivo-design.md`.
```

- [ ] **Passo 2: Alternar fundo das seções da home**

Em `src/app/page.tsx`, envolver `PainelDiagnostico`, `GradeServicos` e `Localizacao` (as seções de fundo plano, sem foto) com um wrapper `<div className="bg-grafite">`, deixando `ProvaSocial` e `ComoFunciona` com o `bg-preto-oficina` padrão do body, criando alternância preto/grafite/preto/grafite/preto ao longo da página. Confirmar visualmente que a faixa zebrada entre seções ainda funciona como divisor (ela já tem fundo próprio, não depende do fundo da seção vizinha).

- [ ] **Passo 3: Verificar visualmente**

Rodar `npm run dev`, abrir a home em 1440px e 360px, tirar screenshot, confirmar que a alternância aparece e não quebra o layout nem cria contraste ruim (texto branco/aço continua legível nos dois fundos, ambos já validados na tabela de contraste do doc 02.2).

- [ ] **Passo 4: Checagens finais e commit**

```bash
npx tsc --noEmit && npm run lint && npm run build
git add docs/02-identidade-visual.md src/app/page.tsx
git commit -m "aumenta proporcao de vermelho e alterna fundo das secoes da home"
```

---

## Task 4: Hero mais claro

**Files:**
- Modify: `src/components/secoes/Hero.tsx`

- [ ] **Passo 1: Ajustar o filtro e a sobreposição**

Em `src/components/secoes/Hero.tsx`, trocar:

```tsx
style={{ filter: "saturate(0.75) contrast(1.08) brightness(0.85)" }}
```

por:

```tsx
style={{ filter: "saturate(0.85) contrast(1.05)" }}
```

(remove o `brightness(0.85)`, que escurecia artificialmente). E trocar a sobreposição:

```tsx
<div className="absolute inset-0 bg-preto-oficina/70" aria-hidden="true" />
```

por:

```tsx
<div className="absolute inset-0 bg-preto-oficina/45" aria-hidden="true" />
```

- [ ] **Passo 2: Verificar contraste do texto**

O H1 e o parágrafo continuam em `text-branco`/`text-aco`. Com a sobreposição mais clara (45% em vez de 70%), confirmar visualmente (screenshot em 1440px e 360px) que o texto do Hero continua legível sobre a foto. Se alguma palavra ficar difícil de ler sobre uma área clara da foto, é aceitável, a foto é temporária (camada 1) e será trocada pela foto oficial na Tarefa 9.10 do plano principal.

- [ ] **Passo 3: Checagens e commit**

```bash
npx tsc --noEmit && npm run lint && npm run build
git add src/components/secoes/Hero.tsx
git commit -m "clareia a imagem e a sobreposicao do hero"
```

---

## Task 5: Motion FAQs Accordion em `/duvidas`

**Files:**
- Create: `src/components/unlumen-ui/motion-faqs-accordion.tsx` (via CLI)
- Modify: `src/app/duvidas/page.tsx`

**Interfaces:**
- Produces: `MotionAccordion` — `{ items: { question: string; answer: string }[]; gap?: number; className?: string }`

- [ ] **Passo 1: Instalar o componente**

```bash
npx shadcn@latest add @unlumen-ui/motion-faqs-accordion -y
```

Conferir que o arquivo foi criado em `src/components/unlumen-ui/motion-faqs-accordion.tsx` e que `package.json` não ganhou nenhuma dependência fora de `motion` (já instalada na Task 1).

- [ ] **Passo 2: Trocar o Accordion na página de dúvidas**

Em `src/app/duvidas/page.tsx`, remover o import de `Accordion, AccordionContent, AccordionItem, AccordionTrigger` de `@/components/ui/accordion`, importar `MotionAccordion` de `@/components/unlumen-ui/motion-faqs-accordion`, e trocar o bloco JSX do accordion por:

```tsx
<MotionAccordion
  items={DUVIDAS.map((item) => ({ question: item.pergunta, answer: item.resposta }))}
  className="mt-4 max-w-[68ch]"
/>
```

Manter o `<h2>` "Perguntas frequentes" adicionado na Tarefa 13 (corrige heading-order), ele fica logo acima do `MotionAccordion`.

- [ ] **Passo 3: Verificar estilo e acessibilidade**

O componente do Unlumen vem com cores padrão da paleta genérica dele. Abrir `/duvidas` no navegador, comparar com os tokens do site (preto-oficina, branco, vermelho, amarelo). Se vier com cor fora da paleta, reestilizar via `className`/props do componente (não editar cores hardcoded dentro do arquivo gerado além do necessário). Rodar teste de teclado: Tab até o primeiro item, Enter abre, aria-expanded muda — mesma verificação já feita na Tarefa 10 com o Accordion antigo.

- [ ] **Passo 4: Checagens e commit**

```bash
npx tsc --noEmit && npm run lint && npm run build
git add src/components/unlumen-ui/motion-faqs-accordion.tsx src/app/duvidas/page.tsx package.json package-lock.json
git commit -m "troca accordion de duvidas pelo motion faqs accordion do unlumen"
```

Se o componente `@unlumen-ui/motion-faqs-accordion` não instalar ou não corresponder à API documentada (a doc do Unlumen já se mostrou desatualizada nesse projeto, ver Tarefa 7), manter o `Accordion` padrão do shadcn (já funcional e acessível) e registrar a divergência num comentário no commit. Não travar o resto do plano por causa deste componente específico.

---

## Task 6: Indicador animado na navegação do Header

**Files:**
- Modify: `src/components/layout/Header.tsx`

**Interfaces:**
- Consumes: `motion/react` (`motion.span`, `layoutId`)

- [ ] **Passo 1: Adicionar estado de hover e indicador deslizante**

Em `src/components/layout/Header.tsx`, na `<nav>` desktop, adicionar `useState<string | null>` para o link em hover, e envolver cada `<Link>` num `<div className="relative" onMouseEnter={...} onMouseLeave={...}>` que renderiza um `motion.span` com `layoutId="indicador-nav"` (mesmo `layoutId` compartilhado entre os itens, o que faz o Motion animar a transição de posição automaticamente) posicionado atrás do link em hover, com `bg-grafite-borda` e `rounded-[var(--radius)]`, `position: absolute`, `inset: 0`, atrás do texto (`z-index` menor que o link).

```tsx
"use client";
// ... imports existentes
import { motion } from "motion/react";

// dentro do componente Header, novo estado:
const [emHover, setEmHover] = useState<string | null>(null);

// dentro do <nav>, substituir o map atual por:
<nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
  {NAV.map((item) => (
    <div
      key={item.href}
      className="relative"
      onMouseEnter={() => setEmHover(item.href)}
      onMouseLeave={() => setEmHover(null)}
    >
      {emHover === item.href && (
        <motion.span
          layoutId="indicador-nav"
          className="absolute inset-0 rounded-[var(--radius)] bg-grafite-borda"
          transition={{ duration: 0.15 }}
        />
      )}
      <Link
        href={item.href}
        className={cn("relative z-10 block px-3 py-2 text-corpo text-aco transition-colors hover:text-branco", FOCO)}
      >
        {item.label}
      </Link>
    </div>
  ))}
</nav>
```

- [ ] **Passo 2: Verificar visualmente**

`npm run dev`, abrir a home em 1440px, passar o mouse pelos links do menu, confirmar que o indicador desliza suavemente entre eles (não pisca, não salta).

- [ ] **Passo 3: Checagens e commit**

```bash
npx tsc --noEmit && npm run lint && npm run build
git add src/components/layout/Header.tsx
git commit -m "adiciona indicador animado no menu desktop do header"
```

---

## Task 7: Imagem de textura e hover animado na Grade de Serviços

**Files:**
- Modify: `src/content/imagens.ts`
- Modify: `public/fotos/temporarias/CREDITOS.md`
- Create: `public/fotos/temporarias/textura-metal.jpg` (baixado nesta task)
- Modify: `src/components/secoes/GradeServicos.tsx`

- [ ] **Passo 1: Buscar e baixar a imagem de textura**

Buscar no Unsplash pelo termo `brushed steel texture dark` (doc 09.4, linha "Textura de fundo"), critério de escolha do doc 09.4: escura, sem gente, sem legenda, sem marca. Baixar via `curl` em `public/fotos/temporarias/textura-metal.jpg`, largura máxima 2000px.

- [ ] **Passo 2: Registrar o crédito**

Adicionar uma linha em `public/fotos/temporarias/CREDITOS.md` seguindo o formato já usado para `hero-direcao.jpg`: nome do arquivo, fonte, autor, link da foto, data.

- [ ] **Passo 3: Adicionar o caminho centralizado**

Em `src/content/imagens.ts`, adicionar `texturaMetal: "/fotos/temporarias/textura-metal.jpg"` ao objeto `IMAGENS`.

- [ ] **Passo 4: Aplicar como fundo de baixa opacidade na seção**

Em `src/components/secoes/GradeServicos.tsx`, adicionar a imagem como plano de fundo posicionado atrás da lista (não por linha, para não parecer card), usando `next/image` com `fill`, `className="object-cover opacity-10"` dentro de um wrapper `relative` que envolve a `<section>`, mantendo o conteúdo (`<h2>`, `<ul>`) num `div relative z-10` por cima. Envolver a seção inteira com `EntradaAoRolar` (Task 2).

- [ ] **Passo 5: Adicionar hover animado nos itens da lista**

Em cada `<Link>` da lista, adicionar um `motion.span` com uma seta (`ArrowRight` do lucide-react, já disponível no projeto) que aparece deslizando da esquerda com `initial={{ opacity: 0, x: -8 }}` e `whileHover` no elemento pai não é direto em Server Component; como a lista já é renderizada num Server Component, mover o `<li>`/`<Link>` de `GradeServicos` para dentro de um sub-componente cliente `ItemGradeServico` (novo arquivo `src/components/secoes/ItemGradeServico.tsx`), recebendo `servico: Servico` como prop, usando `whileHover="hover"` no `Link` e `variants` no `motion.span` da seta.

`src/components/secoes/ItemGradeServico.tsx`:

```tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import type { Servico } from "@/content/servicos";
import { cn } from "@/lib/utils";

const FOCO =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amarelo";

export function ItemGradeServico({ servico }: { servico: Servico }) {
  return (
    <motion.div initial="parado" whileHover="hover">
      <Link
        href={`/servicos/${servico.slug}`}
        className={cn(
          "flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:justify-between md:gap-8",
          FOCO,
        )}
      >
        <span className="flex shrink-0 items-center gap-2 font-display text-h3 uppercase text-branco md:w-[280px]">
          {servico.nome}
          <motion.span
            variants={{ parado: { opacity: 0, x: -6 }, hover: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.15 }}
          >
            <ArrowRight aria-hidden="true" className="size-4 text-vermelho" />
          </motion.span>
        </span>
        <span className="max-w-[60ch] text-corpo leading-[1.65] text-aco">{servico.resumo}</span>
      </Link>
    </motion.div>
  );
}
```

`GradeServicos.tsx` passa a importar e usar `<ItemGradeServico key={servico.slug} servico={servico} />` dentro do `<li>`, no lugar do `<Link>` inline atual.

- [ ] **Passo 6: Verificar visualmente**

`npm run dev`, abrir a home, rolar até "O que a gente faz", conferir a textura de fundo sutil, passar o mouse num item e ver a seta aparecer. Testar em 360px (textura não deve atrapalhar legibilidade do texto).

- [ ] **Passo 7: Checagens e commit**

```bash
npx tsc --noEmit && npm run lint && npm run build
git add src/content/imagens.ts public/fotos/temporarias/ src/components/secoes/GradeServicos.tsx src/components/secoes/ItemGradeServico.tsx
git commit -m "adiciona textura de fundo e hover animado na grade de servicos"
```

---

## Task 8: Imagem de apoio em Como Funciona

**Files:**
- Modify: `src/content/imagens.ts`
- Modify: `public/fotos/temporarias/CREDITOS.md`
- Create: `public/fotos/temporarias/oficina-ambiente.jpg`
- Modify: `src/components/secoes/ComoFunciona.tsx`

- [ ] **Passo 1: Buscar e baixar a imagem**

Buscar no Unsplash pelo termo `dark auto workshop` (doc 09.4, linha "Hero", mesma categoria mas outra foto, não reaproveitar o arquivo do Hero). Critério: escura, sem gente com rosto visível, sem marca. Baixar em `public/fotos/temporarias/oficina-ambiente.jpg`.

- [ ] **Passo 2: Registrar crédito e caminho**

Igual à Task 7, passo 2 e 3: linha no `CREDITOS.md`, campo `comoFunciona` em `IMAGENS`.

- [ ] **Passo 3: Aplicar na seção**

Em `src/components/secoes/ComoFunciona.tsx`, adicionar a imagem como bloco lateral (não fundo desta vez, pois a seção é curta): grid de duas colunas em desktop (`md:grid-cols-[1fr_320px]`), a lista de 4 passos de um lado, a imagem tratada (mesmo filtro do doc 09.5: `saturate(0.75) contrast(1.08) brightness(0.85)`, com `next/image`, `loading="lazy"`, `width`/`height` fixos pra CLS zero) do outro. Em mobile, imagem empilha abaixo da lista. Envolver a seção com `EntradaAoRolar`.

- [ ] **Passo 4: Verificar e commit**

```bash
npx tsc --noEmit && npm run lint && npm run build
git add src/content/imagens.ts public/fotos/temporarias/ src/components/secoes/ComoFunciona.tsx
git commit -m "adiciona imagem de apoio na secao como funciona"
```

---

## Task 9: Imagem de apoio em cada página de serviço

**Files:**
- Modify: `src/content/imagens.ts`
- Modify: `public/fotos/temporarias/CREDITOS.md`
- Create: 7 arquivos em `public/fotos/temporarias/servico-*.jpg`
- Modify: `src/app/servicos/[slug]/page.tsx`

- [ ] **Passo 1: Buscar e baixar uma imagem por serviço**

Usar os termos já mapeados no doc 09.4 por serviço:

| Slug do serviço | Termo de busca |
|---|---|
| `direcao-hidraulica` | power steering pump |
| `caixa-de-direcao-remanufaturada` | disassembled steering rack |
| `direcao-mecanica` | steering rack repair |
| `suspensao` | car suspension coil spring |
| `alinhamento-e-balanceamento` | wheel alignment machine |
| `freios` | brake disc rotor |
| `revisao-preventiva` | car dashboard warning light |

Baixar cada uma em `public/fotos/temporarias/servico-<slug>.jpg`, mesmo critério de seleção do doc 09.4 (sem gente, sem marca, sem legenda, enquadramento que sobrevive a recorte 16:9).

- [ ] **Passo 2: Registrar créditos e caminhos**

Uma linha por imagem no `CREDITOS.md`. Em `src/content/imagens.ts`, adicionar:

```ts
servicos: {
  "direcao-hidraulica": "/fotos/temporarias/servico-direcao-hidraulica.jpg",
  "caixa-de-direcao-remanufaturada": "/fotos/temporarias/servico-caixa-de-direcao-remanufaturada.jpg",
  "direcao-mecanica": "/fotos/temporarias/servico-direcao-mecanica.jpg",
  "suspensao": "/fotos/temporarias/servico-suspensao.jpg",
  "alinhamento-e-balanceamento": "/fotos/temporarias/servico-alinhamento-e-balanceamento.jpg",
  "freios": "/fotos/temporarias/servico-freios.jpg",
  "revisao-preventiva": "/fotos/temporarias/servico-revisao-preventiva.jpg",
} satisfies Record<ServicoSlug, string>,
```

(importar `type { ServicoSlug }` de `@/content/servicos` em `imagens.ts` para o `satisfies` garantir que nenhum slug ficou de fora)

- [ ] **Passo 3: Adicionar a imagem na página de serviço**

Em `src/app/servicos/[slug]/page.tsx`, logo abaixo do parágrafo de resposta direta (antes da seção "Como saber se o seu carro precisa"), adicionar a imagem tratada (mesmo filtro do doc 09.5, `next/image`, `loading="lazy"`, largura de exibição 1200px conforme doc 09.7, `alt` descrevendo o componente, não repetindo a keyword), lendo `IMAGENS.servicos[servico.slug]`.

- [ ] **Passo 4: Verificar as 7 páginas**

`npm run dev`, abrir cada uma das 7 páginas de serviço, confirmar imagem carregando e tratada, sem overflow em 360px.

- [ ] **Passo 5: Checagens e commit**

```bash
npx tsc --noEmit && npm run lint && npm run build
git add src/content/imagens.ts public/fotos/temporarias/ src/app/servicos/
git commit -m "adiciona imagem de apoio em cada pagina de servico"
```

---

## Task 10: Espaço para fotos da equipe em `/sobre`

**Files:**
- Modify: `src/content/equipe.ts` (novo arquivo)
- Modify: `src/app/sobre/page.tsx`

**Interfaces:**
- Produces: `EQUIPE: { nome: string; funcao: string; foto: string }[]` (vazio por enquanto), mesmo padrão de `DEPOIMENTOS` (Tarefa 7)

- [ ] **Passo 1: Criar o arquivo de conteúdo, vazio**

`src/content/equipe.ts`:

```ts
export interface MembroEquipe {
  nome: string;
  funcao: string;
  foto: string;
}

// Pendente: aguardando fotos e nomes reais da equipe, com autorizacao de imagem.
// Ver docs/01-briefing.md secao 1.8. Nao simular com banco de imagens, doc 09.3.
// A secao Sobre ja renderiza os cards automaticamente quando houver itens aqui.
export const EQUIPE: MembroEquipe[] = [];
```

- [ ] **Passo 2: Renderizar condicionalmente em `/sobre`**

Em `src/app/sobre/page.tsx`, importar `EQUIPE` e, depois dos parágrafos existentes e antes do bloco de números, adicionar:

```tsx
{EQUIPE.length > 0 && (
  <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
    {EQUIPE.map((membro) => (
      <div key={membro.nome} className="superficie flex flex-col items-center gap-3 p-6 text-center">
        <Image
          src={membro.foto}
          alt={`${membro.nome}, ${membro.funcao}`}
          width={120}
          height={120}
          className="rounded-full object-cover"
        />
        <p className="text-corpo-lg text-branco">{membro.nome}</p>
        <p className="etiqueta text-aco-fosco">{membro.funcao}</p>
      </div>
    ))}
  </div>
)}
```

(precisa do import de `Image` de `next/image` no topo do arquivo)

- [ ] **Passo 3: Verificar que nada quebra com o array vazio**

`npm run dev`, abrir `/sobre`, confirmar que a página renderiza normalmente sem a seção de equipe (já que `EQUIPE` está vazio), sem espaço em branco estranho.

- [ ] **Passo 4: Checagens e commit**

```bash
npx tsc --noEmit && npm run lint && npm run build
git add src/content/equipe.ts src/app/sobre/page.tsx
git commit -m "prepara secao de equipe em sobre, pronta para fotos reais"
```

---

## Task 11: Entrada animada nas seções restantes

**Files:**
- Modify: `src/app/page.tsx` (ProvaSocial, Localizacao)
- Modify: `src/app/servicos/[slug]/page.tsx`
- Modify: `src/app/sintomas/[slug]/page.tsx`

- [ ] **Passo 1: Envolver `ProvaSocial` e `Localizacao` com `EntradaAoRolar`**

Em `src/app/page.tsx`, envolver essas duas seções (que ainda não passaram pela Task 3) com `<EntradaAoRolar>`, mesmo padrão da Task 7/8.

- [ ] **Passo 2: Aplicar nas seções internas de serviço e sintoma**

Em `src/app/servicos/[slug]/page.tsx` e `src/app/sintomas/[slug]/page.tsx`, envolver cada bloco `<section>` (exceto o primeiro parágrafo de resposta direta, que deve aparecer imediato por ser conteúdo crítico de LCP) com `<EntradaAoRolar>`, com `atraso` incremental pequeno (0, 0.05, 0.1) entre seções consecutivas para um efeito de cascata sutil.

- [ ] **Passo 3: Verificar que o painel de diagnóstico continua funcionando**

`PainelDiagnostico` NÃO deve ser envolvido por `EntradaAoRolar` (é um componente client já com seu próprio estado interativo; envolver com motion.div é seguro mas não é necessário e adiciona risco). Testar manualmente: marcar sintomas, clicar em "Ver o que pode ser", confirmar que o resultado ainda aparece corretamente (mesmo teste da Tarefa 6).

- [ ] **Passo 4: Checagens e commit**

```bash
npx tsc --noEmit && npm run lint && npm run build
git add src/app/page.tsx src/app/servicos/[slug]/page.tsx src/app/sintomas/[slug]/page.tsx
git commit -m "aplica entrada animada nas secoes restantes da home e paginas internas"
```

---

## Task 12: Atualiza documentação e QA final

**Files:**
- Modify: `docs/03-arquitetura.md`
- Modify: `docs/09-imagens-e-midia.md`
- Modify: `docs/07-plano-execucao.md`

- [ ] **Passo 1: Atualizar doc 03**

Seção 3.6: adicionar `motion` de volta à lista de dependências permitidas. Adicionar uma nota (mesmo padrão da nota já existente sobre o baseline do framework) com o número real de JS da home medido depois desta rodada (medir com o mesmo método usado nas Tarefas 7 e 13: `curl` com gzip em cada chunk referenciado, servidor de produção local).

- [ ] **Passo 2: Atualizar doc 09**

Seção 9.4: marcar quais termos de busca já foram usados (Hero, Textura de fundo, e um por serviço) e quais ainda estão livres para uso futuro (sintomas ainda não receberam imagem, fica para uma rodada seguinte conforme o "fora de escopo" da spec).

- [ ] **Passo 3: Marcar a spec como implementada**

Em `docs/07-plano-execucao.md`, adicionar uma linha após a Fase 5 referenciando a spec e o plano executados nesta rodada, com a data.

- [ ] **Passo 4: Rodar Lighthouse mobile nas mesmas 5 páginas da Tarefa 13**

Mesmo processo da Tarefa 13 (`npx lighthouse` com `--throttling-method=devtools`, mobile, nas páginas `/`, `/servicos/direcao-hidraulica`, `/sintomas/volante-pesado`, `/duvidas`, `/orcamento`). Registrar os números novos no commit. Não é necessário bater os números antigos (a spec já avisou que o JS deve subir), mas Acessibilidade deve continuar 100 e LCP deve continuar abaixo de 2,5s.

- [ ] **Passo 5: Sweep de overflow horizontal nas 27 páginas**

Reaproveitar o script de varredura já usado na Tarefa 10 (`full-sweep.mjs`, viewport 360px, checa `scrollWidth > clientWidth` em todas as rotas). Nenhuma pode falhar.

- [ ] **Passo 6: Screenshots finais para o dono do projeto**

Capturar home (360px e 1440px) e uma página de serviço (1440px) depois de todas as mudanças, para mostrar o resultado.

- [ ] **Passo 7: Commit final**

```bash
git add docs/03-arquitetura.md docs/09-imagens-e-midia.md docs/07-plano-execucao.md
git commit -m "atualiza documentacao pos-refresh visual e registra resultado da auditoria"
git push
```

---

## Self-Review

- **Cobertura da spec:** seção 1 (paleta) → Task 3; seção 2 (Hero) → Task 4; seção 3 (imagens) → Tasks 7, 8, 9; seção 4 (movimento) → Tasks 1, 2, 5, 6, 11; seção 5 (equipe) → Task 10; seção 6 (docs) → Task 12. Todas cobertas.
- **Sem placeholder:** todo passo de código tem o bloco completo, exceto os passos de busca de imagem (Tasks 7, 8, 9), que são inerentemente um processo de pesquisa em tempo de execução (não dá pra saber a URL exata da foto antes de buscar), documentado com termo de busca exato e critério de seleção do doc 09.4.
- **Consistência de tipos:** `IMAGENS.hero` (já existe), `IMAGENS.texturaMetal`, `IMAGENS.comoFunciona`, `IMAGENS.servicos[slug]` (Tasks 7-9) e `EQUIPE: MembroEquipe[]` (Task 10) não colidem entre si.
