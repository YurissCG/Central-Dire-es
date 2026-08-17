import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { linkWhatsApp } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const FOCO =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amarelo";

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/servicos", label: "Serviços" },
  { href: "/sintomas", label: "Sintomas" },
  { href: "/duvidas", label: "Dúvidas" },
  { href: "/contato", label: "Contato" },
];

export default function NaoEncontrado() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-5 py-16 md:py-24">
      <p className="etiqueta text-amarelo">Erro 404</p>
      <h1 className="font-display text-display uppercase leading-[0.95] tracking-[-0.02em] text-branco">
        Essa página não existe
      </h1>
      <p className="max-w-[68ch] text-corpo-lg leading-[1.65] text-aco">
        O link pode estar errado ou a página pode ter mudado de endereço. Segue os links
        principais ou chama no WhatsApp que a gente ajuda a achar o que você precisa.
      </p>

      <ul className="flex flex-wrap gap-3">
        {LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "superficie block px-5 py-3 text-corpo text-branco transition-colors hover:border-amarelo",
                FOCO,
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div>
        <Button size="lg" asChild>
          <a href={linkWhatsApp("404")}>
            <MessageCircle aria-hidden="true" />
            Falar no WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}
