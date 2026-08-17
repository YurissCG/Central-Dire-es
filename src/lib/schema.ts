import { NEGOCIO } from "@/content/negocio";
import { SERVICOS, type Servico } from "@/content/servicos";

const OFICINA_ID = `${NEGOCIO.dominio}/#oficina`;
const WEBSITE_ID = `${NEGOCIO.dominio}/#website`;

export function schemaOficina() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": OFICINA_ID,
    name: NEGOCIO.nome,
    image: `${NEGOCIO.dominio}/fotos/fachada.jpg`,
    logo: `${NEGOCIO.dominio}/logo-central-direcoes.png`,
    url: NEGOCIO.dominio,
    telephone: NEGOCIO.contato.telefonePrincipal,
    email: NEGOCIO.contato.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: `${NEGOCIO.endereco.logradouro}, ${NEGOCIO.endereco.numero}`,
      addressLocality: NEGOCIO.endereco.cidade,
      addressRegion: NEGOCIO.endereco.uf,
      postalCode: NEGOCIO.endereco.cep,
      addressCountry: NEGOCIO.endereco.pais,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: NEGOCIO.geo.latitude,
      longitude: NEGOCIO.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: NEGOCIO.horario.dias,
        opens: NEGOCIO.horario.abre,
        closes: NEGOCIO.horario.fecha,
      },
    ],
    areaServed: NEGOCIO.areaAtendida.map((nome) => ({ "@type": "City", name: nome })),
    sameAs: [NEGOCIO.redes.instagram, NEGOCIO.redes.x, NEGOCIO.redes.youtube, NEGOCIO.redes.tiktok],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços",
      itemListElement: SERVICOS.map((servico) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: servico.nome,
          url: `${NEGOCIO.dominio}/servicos/${servico.slug}`,
        },
      })),
    },
  };
}

export function schemaWebsite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: NEGOCIO.nome,
    url: NEGOCIO.dominio,
    publisher: { "@id": OFICINA_ID },
  };
}

export function schemaServico(servico: Servico) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: servico.nome,
    serviceType: servico.nome,
    description: servico.resumo,
    provider: { "@id": OFICINA_ID },
    areaServed: NEGOCIO.areaAtendida.map((nome) => ({ "@type": "City", name: nome })),
    url: `${NEGOCIO.dominio}/servicos/${servico.slug}`,
  };
}

export function schemaBreadcrumb(itens: { nome: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: itens.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.nome,
      item: item.url,
    })),
  };
}
