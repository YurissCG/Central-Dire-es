import type { ServicoSlug } from "@/content/servicos";

// Caminhos de imagem centralizados aqui, nunca espalhados nos componentes.
// Troca da camada 1 (banco de imagens) pela camada 2 (fotos oficiais) e feita
// só neste arquivo, ver docs/09-imagens-e-midia.md secao 9.10.
export const IMAGENS = {
  hero: "/fotos/temporarias/hero-direcao.jpg",
  texturaMetal: "/fotos/temporarias/textura-metal.jpg",
  comoFunciona: "/fotos/temporarias/oficina-ambiente.jpg",
  // Banner e video ilustrados gerados por IA a pedido do cliente, recortados
  // do material original (assets-marca/img, fora do controle de versão). Elemento
  // decorativo de marca, nao substitui foto real da equipe (ver src/content/equipe.ts).
  bannerEquipe: "/marca/banner-equipe.jpg",
  videoEquipe: "/marca/equipe-video.mp4",
  videoEquipePoster: "/marca/equipe-video-poster.jpg",
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
