import type { ToolDefinition } from './tools/registry';

const BASE_URL = 'https://create-toolva.vercel.app';

export function toolJsonLd(tool: ToolDefinition, baseUrl = BASE_URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    url: `${baseUrl}/herramientas/${tool.slug}`,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    inLanguage: 'es',
    publisher: {
      '@type': 'Organization',
      name: 'Toolva',
      url: baseUrl,
    },
  };
}

export function siteJsonLd(baseUrl = BASE_URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Toolva',
    description: 'Más de 175 herramientas online gratuitas: calculadoras de finanzas, salud, conversores y más.',
    url: baseUrl,
    inLanguage: 'es',
    publisher: {
      '@type': 'Organization',
      name: 'Toolva',
      url: baseUrl,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'hola@toolva.com',
        availableLanguage: 'Spanish',
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${baseUrl}/buscar?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
