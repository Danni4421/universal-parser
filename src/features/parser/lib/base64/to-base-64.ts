export const toBase64 = (input: string): string => {
  return Buffer.from(input, 'utf-8').toString('base64')
}
