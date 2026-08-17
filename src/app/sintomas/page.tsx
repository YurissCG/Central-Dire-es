import type { Metadata } from "next";
import Link from "next/link";
import { SINTOMAS } from "@/content/sintomas";
import { NEGOCIO } from "@/content/negocio";
import { schemaBreadcrumb } from "@/lib/schema";
import { cn } from "@/lib/utils";

const FOCO =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amarelo";

export const metadata: Metadata = {
  title: "Problemas na Direção do Carro: o Que Pode Ser",
  description:
    "Volante pesado, barulho ao virar, carro puxando pro lado, vibração, vazamento. Veja o que cada sintoma costuma indicar e onde consertar em Santa Luzia.",
  alternates: { canonical: "/sintomas" },
};

export default function PaginaSintomas() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            schemaBreadcrumb([
              { nome: "Início", url: NEGOCIO.dominio },
              { nome: "Sintomas", url: `${NEGOCIO.dominio}/sintomas` },
            ]),
          ),
        }}
      />

      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 md:py-24">
        <h1 className="font-display text-display uppercase leading-[0.95] tracking-[-0.02em] text-branco">
          O que seu carro está tentando dizer
        </h1>
        <p className="mt-4 max-w-[68ch] text-corpo-lg leading-[1.65] text-aco">
          Marque o que você sente ao dirigir. Cada sintoma abaixo explica o que costuma causar
          aquilo, o que dá para checar sozinho e quando é urgente.
        </p>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {SINTOMAS.map((sintoma) => (
            <li key={sintoma.slug}>
              <Link
                href={`/sintomas/${sintoma.slug}`}
                className={cn(
                  "superficie block h-full px-5 py-4 text-corpo-lg text-branco transition-colors hover:border-amarelo",
                  FOCO,
                )}
              >
                {sintoma.rotulo}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
