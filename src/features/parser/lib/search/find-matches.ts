export interface MatchRange {
  start: number
  end: number
}

export interface TextSegment {
  text: string
  /** Index of the match this segment belongs to, or null for plain text. */
  match: number | null
}

export const MAX_MATCHES = 500

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Finds every case-insensitive occurrence of `query` inside `text`.
 * Matching is literal (regex characters are escaped) and indices always
 * refer to the original string, so they can be mapped back to DOM ranges.
 */
export function findMatches(
  text: string,
  query: string,
  limit = MAX_MATCHES,
): Array<MatchRange> {
  if (!query || !text) return []

  const pattern = new RegExp(escapeRegExp(query), 'gi')
  const matches: Array<MatchRange> = []

  for (const match of text.matchAll(pattern)) {
    const start = match.index
    matches.push({ start, end: start + match[0].length })
    if (matches.length >= limit) break
  }

  return matches
}

/** Splits `text` into plain and matched segments so it can be highlighted. */
export function segmentText(
  text: string,
  matches: Array<MatchRange>,
): Array<TextSegment> {
  if (!text) return []
  if (matches.length === 0) return [{ text, match: null }]

  const segments: Array<TextSegment> = []
  let cursor = 0

  matches.forEach((match, index) => {
    if (match.start > cursor) {
      segments.push({ text: text.slice(cursor, match.start), match: null })
    }
    segments.push({ text: text.slice(match.start, match.end), match: index })
    cursor = match.end
  })

  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), match: null })
  }

  return segments
}
