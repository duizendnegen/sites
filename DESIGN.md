```markdown
# High-End Editorial Design System
 
## 1. Overview & Creative North Star: "The Digital Cartographer"
The Creative North Star for this design system is **The Digital Cartographer**. This is not a standard personal portfolio; it is an exercise in restraint, authority, and editorial precision. This system is product-first: clear information hierarchy, fast scanning, sharp edges.
 
To break the "template" look, we use **intentional asymmetry**. Layouts should avoid perfect 50/50 splits. Instead, use the Spacing Scale to create wide, luxurious margins and offset content blocks. We lean into the high-contrast tension between a sharp, modern Sans-Serif and a sophisticated, academic Serif to signal both technical modernism and intellectual depth.
 
---
 
## 2. Colors: The Navy & Sage Palette
The palette pairs a deep navy as the primary brand color against a soft sage green accent, on a cool near-white background. This creates warmth and distinction without resorting to pure black-and-white contrast.
 
### Color Tokens
| Token | Hex | Usage |
|---|---|---|
| `--color-navy` | `#110E38` | Primary text, brand name, headings, default link color |
| `--color-sage` | `#9DD1A7` | Decorative accent (hero bar, active nav underline) |
| `--color-teal` | `#16a085` | Hover state for links |
| `--color-bg` | `#f2f6ff` | Page background, footer background |
| `--color-bg-alt` | `#ffffff` | Card/content surface (articles section, portrait frame) |
| `--color-border` | `#d5dce3` | Subtle structural borders (footer top, portrait frame) |
 
### The "No-Line" Rule
**Borders are strictly prohibited for sectioning.** To define the end of a hero section or the start of a footer, you must use background color shifts. A `--color-bg` section transitions into a `--color-bg-alt` section to create a boundary. If you feel the urge to draw a line, add `8.5rem` (24) of whitespace instead.
 
### Surface Hierarchy & Nesting
Treat the UI as a physical stack of fine paper.
- **Base Layer:** `--color-bg` (#f2f6ff) — the cool off-white used for the page and footer.
- **Primary Content Area:** `--color-bg-alt` (#ffffff) — used for the articles section and portrait frame to provide a "bright" focus.
 
### The "Glass" Rule
For floating elements like the navigation bar, use **Glassmorphism**: apply `--color-bg` at 90% opacity with `backdrop-filter: blur(8px)`. The nav uses `rgba(242, 246, 255, 0.9)` in practice.
 
---
 
## 3. Typography: The Product Voice
Typography is a functional asset. We use a sans-serif pairing: **Manrope** for high-impact headlines with tight tracking, and **Inter** for body and label text.
 
| Token | Font | Weights loaded | Role |
|---|---|---|---|
| `--font-headline` | Manrope, sans-serif | 400, 600, 700, 800 | Headlines, nav brand, nav links, card titles |
| `--font-body` | Inter, sans-serif | 400, 500, 600, 700 | Body paragraphs, footer copy |
| `--font-label` | Inter, sans-serif | 400, 500, 600 | Metadata, tags, table headers, overline text |
 
*   **Display & Headlines (Manrope):** Hero headline uses `text-5xl md:text-8xl` with `tracking-tighter` and `font-extrabold`. Section headings use `text-4xl font-bold tracking-tight`.
*   **Body (Inter):** Base body size `text-sm` to `text-base`. Line height `leading-relaxed` for paragraphs.
*   **Labels & Metadata (Inter):** Uppercase with `tracking-widest text-[10px]` for overlines and table headers. This distinguishes functional data from narrative text.
 
---
 
## 4. Elevation & Depth: Tonal Layering
Traditional shadows and borders create "visual noise." We achieve depth through **Tonal Layering**.
 
*   **The Layering Principle:** To make a card "pop," do not add a shadow. Instead, place a `surface-container-lowest` (#ffffff) card on top of a `surface-container-low` (#f4f3f8) background. The subtle shift in hex value creates a soft, sophisticated lift.
*   **Ambient Shadows:** If an element must float (e.g., a modal), use an ultra-diffused shadow: `box-shadow: 0 20px 80px rgba(26, 27, 31, 0.06);`. The shadow color must be a tint of `on-surface`, never pure black.
*   **The "Ghost Border" Fallback:** If accessibility requires a container boundary, use a **Ghost Border**: `outline-variant` (#c6c6c6) at 15% opacity. It should be felt, not seen.
*   **Total Sharpness:** The `Roundedness Scale` is set to `0px`. Every element—buttons, cards, images—must have razor-sharp corners to maintain the modern, architectural feel.
 
---
 
## 5. Components: The Primitive Set
 
### Buttons
- **Primary:** `primary` background, `on_primary` text. No border. Sharp corners. Use `padding: 1rem 2rem` (3) for a substantial, confident footprint.
- **Secondary:** Transparent background with a `Ghost Border`. 
- **Tertiary:** Text-only using `label-md`, underlined with a 1px `primary` offset only on hover.
 
### Cards & Lists
**Divider lines are forbidden.** 
- Separate list items using the spacing token `4` (1.4rem).
- For cards, use background color shifts (`surface-container-high` on `surface`). 
- Large imagery should be flush with the edges of the card (full-bleed) to emphasize the 0px radius.
 
### Input Fields
- **Styling:** Underline-only style using `outline` (#777777) at 20% opacity. 
- **Focus State:** Transition the underline to `primary` (#000000) at 100% opacity. 
- **Error:** Use `error` (#ba1a1a) for helper text, but keep the input underline sharp and minimal.
 
### Signature Component: The "Type-Bridge"
A layout pattern where a `display-sm` Serif headline overlaps two different surface tiers (e.g., half on `surface`, half on `surface-container-highest`). This creates a bespoke, non-linear feel that defines the "Digital Curator" aesthetic.

---
 
## 6. Do's and Don'ts
 
### Do:
*   **Embrace the Void:** Use the `24` (8.5rem) spacing token between major sections. If it feels like "too much" whitespace, it’s probably just right.
*   **Mix Weights:** Pair a `display-lg` Serif with a `label-sm` Sans-Serif metadata tag immediately above it.
*   **Use Asymmetry:** Place body text in a 7-column span of a 12-column grid, leaving the remaining columns empty for "breathing room."
 
### Don't:
*   **No Rounded Corners:** Never use `border-radius`. It softens the "Modern Editorial" edge we are cultivating.
*   **No Grayscale Borders:** Do not use #DDD or #EEE lines to separate content. Use whitespace or tonal shifts.
*   **No Center-Alignment for Long Form:** Keep all long-form body text left-aligned to maintain the "Journal" feel. Only center-align short, impactful display quotes.
*   **No Standard Shadows:** Avoid any shadow that has a `blur` radius smaller than `40px`. High-opacity, tight shadows feel "cheap" and "out-of-the-box."```