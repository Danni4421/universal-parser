import { useEffect } from 'react'
import Panel from './parser-panel'
import FormatSelect from './parser-format-select'
import { executeParse } from '../utils/executor'
import type { OutputType } from '@/types'

// ponytail: detect format by pattern, cheapest checks first
function detectFormat(val: string): string {
  const t = val.trim()
  if (!t) return 'json'
  try { JSON.parse(t); return 'string' } catch {}
  if (/^[A-Za-z0-9+/]+=*$/.test(t) && t.length % 4 === 0) return 'base64'
  if (/%[0-9A-Fa-f]{2}/.test(t)) return 'uri'
  if (/^\s*(query|mutation|subscription|[\{\(])/i.test(t)) return 'graphql'
  return 'string'
}

export interface ParserEditorProps {
  value: string
  onChange: (value: string) => void
  onParse: (result: OutputType, error?: string) => void
  parserType: string
  placeholder?: string
  fromFormat: string
  formats: { value: string; label: string }[]
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
  useEffect(() => {
    if (value.trim()) {
      const detected = detectFormat(value)
      if (detected !== fromFormat) onFromFormatChange(detected)
    }
  }, [value])

  useEffect(() => {
    if (value.trim()) {
      const { result, error } = executeParse(parserType, value)
      onParse(result as OutputType, error)
    } else {
      onParse(null)
    }
  }, [value, parserType, onParse])

  return (
    <Panel className="bg-white">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 w-full bg-white text-gray-800 p-6 font-mono text-sm resize-none focus:outline-none placeholder-gray-300 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden min-h-0"
        spellCheck="false"
      />
      <FormatSelect label="DARI:" value={fromFormat} formats={formats} onChange={onFromFormatChange} />
    </Panel>
  )
}
