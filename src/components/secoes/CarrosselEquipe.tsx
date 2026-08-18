"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IMAGENS } from "@/content/imagens";
import { cn } from "@/lib/utils";

const SLIDES = IMAGENS.carrosselEquipe;

export function CarrosselEquipe() {
  const trilhoRef = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(0);
  // Só o primeiro slide entra na primeira renderização: os outros quatro
  // arquivos, se descobertos de imediato, disputam banda com a foto do
  // Hero e estouram o orçamento de LCP (ver docs/03-arquitetura.md 3.6).
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
    <section className="mx-auto w-full max-w-[1200px] border-t border-grafite-borda px-5 py-12 md:py-16">
      <div
        ref={trilhoRef}
        onScroll={aoRolar}
        className="flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SLIDES.map((src, indice) => (
          <div key={src} className="superficie relative aspect-[16/9] w-full shrink-0 snap-center overflow-hidden sm:aspect-[16/8]">
            {(indice === 0 || extrasProntos) && (
              <Image
                src={src}
                alt="Equipe da Central Direções, especialistas em direção hidráulica e mecânica"
                fill
                sizes="(min-width: 1200px) 1150px, 100vw"
                className="object-cover"
                loading="lazy"
                style={{ filter: "saturate(0.7) contrast(1.05) brightness(0.82)" }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-2 flex justify-center">
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
              className={cn("h-2 w-2 rounded-full transition-colors", indice === ativo ? "bg-amarelo" : "bg-grafite-borda")}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
