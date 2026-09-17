interface FormatSelectProps {
  label: string
  value: string
  formats: { value: string; label: string }[]
  onChange: (value: string) => void
}

export default function FormatSelect({ label, value, formats, onChange }: FormatSelectProps) {
  return (
    <div className="flex justify-end items-center px-4 py-2 border-t border-gray-100 shrink-0">
      <label className="text-xs font-semibold text-gray-400 mr-2 tracking-wide">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm text-gray-700 font-semibold bg-transparent border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gray-300 cursor-pointer"
      >
        {formats.map((f) => (
          <option key={f.value} value={f.value}>{f.label}</option>
        ))}
      </select>
    </div>
  )
}
