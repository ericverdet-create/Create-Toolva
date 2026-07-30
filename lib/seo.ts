export const SITE_URL  = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://toolva.com'
export const SITE_NAME = 'Toolva'
export const SITE_DESC = 'Herramientas online gratuitas. Calculadoras, conversores y utilidades para tu dia a dia. Sin registro, sin publicidad, sin limites.'

export const CATEGORY_LABELS: Record<string, string> = {
  tax:        'Fiscalidad',
  text:       'Texto',
  image:      'Imagenes',
  crypto:     'Criptografia',
  math:       'Matematicas',
  converters: 'Conversores',
  health:     'Salud',
}

export const CATEGORY_ICONS: Record<string, string> = {
  tax:        '🧾',
  text:       '📝',
  image:      '🖼️',
  crypto:     '🔒',
  math:       '🧮',
  converters: '🔄',
  health:     '❤️',
}

export function toolUrl(category: string, slug: string) {
  return SITE_URL + '/tools/' + category + '/' + slug
}
export function categoryUrl(category: string) {
  return SITE_URL + '/tools/' + category
}
export function toolPath(category: string, slug: string) {
  return '/tools/' + category + '/' + slug
}
export function categoryPath(category: string) {
  return '/tools/' + category
}
