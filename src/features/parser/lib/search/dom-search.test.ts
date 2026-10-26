import { describe, expect, it } from 'vitest'
import { collectDomRanges } from './dom-search'

function renderRoot(html: string): HTMLElement {
  const root = document.createElement('div')
  root.innerHTML = html
  return root
}

describe('collectDomRanges', () => {
  it('creates a range for a match inside a text node', () => {
    const root = renderRoot('<span>"name":</span><span>"Budi"</span>')

    const ranges = collectDomRanges(root, 'budi')

    expect(ranges).toHaveLength(1)
    expect(ranges[0].toString()).toBe('Budi')
  })

  it('creates ranges that span multiple text nodes', () => {
    const root = renderRoot('<span>foo</span><span>bar</span>')

    const ranges = collectDomRanges(root, 'oob')

    expect(ranges).toHaveLength(1)
    expect(ranges[0].toString()).toBe('oob')
  })

  it('finds every occurrence across the tree', () => {
    const root = renderRoot('<span>one</span><span>two</span><span>one</span>')

    const ranges = collectDomRanges(root, 'one')

    expect(ranges).toHaveLength(2)
    expect(ranges.map((range) => range.toString())).toEqual(['one', 'one'])
  })

  it('returns nothing for an empty query', () => {
    expect(collectDomRanges(renderRoot('<span>text</span>'), '')).toEqual([])
  })
})
