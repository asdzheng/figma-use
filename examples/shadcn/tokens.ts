/**
 * shadcn/ui Design Tokens for figma-use
 * Based on the official shadcn/ui design system
 * https://ui.shadcn.com/docs/theming
 */

// =============================================================================
// COLOR TOKENS (Light Mode - Zinc Base)
// =============================================================================

export const colors = {
    // Base Colors
    background: '#FFFFFF',
    foreground: '#09090B',

    // Card
    card: '#FFFFFF',
    cardForeground: '#09090B',

    // Popover
    popover: '#FFFFFF',
    popoverForeground: '#09090B',

    // Primary - Main accent color
    primary: '#18181B',
    primaryForeground: '#FAFAFA',

    // Secondary - Less prominent accent
    secondary: '#F4F4F5',
    secondaryForeground: '#18181B',

    // Muted - For subtle UI elements
    muted: '#F4F4F5',
    mutedForeground: '#71717A',

    // Accent - For emphasized UI elements
    accent: '#F4F4F5',
    accentForeground: '#18181B',

    // Destructive - For dangerous actions
    destructive: '#EF4444',
    destructiveForeground: '#FAFAFA',

    // Border & Input
    border: '#E4E4E7',
    input: '#E4E4E7',
    ring: '#18181B',

    // Chart Colors (for data visualization)
    chart1: '#E76E50',
    chart2: '#2A9D90',
    chart3: '#274754',
    chart4: '#E8C468',
    chart5: '#F4A462',
} as const

// =============================================================================
// DARK MODE COLORS
// =============================================================================

export const darkColors = {
    background: '#09090B',
    foreground: '#FAFAFA',

    card: '#09090B',
    cardForeground: '#FAFAFA',

    popover: '#09090B',
    popoverForeground: '#FAFAFA',

    primary: '#FAFAFA',
    primaryForeground: '#18181B',

    secondary: '#27272A',
    secondaryForeground: '#FAFAFA',

    muted: '#27272A',
    mutedForeground: '#A1A1AA',

    accent: '#27272A',
    accentForeground: '#FAFAFA',

    destructive: '#7F1D1D',
    destructiveForeground: '#FAFAFA',

    border: '#27272A',
    input: '#27272A',
    ring: '#D4D4D8',

    chart1: '#2662D9',
    chart2: '#2EB88A',
    chart3: '#E88C30',
    chart4: '#AF57DB',
    chart5: '#E23670',
} as const

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const typography = {
    // Font Family
    fontFamily: 'Inter',
    fontFamilyMono: 'JetBrains Mono',

    // Font Sizes (with line heights)
    xs: { size: 12, lineHeight: 16 },
    sm: { size: 14, lineHeight: 20 },
    base: { size: 16, lineHeight: 24 },
    lg: { size: 18, lineHeight: 28 },
    xl: { size: 20, lineHeight: 28 },
    '2xl': { size: 24, lineHeight: 32 },
    '3xl': { size: 30, lineHeight: 36 },
    '4xl': { size: 36, lineHeight: 40 },

    // Font Weights
    weights: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },
} as const

// =============================================================================
// SPACING (8px grid system)
// =============================================================================

export const spacing = {
    0: 0,
    0.5: 2,
    1: 4,
    1.5: 6,
    2: 8,
    2.5: 10,
    3: 12,
    3.5: 14,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    24: 96,
    28: 112,
    32: 128,
} as const

// =============================================================================
// BORDER RADIUS
// =============================================================================

export const radius = {
    none: 0,
    sm: 2,
    default: 6, // shadcn default radius
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
} as const

// =============================================================================
// SHADOWS
// =============================================================================

export const shadows = {
    sm: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    default: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.06)',
    lg: '0px 10px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05)',
    xl: '0px 20px 25px rgba(0, 0, 0, 0.1), 0px 10px 10px rgba(0, 0, 0, 0.04)',
    '2xl': '0px 25px 50px rgba(0, 0, 0, 0.25)',
} as const

// =============================================================================
// COMPONENT STYLES (Presets)
// =============================================================================

export const components = {
    button: {
        default: {
            bg: colors.primary,
            color: colors.primaryForeground,
            radius: radius.default,
            px: spacing[4],
            py: spacing[2],
            fontSize: typography.sm.size,
            fontWeight: typography.weights.medium,
        },
        secondary: {
            bg: colors.secondary,
            color: colors.secondaryForeground,
            radius: radius.default,
            px: spacing[4],
            py: spacing[2],
            fontSize: typography.sm.size,
            fontWeight: typography.weights.medium,
        },
        destructive: {
            bg: colors.destructive,
            color: colors.destructiveForeground,
            radius: radius.default,
            px: spacing[4],
            py: spacing[2],
            fontSize: typography.sm.size,
            fontWeight: typography.weights.medium,
        },
        outline: {
            bg: 'transparent',
            color: colors.foreground,
            border: colors.input,
            radius: radius.default,
            px: spacing[4],
            py: spacing[2],
            fontSize: typography.sm.size,
            fontWeight: typography.weights.medium,
        },
        ghost: {
            bg: 'transparent',
            color: colors.foreground,
            radius: radius.default,
            px: spacing[4],
            py: spacing[2],
            fontSize: typography.sm.size,
            fontWeight: typography.weights.medium,
        },
    },

    card: {
        bg: colors.card,
        color: colors.cardForeground,
        border: colors.border,
        radius: radius.lg,
        shadow: shadows.sm,
        p: spacing[6],
    },

    input: {
        bg: colors.background,
        color: colors.foreground,
        border: colors.input,
        radius: radius.default,
        px: spacing[3],
        py: spacing[2],
        fontSize: typography.sm.size,
        placeholder: colors.mutedForeground,
    },

    badge: {
        default: {
            bg: colors.primary,
            color: colors.primaryForeground,
            radius: radius.full,
            px: spacing[2.5],
            py: spacing[0.5],
            fontSize: typography.xs.size,
            fontWeight: typography.weights.semibold,
        },
        secondary: {
            bg: colors.secondary,
            color: colors.secondaryForeground,
            radius: radius.full,
            px: spacing[2.5],
            py: spacing[0.5],
            fontSize: typography.xs.size,
            fontWeight: typography.weights.semibold,
        },
        destructive: {
            bg: colors.destructive,
            color: colors.destructiveForeground,
            radius: radius.full,
            px: spacing[2.5],
            py: spacing[0.5],
            fontSize: typography.xs.size,
            fontWeight: typography.weights.semibold,
        },
        outline: {
            bg: 'transparent',
            color: colors.foreground,
            border: colors.border,
            radius: radius.full,
            px: spacing[2.5],
            py: spacing[0.5],
            fontSize: typography.xs.size,
            fontWeight: typography.weights.semibold,
        },
    },

    avatar: {
        size: {
            sm: 32,
            md: 40,
            lg: 48,
        },
        radius: radius.full,
        bg: colors.muted,
        color: colors.mutedForeground,
    },
} as const

// Default export
export default {
    colors,
    darkColors,
    typography,
    spacing,
    radius,
    shadows,
    components,
}
