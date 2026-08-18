"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IMAGENS } from "@/content/imagens";
import { cn } from "@/lib/utils";

const SLIDES = IMAGENS.carrosselEquipe;

export function CarrosselEquipe() {
  const trilhoRef = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(0);
  // Só o primeiro slide é prioridade: os outros, se descobertos de imediato,
  // disputam banda com ele e estouram o orçamento de LCP (docs/03-arquitetura.md 3.6).
  const [extrasProntos, setExtrasProntos] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setExtrasProntos(true), 800);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzido) return;

    const intervalo = setInterval(() => {
      const trilho = trilhoRef.current;
      if (!trilho) return;
      const proximo = (ativo + 1) % SLIDES.length;
      trilho.scrollTo({ left: proximo * trilho.clientWidth, behavior: "smooth" });
    }, 4500);

    return () => clearInterval(intervalo);
  }, [ativo]);

  function aoRolar() {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    const indice = Math.round(trilho.scrollLeft / trilho.clientWidth);
    setAtivo(indice);
  }

  function irPara(indice: number) {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    trilho.scrollTo({ left: indice * trilho.clientWidth, behavior: "smooth" });
  }

  return (
    <section className="relative w-full">
      <div
        ref={trilhoRef}
        onScroll={aoRolar}
        className="flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SLIDES.map((src, indice) => (
          <div key={src} className="relative aspect-square w-full shrink-0 snap-center overflow-hidden sm:aspect-[3/2] md:aspect-[16/9]">
            {(indice === 0 || extrasProntos) && (
              <Image
                src={src}
                alt="Equipe da Central Direções, especialistas em direção hidráulica e mecânica"
                fill
                priority={indice === 0}
                loading={indice === 0 ? undefined : "lazy"}
                sizes="100vw"
                className="object-cover object-[50%_25%]"
                style={{ filter: "saturate(0.7) contrast(1.05) brightness(0.82)" }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-preto-oficina/70 to-transparent pt-10 pb-4">
        <div className="pointer-events-auto flex gap-1">
          {SLIDES.map((src, indice) => (
            <button
              key={src}
              type="button"
              onClick={() => irPara(indice)}
              aria-label={`Ir para o slide ${indice + 1}`}
              aria-current={indice === ativo}
              className="flex size-11 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amarelo"
            >
              <span
                aria-hidden="true"
                className={cn("h-2 w-2 rounded-full transition-colors", indice === ativo ? "bg-amarelo" : "bg-branco/40")}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
