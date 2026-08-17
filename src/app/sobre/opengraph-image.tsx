import { gerarImagemOg, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Sobre - Central Direções";

export default function ImagemOg() {
  return gerarImagemOg("Sobre a Central Direções");
}
