interface PanelProps {
  children: React.ReactNode
  className?: string
}

export default function Panel({ children, className = '' }: PanelProps) {
  return (
    <div className={`flex flex-col rounded-xl border border-gray-200 overflow-hidden h-full ${className}`}>
      {children}
    </div>
  )
}
