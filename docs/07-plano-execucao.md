# 07. Plano de execução

**Objetivo:** site institucional estático de 20 páginas para a Central Direções, otimizado para busca local e para conversão em WhatsApp, entregue no domínio do cliente com Search Console configurado.

**Arquitetura:** Next.js App Router com geração estática, Tailwind v4, shadcn/ui mais registry Unlumen, zero backend, deploy na Vercel.

**Restrições globais:** TypeScript strict; mobile first a partir de 360px; regras de linguagem do doc 04; orçamento de performance do doc 03 seção 3.6; nenhum dado de negócio fora de `src/content/negocio.ts`.

Marque os checkboxes conforme avança. Não pule fase: a fase 2 depende de tokens da fase 1, e a fase 4 depende do conteúdo da fase 3.

---

## Fase 0. Verificação de contexto

- [x] Ler `CLAUDE.md` e todos os arquivos de `docs/`
- [x] Confirmar o domínio a ser usado. Sem domínio definido, use `https://centraldirecoes.com.br` como placeholder e registre em um único lugar, `src/content/negocio.ts`, para a troca ser de uma linha
- [x] Conferir Node 20 ou superior

---

## Fase 1. Fundação

### Tarefa 1. Criar o projeto

- [x] `npx create-next-app@latest . --typescript --tailwind --app --eslint --src-dir --import-alias "@/*"`
- [x] Remover boilerplate: conteúdo padrão de `page.tsx`, `globals.css` e as imagens de exemplo em `public/`
- [x] `npx shadcn@latest init`
- [x] Configurar o registry `@unlumen-ui` em `components.json` conforme o doc 02 seção 2.7
- [x] `npm run dev` sobe sem erro
- [x] Commit: `inicia projeto next com tailwind e shadcn`

### Tarefa 2. Tokens e tipografia

- [x] `src/app/globals.css` com o bloco `@theme` completo do doc 02 seção 2.2
- [x] Utilitários: `.faixa-zebrada`, `.etiqueta` (mono caixa alta com tracking), `.superficie` (grafite com borda 1px)
- [x] Fontes em `src/app/layout.tsx` via `next/font/google`: Barlow Condensed 600 e 700, IBM Plex Sans 400, 500 e 600, IBM Plex Mono 500. Expor como variável CSS
- [x] `lang="pt-BR"` no `<html>`
- [x] Bloco de `prefers-reduced-motion` no CSS global
- [x] Página de teste com h1, h2, parágrafo, etiqueta, botão e faixa zebrada. Olhar em 360px e em 1440px
- [x] Commit: `adiciona tokens de cor, tipografia e utilitarios base`

### Tarefa 3. Conteúdo tipado

- [x] Copiar `dados/negocio.json` para `src/content/negocio.ts` como objeto `as const`, com tipo exportado
- [x] Mesma coisa para `servicos.ts`, `sintomas.ts` e `duvidas.ts` (criado `dados/duvidas.json`, ausente no pacote original, com perguntas de `palavras-chave.md` camada 4 e respostas só com fatos já confirmados)
- [x] `src/lib/whatsapp.ts` com `linkWhatsApp()` conforme doc 06 seção 6.6
- [x] `src/lib/schema.ts` com `schemaOficina()`, `schemaServico()`, `schemaBreadcrumb()` (mais `schemaWebsite()`, usado na Tarefa 4)
- [x] `npx tsc --noEmit` limpo
- [x] Commit: `adiciona conteudo tipado e utilitarios de whatsapp e schema`

### Tarefa 4. Layout base

- [x] `Header`: logo, navegação, botão de WhatsApp. Menu mobile em drawer, com foco preso dentro e fechamento por Escape (logo em texto, Barlow Condensed; o arquivo de logo processado ainda não existe, ver `assets-marca/LEIA-ME.md`)
- [x] `Footer`: NAP completo, horário, redes, cidades atendidas, link para o Google
- [x] `BarraWhatsApp`: barra fixa no rodapé em mobile, com "Falar no WhatsApp" e "Ligar". Esconder quando o painel de diagnóstico estiver na tela, para não competir (observa `#painel-diagnostico`, criado na Tarefa 6)
- [x] Link "pular para o conteúdo" como primeiro elemento focável
- [x] `metadata` base no layout conforme doc 05 seção 5.2
- [x] JSON-LD de `AutoRepair` e `WebSite` no layout
- [x] Testar navegação inteira só com Tab
- [x] Commit: `adiciona header, footer e barra fixa de contato`

---

## Fase 2. Home

### Tarefa 5. Hero

- [x] Copy exata do doc 04 seção 4.4
- [x] Imagem de fundo com tratamento do doc 09 seção 9.5, `priority` (Unsplash, camada 1 temporária, crédito em `public/fotos/temporarias/CREDITOS.md`)
- [x] Dois CTAs, e a linha de dados em mono
- [x] Conferir LCP: o h1 é Server Component, HTML puro sem esperar JS; imagem com `priority`. Medição fina de LCP fica para a Tarefa 13
- [x] Commit: `adiciona hero da home`

### Tarefa 6. Painel de Diagnóstico

O elemento assinatura. Faça com calma, é o que vende o site.

- [x] `ItemSintoma`: `<button>` com `aria-pressed`, ícone, rótulo, estados de foco e marcado
- [x] `PainelDiagnostico`: grade de 8 sintomas, 2 colunas em mobile e 4 em desktop, com `useState`
- [x] `ResultadoDiagnostico`: setor provável, explicação vinda de `sintomas.ts`, aviso amarelo de honestidade, CTA com mensagem montada com os sintomas marcados (campo `curto` adicionado a `sintomas.ts`/`dados/sintomas.json` para montar a mensagem no padrão do doc 02.5)
- [x] Estado vazio: se nada foi marcado, o botão fica desabilitado com texto explicando o que fazer
- [x] Cada resultado leva à página `/sintomas/[slug]` correspondente
- [x] Operável só por teclado, testado com Playwright (Tab até o item, Enter marca, aria-pressed correto)
- [x] Commit: `adiciona painel de diagnostico por sintoma`

### Tarefa 7. Restante da home

- [x] `ProvaSocial` com três avaliações reais e link para o Google — **bloqueado**: não existe fonte de avaliações reais e o conteúdo do Google não é raspável. Seção mostra nota agregada (4,3, 215) real e confirmada, com link para o Google; os 3 depoimentos entram quando o cliente aprovar, ver pendência no doc 01
- [x] `GradeServicos` em lista, não em card genérico
- [x] `ComoFunciona` com os quatro passos numerados (passos 3 e 4 ajustados para remover as cláusulas "por escrito" e "peça devolvida", não confirmadas em `dados/negocio.json.promessas`, mantendo só o que já é corroborado por `servicos.json`)
- [x] `Localizacao` com endereço, horário, telefones e mapa sob clique (card com link direto pro Google Maps, sem iframe carregado de imediato)
- [x] Faixa zebrada como divisor, no máximo três vezes (usada exatamente três vezes)
- [x] `npm run build` e conferir o peso da rota `/` — JS real da home ficou em ~157KB comprimido (framework Next/React baseline ~114KB + código nosso). Acima do limite original de 120KB; decisão registrada com o dono do projeto de aceitar como piso realista, documentada no doc 03 seção 3.6. `motion` foi removido (economia de ~42KB) trocando o `CountUp` do Unlumen por contador próprio sem dependência
- [x] Olhar em 360px, 390px, 768px e 1440px — sem overflow horizontal em nenhuma
- [x] Commit: `completa secoes da home`

---

## Fase 3. Páginas internas

### Tarefa 8. Serviços

- [x] `/servicos` como índice, com resumo e link para as filhas — **nota:** `dados/servicos.json` tem 7 serviços (inclui `revisao-preventiva`), não 6 como diz este texto e o doc 03 seção 3.3. Segui os 7, já que `revisao-preventiva` tem dado completo e keyword mapeada em `palavras-chave.md`. Total de páginas do site passa de 20 para 21
- [x] `/servicos/[slug]` com `generateStaticParams` e `generateMetadata`
- [x] Estrutura de sete blocos do doc 04 seção 4.5, com o bloco de resposta de 130 a 170 palavras (todas conferidas, 135-147 palavras)
- [x] `Service` e `BreadcrumbList` em JSON-LD por página
- [x] CTA no fim com a origem correta na mensagem
- [x] Commit: `adiciona paginas de servico`

### Tarefa 9. Sintomas

- [x] `/sintomas` como índice
- [x] `/sintomas/[slug]`, **dez** páginas (não oito, mesma discrepância do doc 03/07 já registrada na Tarefa 8: `dados/sintomas.json` e `palavras-chave.md` camada 3 sempre tiveram os 10 sintomas, incluindo os 2 com `noPainel: false`. Total do site sobe para 23 páginas): h1 na forma da pergunta, resposta direta (130-170 palavras, todas conferidas), causas prováveis, o que fazer agora, quando é urgente, link para o serviço relacionado, CTA
- [x] Link cruzado entre sintoma e serviço nos dois sentidos (serviço → sintomas na Tarefa 8, sintoma → serviço aqui)
- [x] Commit: `adiciona paginas de sintoma`

### Tarefa 10. Sobre, dúvidas, contato, orçamento

- [x] `/sobre` com a história e a equipe. Sem foto de banco fingindo ser a equipe, ver doc 09 seção 9.3 — sem nome de equipe nem ano de fundação (ambos pendentes em `dados/negocio.json`), foco no diferencial confirmado (setor próprio de remanufatura) e na prova social real
- [x] `/duvidas` com acordeão acessível, 10 a 15 perguntas reais (11 perguntas; usei o `Accordion` padrão do shadcn/radix, animação via CSS, não o "Motion FAQs Accordion" do Unlumen, pra não reintroduzir o custo de `motion` cortado na Tarefa 7)
- [x] `/contato` com NAP, mapa, horário, botões de ligar e WhatsApp
- [x] `/orcamento` com formulário que monta a mensagem: nome, carro e ano, o que está acontecendo, serviço desejado. Validação em cliente (HTML5 `required`), sem envio para servidor, abre o `wa.me`
- [x] `not-found.tsx` que ajuda de verdade, com os links principais
- [x] Commit: `adiciona paginas institucionais e de orcamento`

---

## Fase 4. SEO técnico

### Tarefa 11. Arquivos de indexação

- [ ] `app/robots.ts`
- [ ] `app/sitemap.ts` lendo as listas de `src/content`
- [ ] `public/llms.txt` a partir de `templates/llms.txt`, com as URLs finais
- [ ] `manifest.webmanifest`, favicon e apple-touch-icon a partir do logo
- [ ] Conferir `/robots.txt` e `/sitemap.xml` no navegador depois do build
- [ ] Commit: `adiciona robots, sitemap, llms.txt e manifest`

### Tarefa 12. Metadata e Open Graph

- [ ] `title` e `description` únicos nas 20 páginas, dentro dos limites de tamanho
- [ ] Canonical absoluto e autorreferente em todas
- [ ] Imagem OG por tipo de página
- [ ] Validar no Rich Results Test e no Schema Markup Validator
- [ ] Commit: `completa metadata e imagens de open graph`

### Tarefa 13. Performance

- [ ] `npm run build` e conferir cada rota contra o orçamento do doc 03 seção 3.6
- [ ] Auditoria local no Lighthouse, em modo mobile
- [ ] Cortar o que estourar. Cortar recurso, não relaxar o limite
- [ ] Commit: `otimiza peso e core web vitals`

---

## Fase 5. Publicação

### Tarefa 14. Deploy

- [ ] Repositório no GitHub
- [ ] Projeto na Vercel, build de produção passando
- [ ] Domínio apontado, HTTPS ativo, redirecionamento de www para raiz ou o contrário, escolha uma versão e mantenha
- [ ] Trocar o placeholder de domínio pelo real e refazer o build

### Tarefa 15. Search Console e SEO local

- [ ] Passo a passo do doc 05 seção 5.10, na conta do cliente
- [ ] Sitemap enviado, indexação pedida nas 4 páginas principais
- [ ] Bing Webmaster Tools importado do Search Console
- [ ] Checklist do Google Business Profile do doc 06 seção 6.3
- [ ] PageSpeed Insights em mobile, registrar o número obtido

### Tarefa 16. Entrega

- [ ] `docs/08-entrega-e-qa.md` inteiro percorrido
- [ ] Documento de uma página para o cliente: o que ele recebeu, os acessos, e as três recomendações de avaliação do doc 06 seção 6.4
- [ ] Transferência de acesso: domínio, Vercel, Search Console, no nome do cliente

---

## Sequência de troca das imagens

Fora do caminho crítico, mas obrigatório antes de considerar o projeto encerrado. Ver `docs/09-imagens-e-midia.md` seção 9.10.

- [ ] Lista de fotos enviada ao cliente
- [ ] Fotos oficiais recebidas
- [ ] Troca feita, `public/fotos/temporarias/` apagada
- [ ] Fotos também subidas no Google Business Profile
