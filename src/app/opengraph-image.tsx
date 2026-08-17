import { gerarImagemOg, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Central Direções";

export default function ImagemOg() {
  return gerarImagemOg("Direção Hidráulica em Santa Luzia, MG", "São Benedito, Santa Luzia");
}
