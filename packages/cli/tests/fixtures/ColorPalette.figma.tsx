/**
 * Color Palette - демонстрация defineVars с переменными Figma
 */

import * as React from 'react'
import { defineVars, Frame, Text } from '../../src/render/index.ts'

// Определяем переменные по именам из Figma
const colors = defineVars({
  gray50: 'Colors/Gray/50',
  gray100: 'Colors/Gray/100',
  gray200: 'Colors/Gray/200',
  gray300: 'Colors/Gray/300',
  gray400: 'Colors/Gray/400',
  gray500: 'Colors/Gray/500',
  gray600: 'Colors/Gray/600',
  gray700: 'Colors/Gray/700',
  gray800: 'Colors/Gray/800',
  gray900: 'Colors/Gray/900',
})

const ColorSwatch = ({ color, label }: { color: any; label: string }) => (
  <Frame
    name={label}
    style={{
      width: 80,
      height: 80,
      backgroundColor: color,
      borderRadius: 8,
    }}
  />
)

export default function ColorPalette() {
  return (
    <Frame
      name="Color Palette"
      style={{
        flexDirection: 'column',
        gap: 16,
        padding: 24,
        backgroundColor: '#FFFFFF',
        width: 600,
        height: 400,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#111827' }}>
        Gray Scale
      </Text>
      
      <Frame style={{ flexDirection: 'row', gap: 8, width: 500, height: 100 }}>
        <ColorSwatch color={colors.gray50} label="50" />
        <ColorSwatch color={colors.gray100} label="100" />
        <ColorSwatch color={colors.gray200} label="200" />
        <ColorSwatch color={colors.gray300} label="300" />
        <ColorSwatch color={colors.gray400} label="400" />
      </Frame>
      
      <Frame style={{ flexDirection: 'row', gap: 8, width: 500, height: 100 }}>
        <ColorSwatch color={colors.gray500} label="500" />
        <ColorSwatch color={colors.gray600} label="600" />
        <ColorSwatch color={colors.gray700} label="700" />
        <ColorSwatch color={colors.gray800} label="800" />
        <ColorSwatch color={colors.gray900} label="900" />
      </Frame>
    </Frame>
  )
}
