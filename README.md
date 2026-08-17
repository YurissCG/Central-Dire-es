# Site Central Direções

Base de contexto e especificação do site da Central Direções, oficina de direção hidráulica e mecânica em São Benedito, Santa Luzia, MG.

Este repositório ainda não contém o código do site. Contém a especificação completa para que o Claude Code construa o site sem precisar de nova rodada de descoberta.

## Como usar

1. Abra a pasta no VS Code
2. Rode `claude` no terminal, na raiz do projeto
3. O Claude Code lê o `CLAUDE.md` automaticamente
4. Diga: `Leia toda a pasta docs e execute a Tarefa 1 do plano de execução`

Trabalhe uma tarefa por vez. O plano está em ordem de dependência.

## Estrutura

```
CLAUDE.md    regras do projeto, lido em toda sessão
AGENTS.md    ponteiro para o CLAUDE.md, para outros agentes
docs/        a especificação, em nove documentos
dados/       JSON e markdown de origem do conteúdo
templates/   rascunhos de robots.txt e llms.txt
```

## Os documentos

| Arquivo | Conteúdo |
|---|---|
| `docs/01-briefing.md` | o negócio, NAP confirmado, público, o que as avaliações revelam, pendências |
| `docs/02-identidade-visual.md` | paleta, tipografia, layout, movimento, elemento assinatura |
| `docs/03-arquitetura.md` | stack, pastas, rotas, convenções, orçamento de performance |
| `docs/04-copy-e-conteudo.md` | voz, vocabulário proibido, copy de cada seção |
| `docs/05-seo-tecnico.md` | metadata, schema, robots, sitemap, llms.txt, Search Console |
| `docs/06-seo-local-marketing.md` | Google Business Profile, NAP, avaliações, funil |
| `docs/07-plano-execucao.md` | 16 tarefas em ordem, com checkboxes |
| `docs/08-entrega-e-qa.md` | checklist de aceite e de entrega |
| `docs/09-imagens-e-midia.md` | banco de imagens público agora, fotos oficiais depois |

## Stack decidida

Next.js 15 App Router, TypeScript strict, Tailwind CSS v4, shadcn/ui com registry Unlumen UI, Motion, deploy na Vercel. Sem backend: o formulário monta a mensagem e abre o WhatsApp.

## Antes de começar

Leia `docs/01-briefing.md` seção 1.8. Há informações que só o dono da oficina pode confirmar, e nada da lista entra no site sem resposta dele.
