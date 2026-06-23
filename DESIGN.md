# The Outfit House Design Context

## Visual Direction

Industrial, minimal, and premium. The site uses matte near-black surfaces, warm eggshell text, and a single yellow accent. The crown mark and product photography carry personality; decoration should stay restrained.

## Color

- Primary surface: warm near-black, exposed through `--toh-black` and `--bg`.
- Primary text: eggshell, exposed through `--toh-eggshell` and `--fg`.
- Accent: warm yellow, exposed through `--toh-yellow` and `--accent`.
- Accent use should stay deliberate: CTAs, highlights, badges, and select emphasis.

## Typography

- Display: `Bebas Neue`, uppercase, condensed, used for hero and major section headings.
- Body/UI: `Archivo`, used for body copy, controls, and labels.
- Brush: `Permanent Marker`, used sparingly for brand personality, not ordinary UI.

## Layout

- Sharp industrial surfaces with low radii.
- Product grids and category cards should feel dense but scannable.
- Mobile is the dominant shopping context, so touch targets and single-column fallbacks matter.
- Section structure should use real content and imagery rather than repeated decorative labels.

## Accessibility And Motion

- Maintain visible focus rings.
- Preserve semantic heading order.
- Animations always play; `prefers-reduced-motion` is intentionally NOT honored
  (it was disabling motion on machines with Windows "Animation effects" off).
- Muted text on dark surfaces must still meet WCAG AA contrast.

## Components

- Product cards: image-forward, compact metadata, WhatsApp CTA.
- Footer: navigation groups are visual labels, not document headings.
- Category filters: button tabs with clear pressed state.
- WhatsApp actions: primary conversion buttons, always type-safe and keyboard reachable.

