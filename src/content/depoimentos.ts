export interface Depoimento {
  autor: string;
  nota: number;
  texto: string;
}

// Pendente: nao existe fonte de depoimentos reais do Google em dados/.
// Nao inventar, ver docs/01-briefing.md secao 1.8. Assim que o cliente aprovar
// 3 avaliacoes reais para citacao, preencher este array. A secao ProvaSocial
// ja renderiza os cards automaticamente quando houver itens aqui.
export const DEPOIMENTOS: Depoimento[] = [];
