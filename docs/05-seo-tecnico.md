# 05. SEO técnico

Cobre os itens que o cliente pediu: Google Search Console, llms.txt, robots.txt, velocidade, title e meta description, sitemap.xml e palavra-chave do negócio.

## 5.1 Palavra-chave, o mapa

Estratégia inteira em `dados/palavras-chave.md`. Resumo:

**Termo principal:** `direção hidráulica Santa Luzia`
**Termo de diferencial:** `caixa de direção remanufaturada BH`
**Termo de volume e ticket baixo:** `alinhamento e balanceamento Santa Luzia`
**Cauda longa, o maior volume real:** as buscas por sintoma, tipo `direção pesada o que pode ser`, `barulho ao virar o volante`, `carro puxando para um lado`

Uma página, uma intenção. Nunca duas páginas mirando o mesmo termo, isso é canibalização e as duas caem.

Onde a palavra-chave da página aparece, sem exceção e sem repetição forçada:

- `<title>`, o mais à esquerda possível
- `<h1>`, uma vez
- primeiro parágrafo, nas duas primeiras frases
- `alt` de uma imagem, se fizer sentido de verdade
- slug da URL
- um H2, na forma de pergunta

Densidade não é métrica. Escreva para pessoa, cite o termo onde ele cabe naturalmente.

## 5.2 Title e meta description

Padrão: `Metadata` do Next em cada `page.tsx`. Nunca duas páginas com o mesmo title.

Regras: title entre 50 e 60 caracteres, description entre 140 e 160. Description não é ranking, é taxa de clique, então ela precisa vender o clique e conter o telefone ou a cidade.

Modelo por tipo de página:

| Página | Title | Description |
|---|---|---|
| Home | `Central Direções: Direção Hidráulica em Santa Luzia MG` | `Especialista em direção hidráulica e mecânica em São Benedito, Santa Luzia. Caixa de direção remanufaturada, alinhamento e suspensão. Orçamento no WhatsApp.` |
| Serviço | `Conserto de Direção Hidráulica em Santa Luzia | Central Direções` | `Volante pesado, barulho ao virar ou vazamento? Reparamos bomba e caixa de direção com peça remanufaturada. Rua Olegário Maciel, 541. (31) 3637-0491.` |
| Sintoma | `Direção Pesada: o que pode ser e como resolver` | `Volante pesado costuma ser bomba, fluido ou caixa de direção. Veja como identificar e onde consertar em Santa Luzia e região de BH.` |
| Contato | `Contato e Endereço | Central Direções Santa Luzia` | `Rua Olegário Maciel, 541, São Benedito, Santa Luzia MG. Seg a sex, 8h às 18h. (31) 3637-0491 e WhatsApp (31) 98988-3036.` |

Base em `app/layout.tsx`:

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://SEU-DOMINIO.com.br'),
  title: { default: '...', template: '%s | Central Direções' },
  description: '...',
  alternates: { canonical: '/' },
  openGraph: { type: 'website', locale: 'pt_BR', siteName: 'Central Direções', images: ['/og/home.png'] },
  robots: { index: true, follow: true },
}
```

Cada página filha define `title`, `description` e `alternates.canonical` próprios. Canonical absoluto e autorreferente em todas.

## 5.3 Open Graph

Uma imagem OG por tipo de página, 1200x630. Gere com `next/og` ou exporte estático. Fundo preto, logo, título da página em Barlow Condensed caixa alta, faixa amarela na base. Sem imagem OG o link compartilhado no WhatsApp fica sem cara de nada, e WhatsApp é o canal principal aqui.

## 5.4 robots.txt

Gerado por `app/robots.ts`, não escrito à mão. Rascunho em `templates/robots.txt`.

```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://SEU-DOMINIO.com.br/sitemap.xml',
    host: 'https://SEU-DOMINIO.com.br',
  }
}
```

Site pequeno e institucional não tem o que bloquear. Não bloqueie CSS nem JS, isso quebra a renderização pelo Google. Não use `noindex` em nada que deva aparecer.

## 5.5 sitemap.xml

Gerado por `app/sitemap.ts`, lendo as listas de `src/content`. Assim ninguém esquece de adicionar uma página nova.

```ts
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://SEU-DOMINIO.com.br'
  const estaticas = ['', '/servicos', '/sintomas', '/sobre', '/duvidas', '/contato', '/orcamento']
  return [
    ...estaticas.map((r) => ({ url: `${base}${r}`, lastModified: new Date(), priority: r === '' ? 1 : 0.8 })),
    ...SERVICOS.map((s) => ({ url: `${base}/servicos/${s.slug}`, lastModified: new Date(), priority: 0.9 })),
    ...SINTOMAS.map((s) => ({ url: `${base}/sintomas/${s.slug}`, lastModified: new Date(), priority: 0.6 })),
  ]
}
```

Só URL canônica, só status 200, sem redirecionamento e sem página bloqueada. `changefreq` é ignorado pelo Google, pode omitir.

## 5.6 llms.txt

O cliente pediu, então vai ter. Com expectativa honesta registrada aqui: **o Google declarou que não usa llms.txt** e não existe evidência de que ele funcione como alavanca de citação em busca com IA. O que ele faz de útil é dar um índice limpo do site para agentes e crawlers que optaram por lê-lo. Custa quase nada e não prejudica, então entra. O que traz resultado real em busca com IA é a seção 5.8.

Arquivo em `public/llms.txt`, rascunho em `templates/llms.txt`. Formato: H1 com o nome, blockquote com o resumo, seções em H2 com links em markdown e uma frase por link.

## 5.7 Dados estruturados JSON-LD

O que mais move o ponteiro em SEO local. Gerar em `src/lib/schema.ts`, injetar com `<script type="application/ld+json">`.

**Global, no layout:** `AutoRepair`, que é subtipo de `LocalBusiness` e o tipo correto para oficina.

```json
{
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": "https://SEU-DOMINIO.com.br/#oficina",
  "name": "Central Direções",
  "image": "https://SEU-DOMINIO.com.br/fotos/fachada.jpg",
  "logo": "https://SEU-DOMINIO.com.br/logo-central-direcoes.png",
  "url": "https://SEU-DOMINIO.com.br",
  "telephone": "+553136370491",
  "email": "centraldirecoes1@gmail.com",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua Olegário Maciel, 541",
    "addressLocality": "Santa Luzia",
    "addressRegion": "MG",
    "postalCode": "33125-010",
    "addressCountry": "BR"
  },
  "geo": { "@type": "GeoCoordinates", "latitude": -19.794761, "longitude": -43.941558 },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
    "opens": "08:00", "closes": "18:00"
  }],
  "areaServed": [
    { "@type": "City", "name": "Santa Luzia" },
    { "@type": "City", "name": "Belo Horizonte" },
    { "@type": "City", "name": "Ribeirão das Neves" }
  ],
  "sameAs": [
    "https://www.instagram.com/centraldirecoes1",
    "https://x.com/centraldirecoe",
    "https://www.youtube.com/@CentralDireesPeasRemanufatu",
    "https://www.tiktok.com/@user5736036161810langp"
  ],
  "hasMap": "URL do perfil no Google Maps",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Serviços",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Reparo de direção hidráulica" } }
    ]
  }
}
```

Também no layout: `WebSite` com `@id` e `publisher` apontando para a oficina.

**Por página:**

- Página de serviço: `Service` com `provider` referenciando `#oficina` por `@id`, `areaServed` e `serviceType`
- Toda página interna: `BreadcrumbList`
- Página sobre: `Person` para cada pessoa da equipe, com nome, cargo e foto. Isso é sinal de E-E-A-T e depende de autorização
- Página de dúvidas: `QAPage` só se for pergunta e resposta genuína
- Vídeo do YouTube incorporado: `VideoObject`

**Cuidado com dois pontos:**

1. `aggregateRating` só pode ser marcado sobre avaliação exibida na própria página, e o Google desencoraja nota autodeclarada. A nota 4,3 e as 215 avaliações podem e devem aparecer como texto com link para o Google, sem virar `aggregateRating` no schema.
2. `FAQPage` perdeu o rich result em maio de 2026. Pode manter a semântica, mas não prometa estrela nem acordeão no resultado de busca para o cliente. `HowTo` está descontinuado, não use.

Validação obrigatória antes da entrega: Rich Results Test e Schema Markup Validator, os dois. Ou `/seo schema <url>` se o plugin estiver instalado.

## 5.8 Busca com IA, o que realmente funciona

AI Overviews e AI Mode se apoiam no mesmo sistema de ranqueamento da busca normal. Não existe otimização paralela, existe SEO bem feito mais estas quatro coisas:

1. **Bloco de resposta autocontido.** Em cada página, um trecho de 130 a 170 palavras que responde a pergunta central sem depender do resto da página. É o formato que tem chance de ser citado.
2. **H2 em forma de pergunta.** "Quanto custa consertar direção hidráulica?" ranqueia e é citável. "Nossos serviços" não é.
3. **Entidade consistente.** Mesmo nome, mesmo endereço, mesmo telefone no site, no Google, no Instagram e em todo diretório. É isso que amarra a identidade da empresa nos sistemas de busca.
4. **Dado verificável.** Endereço, horário, telefone, área atendida e preço em texto, não dentro de imagem.

Três mitos que não valem investimento: llms.txt como alavanca de citação, fatiar conteúdo em blocos para IA, e reescrever texto com palavra-chave específica para IA. Sinônimo já é entendido.

## 5.9 Velocidade

Métricas e limites em `docs/03-arquitetura.md`, seção 3.6. Execução:

- Página estática, sem chamada de dado em runtime
- `next/font` com `display: swap`, sem link para fonts.googleapis.com no head
- `next/image` com `sizes` correto, AVIF e WebP, `priority` só na imagem do hero
- Nenhum script de terceiro na versão 1
- Mapa do Google carregado sob clique, nunca no primeiro paint
- Vídeo do YouTube com thumbnail e carregamento sob clique, ou o Youtube Video Ambient do Unlumen configurado para não carregar o player de imediato
- `width` e `height` em toda imagem, para o CLS ficar em zero
- Sem animação que mexa em layout depois do carregamento

Medição depois do deploy: PageSpeed Insights em mobile primeiro, porque é onde o cliente real está. Alvo: 90 ou mais em Performance no mobile. Dado de campo real só aparece no CrUX depois de algumas semanas de tráfego.

## 5.10 Google Search Console

Passo a passo para a entrega. Precisa ser feito na conta Google do cliente, não na sua, e isso é ponto de venda: o cliente fica dono do ativo.

1. Registre o domínio e faça o deploy na Vercel com o domínio próprio e HTTPS
2. Em search.google.com/search-console, adicione a propriedade. Prefira **prefixo de domínio** com a URL exata, `https://dominio.com.br`
3. Verificação: meta tag no `<head>` pelo campo `verification.google` do `metadata` do Next, ou registro TXT no DNS. O TXT no DNS é mais durável
4. Envie `https://dominio.com.br/sitemap.xml` em Sitemaps
5. Use Inspeção de URL na home e peça indexação. Repita nas 3 páginas mais importantes. Não peça indexação em massa
6. Configure a propriedade também no Bing Webmaster Tools, dá para importar direto do Search Console e é dois minutos de trabalho
7. Uma semana depois, confira Cobertura, Experiência na página e Core Web Vitals, e corrija o que aparecer
8. Vincule o perfil do Google Business Profile ao site, ver `docs/06-seo-local-marketing.md`

Prazo realista para dizer ao cliente: indexação em dias, movimento de posição em 4 a 12 semanas. Prometer primeiro lugar em uma semana é o jeito mais rápido de perder o cliente no segundo mês.
