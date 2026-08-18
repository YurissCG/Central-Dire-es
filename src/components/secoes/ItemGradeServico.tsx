"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import type { Servico } from "@/content/servicos";
import { cn } from "@/lib/utils";

const FOCO =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amarelo";

export function ItemGradeServico({ servico }: { servico: Servico }) {
  return (
    <motion.div initial="parado" whileHover="hover">
      <Link
        href={`/servicos/${servico.slug}`}
        className={cn(
          "flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:justify-between md:gap-8",
          FOCO,
        )}
      >
        <span className="flex shrink-0 items-center gap-2 font-display text-h3 uppercase text-branco md:w-[280px]">
          {servico.nome}
          <motion.span
            variants={{ parado: { opacity: 0, x: -6 }, hover: { opacity: 1, x: 0 } }}
            transition={{ duration: 0.15 }}
          >
            <ArrowRight aria-hidden="true" className="size-4 text-vermelho" />
          </motion.span>
        </span>
        <span className="max-w-[60ch] text-corpo leading-[1.65] text-aco">{servico.resumo}</span>
      </Link>
    </motion.div>
  );
}
