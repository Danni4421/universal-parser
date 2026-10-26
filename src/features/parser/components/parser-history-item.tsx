import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'
import type { HistoryEntry } from '@/features/parser/stores/use-parser'
import { cn } from 'cn'

interface HistoryItemProps {
  entry: HistoryEntry
  onRestore: (entry: HistoryEntry) => void
}

export default function HistoryItem({ entry, onRestore }: HistoryItemProps) {
  return (
    <Button
      variant="ghost"
      onClick={() => onRestore(entry)}
      className={cn('w-full flex items-center gap-4 text-left px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors group justify-start')}
    >
      <Badge variant="secondary" className="text-xs font-mono shrink-0">
        {entry.fromFormat} → {entry.toFormat}
      </Badge>
      <span className="text-sm text-gray-600 font-mono truncate flex-1 group-hover:text-gray-900">
        {entry.input.slice(0, 60)}
      </span>
      <span className="text-xs text-gray-300 shrink-0 flex items-center gap-1">
        <Clock className="size-3" />
        {new Date(entry.at).toLocaleTimeString()}
      </span>
    </Button>
  )
}