import { NEGOCIO } from "@/content/negocio";

export function linkWhatsApp(origem: string, extras?: string): string {
  const texto = `[site: ${origem}] Oi! Vi o site da Central Direções.${extras ? " " + extras : ""}`;
  return `https://wa.me/${NEGOCIO.contato.whatsapp}?text=${encodeURIComponent(texto)}`;
}

export function linkLigar(): string {
  return `tel:${NEGOCIO.contato.telefonePrincipal}`;
}
