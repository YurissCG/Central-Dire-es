import { SERVICOS } from "@/content/servicos";
import { gerarImagemOg, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Central Direções";

export function generateStaticParams() {
  return SERVICOS.map((servico) => ({ slug: servico.slug }));
}

interface ImagemOgProps {
  params: Promise<{ slug: string }>;
}

export default async function ImagemOg({ params }: ImagemOgProps) {
  const { slug } = await params;
  const servico = SERVICOS.find((item) => item.slug === slug);
  return gerarImagemOg(servico?.nome ?? "Serviços", "Central Direções");
}
