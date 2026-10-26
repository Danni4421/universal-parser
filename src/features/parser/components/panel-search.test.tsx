import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import ParserEditor from './parser-editor'
import ParserOutput from './parser-output'
import type { OutputType } from '@/types'

const formats = [
  { value: 'json', label: 'JSON' },
  { value: 'string', label: 'String' },
]

afterEach(cleanup)

const outputOf = (value: unknown) => value as OutputType

function openWithShortcut(panel: 'input' | 'output') {
  const wrapper = document.querySelector(`[data-search-panel="${panel}"]`)
  if (!wrapper) throw new Error(`panel ${panel} not found`)
  fireEvent.mouseEnter(wrapper)
  fireEvent.keyDown(window, { key: 'f', ctrlKey: true })
  return screen.getByLabelText('Kata kunci pencarian')
}

describe('in-panel search', () => {
  it('opens a scoped toolbar on Ctrl+F while the output is hovered', () => {
    render(
      <ParserOutput
        output={outputOf({ name: 'budi', city: 'bandung' })}
        toFormat="json"
        formats={formats}
        onToFormatChange={() => {}}
      />,
    )

    const input = openWithShortcut('output')
    fireEvent.change(input, { target: { value: 'bandung' } })

    expect(screen.getByText('1/1')).toBeTruthy()
    expect(screen.getByRole('search')).toBeTruthy()
  })

  it('does not open the toolbar when no panel is hovered', () => {
    render(
      <ParserOutput
        output={outputOf({ name: 'budi' })}
        toFormat="json"
        formats={formats}
        onToFormatChange={() => {}}
      />,
    )

    fireEvent.keyDown(window, { key: 'f', ctrlKey: true })

    expect(screen.queryByRole('search')).toBeNull()
  })

  it('highlights every match in the input textarea', () => {
    render(
      <ParserEditor
        value={'{"name":"budi","alias":"budi"}'}
        onChange={() => {}}
        onParse={vi.fn()}
        parserType="json-to-json"
        fromFormat="json"
        formats={formats}
        onFromFormatChange={() => {}}
      />,
    )

    const input = openWithShortcut('input')
    fireEvent.change(input, { target: { value: 'budi' } })

    expect(screen.getByText('1/2')).toBeTruthy()

    const marks = document.querySelectorAll('[data-search-mirror] mark')
    expect(marks).toHaveLength(2)
    expect(marks[0].getAttribute('data-match-active')).toBe('true')
  })

  it('cycles through matches with Enter and the toolbar buttons', () => {
    render(
      <ParserOutput
        output={outputOf({ first: 'budi', second: 'budi' })}
        toFormat="json"
        formats={formats}
        onToFormatChange={() => {}}
      />,
    )

    const input = openWithShortcut('output')
    fireEvent.change(input, { target: { value: 'budi' } })
    expect(screen.getByText('1/2')).toBeTruthy()

    fireEvent.keyDown(input, { key: 'Enter' })
    expect(screen.getByText('2/2')).toBeTruthy()

    fireEvent.keyDown(input, { key: 'Enter' })
    expect(screen.getByText('1/2')).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: 'Hasil sebelumnya' }))
    expect(screen.getByText('2/2')).toBeTruthy()
  })

  it('closes the toolbar on Escape', () => {
    render(
      <ParserOutput
        output={outputOf({ name: 'budi' })}
        toFormat="json"
        formats={formats}
        onToFormatChange={() => {}}
      />,
    )

    const input = openWithShortcut('output')
    fireEvent.keyDown(input, { key: 'Escape' })

    expect(screen.queryByRole('search')).toBeNull()
  })

  it('reopens the toolbar while the panel is still hovered', () => {
    render(
      <ParserOutput
        output={outputOf({ name: 'budi' })}
        toFormat="json"
        formats={formats}
        onToFormatChange={() => {}}
      />,
    )

    const input = openWithShortcut('output')
    fireEvent.keyDown(input, { key: 'Escape' })
    expect(screen.queryByRole('search')).toBeNull()

    fireEvent.keyDown(window, { key: 'f', ctrlKey: true })
    expect(screen.getByRole('search')).toBeTruthy()
  })
})
