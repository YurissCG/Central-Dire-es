import { Clock, MapPin, Phone } from "lucide-react";
import { NEGOCIO } from "@/content/negocio";
import { linkGoogleMapsBusca } from "@/lib/maps";
import { cn } from "@/lib/utils";

const FOCO =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amarelo";

export function Localizacao() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-5 py-16 md:py-24">
      <h2 className="font-display text-h2 uppercase leading-none text-branco">Onde a gente fica</h2>

      <p className="mt-4 max-w-[68ch] text-corpo-lg leading-[1.65] text-aco">
        {NEGOCIO.endereco.logradouro}, {NEGOCIO.endereco.numero}, {NEGOCIO.endereco.bairro}.{" "}
        {NEGOCIO.endereco.referencia}.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <a
          href={linkGoogleMapsBusca(`${NEGOCIO.nome}, ${NEGOCIO.endereco.completo}`)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "superficie flex min-h-[220px] flex-col items-start justify-between gap-4 p-6 transition-colors hover:border-amarelo",
            FOCO,
          )}
        >
          <MapPin aria-hidden="true" className="size-8 text-amarelo" />
          <div>
            <p className="text-corpo-lg text-branco">{NEGOCIO.endereco.completo}</p>
            <p className="etiqueta mt-2 text-aco-fosco">Abrir no Google Maps</p>
          </div>
        </a>

        <div className="flex flex-col gap-6">
          <div className="superficie flex items-start gap-3 p-5">
            <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-amarelo" />
            <div>
              <p className="etiqueta text-aco-fosco">Horário</p>
              <p className="text-corpo-lg text-branco">{NEGOCIO.horario.texto}</p>
            </div>
          </div>

          <div className="superficie flex items-start gap-3 p-5">
            <Phone aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-amarelo" />
            <div
              className="flex flex-col gap-1 font-mono text-corpo-lg"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              <a
                href={`tel:${NEGOCIO.contato.telefonePrincipal}`}
                className={cn("w-fit text-branco hover:text-amarelo", FOCO)}
              >
                {NEGOCIO.contato.telefonePrincipalFormatado}
              </a>
              <a
                href={`tel:${NEGOCIO.contato.telefoneSecundario}`}
                className={cn("w-fit text-aco hover:text-amarelo", FOCO)}
              >
                {NEGOCIO.contato.telefoneSecundarioFormatado}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
