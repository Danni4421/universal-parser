import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { useParser } from './stores/use-parser'
import { routeTree } from '@/routeTree.gen'

// keep the root route from mounting router devtools (they fail to unmount in jsdom)
import.meta.env.PROD = true

const HISTORY_DEBOUNCE_MS = 800
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function renderApp() {
  const router = createRouter({ routeTree, context: {} })
  render(<RouterProvider router={router} />)
  return await screen.findByRole('textbox')
}

function type(input: HTMLElement, value: string) {
  fireEvent.change(input, { target: { value } })
}

const typedValue = () => document.querySelector('textarea')?.value

afterEach(cleanup)

beforeEach(() => {
  useParser.setState({
    history: [],
    fromFormat: 'json',
    toFormat: 'base64',
  })
})

describe('app parse flow', () => {
  it('keeps the input box a fixed size so overflow scrolls inside it', async () => {
    const input = await renderApp()

    expect(input.className).toContain('field-sizing-fixed')
    expect(input.className).not.toContain('field-sizing-content')
    expect(input.className).toContain('overflow-y-auto')
    expect(input.className).toContain('min-h-0')

    const panel = document.querySelector('[data-slot="card"]')
    expect(panel?.className).toContain('overflow-hidden')

    const grid = panel?.parentElement
    expect(grid?.className).toContain('h-[calc(100vh-250px)]')
    expect(grid?.className).toContain('grid-rows-2')

    const scrollArea = document.querySelector('[data-slot="scroll-area"]')
    expect(scrollArea?.className).toContain('min-h-0')
    expect(scrollArea?.className).toContain('flex-1')
  })

  it('keeps parsing json after the first conversion', async () => {
    const input = await renderApp()

    type(input, '{"a":1}')
    await waitFor(() =>
      expect(screen.getByText('eyJhIjoxfQ==')).toBeTruthy(),
    )
    expect(useParser.getState().fromFormat).toBe('json')
    expect(screen.queryByText(/not supported yet/)).toBeNull()

    type(input, '{"a":1,"b":2}')
    await waitFor(() =>
      expect(screen.getByText('eyJhIjoxLCJiIjoyfQ==')).toBeTruthy(),
    )
    expect(useParser.getState().fromFormat).toBe('json')
    expect(screen.queryByText(/not supported yet/)).toBeNull()
  })

  it('converts plain text with the default base64 target', async () => {
    const input = await renderApp()

    type(input, 'hello world')
    await waitFor(() =>
      expect(screen.getByText('aGVsbG8gd29ybGQ=')).toBeTruthy(),
    )
    expect(useParser.getState().fromFormat).toBe('string')
    expect(screen.queryByText(/not supported yet/)).toBeNull()
  })

  it('does not flood history while typing', async () => {
    const input = await renderApp()

    for (let i = 1; i <= 15; i++) {
      type(input, `{"n":${i}}`)
      await sleep(15)
    }

    await sleep(HISTORY_DEBOUNCE_MS + 200)
    const afterTyping = useParser.getState().history.length
    expect(afterTyping).toBeLessThanOrEqual(2)

    await sleep(300)
    expect(useParser.getState().history.length).toBe(afterTyping)
  })

  it('restores a history entry without losing its format', async () => {
    const input = await renderApp()

    type(input, '{"restored":true}')
    await waitFor(() =>
      expect(useParser.getState().history.length).toBe(1),
    )

    type(input, '')
    await sleep(HISTORY_DEBOUNCE_MS + 200)

    fireEvent.click(screen.getByRole('button', { name: /"restored":true/ }))

    await waitFor(() => expect(typedValue()).toBe('{"restored":true}'))
    expect(useParser.getState().fromFormat).toBe('json')
    expect(screen.queryByText(/not supported yet/)).toBeNull()
    expect(useParser.getState().history.length).toBe(1)
  })
})
