'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from 'cn'
import { usePanelSearch } from '../hooks/use-panel-search'
import {
  applyDomHighlights,
  clearDomHighlights,
  collectDomRanges,
  scrollRangeIntoView,
} from '../lib/search/dom-search'
import Panel from './parser-panel'
import FormatSelect from './parser-format-select'
import PanelSearchToolbar from './panel-search'
import JsonTree from './json-tree'
import type { OutputType } from '@/types'
import { ScrollArea } from '@/components/ui/scroll-area'

export interface ParserOutputProps {
  output: OutputType
  error?: string
  toFormat: string
  formats: Array<{ value: string; label: string }>
  onToFormatChange: (format: string) => void
}

type ParsedOutput =
  | { kind: 'empty' }
  | { kind: 'json'; value: unknown }
  | { kind: 'text'; text: string }

export default function ParserOutput({ output, error, toFormat, formats, onToFormatChange }: ParserOutputProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [domVersion, setDomVersion] = useState(0)
  const search = usePanelSearch()

  const parsed = useMemo<ParsedOutput>(() => {
    if (output === null) return { kind: 'empty' }
    if (typeof output === 'object') return { kind: 'json', value: output }
    if (typeof output === 'string') {
      const trimmed = output.trim()
      if (trimmed) {
        try {
          return { kind: 'json', value: JSON.parse(trimmed) }
        } catch {}
      }
      return { kind: 'text', text: output }
    }
    return { kind: 'text', text: String(output) }
  }, [output])

  const hasContent =
    parsed.kind === 'json' ||
    (parsed.kind === 'text' && parsed.text.trim().length > 0)

  // Collapsing/expanding JsonTree nodes changes the text available to search.
  useEffect(() => {
    const root = contentRef.current
    if (!search.open || !root) return

    const observer = new MutationObserver(() => {
      setDomVersion((version) => version + 1)
    })
    observer.observe(root, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [search.open])

  const ranges = useMemo(() => {
    if (!search.open || !search.query) return []
    const root = contentRef.current
    return root ? collectDomRanges(root, search.query) : []
  }, [search.open, search.query, parsed, error, domVersion])

  const matchCount = ranges.length
  const safeActiveIndex = matchCount > 0 ? Math.min(activeIndex, matchCount - 1) : -1

  useEffect(() => {
    setActiveIndex(0)
  }, [search.query, parsed, error])

  useEffect(() => {
    if (!search.open || !search.query) {
      clearDomHighlights()
      return
    }

    if (safeActiveIndex < 0) {
      clearDomHighlights()
      return
    }
    const active = ranges[safeActiveIndex]

    const highlighted = applyDomHighlights(ranges, safeActiveIndex)

    if (!highlighted) {
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(active)
    }

    scrollRangeIntoView(active)

    return () => {
      clearDomHighlights()
      if (!highlighted) window.getSelection()?.removeAllRanges()
    }
  }, [search.open, search.query, ranges, safeActiveIndex])

  const goToMatch = (delta: number) => {
    if (matchCount === 0) return
    setActiveIndex((safeActiveIndex + delta + matchCount) % matchCount)
  }

  return (
    <Panel
      className="bg-[#f0efed]"
      data-search-panel="output"
      {...search.hoverProps}
    >
      <ScrollArea className="flex-1 w-full p-6 font-mono text-sm overflow-y-auto min-h-0">
        <div ref={contentRef}>
          {error ? (
            <pre className="text-red-500 whitespace-pre-wrap break-words">{error}</pre>
          ) : hasContent ? (
            parsed.kind === 'json' ? (
              <JsonTree value={parsed.value} />
            ) : (
              <pre className={cn('text-gray-700 whitespace-pre-wrap break-words')}>
                {parsed.text}
              </pre>
            )
          ) : null}
        </div>
        {!error && !hasContent && (
          <p className="text-gray-400 font-mono">Output akan muncul di sini...</p>
        )}
      </ScrollArea>
      <FormatSelect label="KE:" value={toFormat} formats={formats} onChange={onToFormatChange} />

      {search.open && (
        <PanelSearchToolbar
          inputRef={search.inputRef}
          query={search.query}
          onQueryChange={search.setQuery}
          matchCount={matchCount}
          activeIndex={safeActiveIndex}
          onNext={() => goToMatch(1)}
          onPrev={() => goToMatch(-1)}
          onClose={search.dismiss}
        />
      )}
    </Panel>
  )
}
