import { pool } from '../model/pool'
import { registerParsers } from '../model/register'

registerParsers()

export const executeParse = (
  parserType: string,
  input: string,
): { result: string; error?: string } => {
  try {
    if (!input.trim()) {
      return { result: '', error: 'Input cannot be empty' }
    }

    if (!pool.has(parserType)) {
      return { result: '', error: `Parser type "${parserType}" not available` }
    }

    const result = pool.parse(parserType, input)
    return {
      result:
        typeof result === 'string' ? result : JSON.stringify(result, null, 2),
    }
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Unknown error occurred'
    return { result: '', error: errorMessage }
  }
}

export const getAvailableParsers = (): Array<string> => {
  return pool.list()
}
