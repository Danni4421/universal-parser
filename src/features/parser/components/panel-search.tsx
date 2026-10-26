import { ChevronDown, ChevronUp, Search, X } from 'lucide-react'
import { cn } from 'cn'
import { Button } from '@/components/ui/button'

export interface PanelSearchToolbarProps {
  inputRef: React.RefObject<HTMLInputElement | null>
  query: string
  onQueryChange: (query: string) => void
  matchCount: number
  activeIndex: number
  onNext: () => void
  onPrev: () => void
  onClose: () => void
  className?: string
}

export default function PanelSearchToolbar({
  inputRef,
  query,
  onQueryChange,
  matchCount,
  activeIndex,
  onNext,
  onPrev,
  onClose,
  className,
}: PanelSearchToolbarProps) {
  const hasMatches = matchCount > 0

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (event.shiftKey) onPrev()
      else onNext()
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      event.stopPropagation()
      onClose()
    }
  }

  return (
    <div
      role="search"
      aria-label="Cari di panel ini"
      className={cn(
        'absolute right-3 top-3 z-20 flex items-center gap-1 rounded-lg border border-gray-200 bg-white/95 px-2 py-1 shadow-lg backdrop-blur animate-in fade-in slide-in-from-top-1 duration-150',
        className,
      )}
    >
      <Search aria-hidden="true" className="size-3.5 shrink-0 text-gray-400" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Cari..."
        aria-label="Kata kunci pencarian"
        spellCheck={false}
        autoComplete="off"
        className="h-7 w-40 min-w-0 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
      />
      <span
        aria-live="polite"
        className="min-w-12 text-right text-xs tabular-nums text-gray-400"
      >
        {hasMatches ? `${activeIndex + 1}/${matchCount}` : query ? '0/0' : ''}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        onClick={onPrev}
        onMouseDown={(event) => event.preventDefault()}
        disabled={!hasMatches}
        aria-label="Hasil sebelumnya"
        className="text-gray-500"
      >
        <ChevronUp />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        onClick={onNext}
        onMouseDown={(event) => event.preventDefault()}
        disabled={!hasMatches}
        aria-label="Hasil berikutnya"
        className="text-gray-500"
      >
        <ChevronDown />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        onClick={onClose}
        aria-label="Tutup pencarian"
        className="text-gray-500"
      >
        <X />
      </Button>
    </div>
  )
}
