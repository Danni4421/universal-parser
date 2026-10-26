import { describe, expect, it } from 'vitest'
import { fromBase64 } from './from-base-64'
import { toBase64 } from './to-base-64'

describe('base64', () => {
  it('encodes ascii text', () => {
    expect(toBase64('Hello World')).toBe('SGVsbG8gV29ybGQ=')
  })

  it('round-trips unicode text', () => {
    const input = 'héllo wörld ✅'
    expect(fromBase64(toBase64(input))).toBe(input)
  })

  it('decodes base64 produced elsewhere', () => {
    expect(fromBase64('eyJhIjoxfQ==')).toBe('{"a":1}')
  })
})
