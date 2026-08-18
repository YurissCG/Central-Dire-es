import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { NEGOCIO } from "@/content/negocio";
import { EQUIPE } from "@/content/equipe";
import { Button } from "@/components/ui/button";
import { linkWhatsApp } from "@/lib/whatsapp";
import { schemaBreadcrumb } from "@/lib/schema";
import { ContadorNumero } from "@/components/secoes/ContadorNumero";

export const metadata: Metadata = {
  title: "Sobre a Central Direções",
  description:
    "Oficina especialista em direção hidráulica e mecânica em São Benedito, Santa Luzia, com setor próprio de remanufatura de caixa de direção.",
  alternates: { canonical: "/sobre" },
};

export default function PaginaSobre() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            schemaBreadcrumb([
              { nome: "Início", url: NEGOCIO.dominio },
              { nome: "Sobre", url: `${NEGOCIO.dominio}/sobre` },
            ]),
          ),
        }}
      />

      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 md:py-24">
        <h1 className="font-display text-display uppercase leading-[0.95] tracking-[-0.02em] text-branco">
          Sobre a Central Direções
        </h1>

        <p className="mt-6 max-w-[68ch] text-corpo-lg leading-[1.65] text-aco">
          A Central Direções é uma oficina especialista em direção hidráulica e direção mecânica
          em São Benedito, Santa Luzia. O que diferencia a oficina é ter um setor próprio de
          remanufatura de caixa de direção: em vez de só trocar a peça por uma nova, a caixa é
          desmontada, recuperada e testada aqui dentro, o que deixa o reparo mais barato sem abrir
          mão da qualidade.
        </p>

        <p className="mt-4 max-w-[68ch] text-corpo-lg leading-[1.65] text-aco">
          Além da direção, a oficina atende suspensão, alinhamento, balanceamento, freios e
          revisão preventiva. A ideia é resolver o carro inteiro no mesmo lugar, sem precisar
          rodar entre oficinas diferentes pra cada sistema.
        </p>

        <p className="mt-4 max-w-[68ch] text-corpo-lg leading-[1.65] text-aco">
          O jeito de trabalhar é simples: testa antes de falar em orçamento, mostra o que foi
          encontrado, e explica o motivo de cada troca. Isso vale tanto pra quem passa uma vez
          quanto pra motorista de aplicativo e frota, que não pode ficar com o carro parado.
        </p>

        {EQUIPE.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {EQUIPE.map((membro) => (
              <div key={membro.nome} className="superficie flex flex-col items-center gap-3 p-6 text-center">
                <Image
                  src={membro.foto}
                  alt={`${membro.nome}, ${membro.funcao}`}
                  width={120}
                  height={120}
                  className="rounded-full object-cover"
                />
                <p className="text-corpo-lg text-branco">{membro.nome}</p>
                <p className="etiqueta text-aco-fosco">{membro.funcao}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
          <div>
            <ContadorNumero
              valor={NEGOCIO.provaSocial.notaGoogle}
              decimalSeparator=","
              className="font-display text-h2 text-branco"
            />
            <p className="etiqueta mt-1 text-aco-fosco">No Google</p>
          </div>
          <div>
            <ContadorNumero
              valor={NEGOCIO.provaSocial.totalAvaliacoesGoogle}
              className="font-display text-h2 text-branco"
            />
            <p className="etiqueta mt-1 text-aco-fosco">Avaliações</p>
          </div>
        </div>

        <div className="mt-12">
          <Button size="lg" asChild>
            <a href={linkWhatsApp("sobre")}>
              <MessageCircle aria-hidden="true" />
              Falar no WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </>
  );
}
