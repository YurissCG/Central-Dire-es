import Link from "next/link";
import { SERVICOS } from "@/content/servicos";
import { cn } from "@/lib/utils";

const FOCO =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amarelo";

export function GradeServicos() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-5 py-16 md:py-24">
      <h2 className="font-display text-h2 uppercase leading-none text-branco">O que a gente faz</h2>

      <ul className="mt-8 flex flex-col divide-y divide-grafite-borda border-t border-grafite-borda">
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
    </section>
  );
}
