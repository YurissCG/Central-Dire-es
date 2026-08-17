import { NEGOCIO } from "@/content/negocio";
import { DEPOIMENTOS } from "@/content/depoimentos";
import { linkGoogleMapsBusca } from "@/lib/maps";
import { ContadorNumero } from "./ContadorNumero";

export function ProvaSocial() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-5 py-16 md:py-24">
      <h2 className="font-display text-h2 uppercase leading-none text-branco">O que dizem os clientes</h2>

      <div className="mt-8 flex flex-wrap gap-x-12 gap-y-6">
        <div>
          <ContadorNumero
            valor={NEGOCIO.provaSocial.notaGoogle}
            decimalSeparator=","
            className="font-display text-display text-branco"
          />
          <p className="etiqueta mt-1 text-aco-fosco">No Google</p>
        </div>
        <div>
          <ContadorNumero valor={NEGOCIO.provaSocial.totalAvaliacoesGoogle} className="font-display text-display text-branco" />
          <p className="etiqueta mt-1 text-aco-fosco">Avaliações</p>
        </div>
      </div>

      {DEPOIMENTOS.length > 0 && (
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {DEPOIMENTOS.map((depoimento) => (
            <div key={depoimento.autor} className="superficie flex flex-col gap-2 p-5">
              <p className="etiqueta text-amarelo">{depoimento.nota} estrelas</p>
              <p className="text-corpo leading-[1.65] text-aco">&ldquo;{depoimento.texto}&rdquo;</p>
              <p className="etiqueta text-aco-fosco">{depoimento.autor}</p>
            </div>
          ))}
        </div>
      )}

      <a
        href={linkGoogleMapsBusca(`${NEGOCIO.nome}, ${NEGOCIO.endereco.completo}`)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block text-corpo text-branco underline underline-offset-4 hover:text-amarelo focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amarelo"
      >
        Ver as {NEGOCIO.provaSocial.totalAvaliacoesGoogle} avaliações no Google
      </a>
    </section>
  );
}
