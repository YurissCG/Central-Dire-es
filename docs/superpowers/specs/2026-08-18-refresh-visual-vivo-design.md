# Refresh visual: site mais vivo, mais fotos, mais movimento

Data: 2026-08-18
Status: aprovado pelo dono do projeto, pronto para implementação

## Contexto

O site (27 páginas, Next.js, construído nas Fases 1-4 do `docs/07-plano-execucao.md`) foi
apresentado ao dono da oficina, que deu feedback crítico depois de rever a identidade visual
real da marca (logo em close e o feed do Instagram, que ele anexou). Pontos levantados:

1. Site muito escuro, principalmente a imagem do Hero
2. Falta presença da marca (a logo processada na Tarefa 11 nunca foi usada no Header, só texto)
3. Poucas imagens, o banco público só foi usado uma vez (no Hero)
4. Pouco movimento, ele mandou o catálogo de componentes do Unlumen
(`https://ui.unlumen.com/components`) como referência
5. Sugestão de "personagens" (pessoas reais do Instagram deles) aparecendo no site

O bug do item 2 (logo ausente do Header) já foi corrigido e commitado antes deste documento.

Decisões tomadas com o dono do projeto, uma pergunta por vez:

- Mantém o tema escuro (não vira site claro), mas fica visualmente mais denso e vivo
- Adicionar mais fotos de banco público agora, mesmo temporárias
- Aceitar o custo extra de JavaScript para usar movimento no estilo Unlumen (a lib `motion`
  havia sido removida no Tarefa 7 por pesar ~52KB; volta a entrar)
- Personagens = fotos reais da equipe, quando o dono enviar. Não simular com banco de imagens
  agora (já era regra do doc 09.3)
- Execução em uma fase só, sem checkpoint intermediário por página

## O que muda

### 1. Paleta e proporção visual

`docs/02-identidade-visual.md` seção 2.2 diz hoje: 70% preto/grafite, 20% branco/aço, 8%
vermelho, 2% amarelo. Nova proporção-alvo: **55% preto/grafite, 20% branco/aço, 20% vermelho,
5% amarelo**. Na prática:

- Seções alternam fundo `--color-preto-oficina` e `--color-grafite` (hoje é preto contínuo)
- Uso mais frequente de `.superficie` (cards com borda) em vez de texto solto sobre fundo vazio
- Mais elementos com `bg-vermelho` ou `border-vermelho` como destaque estrutural, não só em
  botão

Isso é uma mudança na Fonte Única de Verdade do design (doc 02), então o documento é atualizado
junto (seção nova, registrando a revisão, no mesmo padrão da seção 2.9 existente).

### 2. Imagem do Hero

Tratamento atual: `saturate(0.75) contrast(1.08) brightness(0.85)` + sobreposição preta de 70%.
Novo: `saturate(0.85) contrast(1.05) brightness(1.0)` (tira o escurecimento artificial) +
sobreposição preta de **45%** (ainda dentro do intervalo 45-70% que o doc 09.5 já permitia, na
ponta mais clara). Mantém o texto legível, mas a foto deixa de parecer "apagada".

### 3. Mais fotos de banco público (camada 1)

Usar os termos de busca que já existem em `docs/09-imagens-e-midia.md` seção 9.4 e que nunca
foram aplicados além do Hero:

- `GradeServicos` (home): imagem de textura de fundo na seção (peça/ferramenta em close, baixa
  opacidade), não uma imagem por linha de serviço. Isso preservaria o formato de lista que o
  doc 04.4 escolheu deliberadamente para evitar cara de "card genérico"
- `ComoFunciona` (home): uma imagem de apoio
- Cada página de serviço (`/servicos/[slug]`): uma imagem de apoio específica do serviço, com
  os termos já mapeados por serviço no doc 09.4 (ex: "power steering pump" para direção
  hidráulica, "wheel alignment machine" para alinhamento)

Mesmo tratamento visual da seção 9.5 (duotone ou filtro unificado), mesmo registro obrigatório
em `CREDITOS.md`, mesmas regras do doc 09.3 (nunca simular equipe ou fachada real).

### 4. Movimento

Reinstala a dependência `motion`. Componentes do registry Unlumen usados:

- **Motion FAQs Accordion**: substitui o `Accordion` padrão do shadcn em `/duvidas`
- **Motion Navigation Menu**: substitui a nav simples do Header (desktop)
- Entrada animada (fade + subida, `whileInView`) em todas as seções da home e das páginas
  internas ao rolar a página, uma vez cada
- Hover mais expressivo na `GradeServicos` (mantém formato de lista, não vira card genérico,
  isso era uma decisão deliberada do doc 04.4 que o feedback não questionou)

**Não entram**: Cursor Image Trail, Gooey SVG Filter, Matrix, Gravity Stars, Aurora Bars, Tilt
Card. São efeitos decorativos sem função para o conteúdo de uma oficina, e o doc 02.6 já
proibia essa categoria (partícula, blob animado, WebGL) antes deste feedback. Continua valendo.

Consequência aceita e registrada: o orçamento de JS da home volta a subir (estimativa: retorno
próximo dos ~200KB medidos antes do corte na Tarefa 7). O dono do projeto foi informado do
trade-off e decidiu priorizar a experiência visual. `docs/03-arquitetura.md` seção 3.6 é
atualizada com o novo número real depois da implementação, do mesmo jeito que já foi feito
quando o limite original de 120KB se mostrou incompatível com o framework.

### 5. Espaço para fotos da equipe

Em `/sobre`, adicionar uma seção estruturada (grade de espaços, hoje vazia ou com placeholder
tipográfico) pronta para receber fotos reais da equipe. Segue o mesmo padrão já usado em
`DEPOIMENTOS` (array vazio, componente já pronto para renderizar assim que houver dado).

### 6. Atualização de documentação

- `docs/02-identidade-visual.md`: nova seção registrando a revisão, motivo e proporção nova
- `docs/03-arquitetura.md` seção 3.6: `motion` volta à lista de dependências permitidas; número
  de JS real atualizado após a mudança
- `docs/09-imagens-e-midia.md`: marcar quais termos de busca da seção 9.4 foram efetivamente
  usados e onde

## Fora de escopo desta rodada

- Fotos reais da equipe (dependem do dono enviar)
- Qualquer alteração de conteúdo/copy (esse feedback foi só visual)
- Páginas de sintoma não recebem imagem de apoio nesta rodada (o doc 09.4 tem um termo por
  sintoma, mas o volume de trabalho já é grande; fica para uma rodada seguinte se o resultado
  for aprovado)

## Critério de pronto

- `npm run build`, `npx tsc --noEmit` e `npm run lint` limpos
- Nenhuma das 27 páginas com overflow horizontal em 360px
- Lighthouse mobile rodado de novo (Performance pode cair por causa do `motion`, mas
  Acessibilidade continua 100 e LCP continua abaixo de 2,5s)
- Screenshots da home e de uma página de serviço mostrados ao dono do projeto antes de
  considerar a rodada encerrada
