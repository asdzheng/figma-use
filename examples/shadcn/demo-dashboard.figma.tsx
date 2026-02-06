/**
 * shadcn/ui Demo Page - Dashboard Cards
 * 
 * Run: figma-use render examples/shadcn/demo-dashboard.figma.tsx --x 600 --y 100
 */

import { colors, typography, spacing, radius, shadows } from './tokens'
import { Button, Card, Badge, Avatar, Tabs, Table } from './components'

export default function DashboardDemo() {
    return (
        <frame
            name="Dashboard Demo"
            w={800}
            bg={colors.background}
            p={32}
            flex="col"
            gap={24}
        >
            {/* Header */}
            <frame name="Header" flex="row" justify="between" items="center">
                <frame flex="col" gap={4}>
                    <text size={30} weight="bold" color={colors.foreground}>
                        Dashboard
                    </text>
                    <text size={14} color={colors.mutedForeground}>
                        Welcome back! Here's an overview of your account.
                    </text>
                </frame>
                <frame flex="row" gap={12} items="center">
                    <Button variant="outline" icon="lucide:settings">Settings</Button>
                    <Avatar fallback="JD" size="md" />
                </frame>
            </frame>

            {/* Stats Cards */}
            <frame name="Stats Row" flex="row" gap={16}>
                <frame
                    name="Stat Card 1"
                    grow={1}
                    bg={colors.card}
                    stroke={colors.border}
                    strokeWidth={1}
                    rounded={radius.lg}
                    p={24}
                    flex="col"
                    gap={12}
                >
                    <frame flex="row" justify="between" items="center">
                        <text size={14} weight="medium" color={colors.mutedForeground}>
                            Total Revenue
                        </text>
                        <icon name="lucide:dollar-sign" size={16} color={colors.mutedForeground} />
                    </frame>
                    <text size={30} weight="bold" color={colors.foreground}>
                        $45,231.89
                    </text>
                    <frame flex="row" gap={4} items="center">
                        <Badge variant="secondary">+20.1%</Badge>
                        <text size={12} color={colors.mutedForeground}>
                            from last month
                        </text>
                    </frame>
                </frame>

                <frame
                    name="Stat Card 2"
                    grow={1}
                    bg={colors.card}
                    stroke={colors.border}
                    strokeWidth={1}
                    rounded={radius.lg}
                    p={24}
                    flex="col"
                    gap={12}
                >
                    <frame flex="row" justify="between" items="center">
                        <text size={14} weight="medium" color={colors.mutedForeground}>
                            Subscriptions
                        </text>
                        <icon name="lucide:users" size={16} color={colors.mutedForeground} />
                    </frame>
                    <text size={30} weight="bold" color={colors.foreground}>
                        +2,350
                    </text>
                    <frame flex="row" gap={4} items="center">
                        <Badge variant="secondary">+180.1%</Badge>
                        <text size={12} color={colors.mutedForeground}>
                            from last month
                        </text>
                    </frame>
                </frame>

                <frame
                    name="Stat Card 3"
                    grow={1}
                    bg={colors.card}
                    stroke={colors.border}
                    strokeWidth={1}
                    rounded={radius.lg}
                    p={24}
                    flex="col"
                    gap={12}
                >
                    <frame flex="row" justify="between" items="center">
                        <text size={14} weight="medium" color={colors.mutedForeground}>
                            Active Now
                        </text>
                        <icon name="lucide:activity" size={16} color={colors.mutedForeground} />
                    </frame>
                    <text size={30} weight="bold" color={colors.foreground}>
                        +573
                    </text>
                    <frame flex="row" gap={4} items="center">
                        <Badge variant="secondary">+201</Badge>
                        <text size={12} color={colors.mutedForeground}>
                            since last hour
                        </text>
                    </frame>
                </frame>
            </frame>

            {/* Tabs */}
            <Tabs tabs={['Overview', 'Analytics', 'Reports', 'Notifications']} activeIndex={0} />

            {/* Recent Sales Card */}
            <frame
                name="Recent Sales"
                bg={colors.card}
                stroke={colors.border}
                strokeWidth={1}
                rounded={radius.lg}
                p={24}
                flex="col"
                gap={16}
            >
                <frame flex="row" justify="between" items="center">
                    <frame flex="col" gap={4}>
                        <text size={18} weight="semibold" color={colors.foreground}>
                            Recent Sales
                        </text>
                        <text size={14} color={colors.mutedForeground}>
                            You made 265 sales this month.
                        </text>
                    </frame>
                    <Button variant="outline">View All</Button>
                </frame>

                {/* Sales Items */}
                <frame flex="col" gap={16}>
                    {[
                        { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '+$1,999.00' },
                        { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '+$39.00' },
                        { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '+$299.00' },
                        { name: 'William Kim', email: 'will@email.com', amount: '+$99.00' },
                    ].map((sale, i) => (
                        <frame key={i} name={`Sale ${i}`} flex="row" justify="between" items="center">
                            <frame flex="row" gap={12} items="center">
                                <Avatar fallback={sale.name.split(' ').map(n => n[0]).join('')} size="md" />
                                <frame flex="col" gap={2}>
                                    <text size={14} weight="medium" color={colors.foreground}>
                                        {sale.name}
                                    </text>
                                    <text size={12} color={colors.mutedForeground}>
                                        {sale.email}
                                    </text>
                                </frame>
                            </frame>
                            <text size={14} weight="medium" color={colors.foreground}>
                                {sale.amount}
                            </text>
                        </frame>
                    ))}
                </frame>
            </frame>
        </frame>
    )
}
