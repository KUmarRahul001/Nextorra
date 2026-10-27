# Nextorra — Design System Specification (`design.md`)

> **Generated via**: `ui-ux-pro-max-skill` (Enterprise Architecture & Bento Systems Engine)  
> **Brand Name**: Nextorra  
> **Archetype**: **Architectural Dark Mode · Precision Engineering & Bento Systems**  
> **Informed by**: Comparative audit of `mayabusiness_design.md` (Luxury Minimalist AI) and `rahnoxa_design.md` (Corporate Enterprise Light Mode).

---

## 1. Synthesis & Strategic Direction

### Comparative Synthesis
| Dimension | Reference A: MAYA Business (`mayabuisness.in`) | Reference B: Rahnoxa (`rahnoxa.antideploy.com`) | **Nextorra (Original Bespoke System)** |
|---|---|---|---|
| **Visual Tone** | Ultra-dark OLED minimalist, 300-weight typography, floating pill nav. | Light corporate tech, blue gradient mesh `#FAFCFF`, dense 14-service list. | **Deep Slate Obsidian (`#090D16`) with Asymmetric Bento Modules & Burnished Amber/Cyan Accents**. |
| **Strengths** | Restrained palette, premium breathing room, high cinematic focus. | Clear information density, explicit service specs, strong trust validation. | **Combines MAYA's cinematic elegance with Rahnoxa's tangible engineering depth.** |
| **Identified "AI Slop" to Avoid** | Zero content density; feels like an empty concept mock; illegible light font weights on mobile. | Default Tailwind shadows, generic `bg-blue-600` buttons, predictable 3-card grid repetitions. | **Bespoke asymmetric grid (1x1, 2x1, 2x2 spans), tactile 1px border highlights, custom monospace spec labels.** |

### Why This Direction Reads as Premium & Custom (Not Templated)
1. **Curated Dual-Axis Surface Hierarchy instead of Flat Black or Generic White**: Instead of pure black `#000000` (which causes harsh contrast fatigue) or standard corporate `#FFFFFF` (which feels like an off-the-shelf template), Nextorra employs a slate-obsidian substrate (`#090D16`) with multi-layered elevated card surfaces (`#0E1422` and `#141C2E`), illuminated by calibrated 1px top-edge border strokes (`rgba(255, 255, 255, 0.08)` to `rgba(255, 255, 255, 0.03)`).
2. **Editorial Character Pairings (`Space Grotesk` + `DM Sans` + `JetBrains Mono`)**: Breaks out of standard "Inter-only" monoculture. Headlines carry crisp, industrial geometric authority (`Space Grotesk`), body text flows with humanistic readability (`DM Sans`), and metrics/system boundaries are anchored by precision tabular figures (`JetBrains Mono`).
3. **Restrained Warm Accents (Burnished Amber `#D97706` + Cold Cyan `#06B6D4`)**: Replaces clichéd neon purple/cyan AI gradients with an authentic engineering indicator scheme: Amber denotes execution authority and database commits; Cyan denotes live telemetry and active protocols.
4. **Asymmetric Bento Architecture over Symmetrical 3-Card Columns**: Replaces standard repetitive 3-column card layouts with modular architectural tiles: telemetry feeds, schema contract definitions, and interactive code snapshots that fit real enterprise systems.

---

## 2. Color System & Design Tokens

### Background & Surface Hierarchy
```css
:root {
  /* Surfaces */
  --color-bg-base: #090D16;          /* Deepest viewport base (Obsidian Slate) */
  --color-surface-subtle: #0C111C;   /* Recessed containers, table headers, code wells */
  --color-surface-card: #0F1626;     /* Primary elevated Bento cards */
  --color-surface-elevated: #161F33; /* Hovered cards, flyout menus, tooltips */
  --color-surface-glass: rgba(15, 22, 38, 0.75); /* Sticky header with backdrop-blur */

  /* Hairlines & Borders */
  --color-border-subtle: #1C263B;    /* Standard 1px perimeter border */
  --color-border-card: #23304B;      /* Card outline */
  --color-border-highlight: #3B4B70; /* Active state, focus ring, card top highlight */

  /* Typographic Foregrounds */
  --color-text-primary: #F8FAFC;     /* Headings, hero display (95% luminance) */
  --color-text-secondary: #CBD5E1;   /* Section intro, subheadings (Slate 300) */
  --color-text-muted: #8292AB;       /* Explanatory text, card body copy */
  --color-text-tertiary: #4F5E79;    /* Monospace metadata, footnotes, disabled */

  /* Architectural Accents */
  --color-accent-amber: #D97706;     /* Primary Action / Architecture Commit (Warm Gold) */
  --color-accent-amber-hover: #B45309;
  --color-accent-amber-glow: rgba(217, 119, 6, 0.15);

  --color-accent-cyan: #06B6D4;      /* System Telemetry, Live Nodes, Microservices */
  --color-accent-cyan-subtle: rgba(6, 182, 212, 0.12);

  --color-accent-emerald: #10B981;   /* 99.99% Uptime, Passed Checks, Verification */
  --color-accent-destructive: #EF4444;/* Security Breaches, Rollback, Errors */
}
```

---

## 3. Typography Specification

### Font Family Allocations
- **Display & Section Headers (`font-display`)**: `Space Grotesk, -apple-system, sans-serif`
- **Body & Editorial (`font-body`)**: `DM Sans, system-ui, sans-serif`
- **Technical Metrics, Terminal, & Chips (`font-mono`)**: `JetBrains Mono, monospace`

### Google Fonts Link
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Type Scale Matrix
| Level | Font | Weight | Size | Line Height | Letter Spacing | Color Token |
|---|---|---|---|---|---|---|
| **Display Hero (H1)** | `Space Grotesk` | `700` Bold | `56px` (`3.5rem`) | `1.1` (`62px`) | `-0.035em` | `--color-text-primary` |
| **Section Title (H2)** | `Space Grotesk` | `600` SemiBold | `36px` (`2.25rem`)| `1.2` (`44px`) | `-0.025em` | `--color-text-primary` |
| **Card Heading (H3)** | `Space Grotesk` | `600` SemiBold | `22px` (`1.375rem`)| `1.3` (`28px`) | `-0.015em` | `--color-text-primary` |
| **Sub-Feature (H4)** | `Space Grotesk` | `500` Medium | `17px` (`1.06rem`)| `1.4` (`24px`) | `0em` | `--color-text-secondary` |
| **Lead Paragraph** | `DM Sans` | `400` Regular | `18px` (`1.125rem`)| `1.6` (`28px`) | `-0.01em` | `--color-text-secondary` |
| **Standard Body** | `DM Sans` | `400` Regular | `15px` (`0.9375rem`)| `1.65` (`25px`)| `0em` | `--color-text-muted` |
| **Small / Caption** | `DM Sans` | `400` Regular | `13px` (`0.8125rem`)| `1.5` (`20px`) | `+0.01em` | `--color-text-tertiary` |
| **Monospace Eyebrow** | `JetBrains Mono` | `500` Medium | `12px` (`0.75rem`) | `1.4` (`16px`) | `+0.08em` (UPPERCASE) | `--color-accent-amber` |
| **Metric Figure** | `Space Grotesk` | `700` Bold | `32px` (`2.0rem`) | `1.0` (`32px`) | `-0.03em` | `--color-text-primary` |

---

## 4. Spacing, Radius, and Shadow Elevation Tokens

### Spacing Scale
- `space-1`: `4px`
- `space-2`: `8px`
- `space-3`: `12px`
- `space-4`: `16px`
- `space-6`: `24px`
- `space-8`: `32px`
- `space-12`: `48px`
- `space-16`: `64px`
- `space-24`: `96px` (Standard section padding)

### Corner Radius
- `--radius-sm`: `6px` (Chips, status badges, inner tags)
- `--radius-md`: `10px` (Input fields, nested buttons, micro cards)
- `--radius-lg`: `16px` (Standard Bento cards, dialogs)
- `--radius-xl`: `24px` (Hero showcase frames, outer bento containers)
- `--radius-pill`: `9999px` (Status pills, navigation action button)

### Depth & Elevation Shadows (Tactile Ambient Lighting)
```css
/* Avoids default muddy black shadows */
--shadow-card: 0 4px 20px -2px rgba(4, 7, 13, 0.7), 0 0 0 1px var(--color-border-card);
--shadow-card-hover: 0 12px 32px -4px rgba(4, 7, 13, 0.85), 0 0 0 1px var(--color-border-highlight);
--shadow-amber-glow: 0 0 24px -4px rgba(217, 119, 6, 0.35);
--shadow-inner-well: inset 0 2px 4px 0 rgba(4, 7, 13, 0.6);
```

---

## 5. Component Specifications

### A. Navigation Bar (`<Header>`)
- **Structure**: Floating glass container centered with max-width `1280px` or full-bleed `h-16`.
- **Background**: `rgba(9, 13, 22, 0.8)` with `backdrop-blur-md` and `border-b border-[#1C263B]`.
- **Brand Lockup**: `Nextorra` in `Space Grotesk` bold (`18px`) + Monospace version chip `[v2.6]`.
- **Links**: `14px DM Sans` Medium (`#8292AB` transitioning to `#F8FAFC` on hover).
- **CTA**: Single high-contrast pill button (`Initiate Architecture Discovery →`).

### B. Bento Grid Cards (`<BentoCard>`)
- **Geometry**: CSS Grid `grid-cols-1 md:grid-cols-3 gap-5`.
- **Card Styling**:
  - Background: `var(--color-surface-card)` (`#0F1626`).
  - Border: `1px solid var(--color-border-card)` with a subtle top hairline gradient `linear-gradient(90deg, rgba(255,255,255,0.12), transparent)`.
  - Padding: `24px` (desktop), `20px` (mobile).
  - Hover: Subtle `translate-y-[-2px]`, border lightens to `#3B4B70`, transition `200ms cubic-bezier(0.16, 1, 0.3, 1)`.

### C. Buttons
- **Primary Action**:
  - Background: `var(--color-accent-amber)` (`#D97706`).
  - Text: `#FFFFFF` (`font-space font-medium tracking-tight text-sm`).
  - Padding: `10px 20px`.
  - Border: `1px solid rgba(255, 255, 255, 0.15)`.
  - Shadow: `var(--shadow-amber-glow)`.
  - Hover: Background `#B45309`, shadow intensifies, scale `1.01`.
- **Secondary Ghost / Architectural**:
  - Background: `var(--color-surface-subtle)` (`#0C111C`).
  - Text: `var(--color-text-secondary)` (`#CBD5E1`).
  - Border: `1px solid var(--color-border-card)`.
  - Hover: Background `var(--color-surface-elevated)` (`#161F33`), text `#F8FAFC`.

### D. Monospace Technical Badge (`<TechTag>`)
- **Font**: `JetBrains Mono` (`11px` / `font-medium`).
- **Styling**: `px-2 py-0.5 rounded-[6px] bg-[#0C111C] border border-[#1C263B] text-[#8292AB]`.
- **Live Indicator**: Includes a `6px` pulsing emerald circle when indicating production status.

---

## 6. Anti-Patterns & "Avoid" List (No Generic AI-Coded Slop)

1. **NO Saturated Violet-to-Cyan Gradients**: Do NOT apply generic AI gradient text (`bg-gradient-to-r from-purple-500 to-cyan-400`). Nextorra uses pure high-contrast white headlines with selective Amber/Cyan technical indicators.
2. **NO Decorative Hand-Waving Emojis**: Never use `👋`, `🚀`, `🔥` as hero badges or section bullets. Use precise vector SVG icons (Lucide or Heroicons).
3. **NO Stock "Inter-Only" Monoculture**: Do NOT render every element in plain Inter 400. Use `Space Grotesk` for geometric structural headings and `DM Sans` for body copy.
4. **NO Muddy Default Shadows**: Never use generic `box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1)`. All shadows on dark surfaces must use deep tinted alpha (`rgba(4, 7, 13, 0.7)`) accompanied by a 1px physical boundary stroke.
5. **NO Unanchored Infinite Grids**: Avoid rendering 100+ raw skill chips with no pagination or bento hierarchy.
6. **NO Faux-Corporate Stock Copy**: Discard boilerplate agency statements ("We deliver innovative cutting-edge solutions"). State deterministic engineering realities: schema models, ACID compliance, latency benchmarks, and verifiable deployment pipelines.

---

## 7. Pre-Delivery Quality Checklist

- [ ] **Contrast Ratio Verification**: Text-to-background contrast exceeds `7:1` for body copy and `4.5:1` for secondary metadata (WCAG AAA/AA standard).
- [ ] **Keyboard Focus Visibility**: All interactive inputs and buttons feature a distinct 2px visible focus ring (`--color-border-highlight` / `--color-accent-amber`).
- [ ] **Responsive Breakpoint Verification**:
  - `375px` (Mobile): Single-column Bento cards, fluid typography (`clamp()`), touch targets minimum `44x44px`.
  - `768px` (Tablet): 2-column asymmetric layout.
  - `1024px` & `1440px` (Desktop): Full 3-column asymmetric Bento Grid with max-width `1280px`.
- [ ] **Motion Sensitivity (`prefers-reduced-motion`)**: All animations degrade gracefully to instant opacity transitions when reduced motion is requested.
- [ ] **Interaction States**: All clickable elements explicitly declare `cursor-pointer` and hover transitions capped between `150ms` and `250ms`.
