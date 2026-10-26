import { fromBase64 } from './from-base-64'

export const base64ToJson = (input: string): unknown => {
  return JSON.parse(fromBase64(input))
}
