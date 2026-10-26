import HistoryItem from './parser-history-item'
import { History } from 'lucide-react'
import type { HistoryEntry } from '@/features/parser/stores/use-parser'
import { cn } from 'cn'

interface HistoryListProps {
  history: HistoryEntry[]
  onRestore: (entry: HistoryEntry) => void
}

export default function HistoryList({ history, onRestore }: HistoryListProps) {
  if (!history.length) return null

  return (
    <div className={cn('mt-2 mb-6')}>
      <p className={cn('text-xs font-semibold text-gray-400 tracking-wide uppercase mb-3 flex items-center gap-2')}>
        <History className="size-3" />
        Riwayat ({history.length}/10)
      </p>
      <div className={cn('flex flex-col gap-2')}>
        {history.map((h) => (
          <HistoryItem key={h.id} entry={h} onRestore={onRestore} />
        ))}
      </div>
    </div>
  )
}