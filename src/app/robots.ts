import type { MetadataRoute } from "next";
import { NEGOCIO } from "@/content/negocio";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${NEGOCIO.dominio}/sitemap.xml`,
    host: NEGOCIO.dominio,
  };
}
