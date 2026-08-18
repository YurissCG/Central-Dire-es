"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { linkLigar, linkWhatsApp } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function BarraWhatsApp() {
  const [escondida, setEscondida] = useState(false);

  useEffect(() => {
    // O Hero já tem os próprios botões de WhatsApp e Ligar em destaque:
    // a barra fixa só entra depois que eles saem de tela, senão duplica CTA
    // na primeira dobra. Observa os botões em si (não a seção inteira),
    // porque o topo do Hero pode aparecer na tela antes dos botões, com o
    // carrossel em tela cheia empurrando tudo pra baixo.
    const botoesHero = document.getElementById("hero-cta");
    if (!botoesHero) return;

    const observer = new IntersectionObserver(([entrada]) => setEscondida(entrada.isIntersecting), {
      threshold: 0,
    });
    observer.observe(botoesHero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-grafite-borda bg-preto-oficina p-3 transition-transform duration-300 md:hidden",
        escondida ? "translate-y-full" : "translate-y-0",
      )}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <a
        href={linkWhatsApp("barra-fixa")}
        className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-[var(--radius)] bg-vermelho text-corpo font-medium text-branco active:bg-vermelho-fundo"
      >
        <MessageCircle aria-hidden="true" className="size-5" />
        Falar no WhatsApp
      </a>
      <a
        href={linkLigar()}
        className="flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius)] border border-grafite-borda px-4 text-corpo font-medium text-branco"
      >
        <Phone aria-hidden="true" className="size-5" />
        Ligar
      </a>
    </div>
  );
}
