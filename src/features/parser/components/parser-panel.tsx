import * as React from 'react'
import { cn } from 'cn'
import { Card, CardContent } from '@/components/ui/card'

interface PanelProps
  extends Omit<React.ComponentProps<typeof Card>, 'children' | 'className'> {
  children: React.ReactNode
  className?: string
  'data-search-panel'?: 'input' | 'output'
}

export default function Panel({ children, className = '', ...props }: PanelProps) {
  return (
    <Card
      className={cn('relative h-full overflow-hidden border-none bg-white shadow-none', className)}
      {...props}
    >
      <CardContent className="flex-1 min-h-0 p-0 flex flex-col">
        {children}
      </CardContent>
    </Card>
  )
}
