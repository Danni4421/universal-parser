export const fromBase64 = (input: string): string => {
  return Buffer.from(input, 'base64').toString('utf-8')
}
