import { gerarImagemOg, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Sintomas - Central Direções";

export default function ImagemOg() {
  return gerarImagemOg("O Que Seu Carro Está Tentando Dizer", "Central Direções");
}
