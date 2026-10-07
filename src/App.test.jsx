import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the Burnsy brand and name', () => {
    render(<App />)
    expect(screen.getAllByText('Burnsy').length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { level: 1, name: 'Jason Burns' })).toBeInTheDocument()
  })

  it('links to live arcade projects', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: /Tic-Tac-Toe Arcade/i })).toHaveAttribute(
      'href',
      'https://tictactoe.burnsy.me',
    )
    expect(screen.getByRole('link', { name: /Connect 4 Retro/i })).toHaveAttribute(
      'href',
      'https://connect4.burnsy.me',
    )
  })
})
