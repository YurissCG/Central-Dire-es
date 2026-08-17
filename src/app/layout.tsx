import type { Metadata } from "next";
import { Barlow_Condensed, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NEGOCIO } from "@/content/negocio";
import { schemaOficina, schemaWebsite } from "@/lib/schema";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BarraWhatsApp } from "@/components/layout/BarraWhatsApp";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(NEGOCIO.dominio),
  title: {
    default: "Central Direções: Direção Hidráulica em Santa Luzia MG",
    template: "%s | Central Direções",
  },
  description:
    "Especialista em direção hidráulica e mecânica em São Benedito, Santa Luzia. Caixa de direção remanufaturada, alinhamento e suspensão. Orçamento no WhatsApp.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Central Direções",
    images: ["/og/home.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={cn(
        "h-full",
        barlowCondensed.variable,
        ibmPlexSans.variable,
        ibmPlexMono.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOficina()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaWebsite()) }}
        />
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-amarelo focus:px-4 focus:py-2 focus:text-preto-oficina focus:font-medium"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo" className="flex-1 pb-[84px] md:pb-0">
          {children}
        </main>
        <Footer />
        <BarraWhatsApp />
      </body>
    </html>
  );
}
