import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { SERVICOS } from "@/content/servicos";
import { SINTOMAS } from "@/content/sintomas";
import { NEGOCIO } from "@/content/negocio";
import { IMAGENS } from "@/content/imagens";
import { EntradaAoRolar } from "@/components/motion/EntradaAoRolar";
import { Button } from "@/components/ui/button";
import { linkWhatsApp } from "@/lib/whatsapp";
import { schemaBreadcrumb, schemaServico } from "@/lib/schema";
import { cn } from "@/lib/utils";

const ALT_SERVICOS: Record<string, string> = {
  "direcao-hidraulica": "Motor desmontado com mangueiras e componentes do sistema hidráulico à mostra",
  "caixa-de-direcao-remanufaturada": "Engrenagens e peças mecânicas desmontadas, prontas para inspeção",
  "direcao-mecanica": "Engrenagens de precisão de um mecanismo de direção",
  suspensao: "Mola de suspensão de carro em close-up",
  "alinhamento-e-balanceamento": "Desenho da banda de rodagem de um pneu em close-up",
  freios: "Pinça e disco de freio em detalhe",
  "revisao-preventiva": "Painel do carro com luz de aviso acesa",
};

const FOCO =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amarelo";

interface PaginaProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICOS.map((servico) => ({ slug: servico.slug }));
}

export async function generateMetadata({ params }: PaginaProps): Promise<Metadata> {
  const { slug } = await params;
  const servico = SERVICOS.find((item) => item.slug === slug);
  if (!servico) return {};

  return {
    title: servico.titulo,
    description: `${servico.resumo} Fale no WhatsApp: ${NEGOCIO.contato.telefonePrincipalFormatado}.`,
    alternates: { canonical: `/servicos/${servico.slug}` },
  };
}

export default async function PaginaServico({ params }: PaginaProps) {
  const { slug } = await params;
  const servico = SERVICOS.find((item) => item.slug === slug);
  if (!servico) notFound();

  const sintomasRelacionados = (servico.sintomasRelacionados as readonly string[]) ?? [];
  const sintomas = SINTOMAS.filter((sintoma) => sintomasRelacionados.includes(sintoma.slug));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaServico(servico)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            schemaBreadcrumb([
              { nome: "Início", url: NEGOCIO.dominio },
              { nome: "Serviços", url: `${NEGOCIO.dominio}/servicos` },
              { nome: servico.nome, url: `${NEGOCIO.dominio}/servicos/${servico.slug}` },
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
          <Link href="/servicos" className={cn("hover:text-branco", FOCO)}>
            Serviços
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-branco">{servico.nome}</span>
        </nav>

        <h1 className="mt-4 font-display text-display uppercase leading-[0.95] tracking-[-0.02em] text-branco">
          {servico.titulo}
        </h1>

        <p className="mt-6 max-w-[68ch] text-corpo-lg leading-[1.65] text-aco">{servico.respostaDireta}</p>

        <div className="superficie relative mt-8 aspect-[16/9] w-full max-w-[720px] overflow-hidden">
          <Image
            src={IMAGENS.servicos[servico.slug]}
            alt={ALT_SERVICOS[servico.slug]}
            fill
            loading="lazy"
            sizes="(min-width: 768px) 720px, 100vw"
            className="object-cover"
            style={{ filter: "saturate(0.75) contrast(1.08) brightness(0.85)" }}
          />
        </div>

        {sintomas.length > 0 && (
          <EntradaAoRolar atraso={0}>
            <section className="mt-12">
              <h2 className="font-display text-h3 uppercase text-branco">Como saber se o seu carro precisa</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {sintomas.map((sintoma) => (
                  <li key={sintoma.slug}>
                    <Link
                      href={`/sintomas/${sintoma.slug}`}
                      className={cn(
                        "superficie block w-fit px-4 py-3 text-corpo text-aco transition-colors hover:border-amarelo hover:text-branco",
                        FOCO,
                      )}
                    >
                      {sintoma.rotulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </EntradaAoRolar>
        )}

        <EntradaAoRolar atraso={0.05}>
          <section className="mt-12">
            <h2 className="font-display text-h3 uppercase text-branco">Como a gente faz</h2>
            <ol className="mt-4 flex flex-col gap-3">
              {servico.processo.map((passo, indice) => (
                <li key={passo} className="flex gap-3">
                  <span
                    className="etiqueta shrink-0 text-amarelo"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                    aria-hidden="true"
                  >
                    {String(indice + 1).padStart(2, "0")}
                  </span>
                  <span className="text-corpo leading-[1.65] text-aco">{passo}</span>
                </li>
              ))}
            </ol>
          </section>
        </EntradaAoRolar>

        <EntradaAoRolar atraso={0.1}>
          <section className="mt-12">
            <h2 className="font-display text-h3 uppercase text-branco">
              Quanto custa {servico.nome.toLowerCase()}?
            </h2>
            <p className="mt-4 max-w-[68ch] text-corpo leading-[1.65] text-aco">
              O preço depende do que a inspeção encontra, da peça que precisa de reparo ou troca e do
              modelo do carro. A gente testa antes de falar em valor e manda o orçamento pelo WhatsApp,
              sem compromisso.
            </p>
          </section>
        </EntradaAoRolar>

        <EntradaAoRolar atraso={0.15}>
          <section className="mt-12">
            <h2 className="font-display text-h3 uppercase text-branco">Perguntas frequentes</h2>
            <div className="mt-4 flex flex-col gap-6">
              {servico.perguntas.map((item) => (
                <div key={item.pergunta}>
                  <h3 className="text-corpo-lg font-medium text-branco">{item.pergunta}</h3>
                  <p className="mt-1 text-corpo leading-[1.65] text-aco">{item.resposta}</p>
                </div>
              ))}
            </div>
          </section>
        </EntradaAoRolar>

        <div className="mt-12">
          <Button size="lg" asChild>
            <a
              href={linkWhatsApp(
                `servico-${servico.slug}`,
                `Quero saber mais sobre ${servico.nome.toLowerCase()}.`,
              )}
            >
              <MessageCircle aria-hidden="true" />
              Falar no WhatsApp
            </a>
          </Button>
        </div>
      </article>
    </>
  );
}
