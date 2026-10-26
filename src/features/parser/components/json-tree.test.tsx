import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import JsonTree from './json-tree'

afterEach(cleanup)

describe('JsonTree', () => {
  it('renders nested keys and collapses a node', () => {
    render(<JsonTree value={{ user: { name: 'budi', tags: ['a', 'b'] }, count: 3 }} />)

    expect(screen.getByText('"name":')).toBeTruthy()
    expect(screen.getByText('"budi"')).toBeTruthy()
    expect(screen.getByText('0:')).toBeTruthy()

    const toggle = screen.getByRole('button', { name: /"user":/ })
    expect(toggle.getAttribute('aria-expanded')).toBe('true')

    fireEvent.click(toggle)
    expect(toggle.getAttribute('aria-expanded')).toBe('false')
    expect(screen.queryByText('"name":')).toBeNull()
    expect(screen.getByText('2 keys')).toBeTruthy()

    fireEvent.click(toggle)
    expect(screen.getByText('"name":')).toBeTruthy()
  })

  it('shows an empty marker for empty containers', () => {
    render(<JsonTree value={{ list: [] }} />)
    const toggle = screen.getByRole('button', { name: /"list":/ })
    fireEvent.click(toggle)
    expect(screen.getByText('empty')).toBeTruthy()
  })

  it('renders primitive roots', () => {
    render(<JsonTree value={42} />)
    expect(screen.getByText('42')).toBeTruthy()
  })
})
