import Link from "next/link";
import { AlertTriangle, MessageCircle } from "lucide-react";
import type { Sintoma } from "@/content/sintomas";
import { Button } from "@/components/ui/button";
import { linkWhatsApp } from "@/lib/whatsapp";

interface ResultadoDiagnosticoProps {
  sintomas: readonly Sintoma[];
}

export function ResultadoDiagnostico({ sintomas }: ResultadoDiagnosticoProps) {
  const listaCurta = sintomas.map((sintoma) => sintoma.curto).join(", ");
  const mensagem = `Meu carro está com: ${listaCurta}. Queria fazer um orçamento.`;

  return (
    <div className="mt-10 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
      <div className="flex flex-col gap-4">
        {sintomas.map((sintoma) => (
          <Link
            key={sintoma.slug}
            href={`/sintomas/${sintoma.slug}`}
            className="superficie flex flex-col gap-1 p-4 transition-colors hover:border-amarelo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amarelo"
          >
            <p className="etiqueta text-aco-fosco">{sintoma.setorProvavel}</p>
            <p className="text-corpo leading-[1.65] text-aco">{sintoma.explicacao}</p>
          </Link>
        ))}
      </div>

      <div className="flex items-start gap-3 bg-amarelo p-4">
        <AlertTriangle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-preto-oficina" />
        <p className="text-corpo font-medium text-preto-oficina">
          Isso é uma orientação, não um laudo. Só com o carro no elevador dá para fechar o
          diagnóstico.
        </p>
      </div>

      <Button size="lg" className="w-fit" asChild>
        <a href={linkWhatsApp("diagnostico", mensagem)}>
          <MessageCircle aria-hidden="true" />
          Falar no WhatsApp
        </a>
      </Button>
    </div>
  );
}
