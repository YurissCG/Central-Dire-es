import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NEGOCIO } from "@/content/negocio";
import { IMAGENS } from "@/content/imagens";
import { linkLigar, linkWhatsApp } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section id="hero" className="relative isolate flex min-h-[560px] items-end overflow-hidden md:min-h-[680px]">
      <Image
        src={IMAGENS.hero}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        style={{ filter: "saturate(0.85) contrast(1.05)" }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-preto-oficina/90 via-preto-oficina/55 to-preto-oficina/15"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-5 py-12 md:py-20">
        <p className="etiqueta text-amarelo">São Benedito, Santa Luzia, MG</p>

        <h1 className="font-display text-display uppercase leading-[0.92] tracking-[-0.02em] text-branco">
          Direção pesada
          <br />
          não é mania
          <br />
          do seu carro
        </h1>

        <p className="max-w-[68ch] text-corpo-lg leading-[1.65] text-aco">
          Somos especialistas em direção hidráulica e direção mecânica. Recuperamos a caixa de
          direção aqui dentro, com peça remanufaturada, por menos do que custa uma nova.
        </p>

        <div className="flex flex-wrap gap-3">
          <Button size="lg" asChild>
            <a href={linkWhatsApp("hero")}>
              <MessageCircle aria-hidden="true" />
              Falar no WhatsApp
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href={linkLigar()}>
              <Phone aria-hidden="true" />
              Ligar {NEGOCIO.contato.telefonePrincipalFormatado}
            </a>
          </Button>
        </div>

        <div
          className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-etiqueta uppercase tracking-[0.08em] text-aco sm:gap-x-4 sm:tracking-[0.14em]"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          <span>{NEGOCIO.provaSocial.notaGoogle.toString().replace(".", ",")} no Google</span>
          <span aria-hidden="true">·</span>
          <span>{NEGOCIO.provaSocial.totalAvaliacoesGoogle} avaliações</span>
          <span aria-hidden="true">·</span>
          <span>Seg a sex, 8h às 18h</span>
        </div>
      </div>
    </section>
  );
}
