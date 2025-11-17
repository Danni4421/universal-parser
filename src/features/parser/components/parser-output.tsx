import { useMemo } from 'react'
import type { OutputType } from '@/types'

export interface ParserOutputProps {
  output: OutputType
  error?: string
}

export default function ParserOutput({ output, error }: ParserOutputProps) {
  const { formatted, isJson } = useMemo(() => {
    if (output === null) {
      return { formatted: '', isJson: false }
    }

    if (typeof output === 'object') {
      try {
        return { formatted: JSON.stringify(output, null, 2), isJson: true }
      } catch {
        return { formatted: String(output), isJson: false }
      }
    }

    if (typeof output === 'string') {
      const trimmed = output.trim()

      try {
        const parsed = JSON.parse(trimmed)
        return { formatted: JSON.stringify(parsed, null, 2), isJson: true }
      } catch {
        try {
          const once = JSON.parse(trimmed)
          if (typeof once === 'string') {
            try {
              const twice = JSON.parse(once)
              return { formatted: JSON.stringify(twice, null, 2), isJson: true }
            } catch {
              return { formatted: once, isJson: false }
            }
          }
        } catch {
          // not JSON
        }

        return { formatted: output, isJson: false }
      }
    }

    return { formatted: String(output), isJson: false }
  }, [output])

  return (
    <div className="flex flex-col h-full">
      <label className="block text-sm font-semibold text-gray-300 mb-3">
        Output:
      </label>
      <div className="w-full flex-1 bg-slate-900 p-6 font-mono text-sm overflow-auto min-h-[300px] rounded-lg border border-slate-700">
        {error ? (
          <pre className="text-red-400 whitespace-pre-wrap wrap-break-word">
            {error}
          </pre>
        ) : formatted ? (
          <pre
            className={
              'text-emerald-400 ' +
              (isJson
                ? 'whitespace-pre wrap-break-word'
                : 'whitespace-pre-wrap wrap-break-word')
            }
          >
            {formatted}
          </pre>
        ) : (
          <p className="text-slate-500">Output akan muncul di sini...</p>
        )}
      </div>
    </div>
  )
}
