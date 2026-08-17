import { Button } from "@/components/ui/button";
import { NEGOCIO } from "@/content/negocio";
import { linkWhatsApp } from "@/lib/whatsapp";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-5 py-16">
      <p className="etiqueta text-amarelo">São Benedito, Santa Luzia, MG</p>
      <h1 className="font-display text-display uppercase leading-[0.92] tracking-[-0.02em] text-branco">
        Direção pesada
        <br />
        não é mania
        <br />
        do seu carro
      </h1>
      <h2 className="font-display text-h2 uppercase leading-none text-branco">O que a gente faz</h2>
      <p className="max-w-[68ch] text-corpo leading-[1.65] text-aco">
        Somos especialistas em direção hidráulica e direção mecânica. Recuperamos a caixa de
        direção aqui dentro, com peça remanufaturada, por menos do que custa uma nova.
      </p>
      <div className="superficie w-fit px-4 py-3">
        <p className="etiqueta text-aco-fosco">Telefone</p>
        <p
          className="font-mono text-corpo-lg text-branco"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {NEGOCIO.contato.telefonePrincipalFormatado}
        </p>
      </div>
      <Button className="w-fit" asChild>
        <a href={linkWhatsApp("home-teste")}>Falar no WhatsApp</a>
      </Button>
      <div className="faixa-zebrada" />
    </div>
  );
}
