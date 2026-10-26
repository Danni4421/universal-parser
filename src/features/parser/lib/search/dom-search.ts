import { findMatches } from './find-matches'

const MATCH_HIGHLIGHT = 'parser-find-match'
const ACTIVE_HIGHLIGHT = 'parser-find-active'

const SHOW_TEXT = 4 // NodeFilter.SHOW_TEXT

interface TextEntry {
  node: Text
  start: number
  end: number
}

function getHighlightRegistry(): HighlightRegistry | null {
  const registry = (globalThis as { CSS?: { highlights?: HighlightRegistry } })
    .CSS?.highlights
  return registry ?? null
}

function buildTextIndex(root: Node): {
  text: string
  entries: Array<TextEntry>
} {
  const doc = root.ownerDocument
  if (!doc) return { text: '', entries: [] }

  const walker = doc.createTreeWalker(root, SHOW_TEXT)
  const entries: Array<TextEntry> = []
  let text = ''

  while (walker.nextNode()) {
    const node = walker.currentNode
    const value = node.nodeValue
    if (node.nodeType !== 3 || !value) continue

    entries.push({
      node: node as Text,
      start: text.length,
      end: text.length + value.length,
    })
    text += value
  }

  return { text, entries }
}

function findEntry(
  entries: Array<TextEntry>,
  offset: number,
): TextEntry | null {
  let low = 0
  let high = entries.length - 1

  while (low <= high) {
    const middle = (low + high) >> 1
    const entry = entries[middle]

    if (offset < entry.start) high = middle - 1
    else if (offset >= entry.end) low = middle + 1
    else return entry
  }

  return null
}

/** Builds DOM ranges for every occurrence of `query` inside `root`. */
export function collectDomRanges(root: Node, query: string): Array<Range> {
  if (!query) return []

  const doc = root.ownerDocument
  const { text, entries } = buildTextIndex(root)
  if (!doc || !text || entries.length === 0) return []

  return findMatches(text, query).flatMap((match) => {
    const startEntry = findEntry(entries, match.start)
    const endEntry = findEntry(entries, Math.max(match.start, match.end - 1))
    if (!startEntry || !endEntry) return []

    const range = doc.createRange()
    range.setStart(startEntry.node, match.start - startEntry.start)
    range.setEnd(endEntry.node, match.end - endEntry.start)
    return [range]
  })
}

/**
 * Paints the ranges with the CSS Custom Highlight API. Returns false when the
 * browser does not support it so callers can fall back to a native selection.
 */
export function applyDomHighlights(
  ranges: Array<Range>,
  activeIndex: number,
): boolean {
  const registry = getHighlightRegistry()
  if (!registry || typeof Highlight !== 'function') return false

  registry.set(MATCH_HIGHLIGHT, new Highlight(...ranges))

  const active = activeIndex >= 0 ? ranges[activeIndex] : undefined
  if (active) registry.set(ACTIVE_HIGHLIGHT, new Highlight(active))
  else registry.delete(ACTIVE_HIGHLIGHT)

  return true
}

export function clearDomHighlights(): void {
  const registry = getHighlightRegistry()
  if (!registry) return
  registry.delete(MATCH_HIGHLIGHT)
  registry.delete(ACTIVE_HIGHLIGHT)
}

function findScrollContainer(element: HTMLElement | null): HTMLElement | null {
  let node = element?.parentElement ?? null

  while (node) {
    const style = node.ownerDocument.defaultView?.getComputedStyle(node)
    const scrollable = style
      ? /(auto|scroll|overlay)/.test(style.overflowY)
      : false
    if (scrollable && node.scrollHeight > node.clientHeight + 1) return node
    node = node.parentElement
  }

  return null
}

/** Scrolls the active match into the middle of its scroll container. */
export function scrollRangeIntoView(range: Range): void {
  if (typeof range.getBoundingClientRect !== 'function') return

  const container = range.startContainer
  const element =
    container.nodeType === 3
      ? container.parentElement
      : (container as HTMLElement | null)
  if (!element) return

  const rect = range.getBoundingClientRect()
  const scroller = findScrollContainer(element)

  if (!scroller) {
    if (typeof element.scrollIntoView === 'function') {
      element.scrollIntoView({ block: 'center' })
    }
    return
  }

  const scrollerRect = scroller.getBoundingClientRect()
  const above = rect.top < scrollerRect.top
  const below = rect.bottom > scrollerRect.bottom

  if (above || below) {
    scroller.scrollTop +=
      rect.top - scrollerRect.top - scroller.clientHeight / 2 + rect.height / 2
  }
}
