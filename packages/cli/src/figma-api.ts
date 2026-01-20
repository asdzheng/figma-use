import { figmaEval } from './cdp.ts'

export interface FigmaNode {
  id: string
  name: string
  type: string
  x?: number
  y?: number
  width?: number
  height?: number
  fills?: Paint[]
  strokes?: Paint[]
  strokeWeight?: number
  cornerRadius?: number
  opacity?: number
  visible?: boolean
  locked?: boolean
  children?: FigmaNode[]
  characters?: string
  fontSize?: number
  fontName?: { family: string; style: string }
  layoutMode?: 'NONE' | 'HORIZONTAL' | 'VERTICAL'
  primaryAxisSizingMode?: 'FIXED' | 'AUTO'
  counterAxisSizingMode?: 'FIXED' | 'AUTO'
  paddingTop?: number
  paddingBottom?: number
  paddingLeft?: number
  paddingRight?: number
  itemSpacing?: number
  counterAxisSpacing?: number
  layoutWrap?: 'NO_WRAP' | 'WRAP'
}

export interface Paint {
  type: 'SOLID' | 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL' | 'IMAGE'
  color?: { r: number; g: number; b: number }
  opacity?: number
}

export interface RGB {
  r: number
  g: number
  b: number
}

function serializeNode(depth = 2): string {
  return `
    (function serialize(node, d) {
      if (!node || d < 0) return null;
      const base = {
        id: node.id,
        name: node.name,
        type: node.type,
        x: node.x,
        y: node.y,
        width: node.width,
        height: node.height,
        visible: node.visible,
        locked: node.locked,
        opacity: node.opacity
      };
      if ('fills' in node) base.fills = node.fills;
      if ('strokes' in node) base.strokes = node.strokes;
      if ('strokeWeight' in node) base.strokeWeight = node.strokeWeight;
      if ('cornerRadius' in node) base.cornerRadius = node.cornerRadius;
      if ('characters' in node) base.characters = node.characters;
      if ('fontSize' in node) base.fontSize = node.fontSize;
      if ('fontName' in node) base.fontName = node.fontName;
      if ('layoutMode' in node) base.layoutMode = node.layoutMode;
      if ('children' in node && d > 0) {
        base.children = node.children.map(c => serialize(c, d - 1));
      }
      return base;
    })(node, ${depth})
  `
}

export async function getCurrentPage(): Promise<FigmaNode> {
  return figmaEval(`
    const node = figma.currentPage;
    return ${serializeNode(1)};
  `)
}

export async function getNodeById(id: string, depth = 2): Promise<FigmaNode | null> {
  return figmaEval(`
    const node = await figma.getNodeByIdAsync('${id}');
    if (!node) return null;
    return ${serializeNode(depth)};
  `)
}

export async function getSelection(): Promise<FigmaNode[]> {
  return figmaEval(`
    return figma.currentPage.selection.map(node => ${serializeNode(1)});
  `)
}

export async function setSelection(ids: string[]): Promise<void> {
  const idsJson = JSON.stringify(ids)
  await figmaEval(`
    const nodes = await Promise.all(${idsJson}.map(id => figma.getNodeByIdAsync(id)));
    figma.currentPage.selection = nodes.filter(Boolean);
  `)
}

export async function createRectangle(opts: {
  x?: number
  y?: number
  width?: number
  height?: number
  fill?: string | RGB
  name?: string
  parentId?: string
}): Promise<FigmaNode> {
  const { x = 0, y = 0, width = 100, height = 100, fill, name, parentId } = opts
  const fillCode = fill ? `node.fills = [${paintFromColor(fill)}];` : ''
  const nameCode = name ? `node.name = ${JSON.stringify(name)};` : ''
  const parentCode = parentId
    ? `const parent = await figma.getNodeByIdAsync('${parentId}'); if (parent && 'appendChild' in parent) parent.appendChild(node);`
    : ''

  return figmaEval(`
    const node = figma.createRectangle();
    node.x = ${x};
    node.y = ${y};
    node.resize(${width}, ${height});
    ${fillCode}
    ${nameCode}
    ${parentCode}
    return { id: node.id, name: node.name, type: node.type, x: node.x, y: node.y, width: node.width, height: node.height };
  `)
}

export async function createFrame(opts: {
  x?: number
  y?: number
  width?: number
  height?: number
  fill?: string | RGB
  name?: string
  parentId?: string
  layoutMode?: 'HORIZONTAL' | 'VERTICAL'
}): Promise<FigmaNode> {
  const { x = 0, y = 0, width = 100, height = 100, fill, name, parentId, layoutMode } = opts
  const fillCode = fill ? `node.fills = [${paintFromColor(fill)}];` : ''
  const nameCode = name ? `node.name = ${JSON.stringify(name)};` : ''
  const layoutCode = layoutMode ? `node.layoutMode = '${layoutMode}';` : ''
  const parentCode = parentId
    ? `const parent = await figma.getNodeByIdAsync('${parentId}'); if (parent && 'appendChild' in parent) parent.appendChild(node);`
    : ''

  return figmaEval(`
    const node = figma.createFrame();
    node.x = ${x};
    node.y = ${y};
    node.resize(${width}, ${height});
    ${fillCode}
    ${nameCode}
    ${layoutCode}
    ${parentCode}
    return { id: node.id, name: node.name, type: node.type, x: node.x, y: node.y, width: node.width, height: node.height };
  `)
}

export async function createText(opts: {
  x?: number
  y?: number
  content: string
  fontSize?: number
  fontFamily?: string
  fontStyle?: string
  fill?: string | RGB
  name?: string
  parentId?: string
}): Promise<FigmaNode> {
  const {
    x = 0,
    y = 0,
    content,
    fontSize = 14,
    fontFamily = 'Inter',
    fontStyle = 'Regular',
    fill,
    name,
    parentId
  } = opts

  const fillCode = fill ? `node.fills = [${paintFromColor(fill)}];` : ''
  const nameCode = name ? `node.name = ${JSON.stringify(name)};` : ''
  const parentCode = parentId
    ? `const parent = await figma.getNodeByIdAsync('${parentId}'); if (parent && 'appendChild' in parent) parent.appendChild(node);`
    : ''

  return figmaEval(`
    await figma.loadFontAsync({ family: ${JSON.stringify(fontFamily)}, style: ${JSON.stringify(fontStyle)} });
    const node = figma.createText();
    node.x = ${x};
    node.y = ${y};
    node.fontName = { family: ${JSON.stringify(fontFamily)}, style: ${JSON.stringify(fontStyle)} };
    node.fontSize = ${fontSize};
    node.characters = ${JSON.stringify(content)};
    ${fillCode}
    ${nameCode}
    ${parentCode}
    return { id: node.id, name: node.name, type: node.type, x: node.x, y: node.y, characters: node.characters };
  `)
}

export async function deleteNode(id: string): Promise<void> {
  await figmaEval(`
    const node = await figma.getNodeByIdAsync('${id}');
    if (node) node.remove();
  `)
}

export async function setNodeProperty(id: string, property: string, value: unknown): Promise<void> {
  await figmaEval(`
    const node = await figma.getNodeByIdAsync('${id}');
    if (node) node['${property}'] = ${JSON.stringify(value)};
  `)
}

export async function setFill(id: string, color: string | RGB): Promise<void> {
  await figmaEval(`
    const node = await figma.getNodeByIdAsync('${id}');
    if (node && 'fills' in node) node.fills = [${paintFromColor(color)}];
  `)
}

export async function zoomToFit(ids?: string[]): Promise<void> {
  if (ids?.length) {
    const idsJson = JSON.stringify(ids)
    await figmaEval(`
      const nodes = await Promise.all(${idsJson}.map(id => figma.getNodeByIdAsync(id)));
      figma.viewport.scrollAndZoomIntoView(nodes.filter(Boolean));
    `)
  } else {
    await figmaEval(`
      figma.viewport.scrollAndZoomIntoView(figma.currentPage.children);
    `)
  }
}

export async function getViewport(): Promise<{ center: { x: number; y: number }; zoom: number }> {
  return figmaEval(`
    return { center: figma.viewport.center, zoom: figma.viewport.zoom };
  `)
}

export async function setViewport(center: { x: number; y: number }, zoom: number): Promise<void> {
  await figmaEval(`
    figma.viewport.center = { x: ${center.x}, y: ${center.y} };
    figma.viewport.zoom = ${zoom};
  `)
}

function paintFromColor(color: string | RGB): string {
  if (typeof color === 'string') {
    const hex = color.replace('#', '')
    const r = parseInt(hex.slice(0, 2), 16) / 255
    const g = parseInt(hex.slice(2, 4), 16) / 255
    const b = parseInt(hex.slice(4, 6), 16) / 255
    return `{ type: 'SOLID', color: { r: ${r}, g: ${g}, b: ${b} } }`
  }
  return `{ type: 'SOLID', color: { r: ${color.r}, g: ${color.g}, b: ${color.b} } }`
}

export async function listPages(): Promise<{ id: string; name: string }[]> {
  return figmaEval(`
    return figma.root.children.map(p => ({ id: p.id, name: p.name }));
  `)
}

export async function setCurrentPage(pageId: string): Promise<void> {
  await figmaEval(`
    await figma.setCurrentPageAsync(await figma.getNodeByIdAsync('${pageId}'));
  `)
}

export async function findNodes(query: { name?: string; type?: string }): Promise<FigmaNode[]> {
  const conditions: string[] = []
  if (query.name) conditions.push(`node.name.includes(${JSON.stringify(query.name)})`)
  if (query.type) conditions.push(`node.type === ${JSON.stringify(query.type)}`)
  const filter = conditions.length ? conditions.join(' && ') : 'true'

  return figmaEval(`
    const results = [];
    function walk(node) {
      if (${filter}) results.push({ id: node.id, name: node.name, type: node.type });
      if ('children' in node) node.children.forEach(walk);
    }
    walk(figma.currentPage);
    return results;
  `)
}
