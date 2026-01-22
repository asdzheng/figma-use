// Minimal React-compatible createElement for JSX rendering
// Replaces 86KB react package with ~200 bytes

export type ReactElement = {
  type: string | Function
  props: Record<string, unknown> & { children?: ReactNode[] }
}

export type ReactNode = ReactElement | string | number | null | undefined | ReactNode[]

export type FC<P = Record<string, unknown>> = (props: P) => ReactElement

export function createElement(
  type: string | Function,
  props: Record<string, unknown> | null,
  ...children: ReactNode[]
): ReactElement {
  return {
    type,
    props: {
      ...props,
      children: children.length === 1 ? children[0] : children.length > 0 ? children.flat() : undefined
    }
  }
}

export default { createElement }
