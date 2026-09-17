import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ParserEditor, ParserOutput } from '../features/parser/components'
import { useParser } from '../features/parser/stores/use-parser'
import { executeParse } from '../features/parser/utils/executor'
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

function App() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<OutputType>(null)
  const [error, setError] = useState('')

  const { fromFormat, toFormat, setFromFormat, setToFormat, history, addHistory } = useParser()

  const handleParse = (result: OutputType, err?: string) => {
    if (err) { setError(err); setOutput(null) }
    else { setOutput(result); setError('') }
  }

  const parserType = `${fromFormat}-to-${toFormat}`

  const handleButton = () => {
    if (!input.trim()) return
    const { result, error: err } = executeParse(parserType, input)
    handleParse(result as OutputType, err)
    if (!err) {
      addHistory({
        input,
        fromFormat,
        toFormat,
        preview: (typeof result === 'string' ? result : JSON.stringify(result)).slice(0, 60),
      })
    }
  }

  const restoreHistory = (entry: HistoryEntry) => {
    setInput(entry.input)
    setFromFormat(entry.fromFormat)
    setToFormat(entry.toFormat)
  }

  return (
    <div className="min-h-screen bg-[#f9f8f5] flex flex-col">
      <main className="flex-1 flex flex-col p-8 pb-20 max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-2 gap-6 h-[calc(100vh-250px)]">
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

        <div className="flex flex-col items-center mt-8 mb-4 gap-3">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={handleButton}
            className="px-8 py-3 bg-black text-white text-base font-medium rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Proses Konversi <span>⚡</span>
          </button>
        </div>

        <HistoryList history={history} onRestore={restoreHistory} />
      </main>

      <SiteFooter />
    </div>
  )
}
