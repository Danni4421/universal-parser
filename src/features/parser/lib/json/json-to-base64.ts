import { toBase64 } from '../base64/to-base-64'

export const jsonToBase64 = (input: string): string => {
  return toBase64(JSON.stringify(JSON.parse(input)))
}
