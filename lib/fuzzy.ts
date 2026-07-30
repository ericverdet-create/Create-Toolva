/**
 * Fuzzy search — no external deps
 * Returns a score 0–1 (higher = better match)
 */
export function fuzzyScore(needle: string, haystack: string): number {
  const n = needle.toLowerCase().trim();
  const h = haystack.toLowerCase();
  if (!n) return 1;
  if (h.includes(n)) return 1; // exact substring = top score

  // bigram similarity
  const bigrams = (s: string) => {
    const set: Set<string> = new Set();
    for (let i = 0; i < s.length - 1; i++) set.add(s[i] + s[i + 1]);
    return set;
  };
  const nb = bigrams(n);
  const hb = bigrams(h);
  let intersection = 0;
  nb.forEach(b => { if (hb.has(b)) intersection++; });
  const total = nb.size + hb.size;
  return total === 0 ? 0 : (2 * intersection) / total;
}

export function fuzzySearch<T extends { name: string; description: string; keywords: string[] }>(
  items: T[],
  query: string,
  threshold = 0.15
): T[] {
  if (!query.trim()) return items;
  return items
    .map(item => {
      const nameScore = fuzzyScore(query, item.name) * 3;
      const descScore = fuzzyScore(query, item.description);
      const kwScore = item.keywords.reduce((acc, kw) => acc + fuzzyScore(query, kw), 0);
      return { item, score: nameScore + descScore + kwScore };
    })
    .filter(({ score }) => score >= threshold)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}
