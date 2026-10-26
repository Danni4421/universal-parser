'use client'

import { cn } from 'cn'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface FormatSelectProps {
  label: string
  value: string
  formats: { value: string; label: string }[]
  onChange: (value: string) => void
}

export default function FormatSelect({ label, value, formats, onChange }: FormatSelectProps) {
  return (
    <div className={cn('flex justify-end items-center px-4 py-2 border-t border-gray-100 shrink-0')}>
      <Label className={cn('text-xs font-semibold text-gray-400 mr-2 tracking-wide')}>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={cn('text-sm text-gray-700 font-semibold bg-transparent border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gray-300 cursor-pointer')}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {formats.map((f) => (
            <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}