import { SINTOMAS } from "@/content/sintomas";
import { gerarImagemOg, ogContentType, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Central Direções";

export function generateStaticParams() {
  return SINTOMAS.map((sintoma) => ({ slug: sintoma.slug }));
}

interface ImagemOgProps {
  params: Promise<{ slug: string }>;
}

export default async function ImagemOg({ params }: ImagemOgProps) {
  const { slug } = await params;
  const sintoma = SINTOMAS.find((item) => item.slug === slug);
  return gerarImagemOg(sintoma?.pergunta ?? "Sintomas", "Central Direções");
}
