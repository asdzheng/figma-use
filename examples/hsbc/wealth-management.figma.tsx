/**
 * HSBC Wealth Management Page
 * 
 * Run: figma-use render examples/hsbc/wealth-management.figma.tsx --x 0 --y 0
 */

import { Frame, Text, Icon } from 'figma-use/render'
import { colors, typography, spacing, radius, shadows } from './tokens'

// =============================================================================
// HEADER / NAVIGATION
// =============================================================================

function Header() {
    return (
        <Frame
            name="Header"
            w={1440}
            h={72}
            bg={colors.white}
            px={80}
            flex="row"
            items="center"
            justify="between"
            stroke={colors.border}
            strokeWidth={1}
            strokeAlign="inside"
        >
            {/* Logo */}
            <Frame name="Logo" flex="row" items="center" gap={12}>
                <Frame name="HSBC Logo" w={40} h={40} bg={colors.primary} rounded={4} flex="row" items="center" justify="center">
                    <Text size={16} weight="bold" color={colors.white}>
                        HSBC
                    </Text>
                </Frame>
                <Frame name="Divider" w={1} h={32} bg={colors.grey200} />
                <Text size={16} weight="medium" color={colors.grey800}>
                    Private Banking
                </Text>
            </Frame>

            {/* Navigation */}
            <Frame name="Navigation" flex="row" gap={32}>
                <Text size={14} weight="medium" color={colors.primary}>Wealth Solutions</Text>
                <Text size={14} weight="medium" color={colors.grey700}>Investments</Text>
                <Text size={14} weight="medium" color={colors.grey700}>Insights</Text>
                <Text size={14} weight="medium" color={colors.grey700}>About Us</Text>
            </Frame>

            {/* Actions */}
            <Frame name="Actions" flex="row" gap={16} items="center">
                <Frame name="Search" w={40} h={40} flex="row" items="center" justify="center">
                    <Icon name="lucide:search" size={20} color={colors.grey600} />
                </Frame>
                <Frame
                    name="Login Button"
                    h={40}
                    px={24}
                    bg={colors.primary}
                    rounded={radius.default}
                    flex="row"
                    items="center"
                    justify="center"
                >
                    <Text size={14} weight="medium" color={colors.white}>
                        Log on
                    </Text>
                </Frame>
            </Frame>
        </Frame>
    )
}

// =============================================================================
// HERO SECTION
// =============================================================================

function HeroSection() {
    return (
        <Frame
            name="Hero"
            w={1440}
            h={560}
            bg={colors.grey900}
            px={80}
            py={80}
            flex="row"
            items="center"
            justify="between"
        >
            {/* Text Content */}
            <Frame name="Hero Content" w={560} flex="col" gap={32}>
                <Frame flex="col" gap={16}>
                    <Text size={14} weight="semibold" color={colors.primary}>
                        HSBC PRIVATE BANKING
                    </Text>
                    <Text size={48} weight="bold" color={colors.white}>
                        Grow and protect your wealth
                    </Text>
                    <Text size={18} color={colors.grey300}>
                        Expert guidance and tailored solutions to help you achieve your financial goals across generations.
                    </Text>
                </Frame>

                <Frame flex="row" gap={16}>
                    <Frame
                        name="CTA Primary"
                        h={52}
                        px={32}
                        bg={colors.primary}
                        rounded={radius.default}
                        flex="row"
                        items="center"
                        gap={8}
                    >
                        <Text size={16} weight="medium" color={colors.white}>
                            Get Started
                        </Text>
                        <Icon name="lucide:arrow-right" size={18} color={colors.white} />
                    </Frame>
                    <Frame
                        name="CTA Secondary"
                        h={52}
                        px={32}
                        bg="transparent"
                        stroke={colors.white}
                        strokeWidth={1}
                        rounded={radius.default}
                        flex="row"
                        items="center"
                    >
                        <Text size={16} weight="medium" color={colors.white}>
                            Learn More
                        </Text>
                    </Frame>
                </Frame>
            </Frame>

            {/* Stats Cards */}
            <Frame name="Stats" flex="row" gap={24}>
                <Frame name="Stat 1" w={180} h={160} bg="rgba(255,255,255,0.1)" rounded={radius.lg} p={24} flex="col" justify="between">
                    <Text size={36} weight="bold" color={colors.white}>$500B+</Text>
                    <Text size={14} color={colors.grey300}>Assets Under Management</Text>
                </Frame>
                <Frame name="Stat 2" w={180} h={160} bg="rgba(255,255,255,0.1)" rounded={radius.lg} p={24} flex="col" justify="between">
                    <Text size={36} weight="bold" color={colors.white}>150+</Text>
                    <Text size={14} color={colors.grey300}>Years of Experience</Text>
                </Frame>
                <Frame name="Stat 3" w={180} h={160} bg="rgba(255,255,255,0.1)" rounded={radius.lg} p={24} flex="col" justify="between">
                    <Text size={36} weight="bold" color={colors.white}>60+</Text>
                    <Text size={14} color={colors.grey300}>Markets Worldwide</Text>
                </Frame>
            </Frame>
        </Frame>
    )
}

// =============================================================================
// PORTFOLIO OVERVIEW
// =============================================================================

function PortfolioOverview() {
    return (
        <Frame
            name="Portfolio Section"
            w={1440}
            bg={colors.white}
            px={80}
            py={80}
            flex="col"
            gap={48}
        >
            {/* Section Header */}
            <Frame flex="row" justify="between" items="end">
                <Frame flex="col" gap={8}>
                    <Text size={14} weight="semibold" color={colors.primary}>YOUR PORTFOLIO</Text>
                    <Text size={36} weight="bold" color={colors.grey900}>Portfolio Overview</Text>
                </Frame>
                <Frame name="View All" h={44} px={24} stroke={colors.grey200} strokeWidth={1} rounded={radius.default} flex="row" items="center" gap={8}>
                    <Text size={14} weight="medium" color={colors.grey700}>View Details</Text>
                    <Icon name="lucide:arrow-right" size={16} color={colors.grey700} />
                </Frame>
            </Frame>

            {/* Portfolio Cards */}
            <Frame flex="row" gap={24}>
                {/* Total Value Card */}
                <Frame name="Total Value" w={400} bg={colors.grey50} rounded={radius.lg} p={32} flex="col" gap={24} stroke={colors.border} strokeWidth={1}>
                    <Frame flex="row" justify="between" items="center">
                        <Text size={14} weight="medium" color={colors.grey600}>Total Portfolio Value</Text>
                        <Frame w={40} h={40} bg={colors.successLight} rounded={radius.full} flex="row" items="center" justify="center">
                            <Icon name="lucide:trending-up" size={20} color={colors.success} />
                        </Frame>
                    </Frame>
                    <Frame flex="col" gap={8}>
                        <Text size={42} weight="bold" color={colors.grey900}>$2,847,392</Text>
                        <Frame flex="row" gap={8} items="center">
                            <Frame px={8} py={4} bg={colors.successLight} rounded={radius.sm}>
                                <Text size={12} weight="semibold" color={colors.success}>+12.4%</Text>
                            </Frame>
                            <Text size={14} color={colors.grey500}>vs last year</Text>
                        </Frame>
                    </Frame>
                </Frame>

                {/* Asset Allocation */}
                <Frame name="Asset Allocation" grow={1} bg={colors.white} rounded={radius.lg} p={32} flex="col" gap={24} stroke={colors.border} strokeWidth={1}>
                    <Text size={14} weight="medium" color={colors.grey600}>Asset Allocation</Text>
                    <Frame flex="row" gap={32}>
                        {/* Equities */}
                        <Frame flex="col" gap={12} grow={1}>
                            <Frame flex="row" gap={8} items="center">
                                <Frame w={12} h={12} bg={colors.primary} rounded={radius.sm} />
                                <Text size={14} weight="medium" color={colors.grey700}>Equities</Text>
                            </Frame>
                            <Text size={24} weight="bold" color={colors.grey900}>45%</Text>
                            <Text size={14} color={colors.grey500}>$1,281,326</Text>
                        </Frame>
                        {/* Fixed Income */}
                        <Frame flex="col" gap={12} grow={1}>
                            <Frame flex="row" gap={8} items="center">
                                <Frame w={12} h={12} bg={colors.success} rounded={radius.sm} />
                                <Text size={14} weight="medium" color={colors.grey700}>Fixed Income</Text>
                            </Frame>
                            <Text size={24} weight="bold" color={colors.grey900}>30%</Text>
                            <Text size={14} color={colors.grey500}>$854,218</Text>
                        </Frame>
                        {/* Real Estate */}
                        <Frame flex="col" gap={12} grow={1}>
                            <Frame flex="row" gap={8} items="center">
                                <Frame w={12} h={12} bg={colors.info} rounded={radius.sm} />
                                <Text size={14} weight="medium" color={colors.grey700}>Real Estate</Text>
                            </Frame>
                            <Text size={24} weight="bold" color={colors.grey900}>15%</Text>
                            <Text size={14} color={colors.grey500}>$427,109</Text>
                        </Frame>
                        {/* Cash */}
                        <Frame flex="col" gap={12} grow={1}>
                            <Frame flex="row" gap={8} items="center">
                                <Frame w={12} h={12} bg={colors.grey400} rounded={radius.sm} />
                                <Text size={14} weight="medium" color={colors.grey700}>Cash</Text>
                            </Frame>
                            <Text size={24} weight="bold" color={colors.grey900}>10%</Text>
                            <Text size={14} color={colors.grey500}>$284,739</Text>
                        </Frame>
                    </Frame>
                </Frame>
            </Frame>
        </Frame>
    )
}

// =============================================================================
// INVESTMENT PRODUCTS
// =============================================================================

function InvestmentProducts() {
    return (
        <Frame name="Products Section" w={1440} bg={colors.grey50} px={80} py={80} flex="col" gap={48}>
            {/* Section Header */}
            <Frame flex="col" gap={8} items="center">
                <Text size={14} weight="semibold" color={colors.primary}>INVESTMENT SOLUTIONS</Text>
                <Text size={36} weight="bold" color={colors.grey900}>Tailored for your goals</Text>
                <Text size={16} color={colors.grey600}>Discover our range of wealth management solutions</Text>
            </Frame>

            {/* Product Cards */}
            <Frame flex="row" gap={24}>
                {/* Product 1 */}
                <Frame name="Product 1" grow={1} bg={colors.white} rounded={radius.lg} p={32} flex="col" gap={24} shadow={shadows.sm}>
                    <Frame w={56} h={56} bg="#DB001110" rounded={radius.lg} flex="row" items="center" justify="center">
                        <Icon name="lucide:bar-chart-3" size={28} color={colors.primary} />
                    </Frame>
                    <Frame flex="col" gap={12}>
                        <Text size={20} weight="semibold" color={colors.grey900}>Discretionary Portfolio</Text>
                        <Text size={14} color={colors.grey600}>Let our experts manage your investments with strategies aligned to your risk profile.</Text>
                    </Frame>
                    <Frame flex="col" gap={8}>
                        <Frame flex="row" gap={8} items="center">
                            <Icon name="lucide:check" size={16} color={colors.success} />
                            <Text size={14} color={colors.grey700}>Active management</Text>
                        </Frame>
                        <Frame flex="row" gap={8} items="center">
                            <Icon name="lucide:check" size={16} color={colors.success} />
                            <Text size={14} color={colors.grey700}>Diversified portfolio</Text>
                        </Frame>
                        <Frame flex="row" gap={8} items="center">
                            <Icon name="lucide:check" size={16} color={colors.success} />
                            <Text size={14} color={colors.grey700}>Regular reporting</Text>
                        </Frame>
                    </Frame>
                    <Frame name="Learn More" h={44} flex="row" items="center" gap={4}>
                        <Text size={14} weight="medium" color={colors.primary}>Learn more</Text>
                        <Icon name="lucide:arrow-right" size={16} color={colors.primary} />
                    </Frame>
                </Frame>

                {/* Product 2 */}
                <Frame name="Product 2" grow={1} bg={colors.white} rounded={radius.lg} p={32} flex="col" gap={24} shadow={shadows.sm}>
                    <Frame w={56} h={56} bg="#DB001110" rounded={radius.lg} flex="row" items="center" justify="center">
                        <Icon name="lucide:shield-check" size={28} color={colors.primary} />
                    </Frame>
                    <Frame flex="col" gap={12}>
                        <Text size={20} weight="semibold" color={colors.grey900}>Wealth Protection</Text>
                        <Text size={14} color={colors.grey600}>Comprehensive insurance and estate planning solutions to safeguard your legacy.</Text>
                    </Frame>
                    <Frame flex="col" gap={8}>
                        <Frame flex="row" gap={8} items="center">
                            <Icon name="lucide:check" size={16} color={colors.success} />
                            <Text size={14} color={colors.grey700}>Life insurance</Text>
                        </Frame>
                        <Frame flex="row" gap={8} items="center">
                            <Icon name="lucide:check" size={16} color={colors.success} />
                            <Text size={14} color={colors.grey700}>Trust services</Text>
                        </Frame>
                        <Frame flex="row" gap={8} items="center">
                            <Icon name="lucide:check" size={16} color={colors.success} />
                            <Text size={14} color={colors.grey700}>Estate planning</Text>
                        </Frame>
                    </Frame>
                    <Frame name="Learn More" h={44} flex="row" items="center" gap={4}>
                        <Text size={14} weight="medium" color={colors.primary}>Learn more</Text>
                        <Icon name="lucide:arrow-right" size={16} color={colors.primary} />
                    </Frame>
                </Frame>

                {/* Product 3 */}
                <Frame name="Product 3" grow={1} bg={colors.white} rounded={radius.lg} p={32} flex="col" gap={24} shadow={shadows.sm}>
                    <Frame w={56} h={56} bg="#DB001110" rounded={radius.lg} flex="row" items="center" justify="center">
                        <Icon name="lucide:building" size={28} color={colors.primary} />
                    </Frame>
                    <Frame flex="col" gap={12}>
                        <Text size={20} weight="semibold" color={colors.grey900}>Real Estate</Text>
                        <Text size={14} color={colors.grey600}>Access exclusive property investments and mortgage solutions worldwide.</Text>
                    </Frame>
                    <Frame flex="col" gap={8}>
                        <Frame flex="row" gap={8} items="center">
                            <Icon name="lucide:check" size={16} color={colors.success} />
                            <Text size={14} color={colors.grey700}>Global properties</Text>
                        </Frame>
                        <Frame flex="row" gap={8} items="center">
                            <Icon name="lucide:check" size={16} color={colors.success} />
                            <Text size={14} color={colors.grey700}>Mortgage solutions</Text>
                        </Frame>
                        <Frame flex="row" gap={8} items="center">
                            <Icon name="lucide:check" size={16} color={colors.success} />
                            <Text size={14} color={colors.grey700}>REIT access</Text>
                        </Frame>
                    </Frame>
                    <Frame name="Learn More" h={44} flex="row" items="center" gap={4}>
                        <Text size={14} weight="medium" color={colors.primary}>Learn more</Text>
                        <Icon name="lucide:arrow-right" size={16} color={colors.primary} />
                    </Frame>
                </Frame>

                {/* Product 4 */}
                <Frame name="Product 4" grow={1} bg={colors.white} rounded={radius.lg} p={32} flex="col" gap={24} shadow={shadows.sm}>
                    <Frame w={56} h={56} bg="#DB001110" rounded={radius.lg} flex="row" items="center" justify="center">
                        <Icon name="lucide:globe" size={28} color={colors.primary} />
                    </Frame>
                    <Frame flex="col" gap={12}>
                        <Text size={20} weight="semibold" color={colors.grey900}>Global Markets</Text>
                        <Text size={14} color={colors.grey600}>Trade across 60+ markets with competitive rates and expert insights.</Text>
                    </Frame>
                    <Frame flex="col" gap={8}>
                        <Frame flex="row" gap={8} items="center">
                            <Icon name="lucide:check" size={16} color={colors.success} />
                            <Text size={14} color={colors.grey700}>Multi-currency</Text>
                        </Frame>
                        <Frame flex="row" gap={8} items="center">
                            <Icon name="lucide:check" size={16} color={colors.success} />
                            <Text size={14} color={colors.grey700}>Research & insights</Text>
                        </Frame>
                        <Frame flex="row" gap={8} items="center">
                            <Icon name="lucide:check" size={16} color={colors.success} />
                            <Text size={14} color={colors.grey700}>24/7 trading</Text>
                        </Frame>
                    </Frame>
                    <Frame name="Learn More" h={44} flex="row" items="center" gap={4}>
                        <Text size={14} weight="medium" color={colors.primary}>Learn more</Text>
                        <Icon name="lucide:arrow-right" size={16} color={colors.primary} />
                    </Frame>
                </Frame>
            </Frame>
        </Frame>
    )
}

// =============================================================================
// MARKET INSIGHTS
// =============================================================================

function MarketInsights() {
    return (
        <Frame name="Insights Section" w={1440} bg={colors.white} px={80} py={80} flex="col" gap={48}>
            {/* Section Header */}
            <Frame flex="row" justify="between" items="end">
                <Frame flex="col" gap={8}>
                    <Text size={14} weight="semibold" color={colors.primary}>MARKET INSIGHTS</Text>
                    <Text size={36} weight="bold" color={colors.grey900}>Latest from our experts</Text>
                </Frame>
                <Frame flex="row" items="center" gap={8}>
                    <Text size={14} weight="medium" color={colors.primary}>View all insights</Text>
                    <Icon name="lucide:arrow-right" size={16} color={colors.primary} />
                </Frame>
            </Frame>

            {/* Insight Cards */}
            <Frame flex="row" gap={24}>
                {/* Card 1 */}
                <Frame name="Insight 1" grow={1} bg={colors.grey50} rounded={radius.lg} flex="col" overflow="hidden">
                    <Frame name="Image" w="fill" h={180} bg={colors.grey200} />
                    <Frame p={24} flex="col" gap={16}>
                        <Text size={12} weight="semibold" color={colors.primary}>MARKET OUTLOOK</Text>
                        <Text size={18} weight="semibold" color={colors.grey900}>Q1 2025 Investment Strategy: Navigating Market Uncertainty</Text>
                        <Frame flex="row" gap={16}>
                            <Text size={12} color={colors.grey500}>January 15, 2025</Text>
                            <Text size={12} color={colors.grey500}>•</Text>
                            <Text size={12} color={colors.grey500}>5 min read</Text>
                        </Frame>
                    </Frame>
                </Frame>

                {/* Card 2 */}
                <Frame name="Insight 2" grow={1} bg={colors.grey50} rounded={radius.lg} flex="col" overflow="hidden">
                    <Frame name="Image" w="fill" h={180} bg={colors.grey200} />
                    <Frame p={24} flex="col" gap={16}>
                        <Text size={12} weight="semibold" color={colors.primary}>WEALTH PLANNING</Text>
                        <Text size={18} weight="semibold" color={colors.grey900}>Tax-Efficient Strategies for High-Net-Worth Individuals</Text>
                        <Frame flex="row" gap={16}>
                            <Text size={12} color={colors.grey500}>January 12, 2025</Text>
                            <Text size={12} color={colors.grey500}>•</Text>
                            <Text size={12} color={colors.grey500}>8 min read</Text>
                        </Frame>
                    </Frame>
                </Frame>

                {/* Card 3 */}
                <Frame name="Insight 3" grow={1} bg={colors.grey50} rounded={radius.lg} flex="col" overflow="hidden">
                    <Frame name="Image" w="fill" h={180} bg={colors.grey200} />
                    <Frame p={24} flex="col" gap={16}>
                        <Text size={12} weight="semibold" color={colors.primary}>ESG INVESTING</Text>
                        <Text size={18} weight="semibold" color={colors.grey900}>Sustainable Investing: Performance and Impact in 2025</Text>
                        <Frame flex="row" gap={16}>
                            <Text size={12} color={colors.grey500}>January 10, 2025</Text>
                            <Text size={12} color={colors.grey500}>•</Text>
                            <Text size={12} color={colors.grey500}>6 min read</Text>
                        </Frame>
                    </Frame>
                </Frame>
            </Frame>
        </Frame>
    )
}

// =============================================================================
// FOOTER
// =============================================================================

function Footer() {
    return (
        <Frame name="Footer" w={1440} bg={colors.grey900} px={80} py={64} flex="col" gap={48}>
            {/* Footer Main */}
            <Frame flex="row" justify="between">
                {/* Brand */}
                <Frame flex="col" gap={16} w={280}>
                    <Frame flex="row" items="center" gap={12}>
                        <Frame w={48} h={48} bg={colors.primary} rounded={4} flex="row" items="center" justify="center">
                            <Text size={18} weight="bold" color={colors.white}>HSBC</Text>
                        </Frame>
                    </Frame>
                    <Text size={14} color={colors.grey400}>
                        HSBC Private Banking provides comprehensive wealth management solutions for high-net-worth individuals globally.
                    </Text>
                </Frame>

                {/* Services */}
                <Frame flex="col" gap={16}>
                    <Text size={14} weight="semibold" color={colors.white}>Services</Text>
                    <Frame flex="col" gap={12}>
                        <Text size={14} color={colors.grey400}>Wealth Management</Text>
                        <Text size={14} color={colors.grey400}>Private Banking</Text>
                        <Text size={14} color={colors.grey400}>Investment Advisory</Text>
                        <Text size={14} color={colors.grey400}>Estate Planning</Text>
                    </Frame>
                </Frame>

                {/* Company */}
                <Frame flex="col" gap={16}>
                    <Text size={14} weight="semibold" color={colors.white}>Company</Text>
                    <Frame flex="col" gap={12}>
                        <Text size={14} color={colors.grey400}>About Us</Text>
                        <Text size={14} color={colors.grey400}>Careers</Text>
                        <Text size={14} color={colors.grey400}>Press</Text>
                        <Text size={14} color={colors.grey400}>Contact</Text>
                    </Frame>
                </Frame>

                {/* Legal */}
                <Frame flex="col" gap={16}>
                    <Text size={14} weight="semibold" color={colors.white}>Legal</Text>
                    <Frame flex="col" gap={12}>
                        <Text size={14} color={colors.grey400}>Privacy Policy</Text>
                        <Text size={14} color={colors.grey400}>Terms of Service</Text>
                        <Text size={14} color={colors.grey400}>Cookie Policy</Text>
                        <Text size={14} color={colors.grey400}>Regulatory</Text>
                    </Frame>
                </Frame>
            </Frame>

            {/* Divider */}
            <Frame w="fill" h={1} bg={colors.grey700} />

            {/* Copyright */}
            <Frame flex="row" justify="between" items="center">
                <Text size={12} color={colors.grey500}>© 2025 HSBC Holdings plc. All rights reserved.</Text>
                <Frame flex="row" gap={16}>
                    <Icon name="mdi:linkedin" size={20} color={colors.grey400} />
                    <Icon name="mdi:twitter" size={20} color={colors.grey400} />
                    <Icon name="mdi:youtube" size={20} color={colors.grey400} />
                </Frame>
            </Frame>
        </Frame>
    )
}

// =============================================================================
// MAIN PAGE EXPORT
// =============================================================================

export default function WealthManagementPage() {
    return (
        <Frame name="HSBC Wealth Management" flex="col">
            <Header />
            <HeroSection />
            <PortfolioOverview />
            <InvestmentProducts />
            <MarketInsights />
            <Footer />
        </Frame>
    )
}
