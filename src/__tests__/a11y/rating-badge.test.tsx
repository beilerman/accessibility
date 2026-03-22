import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import { AccessibilityRatingBadge } from '@/components/ui/AccessibilityRatingBadge'
import type { AccessibilityRating } from '@/types/database'

const ratings: AccessibilityRating[] = [
  'accessible',
  'partially_accessible',
  'not_accessible',
  'not_yet_reviewed',
]

describe('AccessibilityRatingBadge', () => {
  for (const rating of ratings) {
    it(`renders "${rating}" variant with no axe violations`, async () => {
      const { container } = render(
        <AccessibilityRatingBadge rating={rating} />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  }

  it('sm size has aria-label instead of visible text', () => {
    render(<AccessibilityRatingBadge rating="accessible" size="sm" />)
    const badge = screen.getByRole('img')
    expect(badge).toHaveAttribute('aria-label', 'Accessibility rating: Accessible')
    expect(badge).not.toHaveTextContent('Accessible')
  })

  it('md size shows visible label text', () => {
    render(<AccessibilityRatingBadge rating="accessible" size="md" />)
    expect(screen.getByText('Accessible')).toBeInTheDocument()
  })

  it('lg size shows visible label text', () => {
    render(<AccessibilityRatingBadge rating="partially_accessible" size="lg" />)
    expect(screen.getByText('Partially Accessible')).toBeInTheDocument()
  })
})
