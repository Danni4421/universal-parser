import { useMemo } from 'react'
import Panel from './parser-panel'
import FormatSelect from './parser-format-select'
import type { OutputType } from '@/types'

export interface ParserOutputProps {
  output: OutputType
  error?: string
  toFormat: string
  formats: { value: string; label: string }[]
  onToFormatChange: (format: string) => void
}

export default function ParserOutput({ output, error, toFormat, formats, onToFormatChange }: ParserOutputProps) {
  const { formatted, isJson } = useMemo(() => {
    if (output === null) return { formatted: '', isJson: false }

    if (typeof output === 'object') {
      try { return { formatted: JSON.stringify(output, null, 2), isJson: true } }
      catch { return { formatted: String(output), isJson: false } }
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
            } catch { return { formatted: once, isJson: false } }
          }
        } catch {} // not JSON
        return { formatted: output, isJson: false }
      }
    }

    return { formatted: String(output), isJson: false }
  }, [output])

  return (
    <Panel className="bg-[#f0efed]">
      <div className="flex-1 w-full p-6 font-mono text-sm overflow-y-auto min-h-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {error ? (
          <pre className="text-red-500 whitespace-pre-wrap break-words">{error}</pre>
        ) : formatted ? (
          <pre className={'text-gray-700 ' + (isJson ? 'whitespace-pre break-words' : 'whitespace-pre-wrap break-words')}>
            {formatted}
          </pre>
        ) : (
          <p className="text-gray-400 font-mono">Output akan muncul di sini...</p>
        )}
      </div>
      <FormatSelect label="KE:" value={toFormat} formats={formats} onChange={onToFormatChange} />
    </Panel>
  )
}
