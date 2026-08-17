import type { MetadataRoute } from "next";
import { NEGOCIO } from "@/content/negocio";
import { SERVICOS } from "@/content/servicos";
import { SINTOMAS } from "@/content/sintomas";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = NEGOCIO.dominio;
  const estaticas = ["", "/servicos", "/sintomas", "/sobre", "/duvidas", "/contato", "/orcamento"];

  return [
    ...estaticas.map((rota) => ({
      url: `${base}${rota}`,
      lastModified: new Date(),
      priority: rota === "" ? 1 : 0.8,
    })),
    ...SERVICOS.map((servico) => ({
      url: `${base}/servicos/${servico.slug}`,
      lastModified: new Date(),
      priority: 0.9,
    })),
    ...SINTOMAS.map((sintoma) => ({
      url: `${base}/sintomas/${sintoma.slug}`,
      lastModified: new Date(),
      priority: 0.6,
    })),
  ];
}
