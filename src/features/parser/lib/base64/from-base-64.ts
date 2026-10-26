export const fromBase64 = (input: string): string => {
  const binary = atob(input.trim())
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}
