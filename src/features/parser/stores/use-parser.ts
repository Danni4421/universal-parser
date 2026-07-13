import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface HistoryEntry {
  id: string
  input: string
  fromFormat: string
  toFormat: string
  preview: string // first 60 chars of output
  at: number
}

export interface ParserState {
  fromFormat: string
  toFormat: string
  history: HistoryEntry[]
  setFromFormat: (format: string) => void
  setToFormat: (format: string) => void
  addHistory: (entry: Omit<HistoryEntry, 'id' | 'at'>) => void
  reset: () => void
}

const initialState = {
  fromFormat: 'json',
  toFormat: 'base64',
  history: [] as HistoryEntry[],
}

export const useParser = create<ParserState>()(
  persist(
    (set) => ({
      ...initialState,
      setFromFormat: (format) => set({ fromFormat: format }),
      setToFormat: (format) => set({ toFormat: format }),
      // ponytail: unshift new entry, slice to 10 (drops oldest at bottom)
      addHistory: (entry) =>
        set((s) => ({
          history: [
            { ...entry, id: crypto.randomUUID(), at: Date.now() },
            ...s.history,
          ].slice(0, 10),
        })),
      reset: () => set(initialState),
    }),
    { name: 'parser-store' },
  ),
)
