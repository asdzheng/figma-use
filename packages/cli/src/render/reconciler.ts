/**
 * React Reconciler that outputs JSON IR (Intermediate Representation)
 * 
 * Renders React components to a JSON tree that can be converted to:
 * - Figma NodeChanges (via multiplayer WebSocket)
 * - Plugin API commands
 * - Any other format
 */

import Reconciler from 'react-reconciler'

export interface FigmaNode {
  type: string
  props: Record<string, unknown>
  children: FigmaNode[]
}

type Container = { root: FigmaNode | null }
type Instance = FigmaNode
type TextInstance = FigmaNode

const hostConfig: Reconciler.HostConfig<
  string,           // Type
  Record<string, unknown>, // Props
  Container,        // Container
  Instance,         // Instance
  TextInstance,     // TextInstance
  unknown,          // SuspenseInstance
  unknown,          // HydratableInstance
  Instance,         // PublicInstance
  {},               // HostContext
  true,             // UpdatePayload
  unknown,          // ChildSet
  unknown,          // TimeoutHandle
  unknown           // NoTimeout
> = {
  supportsMutation: true,
  supportsPersistence: false,
  supportsHydration: false,

  createInstance(type, props): Instance {
    const { children, ...rest } = props
    return { type: type.toUpperCase(), props: rest, children: [] }
  },

  createTextInstance(text): TextInstance {
    return { type: 'TEXT_CONTENT', props: { characters: text }, children: [] }
  },

  appendInitialChild(parent, child) {
    parent.children.push(child)
  },

  appendChild(parent, child) {
    parent.children.push(child)
  },

  appendChildToContainer(container, child) {
    container.root = child
  },

  removeChild(parent, child) {
    const index = parent.children.indexOf(child)
    if (index !== -1) parent.children.splice(index, 1)
  },

  removeChildFromContainer(container) {
    container.root = null
  },

  insertBefore(parent, child, beforeChild) {
    const index = parent.children.indexOf(beforeChild)
    if (index !== -1) {
      parent.children.splice(index, 0, child)
    } else {
      parent.children.push(child)
    }
  },

  insertInContainerBefore(container, child) {
    container.root = child
  },

  // Required no-ops and defaults
  prepareForCommit: () => null,
  resetAfterCommit: () => {},
  clearContainer: (container) => { container.root = null },
  
  getRootHostContext: () => ({}),
  getChildHostContext: () => ({}),
  
  shouldSetTextContent: () => false,
  
  finalizeInitialChildren: () => false,
  
  prepareUpdate: () => true,
  
  commitUpdate(instance, _payload, _type, _oldProps, newProps) {
    const { children, ...rest } = newProps
    instance.props = rest
  },
  
  commitTextUpdate(textInstance, _oldText, newText) {
    textInstance.props.characters = newText
  },

  getPublicInstance: (instance) => instance,
  
  preparePortalMount: () => {},
  
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  noTimeout: -1,
  
  isPrimaryRenderer: true,
  
  getCurrentUpdatePriority: () => 16,
  setCurrentUpdatePriority: () => {},
  resolveUpdatePriority: () => 16,
  
  getCurrentEventPriority: () => 16,
  getInstanceFromNode: () => null,
  beforeActiveInstanceBlur: () => {},
  afterActiveInstanceBlur: () => {},
  prepareScopeUpdate: () => {},
  getInstanceFromScope: () => null,
  detachDeletedInstance: () => {},
  
  maySuspendCommit: () => false,
  NotPendingTransition: null,
  resetFormInstance: () => {},
  requestPostPaintCallback: () => {},
  shouldAttemptEagerTransition: () => false,
  trackSchedulerEvent: () => {},
  startViewTransition: () => null,
  stopViewTransition: () => {},
}

const reconciler = Reconciler(hostConfig)

/**
 * Render a React element to JSON IR
 */
export function renderToJSON(element: React.ReactElement): FigmaNode | null {
  const container: Container = { root: null }
  
  const root = reconciler.createContainer(
    container,
    0,        // ConcurrentMode
    null,     // HydrationCallbacks  
    false,    // isStrictMode
    null,     // ConcurrentUpdatesByDefaultOverride
    '',       // IdentifierPrefix
    () => {}, // onRecoverableError
    null,     // TransitionCallbacks
    null      // formState
  )
  
  reconciler.updateContainer(element, root, null, () => {})
  
  // Flush sync to ensure all updates are processed
  reconciler.flushSync(() => {})
  
  return container.root
}
