import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ParserEditor, ParserOutput } from '../features/parser/components'
import { useParser } from '../features/parser/stores/use-parser'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const { fromFormat, toFormat, setFromFormat, setToFormat } = useParser()

  const formats = [
    { value: 'json', label: 'JSON' },
    { value: 'string', label: 'String' },
    { value: 'base64', label: 'Base64' },
    { value: 'uri', label: 'URI' },
  ]

  const handleParse = (result: string, err?: string) => {
    if (err) {
      setError(err)
      setOutput('')
    } else {
      setOutput(result)
      setError('')
    }
  }

  const parserType = `${fromFormat}-to-${toFormat}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Universal Parser
          </h1>
          <p className="text-gray-400 mb-8">
            Parse & convert data ke format berbeda
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Format Selector */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* From Format */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Dari Format:
                </label>
                <select
                  value={fromFormat}
                  onChange={(e) => setFromFormat(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  {formats.map((fmt) => (
                    <option key={fmt.value} value={fmt.value}>
                      {fmt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* To Format */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Ke Format:
                </label>
                <select
                  value={toFormat}
                  onChange={(e) => setToFormat(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                >
                  {formats.map((fmt) => (
                    <option key={fmt.value} value={fmt.value}>
                      {fmt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="text-gray-400 text-sm mt-3">
              Konversi:{' '}
              <span className="text-blue-400 font-semibold">
                {fromFormat.toUpperCase()}
              </span>{' '}
              →{' '}
              <span className="text-blue-400 font-semibold">
                {toFormat.toUpperCase()}
              </span>
            </p>
          </div>

          <div>
            <ParserEditor
              value={input}
              onChange={setInput}
              onParse={handleParse}
              parserType={parserType}
            />
          </div>

          <div>
            <ParserOutput output={output} error={error} />
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-6 p-4 bg-red-900/30 border border-red-700 rounded-lg">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}
