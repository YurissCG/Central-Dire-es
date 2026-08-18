import Image from "next/image";
import { EntradaAoRolar } from "@/components/motion/EntradaAoRolar";
import { IMAGENS } from "@/content/imagens";

const PASSOS = [
  { numero: "01", texto: "Você chega ou manda mensagem" },
  { numero: "02", texto: "A gente inspeciona e mostra o que achou" },
  { numero: "03", texto: "Orçamento por escrito antes de começar" },
  { numero: "04", texto: "Serviço feito e peça velha devolvida na sua mão" },
];

export function ComoFunciona() {
  return (
    <EntradaAoRolar>
      <section className="mx-auto w-full max-w-[1200px] px-5 py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
          <div>
            <h2 className="font-display text-h2 uppercase leading-none text-branco">Como funciona</h2>

            <ol className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-x-8">
              {PASSOS.map((passo) => (
                <li key={passo.numero} className="flex flex-col gap-2">
                  <span
                    className="font-mono text-h3 text-amarelo"
                    style={{ fontVariantNumeric: "tabular-nums" }}
                    aria-hidden="true"
                  >
                    {passo.numero}
                  </span>
                  <span className="text-corpo-lg text-branco">{passo.texto}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="superficie relative aspect-[4/3] w-full overflow-hidden md:aspect-[5/4]">
            <Image
              src={IMAGENS.comoFunciona}
              alt="Carro com o capô aberto e a lataria parcialmente desmontada durante o reparo na oficina"
              fill
              loading="lazy"
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              style={{ filter: "saturate(0.75) contrast(1.08) brightness(0.85)" }}
            />
          </div>
        </div>
      </section>
    </EntradaAoRolar>
  );
}
