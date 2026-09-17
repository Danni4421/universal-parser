import type { HistoryEntry } from '@/features/parser/stores/use-parser'

interface HistoryItemProps {
  entry: HistoryEntry
  onRestore: (entry: HistoryEntry) => void
}

export default function HistoryItem({ entry, onRestore }: HistoryItemProps) {
  return (
    <button
      onClick={() => onRestore(entry)}
      className="flex items-center gap-4 text-left px-4 py-3 bg-white border border-gray-200 rounded-lg hover:border-gray-400 transition-colors group"
    >
      <span className="text-xs text-gray-400 font-mono shrink-0 w-20">
        {entry.fromFormat} → {entry.toFormat}
      </span>
      <span className="text-sm text-gray-600 font-mono truncate flex-1 group-hover:text-gray-900">
        {entry.input.slice(0, 60)}
      </span>
      <span className="text-xs text-gray-300 shrink-0">
        {new Date(entry.at).toLocaleTimeString()}
      </span>
    </button>
  )
}
