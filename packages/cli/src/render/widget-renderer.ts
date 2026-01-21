/**
 * JSX → Figma Widget API renderer
 */

import { sendCommand } from '../client.ts'
import { isTreeNode, type TreeNode, type ReactElement, type Props } from './tree.ts'

function isReactElement(x: unknown): x is ReactElement {
  return x !== null && typeof x === 'object' && 'type' in x && 'props' in x
}

function resolveElement(element: unknown, depth = 0): TreeNode | null {
  if (depth > 100) throw new Error('Component resolution depth exceeded')
  if (isTreeNode(element)) return element
  
  if (isReactElement(element) && typeof element.type === 'function') {
    return resolveElement((element.type as (p: Props) => unknown)(element.props), depth + 1)
  }
  
  return null
}

export async function renderWithWidgetApi(
  element: unknown,
  options?: { x?: number; y?: number; parent?: string }
): Promise<{ id: string; name: string }> {
  const tree = typeof element === 'function' 
    ? element() 
    : resolveElement(element)

  if (!tree) {
    throw new Error('Root must be a Figma component (Frame, Text, etc)')
  }

  return sendCommand('create-from-jsx', {
    tree,
    x: options?.x,
    y: options?.y,
    parentId: options?.parent
  })
}
