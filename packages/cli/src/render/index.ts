/**
 * React → Figma Renderer
 */

export {
  renderToNodeChanges,
  resetRenderedComponents,
  getPendingComponentSetInstances,
  clearPendingComponentSetInstances,
  type RenderOptions,
  type RenderResult,
  type PendingComponentSetInstance
} from './reconciler.ts'
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
  INTRINSIC_ELEMENTS,
  // Variable bindings (StyleX-inspired)
  defineVars,
  figmaVar,
  isVariable,
  loadVariablesIntoRegistry,
  isRegistryLoaded,
  type FigmaVariable,
  // Component definitions
  defineComponent,
  resetComponentRegistry,
  getComponentRegistry
} from './components.tsx'

export {
  // ComponentSet (variants)
  defineComponentSet,
  resetComponentSetRegistry,
  getComponentSetRegistry
} from './component-set.tsx'
