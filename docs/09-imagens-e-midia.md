# 09. Imagens e mídia

## 9.1 Estratégia em duas camadas

O cliente ainda não entregou o banco de fotos oficial. O site não pode ficar feio nem vazio esperando por isso, então trabalhamos em duas camadas:

**Camada 1, agora: banco de imagens público e gratuito.** O site fica bonito, apresentável e vendável hoje. É com essa versão que a proposta vai ao cliente.

**Camada 2, na entrega: fotos oficiais da oficina.** Combinar com o cliente a sessão de fotos ou a coleta do material que ele já tem. Foto real da oficina converte mais e vale mais para SEO local que qualquer foto de banco.

Toda imagem da camada 1 é temporária por definição. Nomeie e organize para que a troca seja mecânica, não uma caça ao tesouro.

## 9.2 De onde pegar, e a licença de cada um

| Banco | Licença | Atribuição | Uso comercial |
|---|---|---|---|
| **Unsplash** (unsplash.com) | Unsplash License | não obrigatória, mas é elegante creditar | sim |
| **Pexels** (pexels.com) | Pexels License | não obrigatória | sim |
| **Pixabay** (pixabay.com) | Pixabay Content License | não obrigatória | sim |
| **Openverse** (openverse.org) | agregador, varia por item | **depende, confira item por item** | depende |

Regras:

- Prefira Unsplash e Pexels. Licença clara e acervo melhor para tema automotivo
- **Nunca** puxe imagem de resultado do Google Imagens, de blog, de site de concorrente ou de fabricante. É violação de direito autoral e cai no colo do cliente depois
- Nada de logo de montadora, escudo de marca ou peça com marca visível de terceiro. Imagem com marca de outro dentro pode virar problema de uso de marca
- Baixe o arquivo e sirva de `public/`. Não faça hotlink para o CDN do banco, porque a URL pode sair do ar e o LCP fica na mão de terceiro
- Registre a origem de cada arquivo, ver seção 9.6

## 9.3 O que pode e o que não pode ser imagem de banco

Esta é a parte que separa site bem feito de site enganoso.

**Pode, sem problema:**

- Textura e fundo: chapa de metal, ferramenta em bancada, macro de rosca e engrenagem, piso de oficina
- Peça e componente: caixa de direção, bomba hidráulica, amortecedor, disco de freio, pneu, volante
- Detalhe de mão trabalhando, sem rosto reconhecível
- Carro genérico, de longe, em elevador ou em rua
- Imagem de apoio nas páginas de sintoma, ilustrando o componente citado

**Não pode, em nenhuma hipótese:**

- **Foto de banco passando por foto da equipe.** Mecânico sorridente de banco de imagens na seção "nossa equipe" é fraude leve, o visitante identifica, e destrói exatamente a confiança que o site foi feito para construir
- **Foto de banco passando por foto da oficina.** Nada de fachada, recepção ou galpão genérico apresentado como sendo o lugar
- Foto de banco ao lado do nome de um cliente em depoimento
- Foto de banco no perfil do Google Business Profile. Ali só entra foto real, e foto falsa pode gerar denúncia

Consequência prática: as seções `/sobre` e `Prova social` ficam **sem foto** até o cliente entregar as fotos oficiais. Melhor um bloco tipográfico bem resolvido do que uma mentira visual. Use o espaço com o logo, os números reais de avaliação e a etiqueta de dados. Fica bom e é honesto.

## 9.4 Termos de busca que funcionam

Em inglês rende muito mais resultado nesses bancos.

| Onde | Buscar por |
|---|---|
| Hero | `car steering rack`, `power steering pump`, `dark auto workshop`, `mechanic hands wrench dark` |
| Direção hidráulica | `power steering pump`, `hydraulic hose car`, `steering rack repair` |
| Caixa remanufaturada | `rebuilt car part`, `disassembled steering rack`, `machined metal part` |
| Suspensão | `car suspension coil spring`, `shock absorber` |
| Alinhamento | `wheel alignment machine`, `tire tread close up` |
| Freios | `brake disc rotor`, `brake pad` |
| Sintoma de vibração | `steering wheel close up`, `car dashboard warning light` |
| Textura de fundo | `brushed steel texture dark`, `metal plate industrial` |

Critério de escolha, nesta ordem: imagem escura ou com espaço escuro para o texto branco cair em cima; sem gente de rosto visível; sem legenda ou marca dentro da foto; enquadramento que sobreviva ao recorte em 16:9 e em 1:1.

## 9.5 Tratamento para casar com a identidade

Foto de banco crua não combina com a paleta e denuncia colagem. Aplique o mesmo tratamento em todas, para o site parecer de um só lugar:

```css
/* imagem de apoio */
filter: saturate(0.75) contrast(1.08) brightness(0.85);
```

Mais: sobreposição de preto de 45% a 70% quando houver texto em cima; um único ponto de vermelho na composição quando possível; sem borda arredondada além de 2px; sem moldura branca.

Alternativa que funciona melhor ainda em algumas seções: **duotone preto e vermelho**, com `mix-blend-mode: multiply` sobre uma camada da cor da marca. Padroniza qualquer foto vinda de qualquer banco e faz a colagem desaparecer.

## 9.6 Organização dos arquivos

```
public/
├── fotos/
│   ├── oficiais/                 # camada 2, foto real do cliente
│   └── temporarias/              # camada 1, banco público, tudo aqui é para sair
│       ├── hero-direcao.jpg
│       ├── servico-hidraulica.jpg
│       └── CREDITOS.md           # obrigatório
└── og/
```

`public/fotos/temporarias/CREDITOS.md` registra cada arquivo, uma linha por imagem:

```
hero-direcao.jpg | Unsplash | autor: Nome do Autor | https://unsplash.com/photos/XXXX | baixado em 2026-08-17
```

Sem esse registro não dá para provar a licença depois, nem para creditar quando o cliente pedir.

## 9.7 Formato e otimização

- Sirva por `next/image`, sempre. AVIF e WebP saem automáticos
- Original com largura máxima de 2000px. Foto de 6000px em `public/` é peso morto no repositório
- Hero: 1920x1080 no máximo, com `priority`
- Imagem de apoio: 1200px de largura, `loading="lazy"`, que é o padrão
- `width` e `height` sempre declarados, para CLS zero
- `alt` descritivo e específico, em português: `Caixa de direção hidráulica desmontada sobre a bancada`. Não `imagem de carro`. Não repita palavra-chave dentro do alt
- Foto decorativa de textura: `alt=""` e `aria-hidden`, porque leitor de tela não precisa dela

## 9.8 O que combinar com o cliente, a lista de fotos oficiais

Entregar esta lista impressa ou por WhatsApp. Se ele tiver celular razoável e a oficina tiver luz decente, ele mesmo tira em 30 minutos. Instrução: modo retrato desligado, na horizontal, luz do dia, sem filtro.

- [ ] Fachada com o logo visível, de frente e na diagonal
- [ ] Recepção, o balcão de atendimento
- [ ] Vista geral do galpão com o elevador
- [ ] Setor de direção hidráulica em funcionamento
- [ ] Caixa de direção desmontada na bancada, antes e depois da remanufatura
- [ ] Peça remanufaturada pronta, limpa, sobre a bancada
- [ ] Equipamento de alinhamento em uso
- [ ] Mecânico trabalhando, foco nas mãos e na peça
- [ ] Foto da equipe, em grupo, na frente do galpão, com autorização de uso de imagem
- [ ] Retrato individual de quem vai aparecer na página `/sobre`, com nome e função
- [ ] 3 a 5 fotos de carro atendido, sem placa legível ou com a placa desfocada

Sobre placa e rosto: desfoque placa de cliente e não publique rosto de terceiro sem autorização. É LGPD e é bom senso.

## 9.9 Vídeo

O canal do YouTube já tem material. Incorporar um vídeo curto na home ou na página de direção hidráulica aumenta tempo na página e permite `VideoObject` no schema. Duas regras: carregamento sob clique, nunca no primeiro paint, e a transcrição em texto na página, porque é o texto que indexa.

## 9.10 Tarefa de troca da camada 1 para a camada 2

Quando as fotos oficiais chegarem:

1. Colocar em `public/fotos/oficiais/` com nome descritivo
2. Trocar os caminhos, que estão todos concentrados em `src/content/`, não espalhados nos componentes. Por isso todo caminho de imagem deve estar centralizado desde o começo
3. Reescrever cada `alt` para descrever a foto real
4. Apagar `public/fotos/temporarias/` inteira
5. Regenerar as imagens de Open Graph com foto real
6. Subir as mesmas fotos no Google Business Profile
7. Rodar o build e conferir peso e LCP outra vez

O passo 2 só é rápido se a centralização foi feita desde o início. Não espalhe `src="/fotos/..."` pelos componentes.
