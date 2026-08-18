"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import type { Servico } from "@/content/servicos";
import { IMAGENS } from "@/content/imagens";
import { cn } from "@/lib/utils";

const FOCO =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amarelo";

export function ItemGradeServico({ servico }: { servico: Servico }) {
  return (
    <motion.div initial="parado" whileHover="hover">
      <Link
        href={`/servicos/${servico.slug}`}
        className={cn("flex items-start gap-4 py-6 md:items-center md:gap-6", FOCO)}
      >
        <div className="relative size-16 shrink-0 overflow-hidden rounded md:size-20">
          <Image
            src={IMAGENS.servicos[servico.slug]}
            alt=""
            fill
            loading="lazy"
            sizes="80px"
            className="object-cover"
            style={{ filter: "saturate(0.75) contrast(1.08) brightness(0.85)" }}
          />
        </div>

        <div className="flex flex-1 flex-col gap-2 md:flex-row md:items-baseline md:justify-between md:gap-8">
          <span className="flex shrink-0 items-center gap-2 font-display text-h3 uppercase text-branco md:w-[260px]">
            {servico.nome}
            <motion.span
              variants={{ parado: { opacity: 0, x: -6 }, hover: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.15 }}
            >
              <ArrowRight aria-hidden="true" className="size-4 text-vermelho" />
            </motion.span>
          </span>
          <span className="line-clamp-2 max-w-[60ch] text-corpo leading-[1.65] text-aco md:line-clamp-none">
            {servico.resumo}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
