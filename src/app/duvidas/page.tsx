import type { Metadata } from "next";
import { DUVIDAS } from "@/content/duvidas";
import { NEGOCIO } from "@/content/negocio";
import { schemaBreadcrumb, schemaFaq } from "@/lib/schema";
import { MotionAccordion } from "@/components/unlumen-ui/motion-faqs-accordion";

export const metadata: Metadata = {
  title: "Dúvidas Frequentes Sobre Direção e Suspensão",
  description:
    "Preço, prazo, peça remanufaturada, alinhamento e mais. Perguntas que a gente mais escuta na oficina, respondidas direto.",
  alternates: { canonical: "/duvidas" },
};

export default function PaginaDuvidas() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            schemaBreadcrumb([
              { nome: "Início", url: NEGOCIO.dominio },
              { nome: "Dúvidas", url: `${NEGOCIO.dominio}/duvidas` },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq(DUVIDAS)) }}
      />

      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 md:py-24">
        <h1 className="font-display text-display uppercase leading-[0.95] tracking-[-0.02em] text-branco">
          Dúvidas
        </h1>
        <p className="mt-4 max-w-[68ch] text-corpo-lg leading-[1.65] text-aco">
          As perguntas que mais chegam pra oficina, respondidas direto.
        </p>

        <h2 className="mt-10 font-display text-h3 uppercase text-branco">Perguntas frequentes</h2>
        <MotionAccordion
          items={DUVIDAS.map((item) => ({ question: item.pergunta, answer: item.resposta }))}
          className="mt-4 max-w-[68ch]"
        />
      </div>
    </>
  );
}
