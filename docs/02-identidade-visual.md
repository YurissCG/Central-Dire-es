# 02. Identidade visual e sistema de design

A marca não tem manual. Esta é a identidade oficial do projeto, derivada do logo e do Instagram. Não improvise fora dela.

## 2.1 Direção criativa

**Conceito: oficina de precisão, não oficina de fundo de quintal.**

A referência não é site de mecânica com fundo de pneu e chama de fogo. A referência é **painel de instrumentos e manual técnico**: chapa de aço pintada, fita zebrada de sinalização, etiqueta de especificação, medidor com escala, tipografia condensada de placa industrial. É um mundo que já pertence ao cliente, ele reconhece sem precisar de explicação.

Três coisas que sustentam essa direção:

1. **Superfície de metal pintado**, não vidro fosco. Preto profundo com ruído sutil, borda de 1px em grafite claro, sombra curta e dura.
2. **Rótulo de especificação.** Dados importantes (telefone, prazo, horário, garantia) aparecem em mono caixa alta com letter-spacing largo, como etiqueta de torque colada no motor.
3. **Amarelo de sinalização** como terceira cor, usado só em aviso e em elemento de diagnóstico. O amarelo já aparece no material atual da marca e dá o ar de oficina de verdade sem virar decoração.

## 2.2 Paleta

Extraída do logo. O vermelho puro do logo é #FC0103, agressivo demais para texto, então a paleta tem uma versão calibrada para tela.

```css
@theme {
  /* superfícies */
  --color-preto-oficina: #0B0B0C;   /* fundo base */
  --color-grafite: #17181A;         /* cards, superfície elevada */
  --color-grafite-borda: #2A2C30;   /* borda 1px */

  /* marca */
  --color-vermelho: #DA1A12;        /* ação primária, fundo de botão */
  --color-vermelho-fundo: #B31009;  /* estado pressionado */
  --color-vermelho-claro: #FF453D;  /* destaque em texto grande sobre preto */

  /* sinalização */
  --color-amarelo: #F2B705;         /* alerta, diagnóstico, fita zebrada */

  /* texto */
  --color-branco: #F5F6F7;
  --color-aco: #C8CDD3;             /* texto secundário */
  --color-aco-fosco: #8A9098;       /* legenda, metadado */
}
```

**Regras de contraste, medidas e não estimadas:**

| Combinação | Razão | Uso permitido |
|---|---|---|
| #F5F6F7 sobre #0B0B0C | 18:1 | qualquer texto |
| #C8CDD3 sobre #0B0B0C | 11:1 | texto secundário |
| #F2B705 sobre #0B0B0C | 10,8:1 | qualquer texto, ícone, borda |
| #0B0B0C sobre #F2B705 | 10,8:1 | texto em bloco de aviso |
| #F5F6F7 sobre #DA1A12 | 5,1:1 | texto de botão vermelho |
| #DA1A12 sobre #0B0B0C | 3,9:1 | **só** título grande, ícone e borda. Nunca corpo de texto |

Proporção: 70% preto e grafite, 20% branco e aço, 8% vermelho, 2% amarelo. Vermelho em tudo cansa e mata a hierarquia de CTA.

## 2.3 Tipografia

Nenhuma das fontes padrão de projeto gerado por IA. Todas no Google Fonts, carregadas por `next/font/google` com `display: 'swap'` e subset `latin` e `latin-ext`.

| Papel | Fonte | Pesos | Uso |
|---|---|---|---|
| Display | **Barlow Condensed** | 600, 700 | h1, h2, números grandes, caixa alta. Geometria condensada e levemente inclinável, é a fonte que mais se aproxima do lettering do logo |
| Corpo | **IBM Plex Sans** | 400, 500, 600 | parágrafo, lista, label de formulário, botão |
| Utilitário | **IBM Plex Mono** | 500 | etiqueta, eyebrow, telefone, CEP, horário, código de peça |

Escala, mobile primeiro. Use `clamp` para não precisar de breakpoint em cada título.

```css
--text-display: clamp(2.5rem, 9vw, 5.5rem);   /* h1, caixa alta, line-height .92, tracking -.02em */
--text-h2:      clamp(1.75rem, 5vw, 3rem);    /* line-height 1.0 */
--text-h3:      clamp(1.25rem, 3vw, 1.75rem);
--text-corpo:   1.0625rem;                     /* 17px, line-height 1.65 */
--text-corpo-lg:1.1875rem;                     /* 19px em desktop */
--text-etiqueta:0.75rem;                       /* mono, uppercase, tracking .14em */
```

Detalhes que dão o acabamento:

- Título em caixa alta com `line-height` menor que 1 e `letter-spacing` negativo. Título condensado com espaçamento solto parece template.
- Nunca centralize parágrafo com mais de duas linhas.
- Largura máxima de leitura: 68 caracteres.
- Números de telefone e valores em `font-variant-numeric: tabular-nums`.

## 2.4 Layout

- Grade de 12 colunas em desktop, 4 em mobile. Gutter de 16px em mobile, 24px em desktop.
- Container: `max-width: 1200px`, padding lateral de 20px em mobile.
- Ritmo vertical: seções em múltiplos de 8px. Espaçamento entre seções de 64px em mobile e 112px em desktop.
- Raio de borda: 2px. Quase reto. A marca é industrial, não é aplicativo de banco. A única exceção é o botão de WhatsApp flutuante, que é circular ou pílula.
- Sombra: uma só, curta e dura, `0 2px 0 0 rgba(0,0,0,.6)`. Sem sombra difusa em três camadas.

**Divisor de seção:** faixa de 6px de altura com listras diagonais amarelo e preto a 45 graus, feita em CSS com `repeating-linear-gradient`. É o elemento estrutural que amarra a página e comunica "área técnica" sem escrever nada. Use no máximo três vezes na home.

## 2.5 Elemento assinatura: o Painel de Diagnóstico

O que ninguém na concorrência tem e é a coisa mais valiosa do site.

Um bloco interativo chamado **"O que seu carro está tentando dizer"**. O visitante marca os sintomas que sente, em linguagem de dono de carro, não de mecânico:

- O volante está pesado
- Tem barulho ao virar o volante
- O carro puxa para um lado
- O volante vibra em velocidade
- O carro pula muito nos buracos
- Tem vazamento de óleo embaixo do carro
- O pneu está gastando torto
- O freio range ou demora para parar

Visual: cluster de luzes de painel. Cada sintoma é um item retangular com borda grafite e ícone de contorno; ao marcar, o ícone acende em amarelo e a borda passa a vermelha, com transição de 120ms. Marcado é `aria-pressed="true"`.

Ao confirmar, o painel mostra:
1. O setor provável, com o texto que explica em português claro o que costuma causar aquilo, vindo de `dados/sintomas.json`
2. Um aviso honesto: só a inspeção na oficina fecha o diagnóstico
3. Um botão de WhatsApp com a mensagem já montada: `Oi, vi no site. Meu carro está com: volante pesado, barulho ao virar. Queria fazer um orçamento.`

Por que isso funciona em três frentes ao mesmo tempo:

- **Conversão:** a pessoa chega no WhatsApp com o problema já descrito, e a oficina responde melhor e mais rápido
- **Confiança:** o site ajuda antes de vender, o que ataca direto a objeção de "vão me enganar"
- **SEO:** cada sintoma vira uma página própria em `/sintomas/[slug]`, e é assim que se captura a busca de cauda longa

Implementação: componente cliente, estado local com `useState`, sem biblioteca de formulário. Precisa funcionar com teclado e ser navegável por leitor de tela.

## 2.6 Movimento

Discreto e com propósito. Animação em excesso é o sinal mais óbvio de site gerado por IA.

**Permitido:**
- Fade e translate de 12px para cima em entrada de seção, uma vez, com `IntersectionObserver` ou Motion `whileInView`, duração de 300ms a 400ms
- Contador que sobe uma vez nos números reais de prova social (4,3 e 215 avaliações)
- Estado de hover e press nos botões, 120ms
- Acender de sintoma no painel de diagnóstico

**Proibido:**
- Parallax, texto que digita sozinho, marquee infinito, partícula, blob animado, gradiente em movimento, WebGL, spline 3D
- Qualquer animação que atrase o conteúdo principal ou mexa em layout depois do carregamento, por causa do CLS

Sempre:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
  }
}
```

## 2.7 Componentes e a biblioteca Unlumen

Base em shadcn/ui. Do registry Unlumen, use com parcimônia e só onde há ganho real:

| Componente | Onde | Por que |
|---|---|---|
| Motion FAQs Accordion (grátis) | página de dúvidas | acordeão acessível e leve |
| Tilt Card (grátis) | não usar | efeito chamativo sem função aqui |
| Animate Digits ou Animate Count (grátis) | prova social | os números reais de avaliação |
| Motion Navigation Menu (grátis) | header desktop | menu com foco visível |
| Animated List (grátis) | resultado do diagnóstico | revelação em sequência dos resultados |
| Backgrounds e shaders | não usar | custa CPU no celular e é o clichê de IA |

Instalação: `npx shadcn@latest add @unlumen-ui/<slug>`. Componente marcado Pro exige chave de licença em `.env.local` e configuração de registry em `components.json`, conforme a documentação do Unlumen. **Não use componente Pro sem a licença comprada.** Tudo que o site precisa existe nos gratuitos.

Todo componente adicionado precisa ser reestilizado para os tokens desta paleta. Componente com a cor padrão da biblioteca é exatamente a cara de template que estamos evitando.

## 2.8 Ícones

`lucide-react`, traço de 1,5px, tamanho 20 ou 24. Ícones úteis: `Wrench`, `Gauge`, `CircleDot`, `Disc3`, `Car`, `MapPin`, `Phone`, `Clock`, `ShieldCheck`, `AlertTriangle`, `MessageCircle`. Zero emoji na interface.

## 2.9 Revisão da direção criativa

Feita antes de codar, como manda o processo de design. O primeiro rascunho da paleta era preto com um único vermelho de destaque, que é justamente um dos padrões automáticos de IA. O que mudou: entrou o amarelo de sinalização como terceira cor com função real, e o divisor virou fita zebrada em vez de linha fina. A tipografia saiu de "sans neutra com serifada de display" para condensada industrial com mono técnica, que vem do lettering do logo e das etiquetas de oficina. A ousadia está concentrada em um lugar só, o Painel de Diagnóstico. O resto é disciplinado e quieto.

## 2.10 Revisão pós-feedback do dono, 2026-08-18

Depois de ver o site publicado, o dono da oficina revisou a identidade real da marca (logo em
close e o feed do Instagram) e pediu um site mais vivo: menos área escura vazia, mais vermelho,
mais foto. Proporção revisada: **55% preto/grafite, 20% branco/aço, 20% vermelho, 5% amarelo**
(a proporção original da seção 2.2 era 70/20/8/2). Na prática: seções alternam fundo
`--color-preto-oficina` e `--color-grafite` em vez de preto contínuo, e mais elementos usam
`.superficie` ou `border-vermelho`/`bg-vermelho` como destaque estrutural. Detalhe completo em
`docs/superpowers/specs/2026-08-18-refresh-visual-vivo-design.md`.
