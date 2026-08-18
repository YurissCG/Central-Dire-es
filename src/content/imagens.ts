import type { ServicoSlug } from "@/content/servicos";

// Caminhos de imagem centralizados aqui, nunca espalhados nos componentes.
// Troca da camada 1 (banco de imagens) pela camada 2 (fotos oficiais) e feita
// só neste arquivo, ver docs/09-imagens-e-midia.md secao 9.10.
export const IMAGENS = {
  hero: "/fotos/temporarias/hero-direcao.jpg",
  texturaMetal: "/fotos/temporarias/textura-metal.jpg",
  comoFunciona: "/fotos/temporarias/oficina-ambiente.jpg",
  servicos: {
    "direcao-hidraulica": "/fotos/temporarias/servico-direcao-hidraulica.jpg",
    "caixa-de-direcao-remanufaturada": "/fotos/temporarias/servico-caixa-de-direcao-remanufaturada.jpg",
    "direcao-mecanica": "/fotos/temporarias/servico-direcao-mecanica.jpg",
    suspensao: "/fotos/temporarias/servico-suspensao.jpg",
    "alinhamento-e-balanceamento": "/fotos/temporarias/servico-alinhamento-e-balanceamento.jpg",
    freios: "/fotos/temporarias/servico-freios.jpg",
    "revisao-preventiva": "/fotos/temporarias/servico-revisao-preventiva.jpg",
  } satisfies Record<ServicoSlug, string>,
} as const;
