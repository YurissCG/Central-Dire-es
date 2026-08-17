import type { Metadata } from "next";
import { NEGOCIO } from "@/content/negocio";
import { schemaBreadcrumb } from "@/lib/schema";
import { FormularioOrcamento } from "@/components/formularios/FormularioOrcamento";

export const metadata: Metadata = {
  title: "Peça seu Orçamento",
  description:
    "Descreva o problema do seu carro e receba o orçamento pelo WhatsApp. Direção hidráulica, mecânica, suspensão, alinhamento e freios em Santa Luzia.",
  alternates: { canonical: "/orcamento" },
};

export default function PaginaOrcamento() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            schemaBreadcrumb([
              { nome: "Início", url: NEGOCIO.dominio },
              { nome: "Orçamento", url: `${NEGOCIO.dominio}/orcamento` },
            ]),
          ),
        }}
      />

      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 md:py-24">
        <h1 className="font-display text-display uppercase leading-[0.95] tracking-[-0.02em] text-branco">
          Orçamento
        </h1>
        <p className="mt-4 max-w-[68ch] text-corpo-lg leading-[1.65] text-aco">
          Conta o que está acontecendo com o carro. A gente lê e responde pelo WhatsApp.
        </p>

        <FormularioOrcamento />
      </div>
    </>
  );
}
