export const DUVIDAS = [
  {
    slug: "quanto-custa-consertar-direcao-hidraulica",
    pergunta: "Quanto custa consertar a direção hidráulica?",
    resposta:
      "O preço depende do componente com problema (bomba, caixa, mangueira ou reservatório) e do modelo do carro. A gente testa o sistema e mostra o que encontrou antes de falar em valor. Manda uma mensagem no WhatsApp contando o que o carro está fazendo pra receber o orçamento.",
    servicoRelacionado: "direcao-hidraulica",
  },
  {
    slug: "quanto-custa-trocar-caixa-de-direcao",
    pergunta: "Quanto custa trocar a caixa de direção?",
    resposta:
      "Varia com o modelo do carro e com o estado da caixa atual. A remanufatura feita aqui dentro costuma sair mais barata que uma caixa nova, porque reaproveita a carcaça e troca só o que está desgastado. O valor exato depende da inspeção.",
    servicoRelacionado: "caixa-de-direcao-remanufaturada",
  },
  {
    slug: "peca-remanufaturada-e-confiavel",
    pergunta: "Peça remanufaturada é confiável?",
    resposta:
      "A caixa passa por desmontagem completa, troca de retentor, vedação e do que estiver gasto, e teste de pressão em bancada antes de voltar pro carro. Não é peça usada revendida sem mexer, é peça recuperada e testada.",
    servicoRelacionado: "caixa-de-direcao-remanufaturada",
  },
  {
    slug: "vale-a-pena-reparar-ou-trocar-caixa-de-direcao",
    pergunta: "Vale a pena reparar ou trocar a caixa de direção?",
    resposta:
      "Depende do que a inspeção encontra. Quando dá pra recuperar, a remanufatura sai mais barata que uma caixa nova e resolve o mesmo problema. Quando o desgaste é grande demais pra reparo, a gente fala isso antes de mexer.",
    servicoRelacionado: "caixa-de-direcao-remanufaturada",
  },
  {
    slug: "qual-diferenca-entre-alinhamento-e-balanceamento",
    pergunta: "Qual a diferença entre alinhamento e balanceamento?",
    resposta:
      "Alinhamento ajusta o ângulo das rodas, cambagem, cáster e convergência, pra elas apontarem do jeito certo. Balanceamento corrige o peso da roda com o pneu montado, pra não vibrar em velocidade. São coisas diferentes, e às vezes o carro precisa dos dois ao mesmo tempo.",
    servicoRelacionado: "alinhamento-e-balanceamento",
  },
  {
    slug: "de-quanto-em-quanto-tempo-alinhar",
    pergunta: "De quanto em quanto tempo alinhar o carro?",
    resposta:
      "Como referência geral, vale revisar o alinhamento a cada troca de pneu ou depois de bater em buraco forte, subir em guia ou trocar peça de suspensão. Se o carro está puxando pra um lado ou o pneu está gastando torto, vale checar antes desse prazo.",
    servicoRelacionado: "alinhamento-e-balanceamento",
  },
  {
    slug: "direcao-eletrica-e-melhor-que-hidraulica",
    pergunta: "Direção elétrica é melhor que hidráulica?",
    resposta:
      "São sistemas diferentes, não um upgrade do outro. A direção elétrica usa motor e sensor no lugar de bomba e fluido, e falha de outro jeito. Aqui a oficina trabalha com direção hidráulica e mecânica, os sistemas mais comuns nos carros populares que atendemos.",
    servicoRelacionado: "direcao-hidraulica",
  },
  {
    slug: "precisa-alinhar-depois-de-mexer-na-direcao",
    pergunta: "Precisa alinhar depois de mexer na direção?",
    resposta:
      "Sim. Qualquer reparo em caixa, terminal, barra ou pivô muda a geometria da direção, então o alinhamento entra sempre depois desse tipo de serviço, não é opcional.",
    servicoRelacionado: "direcao-mecanica",
  },
  {
    slug: "quando-trocar-o-amortecedor",
    pergunta: "Quando trocar o amortecedor?",
    resposta:
      "Quando o carro continua balançando depois de passar por um buraco, quando range ou faz barulho seco na suspensão, ou quando o pneu está com desgaste irregular em manchas. Amortecedor gasto também aumenta a distância de frenagem, não é só questão de conforto.",
    servicoRelacionado: "suspensao",
  },
  {
    slug: "como-agendar-um-horario",
    pergunta: "Como agendar um horário?",
    resposta:
      "Não precisa de agendamento pra passar na oficina dentro do horário de funcionamento, mas se quiser garantir horário certo, principalmente pra revisão antes de viagem, dá pra combinar pelo WhatsApp antes.",
    servicoRelacionado: "revisao-preventiva",
  },
  {
    slug: "atende-carro-de-aplicativo-ou-frota",
    pergunta: "Vocês atendem carro de aplicativo ou frota?",
    resposta:
      "Sim. Carro de aplicativo e de frota passam pela mesma inspeção e o mesmo cuidado com prazo, porque carro parado é prejuízo pra quem trabalha com ele.",
    servicoRelacionado: "revisao-preventiva",
  },
] as const;

export type Duvida = (typeof DUVIDAS)[number];
