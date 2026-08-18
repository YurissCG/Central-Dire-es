import { Hero } from "@/components/secoes/Hero";
import { PainelDiagnostico } from "@/components/diagnostico/PainelDiagnostico";
import { ProvaSocial } from "@/components/secoes/ProvaSocial";
import { GradeServicos } from "@/components/secoes/GradeServicos";
import { ComoFunciona } from "@/components/secoes/ComoFunciona";
import { Localizacao } from "@/components/secoes/Localizacao";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="faixa-zebrada" aria-hidden="true" />
      <div className="bg-grafite">
        <PainelDiagnostico />
      </div>
      <ProvaSocial />
      <div className="faixa-zebrada" aria-hidden="true" />
      <div className="bg-grafite">
        <GradeServicos />
      </div>
      <ComoFunciona />
      <div className="faixa-zebrada" aria-hidden="true" />
      <div className="bg-grafite">
        <Localizacao />
      </div>
    </>
  );
}
