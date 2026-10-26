import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from 'cn'
import { executeParse } from '../utils/executor'
import { findMatches, segmentText } from '../lib/search/find-matches'
import { usePanelSearch } from '../hooks/use-panel-search'
import Panel from './parser-panel'
import FormatSelect from './parser-format-select'
import PanelSearchToolbar from './panel-search'
import type { OutputType } from '@/types'
import { Textarea } from '@/components/ui/textarea'

function detectFormat(val: string): string {
  const t = val.trim()
  if (!t) return 'json'
  try { JSON.parse(t); return 'json' } catch {}
  if (t.length >= 8 && t.length % 4 === 0 && /^[A-Za-z0-9+/]+={0,2}$/.test(t)) return 'base64'
  if (/^data:application\/json,/i.test(t) || /%[0-9A-Fa-f]{2}/.test(t)) return 'uri'
  if (/^\s*(query|mutation|subscription|[{(])/i.test(t)) return 'graphql'
  return 'string'
}

export interface ParserEditorProps {
  value: string
  onChange: (value: string) => void
  onParse: (result: OutputType, error?: string) => void
  parserType: string
  placeholder?: string
  fromFormat: string
  formats: Array<{ value: string; label: string }>
  onFromFormatChange: (format: string) => void
}

export default function ParserEditor({
  value,
  onChange,
  onParse,
  parserType,
  placeholder = 'Enter text...',
  fromFormat,
  formats,
  onFromFormatChange,
}: ParserEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const mirrorRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const focusEditor = useCallback(() => {
    textareaRef.current?.focus()
  }, [])

  const search = usePanelSearch(focusEditor)

  const matches = useMemo(
    () => findMatches(value, search.query),
    [value, search.query],
  )
  const matchCount = matches.length
  const safeActiveIndex = matchCount > 0 ? Math.min(activeIndex, matchCount - 1) : -1
  const segments = useMemo(() => segmentText(value, matches), [value, matches])

  useEffect(() => {
    setActiveIndex(0)
  }, [search.query])

  const handleInput = (nextValue: string) => {
    onChange(nextValue)
    if (!nextValue.trim()) return
    const detected = detectFormat(nextValue)
    if (detected !== fromFormat) onFromFormatChange(detected)
  }

  useEffect(() => {
    if (value.trim()) {
      const { result, error } = executeParse(parserType, value)
      onParse(result as OutputType, error)
    } else {
      onParse(null)
    }
  }, [value, parserType, onParse])

  const goToMatch = (delta: number) => {
    if (matchCount === 0) return
    setActiveIndex((safeActiveIndex + delta + matchCount) % matchCount)
  }

  const syncMirrorScroll = (textarea: HTMLTextAreaElement) => {
    const mirror = mirrorRef.current
    if (!mirror) return
    mirror.scrollTop = textarea.scrollTop
    mirror.scrollLeft = textarea.scrollLeft
  }

  useEffect(() => {
    const mirror = mirrorRef.current
    const textarea = textareaRef.current
    if (!search.open || !mirror || !textarea) return

    mirror.scrollTop = textarea.scrollTop
    mirror.scrollLeft = textarea.scrollLeft

    const active = mirror.querySelector<HTMLElement>('[data-match-active="true"]')
    if (!active) return

    const mirrorRect = mirror.getBoundingClientRect()
    const rects = active.getClientRects()
    const rect = rects.length > 0 ? rects[0] : active.getBoundingClientRect()
    const target =
      mirror.scrollTop +
      (rect.top - mirrorRect.top) -
      mirror.clientHeight / 2 +
      rect.height / 2

    mirror.scrollTop = Math.max(0, target)
    textarea.scrollTop = mirror.scrollTop
  }, [search.open, segments, safeActiveIndex])

  return (
    <Panel
      className="bg-white"
      data-search-panel="input"
      {...search.hoverProps}
    >
      <div className="relative flex-1 min-h-0 bg-white">
        {search.open && (
          <div
            ref={mirrorRef}
            aria-hidden="true"
            data-search-mirror=""
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden whitespace-pre-wrap break-words p-6 font-mono text-sm text-transparent"
          >
            {segments.map((segment, index) =>
              segment.match === null ? (
                <span key={index}>{segment.text}</span>
              ) : (
                <mark
                  key={index}
                  data-match-active={
                    segment.match === safeActiveIndex || undefined
                  }
                  className={cn(
                    'rounded-[2px] text-transparent',
                    segment.match === safeActiveIndex
                      ? 'bg-orange-400/70'
                      : 'bg-amber-300/70',
                  )}
                >
                  {segment.text}
                </mark>
              ),
            )}
          </div>
        )}
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => handleInput(e.target.value)}
          onScroll={(e) => syncMirrorScroll(e.currentTarget)}
          placeholder={placeholder}
          className={cn(
            'relative z-10 flex-1 h-full w-full resize-none font-mono border-none text-sm field-sizing-fixed overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-h-0',
            'bg-transparent text-gray-800 p-6 placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:shadow-none focus-visible:border-transparent',
          )}
          spellCheck={false}
        />
      </div>
      <FormatSelect label="DARI:" value={fromFormat} formats={formats} onChange={onFromFormatChange} />

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
