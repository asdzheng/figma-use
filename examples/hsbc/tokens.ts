/**
 * HSBC Brand Design Tokens
 * Based on HSBC's official brand guidelines
 * 
 * Primary: Red #DB0011
 * Secondary: Black, White, Greys
 * Style: Digital-first, clean, professional, international
 */

export const colors = {
    // HSBC Primary Colors
    primary: '#DB0011',      // HSBC Red
    primaryDark: '#AF000E',  // Darker red for hover
    primaryLight: '#FF1A24', // Lighter red

    // Neutrals
    white: '#FFFFFF',
    black: '#000000',

    // Greys (HSBC uses a range)
    grey900: '#1A1A1A',
    grey800: '#333333',
    grey700: '#4D4D4D',
    grey600: '#666666',
    grey500: '#808080',
    grey400: '#999999',
    grey300: '#B3B3B3',
    grey200: '#CCCCCC',
    grey100: '#E6E6E6',
    grey50: '#F5F5F5',

    // Semantic Colors
    background: '#FFFFFF',
    foreground: '#1A1A1A',
    muted: '#F5F5F5',
    mutedForeground: '#666666',
    border: '#E6E6E6',

    // Status Colors
    success: '#00847F',      // HSBC teal
    successLight: '#E5F4F3',
    warning: '#FFB81C',
    warningLight: '#FFF8E6',
    error: '#DB0011',
    errorLight: '#FCECED',
    info: '#0066B3',
    infoLight: '#E5F0F8',

    // Chart Colors
    chart1: '#DB0011',
    chart2: '#00847F',
    chart3: '#0066B3',
    chart4: '#FFB81C',
    chart5: '#6B4C9A',
} as const

export const typography = {
    // HSBC uses a clean sans-serif font
    fontFamily: 'Inter',
    fontFamilySerif: 'Georgia',

    // Font Sizes
    xs: { size: 12, lineHeight: 16 },
    sm: { size: 14, lineHeight: 20 },
    base: { size: 16, lineHeight: 24 },
    lg: { size: 18, lineHeight: 28 },
    xl: { size: 20, lineHeight: 28 },
    '2xl': { size: 24, lineHeight: 32 },
    '3xl': { size: 30, lineHeight: 36 },
    '4xl': { size: 36, lineHeight: 44 },
    '5xl': { size: 48, lineHeight: 56 },
    '6xl': { size: 60, lineHeight: 72 },

    weights: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },
} as const

export const spacing = {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,
} as const

export const radius = {
    none: 0,
    sm: 2,
    default: 4,
    md: 6,
    lg: 8,
    xl: 12,
    '2xl': 16,
    full: 9999,
} as const

export const shadows = {
    sm: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    default: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
    md: '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.06)',
    lg: '0px 10px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05)',
    xl: '0px 20px 25px rgba(0, 0, 0, 0.1), 0px 10px 10px rgba(0, 0, 0, 0.04)',
} as const

export default { colors, typography, spacing, radius, shadows }
