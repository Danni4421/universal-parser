import { useEffect, useRef } from 'react'
import { executeParse } from '../utils/executor'
import type { OutputType } from '@/types'

export interface ParserEditorProps {
  value: string
  onChange: (value: string) => void
  onParse: (result: OutputType, error?: string) => void
  parserType: string
  placeholder?: string
}

export default function ParserEditor({
  value,
  onChange,
  onParse,
  parserType,
  placeholder = 'Enter text...',
}: ParserEditorProps) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto'
      ref.current.style.height = Math.max(ref.current.scrollHeight, 300) + 'px'
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
    <div className="flex flex-col h-full">
      <label className="block text-sm font-semibold text-gray-300 mb-3">
        Input:
      </label>
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full flex-1 bg-slate-900 text-slate-100 p-6 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-500 min-h-[300px] rounded-lg"
        spellCheck="false"
      />
    </div>
  )
}
