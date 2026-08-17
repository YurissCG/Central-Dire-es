import { NEGOCIO } from "@/content/negocio";
import { linkGoogleMapsBusca } from "@/lib/maps";
import { cn } from "@/lib/utils";

const FOCO = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amarelo";

const REDES = [
  { label: "Instagram", href: NEGOCIO.redes.instagram },
  { label: "X", href: NEGOCIO.redes.x },
  { label: "YouTube", href: NEGOCIO.redes.youtube },
  { label: "TikTok", href: NEGOCIO.redes.tiktok },
];

function cidadesEmTextoCorrido(cidades: readonly string[]): string {
  const ultima = cidades[cidades.length - 1];
  const ultimaMinuscula = ultima.charAt(0).toLowerCase() + ultima.slice(1);
  return `${cidades.slice(0, -1).join(", ")} e ${ultimaMinuscula}`;
}

export function Footer() {
  return (
    <footer className="border-t border-grafite-borda bg-grafite">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-5 py-12">
        <div className="flex flex-col gap-2">
          <p className="font-display text-h3 uppercase text-branco">{NEGOCIO.nome}</p>
          <p className="max-w-[68ch] text-corpo text-aco">{NEGOCIO.endereco.completo}</p>
          <p className="etiqueta text-aco-fosco">{NEGOCIO.horario.texto}</p>
        </div>

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

        <nav aria-label="Redes sociais" className="flex flex-wrap gap-x-6 gap-y-3">
          {REDES.map((rede) => (
            <a
              key={rede.label}
              href={rede.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("etiqueta text-aco hover:text-branco", FOCO)}
            >
              {rede.label}
            </a>
          ))}
        </nav>

        <a
          href={linkGoogleMapsBusca(`${NEGOCIO.nome}, ${NEGOCIO.endereco.completo}`)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("w-fit text-corpo text-branco underline underline-offset-4 hover:text-amarelo", FOCO)}
        >
          Ver as {NEGOCIO.provaSocial.totalAvaliacoesGoogle} avaliações no Google
        </a>

        <p className="max-w-[68ch] text-corpo text-aco-fosco">
          Atende {cidadesEmTextoCorrido(NEGOCIO.areaAtendida)}.
        </p>
      </div>
    </footer>
  );
}
