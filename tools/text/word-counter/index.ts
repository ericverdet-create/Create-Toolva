export interface WordCountResult { chars: number; charsNoSpaces: number; words: number; sentences: number; paragraphs: number; readingTime: number }
export function count(text: string): WordCountResult {
  const chars = text.length
  const charsNoSpaces = text.replace(/\s/g, '').length
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  const sentences = text.trim() === '' ? 0 : (text.match(/[.!?]+/g) || []).length
  const paragraphs = text.trim() === '' ? 0 : text.split(/\n\s*\n/).filter(p => p.trim()).length || 1
  const readingTime = Math.max(1, Math.ceil(words / 200))
  return { chars, charsNoSpaces, words, sentences, paragraphs, readingTime }
}
