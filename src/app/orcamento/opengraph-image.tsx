import { gerarImagemOg, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Orçamento - Central Direções";

export default function ImagemOg() {
  return gerarImagemOg("Peça Seu Orçamento", "Central Direções");
}
