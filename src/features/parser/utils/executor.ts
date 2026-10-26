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
      const [from = '', to = ''] = parserType.split('-to-')
      return {
        result: '',
        error: `Conversion ${from.toUpperCase()} -> ${to.toUpperCase()} is not supported yet. Pick another output format.`,
      }
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
