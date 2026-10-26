import { useCallback, useEffect, useRef, useState } from 'react'
import type { FocusEvent } from 'react'

let activeClose: (() => void) | null = null

function claimSearch(close: () => void) {
  if (activeClose && activeClose !== close) activeClose()
  activeClose = close
}

function releaseSearch(close: () => void) {
  if (activeClose === close) activeClose = null
}

/**
 * Scoped "find in panel" behaviour:
 * - Ctrl/Cmd+F opens the search toolbar only while the panel is hovered/focused
 * - only one panel search can be open at a time
 * - Escape closes it and returns focus to the panel
 */
export function usePanelSearch(onCloseFocus?: () => void) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const hoveredRef = useRef(false)
  const focusedRef = useRef(false)
  const openRef = useRef(open)
  openRef.current = open

  const close = useCallback(() => {
    setOpen(false)
  }, [])

  const dismiss = useCallback(() => {
    setOpen(false)
    onCloseFocus?.()
  }, [onCloseFocus])

  useEffect(() => {
    if (!open) return
    claimSearch(close)
    return () => releaseSearch(close)
  }, [open, close])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [open])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isFindShortcut =
        (event.ctrlKey || event.metaKey) &&
        !event.altKey &&
        !event.shiftKey &&
        event.key.toLowerCase() === 'f'

      if (isFindShortcut) {
        if (!hoveredRef.current && !focusedRef.current) return
        event.preventDefault()

        if (openRef.current) {
          inputRef.current?.focus()
          inputRef.current?.select()
        } else {
          setOpen(true)
        }
        return
      }

      if (event.key === 'Escape' && openRef.current) {
        event.preventDefault()
        dismiss()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [dismiss])

  const onMouseEnter = useCallback(() => {
    hoveredRef.current = true
  }, [])

  const onMouseLeave = useCallback(() => {
    hoveredRef.current = false
  }, [])

  const onFocusCapture = useCallback(() => {
    focusedRef.current = true
  }, [])

  const onBlurCapture = useCallback((event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget
    if (next instanceof Node && event.currentTarget.contains(next)) return
    focusedRef.current = false
  }, [])

  return {
    open,
    query,
    setQuery,
    inputRef,
    close,
    dismiss,
    hoverProps: {
      onMouseEnter,
      onMouseLeave,
      onFocusCapture,
      onBlurCapture,
    },
  }
}
