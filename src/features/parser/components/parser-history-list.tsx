import HistoryItem from './parser-history-item'
import type { HistoryEntry } from '@/features/parser/stores/use-parser'

interface HistoryListProps {
  history: HistoryEntry[]
  onRestore: (entry: HistoryEntry) => void
}

export default function HistoryList({ history, onRestore }: HistoryListProps) {
  if (!history.length) return null

  return (
    <div className="mt-2 mb-6">
      <p className="text-xs font-semibold text-gray-400 tracking-wide uppercase mb-3">
        Riwayat ({history.length}/10)
      </p>
      <div className="flex flex-col gap-2">
        {history.map((h) => (
          <HistoryItem key={h.id} entry={h} onRestore={onRestore} />
        ))}
      </div>
    </div>
  )
}
