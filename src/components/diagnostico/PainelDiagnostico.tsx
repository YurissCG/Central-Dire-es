"use client";

import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  CircleDot,
  Disc3,
  Droplet,
  Gauge,
  type LucideIcon,
  MoveRight,
  Volume2,
  Waves,
} from "lucide-react";
import { ItemSintoma } from "./ItemSintoma";
import { ResultadoDiagnostico } from "./ResultadoDiagnostico";
import { SINTOMAS, type SintomaSlug } from "@/content/sintomas";
import { Button } from "@/components/ui/button";

const ICONES: Record<string, LucideIcon> = {
  Gauge,
  Volume2,
  MoveRight,
  Waves,
  Activity,
  Droplet,
  CircleDot,
  Disc3,
  AlertTriangle,
};

const SINTOMAS_PAINEL = SINTOMAS.filter((sintoma) => sintoma.noPainel);

export function PainelDiagnostico() {
  const [marcados, setMarcados] = useState<SintomaSlug[]>([]);
  const [confirmado, setConfirmado] = useState(false);

  function alternar(slug: SintomaSlug) {
    setConfirmado(false);
    setMarcados((atual) => (atual.includes(slug) ? atual.filter((item) => item !== slug) : [...atual, slug]));
  }

  const selecionados = SINTOMAS_PAINEL.filter((sintoma) => marcados.includes(sintoma.slug));

  return (
    <section id="painel-diagnostico" className="mx-auto w-full max-w-[1200px] px-5 py-16 md:py-24">
      <p className="etiqueta text-amarelo">Painel de diagnóstico</p>
      <h2 className="mt-2 font-display text-h2 uppercase leading-none text-branco">
        O que seu carro está tentando dizer
      </h2>
      <p className="mt-4 max-w-[68ch] text-corpo-lg leading-[1.65] text-aco">
        Marque o que você sente ao dirigir. A gente mostra qual setor costuma ser o responsável e
        você já chega no WhatsApp com o problema descrito.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {SINTOMAS_PAINEL.map((sintoma) => (
          <ItemSintoma
            key={sintoma.slug}
            rotulo={sintoma.rotulo}
            Icone={ICONES[sintoma.icone]}
            marcado={marcados.includes(sintoma.slug)}
            onToggle={() => alternar(sintoma.slug)}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-col items-start gap-2">
        <Button size="lg" disabled={marcados.length === 0} onClick={() => setConfirmado(true)}>
          Ver o que pode ser
        </Button>
        {marcados.length === 0 && (
          <p className="text-corpo text-aco-fosco">Marque pelo menos um sintoma para continuar.</p>
        )}
      </div>

      {confirmado && selecionados.length > 0 && <ResultadoDiagnostico sintomas={selecionados} />}
    </section>
  );
}
