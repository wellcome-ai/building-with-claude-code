/**
 * Split — design tokens
 * Values are 1:1 with the "Split — Build Day Demo" design system
 * (foundations/colors.html, typography.html, spacing-radii.html).
 * Money semantics: green = owed to you, red = you owe, grey = settled.
 */

export const color = {
  // Brand
  brand: '#4F46E5',
  brandStrong: '#4338CA',
  brandSoft: '#ECEBFD',

  // Money semantics
  positive: '#15A86B',     // owed to you
  positiveSoft: '#E3F6ED',
  positiveInk: '#0F7D50',  // text on positiveSoft
  negative: '#E5484D',     // you owe
  negativeSoft: '#FDECEC',
  negativeInk: '#C93A3F',  // text on negativeSoft
  settled: '#6B7280',      // all square

  // Ink & surfaces
  fg: '#14152B',
  muted: '#6B7280',
  faint: '#9AA1AD',
  surface: '#FFFFFF',
  background: '#F6F7F9',
  border: '#E6E8EC',
  borderSoft: '#EEF0F3',
} as const;

/** 4px spacing scale — use space(n) => n * 4 px. */
export const space = (n: number): number => n * 4;

export const radius = {
  sm: 9,
  md: 12,
  lg: 14,
  xl: 16,
  xxl: 18,
  phone: 44,
  pill: 999,
} as const;

export const shadow = {
  /** Resting card / list elevation */
  card: '0 1px 2px rgba(20,21,43,.04), 0 4px 16px rgba(20,21,43,.05)',
  /** Floating action button */
  fab: '0 6px 20px rgba(79,70,229,.35)',
  /** Input focus ring (brand) */
  focus: '0 0 0 4px rgba(79,70,229,.12)',
} as const;

export const font = {
  family: '"Inter", system-ui, sans-serif',
  /** Apply to every money figure so digits align in columns. */
  money: {
    fontVariantNumeric: 'tabular-nums' as const,
    letterSpacing: '-0.02em',
  },
} as const;

/** Type scale (px / weight) from typography.html. */
export const type = {
  money: { size: 44, weight: 800, letterSpacing: '-0.02em' },
  display: { size: 32, weight: 800, letterSpacing: '-0.02em' },
  title: { size: 22, weight: 700 },
  heading: { size: 17, weight: 600 },
  body: { size: 15, weight: 400 },
  label: { size: 13, weight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.06em' },
  caption: { size: 12, weight: 500 },
} as const;

/** Avatar fallback palette (deterministic by name hash). */
export const avatarPalette = [
  '#15A86B', '#E5484D', '#D97706', '#0891B2',
  '#7C3AED', '#DB2777', '#0F7D50', '#4338CA',
] as const;

/** Gradients used for group tile avatars, cycled by creation order. */
export const groupGradients: [string, string][] = [
  ['#4F46E5', '#4338CA'],
  ['#15A86B', '#0F7D50'],
  ['#0891B2', '#0E7490'],
  ['#D97706', '#B45309'],
  ['#7C3AED', '#6D28D9'],
  ['#DB2777', '#BE185D'],
];
