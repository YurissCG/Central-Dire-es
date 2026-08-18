"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { linkWhatsApp } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const FOCO = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amarelo";

const NAV = [
  { href: "/servicos", label: "Serviços" },
  { href: "/sintomas", label: "Sintomas" },
  { href: "/sobre", label: "Sobre" },
  { href: "/duvidas", label: "Dúvidas" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const [aberto, setAberto] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const botaoRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!aberto) return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    const focaveis = drawer.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];
    primeiro?.focus();

    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        setAberto(false);
        botaoRef.current?.focus();
        return;
      }
      if (evento.key !== "Tab" || focaveis.length === 0) return;
      if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault();
        ultimo?.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro?.focus();
      }
    }

    function aoClicarFora(evento: MouseEvent) {
      const alvo = evento.target as Node;
      if (drawer?.contains(alvo) || botaoRef.current?.contains(alvo)) return;
      setAberto(false);
    }

    document.addEventListener("keydown", aoTeclar);
    document.addEventListener("mousedown", aoClicarFora);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.removeEventListener("mousedown", aoClicarFora);
      document.body.style.overflow = "";
    };
  }, [aberto]);

  return (
    <header className="border-b border-grafite-borda bg-preto-oficina">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-5">
        <Link href="/" className={cn("flex items-center gap-2.5", FOCO)}>
          <Image
            src="/logo-central-direcoes.png"
            alt="Central Direções"
            width={44}
            height={44}
            priority
            className="size-11 shrink-0"
          />
          <span className="font-display text-h3 uppercase leading-none text-branco">
            Central Direções
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn("text-corpo text-aco transition-colors hover:text-branco", FOCO)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button asChild>
            <a href={linkWhatsApp("header")}>
              <MessageCircle aria-hidden="true" />
              Falar no WhatsApp
            </a>
          </Button>
        </div>

        <button
          ref={botaoRef}
          type="button"
          className={cn("flex size-11 items-center justify-center text-branco md:hidden", FOCO)}
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          onClick={() => setAberto((valor) => !valor)}
        >
          {aberto ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {aberto && (
        <div
          id="menu-mobile"
          ref={drawerRef}
          className="fixed inset-x-0 top-16 bottom-0 z-50 flex flex-col gap-1 overflow-y-auto border-t border-grafite-borda bg-preto-oficina p-5 md:hidden"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setAberto(false)}
              className={cn(
                "flex min-h-11 items-center border-b border-grafite-borda text-corpo-lg text-branco",
                FOCO,
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="mt-4 w-full">
            <a href={linkWhatsApp("header-mobile")} onClick={() => setAberto(false)}>
              <MessageCircle aria-hidden="true" />
              Falar no WhatsApp
            </a>
          </Button>
        </div>
      )}
    </header>
  );
}
