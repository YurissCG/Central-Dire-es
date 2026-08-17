import { gerarImagemOg, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Dúvidas - Central Direções";

export default function ImagemOg() {
  return gerarImagemOg("Dúvidas Frequentes", "Central Direções");
}
