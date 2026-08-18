import Image from "next/image";
import { EntradaAoRolar } from "@/components/motion/EntradaAoRolar";
import { ItemGradeServico } from "@/components/secoes/ItemGradeServico";
import { IMAGENS } from "@/content/imagens";
import { SERVICOS } from "@/content/servicos";

export function GradeServicos() {
  return (
    <EntradaAoRolar>
      <section className="relative mx-auto w-full max-w-[1200px] px-5 py-16 md:py-24">
        <Image
          src={IMAGENS.texturaMetal}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover opacity-10"
        />

        <div className="relative z-10">
          <h2 className="font-display text-h2 uppercase leading-none text-branco">O que a gente faz</h2>

          <ul className="mt-8 flex flex-col divide-y divide-grafite-borda border-t border-grafite-borda">
            {SERVICOS.map((servico) => (
              <li key={servico.slug}>
                <ItemGradeServico servico={servico} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </EntradaAoRolar>
  );
}
