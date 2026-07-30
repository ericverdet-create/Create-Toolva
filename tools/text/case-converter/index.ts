export const MODES: Record<string, { label: string; fn: (s: string) => string }> = {
  upper:   { label: 'MAYÚSCULAS',  fn: s => s.toUpperCase() },
  lower:   { label: 'minúsculas',  fn: s => s.toLowerCase() },
  title:   { label: 'Título',      fn: s => s.replace(/\b\w/g, c => c.toUpperCase()) },
  sentence:{ label: 'Oración',     fn: s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() },
  camel:   { label: 'camelCase',   fn: s => s.toLowerCase().replace(/[^a-z0-9]+(.)/gi, (_, c) => c.toUpperCase()) },
  pascal:  { label: 'PascalCase',  fn: s => s.replace(/[^a-z0-9]+(.)?/gi, (_, c) => c ? c.toUpperCase() : '').replace(/^./, c => c.toUpperCase()) },
  snake:   { label: 'snake_case',  fn: s => s.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '') },
  kebab:   { label: 'kebab-case',  fn: s => s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') },
  screaming:{ label: 'SCREAMING_SNAKE', fn: s => s.toUpperCase().replace(/\s+/g, '_').replace(/[^A-Z0-9_]/g, '') },
}
