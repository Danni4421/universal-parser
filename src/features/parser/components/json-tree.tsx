'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from 'cn'

const isContainer = (value: unknown): value is Record<string, unknown> | Array<unknown> =>
  typeof value === 'object' && value !== null

const primitiveClass = (value: unknown): string => {
  if (value === null) return 'text-gray-400 italic'
  switch (typeof value) {
    case 'string':
      return 'text-emerald-600'
    case 'number':
      return 'text-blue-600'
    case 'boolean':
      return 'text-purple-600'
    default:
      return 'text-gray-600'
  }
}

const primitiveText = (value: unknown): string => {
  if (typeof value === 'string') return JSON.stringify(value)
  return String(value)
}

interface JsonNodeProps {
  label?: string
  value: unknown
  isIndex?: boolean
}

function JsonNode({ label, value, isIndex = false }: JsonNodeProps) {
  const [open, setOpen] = useState(true)

  const hasLabel = label !== undefined

  if (!isContainer(value)) {
    return (
      <div className="flex gap-1.5">
        {hasLabel && (
          <span className="text-gray-500 shrink-0">
            {isIndex ? `${label}:` : `"${label}":`}
          </span>
        )}
        <span className={cn('break-all', primitiveClass(value))}>{primitiveText(value)}</span>
      </div>
    )
  }

  const isArray = Array.isArray(value)
  const entries: Array<[string, unknown]> = isArray
    ? (value).map((item, index) => [String(index), item] as [string, unknown])
    : Object.entries(value)
  const count = entries.length
  const openBracket = isArray ? '[' : '{'
  const closeBracket = isArray ? ']' : '}'

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center gap-1 text-left cursor-pointer hover:bg-black/5 rounded-sm -mx-1 px-1"
      >
        {hasLabel && (
          <span className="text-gray-500 shrink-0">
            {isIndex ? `${label}:` : `"${label}":`}
          </span>
        )}
        {open ? (
          <ChevronDown className="size-3.5 shrink-0 text-gray-400" />
        ) : (
          <ChevronRight className="size-3.5 shrink-0 text-gray-400" />
        )}
        <span className="text-gray-400 shrink-0">{openBracket}</span>
        {!open && (
          <>
            <span className="text-gray-400 text-xs shrink-0">
              {count === 0 ? 'empty' : `${count} ${isArray ? 'items' : 'keys'}`}
            </span>
            <span className="text-gray-400 shrink-0">{closeBracket}</span>
          </>
        )}
      </button>

      {open && (
        <div className="ml-1.5 border-l border-gray-200 pl-4">
          {entries.map(([key, item]) => (
            <JsonNode key={key} label={key} value={item} isIndex={isArray} />
          ))}
          <span className="text-gray-400">{closeBracket}</span>
        </div>
      )}
    </div>
  )
}

export interface JsonTreeProps {
  value: unknown
}

export default function JsonTree({ value }: JsonTreeProps) {
  return (
    <div className="font-mono text-sm leading-6 text-gray-700 whitespace-pre-wrap break-words">
      <JsonNode value={value} />
    </div>
  )
}
