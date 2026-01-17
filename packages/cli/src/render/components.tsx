/**
 * Figma-like React components
 * 
 * API inspired by react-figma but outputs JSON instead of Figma nodes
 */

import * as React from 'react'

// These are just marker components - the reconciler will handle them by type name

export const Frame: React.FC<FrameProps> = (props) => {
  return React.createElement('frame', props)
}

export const Rectangle: React.FC<RectangleProps> = (props) => {
  return React.createElement('rectangle', props)
}

export const Ellipse: React.FC<EllipseProps> = (props) => {
  return React.createElement('ellipse', props)
}

export const Text: React.FC<TextProps> = (props) => {
  return React.createElement('text', props)
}

export const Line: React.FC<LineProps> = (props) => {
  return React.createElement('line', props)
}

export const Star: React.FC<StarProps> = (props) => {
  return React.createElement('star', props)
}

export const Polygon: React.FC<PolygonProps> = (props) => {
  return React.createElement('polygon', props)
}

export const Vector: React.FC<VectorProps> = (props) => {
  return React.createElement('vector', props)
}

export const Component: React.FC<ComponentProps> = (props) => {
  return React.createElement('component', props)
}

export const Instance: React.FC<InstanceProps> = (props) => {
  return React.createElement('instance', props)
}

export const Group: React.FC<GroupProps> = (props) => {
  return React.createElement('group', props)
}

export const Page: React.FC<PageProps> = (props) => {
  return React.createElement('page', props)
}

// Alias for react-native compatibility
export const View = Frame

// Types

interface BaseProps {
  name?: string
  style?: Style
  children?: React.ReactNode
}

interface Style {
  // Layout
  width?: number | string
  height?: number | string
  x?: number
  y?: number
  
  // Auto-layout
  flexDirection?: 'row' | 'column'
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between'
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch'
  gap?: number
  padding?: number | [number, number] | [number, number, number, number]
  paddingTop?: number
  paddingRight?: number
  paddingBottom?: number
  paddingLeft?: number
  
  // Appearance
  backgroundColor?: string
  opacity?: number
  
  // Border
  borderRadius?: number
  borderTopLeftRadius?: number
  borderTopRightRadius?: number
  borderBottomLeftRadius?: number
  borderBottomRightRadius?: number
  borderWidth?: number
  borderColor?: string
  
  // Effects
  shadowColor?: string
  shadowOffset?: { width: number; height: number }
  shadowRadius?: number
  shadowOpacity?: number
}

interface FrameProps extends BaseProps {
  // Frame-specific
  clipsContent?: boolean
}

interface RectangleProps extends BaseProps {}

interface EllipseProps extends BaseProps {}

interface TextProps extends BaseProps {
  // Text-specific
  style?: Style & {
    fontSize?: number
    fontFamily?: string
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
    fontStyle?: 'normal' | 'italic'
    color?: string
    textAlign?: 'left' | 'center' | 'right'
    lineHeight?: number
    letterSpacing?: number
  }
}

interface LineProps extends BaseProps {}
interface StarProps extends BaseProps { pointCount?: number }
interface PolygonProps extends BaseProps { pointCount?: number }
interface VectorProps extends BaseProps {}
interface ComponentProps extends BaseProps {}
interface InstanceProps extends BaseProps { componentId?: string }
interface GroupProps extends BaseProps {}
interface PageProps extends BaseProps {}
