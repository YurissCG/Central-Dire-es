export const NEGOCIO = {
  nome: "Central Direções",
  nomeCompleto: "Central Direções, Peças Remanufaturadas Automotivas",
  descricaoCurta:
    "Oficina especialista em direção hidráulica e direção mecânica em São Benedito, Santa Luzia, MG.",
  // pendente: confirmar com o cliente, ver docs/01-briefing.md secao 1.8
  razaoSocial: null,
  cnpj: null,
  anoFundacao: null,
  dominio: "https://centraldirecoes.com.br",
  endereco: {
    logradouro: "Rua Olegário Maciel",
    numero: "541",
    bairro: "São Benedito",
    cidade: "Santa Luzia",
    uf: "MG",
    cep: "33125-010",
    pais: "BR",
    completo: "Rua Olegário Maciel, 541, São Benedito, Santa Luzia, MG, 33125-010",
    referencia: "Perto do Terminal São Benedito e a poucos minutos da Estação Vilarinho",
  },
  geo: {
    latitude: -19.794761,
    longitude: -43.941558,
  },
  contato: {
    telefonePrincipal: "+553136370491",
    telefonePrincipalFormatado: "(31) 3637-0491",
    telefoneSecundario: "+553136376477",
    telefoneSecundarioFormatado: "(31) 3637-6477",
    whatsapp: "5531989883036",
    whatsappFormatado: "(31) 98988-3036",
    email: "centraldirecoes1@gmail.com",
  },
  horario: {
    texto: "Segunda a sexta, 08:00 às 18:00",
    dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    abre: "08:00",
    fecha: "18:00",
    sabado: "Fechado",
    domingo: "Fechado",
    // pendente: confirmar se atende sabado sob agendamento
  },
  provaSocial: {
    notaGoogle: 4.3,
    totalAvaliacoesGoogle: 215,
    // fonte: perfil do Google, consultado em 2026-08-17. reconferir antes de publicar.
    // regra: exibir como texto com link para o Google. Nao marcar como aggregateRating no JSON-LD.
  },
  areaAtendida: [
    "Santa Luzia",
    "São Benedito",
    "Vilarinho",
    "Venda Nova",
    "Justinópolis",
    "Ribeirão das Neves",
    "Região norte de Belo Horizonte",
  ],
  redes: {
    // aviso: alguns links estao inconsistentes ou quebrados. manter no sameAs do schema.
    instagram: "https://www.instagram.com/centraldirecoes1",
    x: "https://x.com/centraldirecoe",
    youtube: "https://www.youtube.com/@CentralDireesPeasRemanufatu",
    tiktok: "https://www.tiktok.com/@user5736036161810langp",
  },
  pagamento: {
    pix: true,
    adquirente: "Stone",
    cartao: null,
    parcelamento: null,
  },
  garantia: {
    // pendente: confirmar prazo de garantia dos servicos de direcao antes de publicar qualquer promessa
    prazo: null,
  },
  promessas: {
    // cada item so entra no site apos aprovacao verbal do dono, ver docs/01-briefing.md secao 1.5
    orcamentoAntes: null,
    pecaVelhaDevolvida: null,
    orcamentoPorEscrito: null,
    soTrocaOquePrecisa: null,
  },
} as const;

export type Negocio = typeof NEGOCIO;
