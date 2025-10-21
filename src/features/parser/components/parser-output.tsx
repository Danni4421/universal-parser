export interface ParserOutputProps {
  output: string
  error?: string
}

export default function ParserOutput({ output, error }: ParserOutputProps) {
  return (
    <div className="flex flex-col h-full">
      <label className="block text-sm font-semibold text-gray-300 mb-3">
        Output:
      </label>
      <div className="w-full flex-1 bg-slate-900 p-6 font-mono text-sm overflow-auto min-h-[300px] rounded-lg border border-slate-700">
        {error ? (
          <pre className="text-red-400 whitespace-pre-wrap break-words">
            {error}
          </pre>
        ) : output ? (
          <pre className="text-emerald-400 whitespace-pre-wrap break-words">
            {output}
          </pre>
        ) : (
          <p className="text-slate-500">Output akan muncul di sini...</p>
        )}
      </div>
    </div>
  )
}
