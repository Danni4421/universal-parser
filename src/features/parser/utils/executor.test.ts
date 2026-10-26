import { describe, expect, it } from 'vitest'
import { executeParse } from './executor'

describe('executeParse', () => {
  it('converts string to base64', () => {
    expect(executeParse('string-to-base64', 'hello')).toEqual({
      result: 'aGVsbG8=',
    })
  })

  it('converts json to base64', () => {
    expect(executeParse('json-to-base64', '{"a":1}')).toEqual({
      result: 'eyJhIjoxfQ==',
    })
  })

  it('keeps json-to-json working after a round trip', () => {
    expect(executeParse('json-to-json', '{"a":1}')).toEqual({
      result: '{\n  "a": 1\n}',
    })
  })

  it('round-trips base64 back to json', () => {
    expect(executeParse('base64-to-json', 'eyJhIjoxfQ==')).toEqual({
      result: '{\n  "a": 1\n}',
    })
  })

  it('decodes a data uri', () => {
    expect(
      executeParse('uri-to-string', 'data:application/json,%7B%22a%22%3A1%7D'),
    ).toEqual({ result: '{"a":1}' })
  })

  it('reports unsupported combos instead of throwing', () => {
    const { result, error } = executeParse('json-to-graphql', '{"a":1}')
    expect(result).toBe('')
    expect(error).toBe(
      'Conversion JSON -> GRAPHQL is not supported yet. Pick another output format.',
    )
  })
})
