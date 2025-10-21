import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ParserState {
  fromFormat: string
  toFormat: string
  setFromFormat: (format: string) => void
  setToFormat: (format: string) => void
  reset: () => void
}

const initialState = {
  fromFormat: 'json',
  toFormat: 'base64',
}

export const useParser = create<ParserState>()(
  persist(
    (set) => ({
      ...initialState,
      setFromFormat: (format: string) => set({ fromFormat: format }),
      setToFormat: (format: string) => set({ toFormat: format }),
      reset: () => set(initialState),
    }),
    {
      name: 'parser-store',
    },
  ),
)
