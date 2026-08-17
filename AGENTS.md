# AGENTS.md

As instruções deste projeto estão em [`CLAUDE.md`](./CLAUDE.md). Leia esse arquivo inteiro e a pasta `docs/` antes de escrever código.

Resumo do que não pode ser violado:

1. Nenhum travessão (—) em texto do site
2. Nenhuma fonte, cor, frase ou padrão visual da lista de proibidos em `CLAUDE.md` seção 2.1
3. Mobile first a partir de 360px
4. Telefone, endereço e horário só de `src/content/negocio.ts`
5. Nenhuma afirmação, preço, garantia ou número sem confirmação em `dados/negocio.json`
6. Nenhuma foto de banco de imagens fingindo ser a equipe ou a oficina

Próxima tarefa: `docs/07-plano-execucao.md`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
