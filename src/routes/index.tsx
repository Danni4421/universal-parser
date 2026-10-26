import { createFileRoute } from '@tanstack/react-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from 'cn'
import { ParserEditor, ParserOutput } from '../features/parser/components'
import { useParser } from '../features/parser/stores/use-parser'
import HistoryList from '../features/parser/components/parser-history-list'
import SiteFooter from '../features/parser/components/parser-site-footer'
import type { HistoryEntry } from '../features/parser/stores/use-parser'
import type { OutputType } from '@/types'

export const Route = createFileRoute('/')({
  component: App,
})

const formats = [
  { value: 'json', label: 'JSON' },
  { value: 'string', label: 'String' },
  { value: 'base64', label: 'Base64' },
  { value: 'uri', label: 'URI' },
  { value: 'graphql', label: 'GraphQL' },
]

const HISTORY_DEBOUNCE_MS = 800

function App() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<OutputType>(null)
  const [error, setError] = useState('')

  const { fromFormat, toFormat, setFromFormat, setToFormat, history, addHistory } = useParser()

  const historyTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const parserType = `${fromFormat}-to-${toFormat}`

  const handleParse = useCallback(
    (result: OutputType, err?: string) => {
      if (err) { setError(err); setOutput(null) }
      else { setOutput(result); setError('') }

      if (historyTimer.current) {
        clearTimeout(historyTimer.current)
        historyTimer.current = null
      }
      if (err || !input.trim()) return

      const serialized =
        typeof result === 'string' ? result : JSON.stringify(result)
      const preview = serialized ? serialized.slice(0, 60) : ''

      historyTimer.current = setTimeout(() => {
        historyTimer.current = null
        addHistory({ input, fromFormat, toFormat, preview })
      }, HISTORY_DEBOUNCE_MS)
    },
    [input, fromFormat, toFormat, addHistory],
  )

  useEffect(() => {
    return () => {
      if (historyTimer.current) clearTimeout(historyTimer.current)
    }
  }, [])

  const restoreHistory = (entry: HistoryEntry) => {
    setInput(entry.input)
    setFromFormat(entry.fromFormat)
    setToFormat(entry.toFormat)
  }

  return (
    <div className="min-h-screen bg-[#f9f8f5] flex flex-col">
      <main className="flex-1 flex flex-col p-4 md:p-8 pb-4 max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-6 h-[calc(100vh-250px)] min-h-[30rem]">
          <ParserEditor
            value={input}
            onChange={setInput}
            onParse={handleParse}
            parserType={parserType}
            fromFormat={fromFormat}
            formats={formats}
            onFromFormatChange={setFromFormat}
          />
          <ParserOutput
            output={output}
            error={error}
            toFormat={toFormat}
            formats={formats}
            onToFormatChange={setToFormat}
          />
        </div>

        <div className={cn('flex flex-col items-center mt-8 mb-4 gap-3')}>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <HistoryList history={history} onRestore={restoreHistory} />
      </main>

      <div className="w-full px-4 md:px-8 pb-8">
        <SiteFooter />
      </div>
    </div>
  )
}
