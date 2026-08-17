import type { Metadata } from "next";
import Link from "next/link";
import { SERVICOS } from "@/content/servicos";
import { NEGOCIO } from "@/content/negocio";
import { schemaBreadcrumb } from "@/lib/schema";
import { cn } from "@/lib/utils";

const FOCO =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amarelo";

export const metadata: Metadata = {
  title: "Serviços de Direção e Suspensão em Santa Luzia",
  description:
    "Direção hidráulica, caixa remanufaturada, direção mecânica, suspensão, alinhamento e freios em São Benedito, Santa Luzia. Orçamento no WhatsApp.",
  alternates: { canonical: "/servicos" },
};

export default function PaginaServicos() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            schemaBreadcrumb([
              { nome: "Início", url: NEGOCIO.dominio },
              { nome: "Serviços", url: `${NEGOCIO.dominio}/servicos` },
            ]),
          ),
        }}
      />

      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 md:py-24">
        <h1 className="font-display text-display uppercase leading-[0.95] tracking-[-0.02em] text-branco">
          Serviços
        </h1>
        <p className="mt-4 max-w-[68ch] text-corpo-lg leading-[1.65] text-aco">
          Direção hidráulica, direção mecânica, suspensão, alinhamento, balanceamento, freios e
          revisão preventiva. Tudo no mesmo lugar, em São Benedito, Santa Luzia.
        </p>

        <ul className="mt-10 flex flex-col divide-y divide-grafite-borda border-t border-grafite-borda">
          {SERVICOS.map((servico) => (
            <li key={servico.slug}>
              <Link
                href={`/servicos/${servico.slug}`}
                className={cn(
                  "flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:justify-between md:gap-8",
                  FOCO,
                )}
              >
                <span className="shrink-0 font-display text-h3 uppercase text-branco md:w-[280px]">
                  {servico.nome}
                </span>
                <span className="max-w-[60ch] text-corpo leading-[1.65] text-aco">{servico.resumo}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
