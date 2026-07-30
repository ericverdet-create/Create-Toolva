export function formatJSON(input: string, indent: number): { result: string; error: string | null } {
  try { return { result: JSON.stringify(JSON.parse(input), null, indent), error: null } }
  catch (e: unknown) { return { result: '', error: e instanceof Error ? e.message : 'JSON invalido' } }
}
export function minifyJSON(input: string): { result: string; error: string | null } {
  try { return { result: JSON.stringify(JSON.parse(input)), error: null } }
  catch (e: unknown) { return { result: '', error: e instanceof Error ? e.message : 'JSON invalido' } }
}
