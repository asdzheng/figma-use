/**
 * shadcn/ui Components for figma-use
 * Pre-built components using shadcn/ui design tokens
 */

import { colors, typography, spacing, radius, shadows } from './tokens'

// =============================================================================
// BUTTON COMPONENT
// =============================================================================

type ButtonVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'default' | 'lg' | 'icon'

interface ButtonProps {
    children: string
    variant?: ButtonVariant
    size?: ButtonSize
    icon?: string
}

export function Button({ children, variant = 'default', size = 'default', icon }: ButtonProps) {
    const variants: Record<ButtonVariant, { bg: string; color: string; border?: string }> = {
        default: { bg: colors.primary, color: colors.primaryForeground },
        secondary: { bg: colors.secondary, color: colors.secondaryForeground },
        destructive: { bg: colors.destructive, color: colors.destructiveForeground },
        outline: { bg: 'transparent', color: colors.foreground, border: colors.input },
        ghost: { bg: 'transparent', color: colors.foreground },
    }

    const sizes: Record<ButtonSize, { h: number; px: number; fontSize: number }> = {
        sm: { h: 36, px: 12, fontSize: 14 },
        default: { h: 40, px: 16, fontSize: 14 },
        lg: { h: 44, px: 32, fontSize: 14 },
        icon: { h: 40, px: 0, fontSize: 14 },
    }

    const v = variants[variant]
    const s = sizes[size]

    return (
        <frame
            name={`Button/${variant}`}
            h={s.h}
            px={s.px}
            bg={v.bg}
            rounded={radius.default}
            flex="row"
            items="center"
            justify="center"
            gap={8}
            stroke={v.border}
            strokeWidth={v.border ? 1 : 0}
        >
            {icon && <icon name={icon} size={16} color={v.color} />}
            <text size={s.fontSize} weight="medium" color={v.color}>
                {children}
            </text>
        </frame>
    )
}

// =============================================================================
// CARD COMPONENT
// =============================================================================

interface CardProps {
    title?: string
    description?: string
    children?: any
    footer?: any
}

export function Card({ title, description, children, footer }: CardProps) {
    return (
        <frame
            name="Card"
            bg={colors.card}
            rounded={radius.lg}
            stroke={colors.border}
            strokeWidth={1}
            flex="col"
            p={24}
            gap={16}
            shadow={shadows.sm}
        >
            {(title || description) && (
                <frame name="Card Header" flex="col" gap={6}>
                    {title && (
                        <text size={18} weight="semibold" color={colors.cardForeground}>
                            {title}
                        </text>
                    )}
                    {description && (
                        <text size={14} color={colors.mutedForeground}>
                            {description}
                        </text>
                    )}
                </frame>
            )}
            {children && <frame name="Card Content" flex="col" gap={16}>{children}</frame>}
            {footer && (
                <frame name="Card Footer" flex="row" items="center" gap={8}>
                    {footer}
                </frame>
            )}
        </frame>
    )
}

// =============================================================================
// INPUT COMPONENT
// =============================================================================

interface InputProps {
    placeholder?: string
    value?: string
    label?: string
    disabled?: boolean
}

export function Input({ placeholder = 'Enter text...', value, label, disabled }: InputProps) {
    return (
        <frame name="Input Group" flex="col" gap={8}>
            {label && (
                <text size={14} weight="medium" color={colors.foreground}>
                    {label}
                </text>
            )}
            <frame
                name="Input"
                h={40}
                w={280}
                bg={disabled ? colors.muted : colors.background}
                rounded={radius.default}
                stroke={colors.input}
                strokeWidth={1}
                px={12}
                flex="row"
                items="center"
            >
                <text size={14} color={value ? colors.foreground : colors.mutedForeground}>
                    {value || placeholder}
                </text>
            </frame>
        </frame>
    )
}

// =============================================================================
// BADGE COMPONENT
// =============================================================================

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline'

interface BadgeProps {
    children: string
    variant?: BadgeVariant
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
    const variants: Record<BadgeVariant, { bg: string; color: string; border?: string }> = {
        default: { bg: colors.primary, color: colors.primaryForeground },
        secondary: { bg: colors.secondary, color: colors.secondaryForeground },
        destructive: { bg: colors.destructive, color: colors.destructiveForeground },
        outline: { bg: 'transparent', color: colors.foreground, border: colors.border },
    }

    const v = variants[variant]

    return (
        <frame
            name={`Badge/${variant}`}
            bg={v.bg}
            rounded={radius.full}
            px={10}
            py={2}
            stroke={v.border}
            strokeWidth={v.border ? 1 : 0}
            flex="row"
            items="center"
        >
            <text size={12} weight="semibold" color={v.color}>
                {children}
            </text>
        </frame>
    )
}

// =============================================================================
// AVATAR COMPONENT
// =============================================================================

type AvatarSize = 'sm' | 'md' | 'lg'

interface AvatarProps {
    src?: string
    fallback?: string
    size?: AvatarSize
}

export function Avatar({ src, fallback = 'U', size = 'md' }: AvatarProps) {
    const sizes: Record<AvatarSize, number> = { sm: 32, md: 40, lg: 48 }
    const s = sizes[size]

    return (
        <frame
            name="Avatar"
            w={s}
            h={s}
            bg={colors.muted}
            rounded={radius.full}
            flex="row"
            items="center"
            justify="center"
            overflow="hidden"
        >
            {src ? (
                <image src={src} w={s} h={s} />
            ) : (
                <text size={s * 0.4} weight="medium" color={colors.mutedForeground}>
                    {fallback}
                </text>
            )}
        </frame>
    )
}

// =============================================================================
// SEPARATOR COMPONENT
// =============================================================================

interface SeparatorProps {
    orientation?: 'horizontal' | 'vertical'
}

export function Separator({ orientation = 'horizontal' }: SeparatorProps) {
    return orientation === 'horizontal' ? (
        <frame name="Separator" w="fill" h={1} bg={colors.border} />
    ) : (
        <frame name="Separator" w={1} h="fill" bg={colors.border} />
    )
}

// =============================================================================
// ALERT COMPONENT
// =============================================================================

type AlertVariant = 'default' | 'destructive'

interface AlertProps {
    title?: string
    description: string
    variant?: AlertVariant
    icon?: string
}

export function Alert({ title, description, variant = 'default', icon }: AlertProps) {
    const isDestructive = variant === 'destructive'

    return (
        <frame
            name={`Alert/${variant}`}
            bg={isDestructive ? colors.destructive + '10' : colors.background}
            rounded={radius.lg}
            stroke={isDestructive ? colors.destructive : colors.border}
            strokeWidth={1}
            p={16}
            flex="row"
            gap={12}
        >
            {icon && (
                <icon
                    name={icon}
                    size={16}
                    color={isDestructive ? colors.destructive : colors.foreground}
                />
            )}
            <frame flex="col" gap={4}>
                {title && (
                    <text
                        size={14}
                        weight="medium"
                        color={isDestructive ? colors.destructive : colors.foreground}
                    >
                        {title}
                    </text>
                )}
                <text size={14} color={isDestructive ? colors.destructive : colors.mutedForeground}>
                    {description}
                </text>
            </frame>
        </frame>
    )
}

// =============================================================================
// CHECKBOX COMPONENT
// =============================================================================

interface CheckboxProps {
    checked?: boolean
    label?: string
    disabled?: boolean
}

export function Checkbox({ checked = false, label, disabled }: CheckboxProps) {
    return (
        <frame name="Checkbox Group" flex="row" items="center" gap={8}>
            <frame
                name="Checkbox"
                w={16}
                h={16}
                bg={checked ? colors.primary : colors.background}
                rounded={4}
                stroke={checked ? colors.primary : colors.input}
                strokeWidth={1}
                flex="row"
                items="center"
                justify="center"
            >
                {checked && <icon name="lucide:check" size={12} color={colors.primaryForeground} />}
            </frame>
            {label && (
                <text size={14} color={disabled ? colors.mutedForeground : colors.foreground}>
                    {label}
                </text>
            )}
        </frame>
    )
}

// =============================================================================
// SWITCH COMPONENT
// =============================================================================

interface SwitchProps {
    checked?: boolean
    disabled?: boolean
}

export function Switch({ checked = false, disabled }: SwitchProps) {
    return (
        <frame
            name="Switch"
            w={44}
            h={24}
            bg={checked ? colors.primary : colors.input}
            rounded={radius.full}
            p={2}
            flex="row"
            items="center"
            justify={checked ? 'end' : 'start'}
        >
            <frame
                name="Switch Thumb"
                w={20}
                h={20}
                bg={colors.background}
                rounded={radius.full}
                shadow={shadows.sm}
            />
        </frame>
    )
}

// =============================================================================
// TABS COMPONENT
// =============================================================================

interface TabsProps {
    tabs: string[]
    activeIndex?: number
}

export function Tabs({ tabs, activeIndex = 0 }: TabsProps) {
    return (
        <frame name="Tabs" bg={colors.muted} rounded={radius.default} p={4} flex="row" gap={0}>
            {tabs.map((tab, i) => (
                <frame
                    key={i}
                    name={`Tab/${tab}`}
                    bg={i === activeIndex ? colors.background : 'transparent'}
                    rounded={i === activeIndex ? radius.sm : 0}
                    px={12}
                    py={6}
                    shadow={i === activeIndex ? shadows.sm : undefined}
                >
                    <text
                        size={14}
                        weight="medium"
                        color={i === activeIndex ? colors.foreground : colors.mutedForeground}
                    >
                        {tab}
                    </text>
                </frame>
            ))}
        </frame>
    )
}

// =============================================================================
// TABLE COMPONENT
// =============================================================================

interface TableProps {
    headers: string[]
    rows: string[][]
}

export function Table({ headers, rows }: TableProps) {
    return (
        <frame name="Table" flex="col" stroke={colors.border} strokeWidth={1} rounded={radius.default}>
            {/* Header */}
            <frame name="Table Header" flex="row" bg={colors.muted}>
                {headers.map((header, i) => (
                    <frame key={i} w={150} p={12}>
                        <text size={14} weight="medium" color={colors.foreground}>
                            {header}
                        </text>
                    </frame>
                ))}
            </frame>
            {/* Rows */}
            {rows.map((row, rowIndex) => (
                <frame
                    key={rowIndex}
                    name={`Table Row ${rowIndex}`}
                    flex="row"
                    stroke={colors.border}
                    strokeWidth={1}
                    strokeAlign="inside"
                >
                    {row.map((cell, cellIndex) => (
                        <frame key={cellIndex} w={150} p={12}>
                            <text size={14} color={colors.foreground}>
                                {cell}
                            </text>
                        </frame>
                    ))}
                </frame>
            ))}
        </frame>
    )
}

// Export all components
export default {
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
    Table,
}
