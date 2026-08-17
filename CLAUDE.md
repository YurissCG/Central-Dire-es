# CLAUDE.md

Base de contexto do projeto **Site Central Direções**. Este arquivo é lido em toda sessão do Claude Code. Leia-o inteiro antes de escrever qualquer linha de código.

---

## 1. O que é este projeto

Site institucional e de captação para a **Central Direções**, oficina especializada em direção hidráulica, direção mecânica e peças remanufaturadas, em São Benedito, Santa Luzia (MG), região metropolitana de Belo Horizonte.

**Quem paga:** o desenvolvedor (Yuri) está construindo o site para vender ao dono da oficina por R$ 1.000. O site precisa se pagar em uma ou duas ordens de serviço. Isso define a prioridade de tudo: **o site existe para gerar conversa no WhatsApp e visita na oficina.**

**Métrica única de sucesso:** número de cliques em "Falar no WhatsApp" e em "Ligar" por visitante. Tudo que não serve a isso é secundário.

---

## 2. Regras invioláveis

Estas regras valem para todo commit. Se um pedido conflitar com elas, avise antes de executar.

### 2.1 Nada com cara de site gerado por IA

| Proibido | Use no lugar |
|---|---|
| Travessão (—) em qualquer texto do site | vírgula, dois pontos, ponto |
| Fontes Inter, Poppins, Montserrat, Playfair Display | as fontes definidas em `docs/02-identidade-visual.md` |
| Fundo creme (#F4F1EA) + serifada + terracota (#D97757) | paleta do arquivo de identidade |
| Gradiente roxo/azul, glassmorphism genérico, blob decorativo | superfícies de metal pintado, chapa, fita zebrada |
| Emoji em títulos, botões ou navegação | ícones SVG do set definido |
| "Não é apenas X, é Y", "soluções", "excelência", "inovação", "transforme", "descubra o poder", "no mundo de hoje", "eleve o seu" | lista de vocabulário em `docs/04-copy-e-conteudo.md` |
| Três cards iguais com ícone genérico, título de duas palavras e frase de efeito | ver seção 4.4 do doc de copy |
| Números inventados ("+10 anos", "+5000 clientes") | somente dados confirmados em `dados/negocio.json` |

Antes de commitar qualquer texto, rode a checagem da seção 4.6 de `docs/04-copy-e-conteudo.md`.

### 2.2 Mobile first, de verdade

- Comece cada componente no viewport de **360x640** e só depois suba para `sm:`, `md:`, `lg:`.
- Nenhum `overflow-x` horizontal em nenhuma largura entre 320px e 1920px.
- Alvos de toque com no mínimo 44x44px.
- CTA de WhatsApp fixo e alcançável com o polegar no mobile, sem cobrir conteúdo.
- Público real: dono de carro popular, no celular, muitas vezes em 4G fraco e no meio da rua com o carro apitando. Peso da página importa mais que animação.

### 2.3 Fonte única de verdade para dados do negócio

Telefone, endereço, horário, CNPJ, redes: **só** de `dados/negocio.json`. Nunca escreva um telefone ou endereço direto no JSX. Divergência de NAP entre site, Google e Instagram destrói SEO local.

### 2.4 Só afirme o que é verdade

Nada de garantia, prazo, preço, certificação ou parceria que não esteja confirmado em `dados/negocio.json`. Item não confirmado vai para a lista de pendências do briefing e fica fora do site.

---

## 3. Stack

- **Next.js 15+**, App Router, TypeScript strict
- **Tailwind CSS v4** com tokens em `@theme`
- **shadcn/ui** como base de primitivos
- **Unlumen UI** (`https://ui.unlumen.com`) como registry extra de componentes animados, instalado pela CLI do shadcn
- **Motion** para animação, sempre respeitando `prefers-reduced-motion`
- **Zero backend.** Formulário monta mensagem e abre `wa.me`. Sem banco, sem API, sem custo mensal além do domínio.
- **Deploy:** Vercel, com domínio próprio do cliente

Detalhes, estrutura de pastas e convenções: `docs/03-arquitetura.md`.

---

## 4. Ordem de leitura dos documentos

| Arquivo | Quando ler |
|---|---|
| `docs/01-briefing.md` | sempre, é o negócio e os dados reais |
| `docs/02-identidade-visual.md` | antes de qualquer UI |
| `docs/03-arquitetura.md` | antes de criar arquivos ou rotas |
| `docs/04-copy-e-conteudo.md` | antes de escrever qualquer texto |
| `docs/05-seo-tecnico.md` | ao criar páginas, metadata, schema, sitemap |
| `docs/06-seo-local-marketing.md` | na fase de publicação e no pós-entrega |
| `docs/07-plano-execucao.md` | para saber qual é a próxima tarefa |
| `docs/08-entrega-e-qa.md` | antes de declarar qualquer coisa pronta |
| `docs/09-imagens-e-midia.md` | ao inserir qualquer imagem |
| `dados/*.json` | conteúdo estruturado, serviços, sintomas |

---

## 5. Como trabalhar neste repositório

1. **Uma tarefa do plano por vez.** `docs/07-plano-execucao.md` está em ordem de dependência. Não pule fase.
2. **Rode e olhe.** Depois de cada componente: `npm run dev`, abra em 360px e em 1440px, confira no navegador. Se tiver Playwright ou o Chrome MCP disponível, tire screenshot e critique o próprio resultado antes de seguir.
3. **Verifique antes de afirmar.** Nenhuma tarefa é "concluída" sem `npm run build` passando, sem erro de TypeScript e sem warning de acessibilidade óbvio.
4. **Commits pequenos**, mensagem no imperativo em português: `adiciona página de direção hidráulica`.
5. **Não invente conteúdo do cliente.** Faltando informação, adicione em "Pendências com o cliente" no briefing e siga com o restante.
6. **Ao terminar uma fase**, atualize os checkboxes de `docs/07-plano-execucao.md`.

---

## 6. Estado atual

Fase 0. Nada implementado. O projeto Next.js ainda não foi criado. Comece pela Tarefa 1 de `docs/07-plano-execucao.md`.

---

## 7. Comandos

```bash
npm run dev            # desenvolvimento
npm run build          # build de produção, precisa passar antes de qualquer entrega
npm run lint
npx tsc --noEmit       # checagem de tipos
npx shadcn@latest add @unlumen-ui/<componente>   # componente do registry Unlumen
```

Auditoria de SEO, se o plugin `claude-seo` estiver instalado:

```bash
/seo audit https://<dominio>       # auditoria completa
/seo local https://<dominio>       # SEO local, GBP, NAP, avaliações
/seo schema https://<dominio>      # valida e gera JSON-LD
/seo geo https://<dominio>         # citabilidade em busca com IA
/seo google setup                  # credenciais PageSpeed, GSC, GA4
```

Instalação do plugin: `/plugin marketplace add AgriciDaniel/claude-seo`, depois `/plugin install claude-seo@agricidaniel-claude-seo` e `/seo setup`.
