export interface MembroEquipe {
  nome: string;
  funcao: string;
  foto: string;
}

// Pendente: aguardando fotos e nomes reais da equipe, com autorizacao de imagem.
// Ver docs/01-briefing.md secao 1.8. Nao simular com banco de imagens, doc 09.3.
// A secao Sobre ja renderiza os cards automaticamente quando houver itens aqui.
export const EQUIPE: MembroEquipe[] = [];
