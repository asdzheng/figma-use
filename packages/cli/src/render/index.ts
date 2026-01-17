/**
 * React → Figma JSON Renderer
 */

export { renderToJSON, type FigmaNode } from './reconciler.ts'
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
