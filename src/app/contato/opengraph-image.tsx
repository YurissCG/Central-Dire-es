import { gerarImagemOg, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Contato - Central Direções";

export default function ImagemOg() {
  return gerarImagemOg("Contato", "Central Direções");
}
