import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { VenueCard } from '@/components/venue/VenueCard'
import type { Venue } from '@/types/database'

// Mock next/link to render a plain anchor
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children, ...props }: { href: string; children: React.ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}))

const mockVenue: Venue = {
  id: 'test-venue-1',
  name: 'Test Coffee Shop',
  slug: 'test-coffee-shop',
  address_line1: '123 Main St',
  city: 'Cincinnati',
  state: 'OH',
  zip: '45202',
  latitude: 39.1,
  longitude: -84.5,
  category: 'coffee_shop',
  overall_rating: 'accessible',
  has_editorial_review: false,
  featured: false,
  created_at: '2025-01-01T00:00:00Z',
  updated_at: '2025-01-01T00:00:00Z',
}

describe('VenueCard', () => {
  it('has no axe violations', async () => {
    const { container } = render(<VenueCard venue={mockVenue} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('renders venue name in a heading', () => {
    render(<VenueCard venue={mockVenue} />)
    const heading = screen.getByRole('heading', { name: /Test Coffee Shop/i })
    expect(heading).toBeInTheDocument()
  })

  it('links to the venue detail page via slug', () => {
    render(<VenueCard venue={mockVenue} />)
    const link = screen.getByRole('link', { name: /Test Coffee Shop/i })
    expect(link).toHaveAttribute('href', '/venues/test-coffee-shop')
  })

  it('displays city and state', () => {
    render(<VenueCard venue={mockVenue} />)
    expect(screen.getByText('Cincinnati, OH')).toBeInTheDocument()
  })

  it('renders the accessibility rating badge', () => {
    render(<VenueCard venue={mockVenue} />)
    // sm badge uses aria-label
    const badge = screen.getByRole('img')
    expect(badge).toHaveAttribute('aria-label', 'Accessibility rating: Accessible')
  })

  it('renders excerpt when provided', () => {
    render(<VenueCard venue={mockVenue} excerpt="A lovely accessible cafe." />)
    expect(screen.getByText('A lovely accessible cafe.')).toBeInTheDocument()
  })

  it('renders photo with alt text when photoUrl provided', () => {
    render(<VenueCard venue={mockVenue} photoUrl="https://example.com/photo.jpg" />)
    const img = screen.getByRole('img', { name: /Test Coffee Shop exterior view/i })
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg')
  })
})
