/**
 * shadcn/ui Demo Page - Login Form
 * 
 * Run: figma-use render examples/shadcn/demo-login.figma.tsx --x 100 --y 100
 */

import { colors, typography, spacing, radius } from './tokens'
import { Button, Card, Input, Checkbox, Separator } from './components'

export default function LoginDemo() {
    return (
        <frame
            name="Login Page"
            w={400}
            bg={colors.background}
            p={32}
            flex="col"
            gap={24}
        >
            {/* Header */}
            <frame name="Header" flex="col" gap={8} items="center">
                <frame name="Logo" w={48} h={48} bg={colors.primary} rounded={radius.lg} flex="row" items="center" justify="center">
                    <icon name="lucide:zap" size={24} color={colors.primaryForeground} />
                </frame>
                <text size={24} weight="bold" color={colors.foreground}>
                    Welcome back
                </text>
                <text size={14} color={colors.mutedForeground}>
                    Enter your email to sign in to your account
                </text>
            </frame>

            {/* Login Card */}
            <Card>
                <frame flex="col" gap={16}>
                    <Input label="Email" placeholder="name@example.com" />
                    <Input label="Password" placeholder="••••••••" />

                    <frame flex="row" justify="between" items="center">
                        <Checkbox label="Remember me" />
                        <text size={14} color={colors.primary}>
                            Forgot password?
                        </text>
                    </frame>

                    <Button variant="default">Sign In</Button>

                    <frame flex="row" items="center" gap={16}>
                        <Separator />
                        <text size={12} color={colors.mutedForeground}>
                            OR CONTINUE WITH
                        </text>
                        <Separator />
                    </frame>

                    <frame flex="row" gap={8}>
                        <frame
                            name="Google Button"
                            h={40}
                            grow={1}
                            bg={colors.background}
                            stroke={colors.input}
                            strokeWidth={1}
                            rounded={radius.default}
                            flex="row"
                            items="center"
                            justify="center"
                            gap={8}
                        >
                            <icon name="mdi:google" size={16} color={colors.foreground} />
                            <text size={14} weight="medium" color={colors.foreground}>
                                Google
                            </text>
                        </frame>
                        <frame
                            name="GitHub Button"
                            h={40}
                            grow={1}
                            bg={colors.background}
                            stroke={colors.input}
                            strokeWidth={1}
                            rounded={radius.default}
                            flex="row"
                            items="center"
                            justify="center"
                            gap={8}
                        >
                            <icon name="mdi:github" size={16} color={colors.foreground} />
                            <text size={14} weight="medium" color={colors.foreground}>
                                GitHub
                            </text>
                        </frame>
                    </frame>
                </frame>
            </Card>

            {/* Footer */}
            <text size={14} color={colors.mutedForeground}>
                Don't have an account?{' '}
                <text size={14} weight="medium" color={colors.primary}>
                    Sign up
                </text>
            </text>
        </frame>
    )
}
