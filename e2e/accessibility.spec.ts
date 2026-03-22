import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const pages = [
  { name: 'Homepage', path: '/' },
  { name: 'Browse Venues', path: '/venues' },
  { name: 'Venue Detail', path: '/venues/braxton-brewing-company' },
  { name: 'About', path: '/about' },
]

for (const page of pages) {
  test(`${page.name} should have no accessibility violations`, async ({ page: browserPage }) => {
    await browserPage.goto(page.path)
    const results = await new AxeBuilder({ page: browserPage })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(results.violations).toEqual([])
  })
}
