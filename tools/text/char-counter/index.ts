export function count(text: string) {
  return {
    chars: text.length,
    charsNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text ? text.split('\n').length : 0,
    sentences: text.trim() ? (text.match(/[.!?]+/g) || []).length : 0,
    paragraphs: text.trim() ? text.split(/\n\n+/).filter(Boolean).length : 0,
    readTime: Math.ceil(text.trim().split(/\s+/).filter(Boolean).length / 200),
  }
}
