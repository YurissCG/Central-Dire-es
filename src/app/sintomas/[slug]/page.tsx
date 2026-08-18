import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, MessageCircle } from "lucide-react";
import { SINTOMAS } from "@/content/sintomas";
import { SERVICOS } from "@/content/servicos";
import { NEGOCIO } from "@/content/negocio";
import { Button } from "@/components/ui/button";
import { EntradaAoRolar } from "@/components/motion/EntradaAoRolar";
import { linkWhatsApp } from "@/lib/whatsapp";
import { schemaBreadcrumb } from "@/lib/schema";
import { cn } from "@/lib/utils";

const FOCO =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amarelo";

interface PaginaProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SINTOMAS.map((sintoma) => ({ slug: sintoma.slug }));
}

export async function generateMetadata({ params }: PaginaProps): Promise<Metadata> {
  const { slug } = await params;
  const sintoma = SINTOMAS.find((item) => item.slug === slug);
  if (!sintoma) return {};

  return {
    title: sintoma.pergunta,
    description: `${sintoma.explicacao} Central Direções, ${NEGOCIO.endereco.cidade}, MG.`.slice(0, 160),
    alternates: { canonical: `/sintomas/${sintoma.slug}` },
  };
}

export default async function PaginaSintoma({ params }: PaginaProps) {
  const { slug } = await params;
  const sintoma = SINTOMAS.find((item) => item.slug === slug);
  if (!sintoma) notFound();

  const servico = SERVICOS.find((item) => item.slug === sintoma.servicoRelacionado);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            schemaBreadcrumb([
              { nome: "Início", url: NEGOCIO.dominio },
              { nome: "Sintomas", url: `${NEGOCIO.dominio}/sintomas` },
              { nome: sintoma.rotulo, url: `${NEGOCIO.dominio}/sintomas/${sintoma.slug}` },
            ]),
          ),
        }}
      />

      <article className="mx-auto w-full max-w-[1200px] px-5 py-16 md:py-24">
        <nav aria-label="Breadcrumb" className="etiqueta flex flex-wrap items-center gap-2 text-aco-fosco">
          <Link href="/" className={cn("hover:text-branco", FOCO)}>
            Início
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/sintomas" className={cn("hover:text-branco", FOCO)}>
            Sintomas
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-branco">{sintoma.rotulo}</span>
        </nav>

        <h1 className="mt-4 font-display text-display uppercase leading-[0.95] tracking-[-0.02em] text-branco">
          {sintoma.pergunta}
        </h1>

        <p className="mt-6 max-w-[68ch] text-corpo-lg leading-[1.65] text-aco">{sintoma.respostaDireta}</p>

        <EntradaAoRolar atraso={0}>
          <section className="mt-12">
            <h2 className="font-display text-h3 uppercase text-branco">Causas mais comuns</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {sintoma.causasComuns.map((causa) => (
                <li key={causa} className="flex gap-3 text-corpo leading-[1.65] text-aco">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-amarelo" aria-hidden="true" />
                  {causa}
                </li>
              ))}
            </ul>
          </section>
        </EntradaAoRolar>

        <EntradaAoRolar atraso={0.05}>
          <section className="mt-12">
            <h2 className="font-display text-h3 uppercase text-branco">O que fazer agora</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {sintoma.oQueFazerAgora.map((item) => (
                <li key={item} className="flex gap-3 text-corpo leading-[1.65] text-aco">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-amarelo" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </EntradaAoRolar>

        <EntradaAoRolar atraso={0.1}>
          <section className="mt-12 flex items-start gap-3 bg-amarelo p-4">
            <AlertTriangle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-preto-oficina" />
            <div>
              <h2 className="etiqueta text-preto-oficina">Quando é urgente</h2>
              <p className="mt-1 text-corpo font-medium text-preto-oficina">{sintoma.urgencia}</p>
            </div>
          </section>
        </EntradaAoRolar>

        {servico && (
          <EntradaAoRolar atraso={0.15}>
            <section className="mt-12">
              <h2 className="font-display text-h3 uppercase text-branco">Serviço relacionado</h2>
              <Link
                href={`/servicos/${servico.slug}`}
                className={cn(
                  "superficie mt-4 flex w-fit flex-col gap-1 px-5 py-4 transition-colors hover:border-amarelo",
                  FOCO,
                )}
              >
                <span className="text-corpo-lg text-branco">{servico.nome}</span>
                <span className="text-corpo text-aco">{servico.resumo}</span>
              </Link>
            </section>
          </EntradaAoRolar>
        )}

        <div className="mt-12">
          <Button size="lg" asChild>
            <a href={linkWhatsApp(`sintoma-${sintoma.slug}`, `Meu carro está com: ${sintoma.curto}. Queria fazer um orçamento.`)}>
              <MessageCircle aria-hidden="true" />
              Falar no WhatsApp
            </a>
          </Button>
        </div>
      </article>
    </>
  );
}
