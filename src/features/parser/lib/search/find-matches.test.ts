import { describe, expect, it } from 'vitest'
import { findMatches, segmentText } from './find-matches'

describe('findMatches', () => {
  it('finds every case-insensitive occurrence', () => {
    expect(findMatches('Budi and budi and BUDI', 'budi')).toEqual([
      { start: 0, end: 4 },
      { start: 9, end: 13 },
      { start: 18, end: 22 },
    ])
  })

  it('treats regex characters as literal text', () => {
    expect(findMatches('a.b aXb a.b', 'a.b')).toEqual([
      { start: 0, end: 3 },
      { start: 8, end: 11 },
    ])
  })

  it('returns no matches for an empty query', () => {
    expect(findMatches('anything', '')).toEqual([])
  })

  it('supports unicode text', () => {
    expect(findMatches('nama: Budi 🚀', '🚀')).toEqual([{ start: 11, end: 13 }])
  })
})

describe('segmentText', () => {
  it('splits text into plain and matched segments', () => {
    expect(
      segmentText('one two one', findMatches('one two one', 'one')),
    ).toEqual([
      { text: 'one', match: 0 },
      { text: ' two ', match: null },
      { text: 'one', match: 1 },
    ])
  })

  it('returns the whole text when there are no matches', () => {
    expect(segmentText('hello', [])).toEqual([{ text: 'hello', match: null }])
  })
})
