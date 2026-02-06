/**
 * shadcn/ui Design System Entry Point
 * 
 * Usage with figma-use:
 * 
 * ```tsx
 * import { colors, Button, Card, Input } from './examples/shadcn'
 * 
 * export default () => (
 *   <Card title="Login" description="Enter your credentials">
 *     <Input label="Email" placeholder="you@example.com" />
 *     <Input label="Password" placeholder="••••••••" />
 *     <Button>Sign In</Button>
 *   </Card>
 * )
 * ```
 * 
 * Render: figma-use render ./my-page.figma.tsx --x 100 --y 100
 */

// Design Tokens
export {
    colors,
    darkColors,
    typography,
    spacing,
    radius,
    shadows,
    components as componentStyles
} from './tokens'

// Components
export {
    Button,
    Card,
    Input,
    Badge,
    Avatar,
    Separator,
    Alert,
    Checkbox,
    Switch,
    Tabs,
    Table
} from './components'

// Default export
import tokens from './tokens'
import components from './components'

export default {
    tokens,
    components,
}
