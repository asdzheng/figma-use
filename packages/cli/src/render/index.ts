/**
 * React → Figma Renderer
 */

export { renderToNodeChanges, type RenderOptions, type RenderResult } from './reconciler.ts'
export { 
  Frame, 
  Rectangle, 
  Ellipse, 
  Text, 
  Line, 
  Star, 
  Polygon, 
  Vector,
  Component,
  Instance,
  Group,
  Page,
  View,
} from './components.tsx'
