export function encode(text: string): string {
  try { return btoa(unescape(encodeURIComponent(text))) } catch { return '' }
}
export function decode(b64: string): string {
  try { return decodeURIComponent(escape(atob(b64.trim()))) } catch { return '[Error: texto Base64 inválido]' }
}
