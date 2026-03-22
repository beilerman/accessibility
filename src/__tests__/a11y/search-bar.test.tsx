import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { SearchBar } from '@/components/layout/SearchBar'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
}))

describe('SearchBar', () => {
  it('has no axe violations', async () => {
    const { container } = render(<SearchBar />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has role="search" on the form', () => {
    render(<SearchBar />)
    const form = screen.getByRole('search')
    expect(form).toBeInTheDocument()
  })

  it('has an accessible label on the search form', () => {
    render(<SearchBar />)
    const form = screen.getByRole('search')
    expect(form).toHaveAttribute('aria-label', 'Search venues')
  })

  it('has aria-label on the search input', () => {
    render(<SearchBar />)
    const input = screen.getByRole('searchbox')
    expect(input).toHaveAttribute('aria-label', 'Search venues')
  })

  it('uses the custom placeholder when provided', () => {
    render(<SearchBar placeholder="Find a restaurant..." />)
    const input = screen.getByPlaceholderText('Find a restaurant...')
    expect(input).toBeInTheDocument()
  })
})
