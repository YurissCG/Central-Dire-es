const PASSOS = [
  { numero: "01", texto: "Você chega ou manda mensagem" },
  { numero: "02", texto: "A gente inspeciona e mostra o que achou" },
  { numero: "03", texto: "Orçamento antes de começar" },
  { numero: "04", texto: "Serviço feito e testado" },
];

export function ComoFunciona() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-5 py-16 md:py-24">
      <h2 className="font-display text-h2 uppercase leading-none text-branco">Como funciona</h2>

      <ol className="mt-8 grid gap-8 md:grid-cols-4 md:gap-6">
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
    </section>
  );
}
