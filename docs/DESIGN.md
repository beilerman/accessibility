# Threshold design system

Introduced November 8, 2026. The tokens and component styles live in `src/app/globals.css`.

## Idea

A warm, editorial field guide. The signature shape is the doorway arch, a literal threshold: it is the logo, it frames the three real local photos in the homepage hero, and it rounds the tops of icon chips and the reviewer badge.

## Palette

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--background` | `#FBF8F2` | `#0F1513` | warm paper |
| `--foreground` | `#17211F` | `#EDEDED` | text |
| `--accent` | `#0B5F63` | `#5FD4C4` | river teal: links, buttons, eyebrows |
| `--accent-soft` | `#DDEBE7` | `#16302C` | tinted panels (Threshold reviews) |
| `--ink` | `#10332F` | `#132522` | dark bands: stats, visual guide, footer |
| `--sun` | `#F2B544` | `#F2B544` | marigold highlight: "Firsthand" badges only, always with dark text |

Every text and background pair meets WCAG AA. The browser tests run axe contrast checks on every public page, and the redesign was also scanned in dark mode, on phones, with the mobile menu open and at 320px.

## Type

- **Fraunces** for headings (soft, warm serif). The `WONK` axis is fixed at 0 so large sizes keep a plain, legible ampersand.
- **Atkinson Hyperlegible Next** for body text. The Braille Institute designed it so that easily confused characters stay distinct for low-vision readers.
- Base size is 17px; the smallest text is about 12.5px (photo credits).

## Rules

- Detail pages show photos in full frame. Cards crop to 3:2 for a consistent grid.
- Only real, credited photos appear in the hero. Each arch links to its place page, and credits sit directly below.
- AI imagery keeps its label wherever it appears.
- Motion is limited to hover lifts and the hero frames rising in. Text never animates opacity, and `prefers-reduced-motion` disables all of it.
- Interactive targets are at least 44px tall.
