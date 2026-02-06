/**
 * Stock Analysis Dashboard Page
 * Using shadcn/ui design system
 * 
 * Run: bun packages/cli/src/index.ts render examples/shadcn/stock-analysis.figma.tsx --x 0 --y 500
 */

import { Frame, Text, Icon } from 'figma-use/render'
import { colors, typography, spacing, radius, shadows } from './tokens'

// Status colors for stock changes
const statusColors = {
    up: '#22C55E',
    down: '#EF4444',
    neutral: '#71717A',
}

// =============================================================================
// HEADER
// =============================================================================

function Header() {
    return (
        <Frame
            name="Header"
            w={1440}
            h={64}
            bg={colors.background}
            px={32}
            flex="row"
            items="center"
            justify="between"
            stroke={colors.border}
            strokeWidth={1}
            strokeAlign="inside"
        >
            {/* Logo */}
            <Frame flex="row" items="center" gap={12}>
                <Frame w={32} h={32} bg={colors.primary} rounded={radius.default} flex="row" items="center" justify="center">
                    <Icon icon="lucide:line-chart" size={18} color={colors.primaryForeground} />
                </Frame>
                <Text size={18} weight="bold" color={colors.foreground}>StockView</Text>
            </Frame>

            {/* Navigation */}
            <Frame flex="row" gap={32}>
                <Text size={14} weight="medium" color={colors.foreground}>Dashboard</Text>
                <Text size={14} color={colors.mutedForeground}>Markets</Text>
                <Text size={14} color={colors.mutedForeground}>Watchlist</Text>
                <Text size={14} color={colors.mutedForeground}>Portfolio</Text>
                <Text size={14} color={colors.mutedForeground}>News</Text>
            </Frame>

            {/* Actions */}
            <Frame flex="row" gap={12} items="center">
                <Frame w={36} h={36} rounded={radius.default} flex="row" items="center" justify="center" bg={colors.secondary}>
                    <Icon icon="lucide:search" size={18} color={colors.foreground} />
                </Frame>
                <Frame w={36} h={36} rounded={radius.default} flex="row" items="center" justify="center" bg={colors.secondary}>
                    <Icon icon="lucide:bell" size={18} color={colors.foreground} />
                </Frame>
                <Frame w={36} h={36} rounded={radius.full} bg={colors.muted} flex="row" items="center" justify="center">
                    <Text size={14} weight="medium" color={colors.mutedForeground}>JD</Text>
                </Frame>
            </Frame>
        </Frame>
    )
}

// =============================================================================
// STOCK HEADER (Ticker Info)
// =============================================================================

function StockHeader() {
    return (
        <Frame name="Stock Header" w="fill" flex="row" justify="between" items="start">
            {/* Stock Info */}
            <Frame flex="col" gap={8}>
                <Frame flex="row" gap={12} items="center">
                    <Frame w={48} h={48} bg={colors.secondary} rounded={radius.default} flex="row" items="center" justify="center">
                        <Text size={14} weight="bold" color={colors.foreground}>AAPL</Text>
                    </Frame>
                    <Frame flex="col" gap={2}>
                        <Text size={24} weight="bold" color={colors.foreground}>Apple Inc.</Text>
                        <Text size={14} color={colors.mutedForeground}>NASDAQ: AAPL</Text>
                    </Frame>
                </Frame>
                <Frame flex="row" gap={8}>
                    <Frame px={10} py={4} bg={colors.secondary} rounded={radius.full}>
                        <Text size={12} color={colors.foreground}>Technology</Text>
                    </Frame>
                    <Frame px={10} py={4} bg={colors.secondary} rounded={radius.full}>
                        <Text size={12} color={colors.foreground}>Consumer Electronics</Text>
                    </Frame>
                </Frame>
            </Frame>

            {/* Price Info */}
            <Frame flex="col" gap={4} items="end">
                <Text size={36} weight="bold" color={colors.foreground}>$178.72</Text>
                <Frame flex="row" gap={8} items="center">
                    <Frame flex="row" gap={4} items="center" px={8} py={4} bg="#22C55E20" rounded={radius.default}>
                        <Icon icon="lucide:trending-up" size={16} color={statusColors.up} />
                        <Text size={14} weight="medium" color={statusColors.up}>+$2.34 (1.33%)</Text>
                    </Frame>
                    <Text size={12} color={colors.mutedForeground}>Today</Text>
                </Frame>
            </Frame>
        </Frame>
    )
}

// =============================================================================
// PRICE CHART CARD
// =============================================================================

function PriceChart() {
    return (
        <Frame name="Price Chart" grow={1} bg={colors.card} rounded={radius.lg} p={24} flex="col" gap={20} stroke={colors.border} strokeWidth={1}>
            {/* Chart Header */}
            <Frame flex="row" justify="between" items="center">
                <Text size={16} weight="medium" color={colors.foreground}>Price History</Text>
                <Frame flex="row" gap={4}>
                    <Frame px={12} py={6} bg={colors.primary} rounded={radius.default}>
                        <Text size={12} weight="medium" color={colors.primaryForeground}>1D</Text>
                    </Frame>
                    <Frame px={12} py={6} bg={colors.secondary} rounded={radius.default}>
                        <Text size={12} color={colors.foreground}>1W</Text>
                    </Frame>
                    <Frame px={12} py={6} bg={colors.secondary} rounded={radius.default}>
                        <Text size={12} color={colors.foreground}>1M</Text>
                    </Frame>
                    <Frame px={12} py={6} bg={colors.secondary} rounded={radius.default}>
                        <Text size={12} color={colors.foreground}>3M</Text>
                    </Frame>
                    <Frame px={12} py={6} bg={colors.secondary} rounded={radius.default}>
                        <Text size={12} color={colors.foreground}>1Y</Text>
                    </Frame>
                    <Frame px={12} py={6} bg={colors.secondary} rounded={radius.default}>
                        <Text size={12} color={colors.foreground}>All</Text>
                    </Frame>
                </Frame>
            </Frame>

            {/* Chart Placeholder */}
            <Frame name="Chart Area" w="fill" h={280} bg={colors.muted} rounded={radius.default} flex="col" items="center" justify="center">
                <Icon icon="lucide:line-chart" size={48} color={colors.mutedForeground} />
                <Text size={14} color={colors.mutedForeground}>Stock Price Chart</Text>
            </Frame>

            {/* Chart Stats */}
            <Frame flex="row" gap={24}>
                <Frame flex="col" gap={2}>
                    <Text size={12} color={colors.mutedForeground}>Open</Text>
                    <Text size={14} weight="medium" color={colors.foreground}>$176.38</Text>
                </Frame>
                <Frame flex="col" gap={2}>
                    <Text size={12} color={colors.mutedForeground}>High</Text>
                    <Text size={14} weight="medium" color={statusColors.up}>$179.25</Text>
                </Frame>
                <Frame flex="col" gap={2}>
                    <Text size={12} color={colors.mutedForeground}>Low</Text>
                    <Text size={14} weight="medium" color={statusColors.down}>$175.82</Text>
                </Frame>
                <Frame flex="col" gap={2}>
                    <Text size={12} color={colors.mutedForeground}>Close</Text>
                    <Text size={14} weight="medium" color={colors.foreground}>$178.72</Text>
                </Frame>
                <Frame flex="col" gap={2}>
                    <Text size={12} color={colors.mutedForeground}>Volume</Text>
                    <Text size={14} weight="medium" color={colors.foreground}>52.3M</Text>
                </Frame>
            </Frame>
        </Frame>
    )
}

// =============================================================================
// KEY METRICS CARD
// =============================================================================

function KeyMetrics() {
    return (
        <Frame name="Key Metrics" w={320} bg={colors.card} rounded={radius.lg} p={24} flex="col" gap={20} stroke={colors.border} strokeWidth={1}>
            <Text size={16} weight="medium" color={colors.foreground}>Key Metrics</Text>

            <Frame flex="col" gap={16}>
                <Frame flex="row" justify="between">
                    <Text size={14} color={colors.mutedForeground}>Market Cap</Text>
                    <Text size={14} weight="medium" color={colors.foreground}>$2.78T</Text>
                </Frame>
                <Frame w="fill" h={1} bg={colors.border} />

                <Frame flex="row" justify="between">
                    <Text size={14} color={colors.mutedForeground}>P/E Ratio</Text>
                    <Text size={14} weight="medium" color={colors.foreground}>28.54</Text>
                </Frame>
                <Frame w="fill" h={1} bg={colors.border} />

                <Frame flex="row" justify="between">
                    <Text size={14} color={colors.mutedForeground}>EPS (TTM)</Text>
                    <Text size={14} weight="medium" color={colors.foreground}>$6.26</Text>
                </Frame>
                <Frame w="fill" h={1} bg={colors.border} />

                <Frame flex="row" justify="between">
                    <Text size={14} color={colors.mutedForeground}>Dividend Yield</Text>
                    <Text size={14} weight="medium" color={colors.foreground}>0.52%</Text>
                </Frame>
                <Frame w="fill" h={1} bg={colors.border} />

                <Frame flex="row" justify="between">
                    <Text size={14} color={colors.mutedForeground}>52W High</Text>
                    <Text size={14} weight="medium" color={statusColors.up}>$199.62</Text>
                </Frame>
                <Frame w="fill" h={1} bg={colors.border} />

                <Frame flex="row" justify="between">
                    <Text size={14} color={colors.mutedForeground}>52W Low</Text>
                    <Text size={14} weight="medium" color={statusColors.down}>$164.08</Text>
                </Frame>
                <Frame w="fill" h={1} bg={colors.border} />

                <Frame flex="row" justify="between">
                    <Text size={14} color={colors.mutedForeground}>Avg Volume</Text>
                    <Text size={14} weight="medium" color={colors.foreground}>58.2M</Text>
                </Frame>
                <Frame w="fill" h={1} bg={colors.border} />

                <Frame flex="row" justify="between">
                    <Text size={14} color={colors.mutedForeground}>Beta</Text>
                    <Text size={14} weight="medium" color={colors.foreground}>1.29</Text>
                </Frame>
            </Frame>
        </Frame>
    )
}

// =============================================================================
// ANALYST RATINGS
// =============================================================================

function AnalystRatings() {
    return (
        <Frame name="Analyst Ratings" w={400} bg={colors.card} rounded={radius.lg} p={24} flex="col" gap={20} stroke={colors.border} strokeWidth={1}>
            <Frame flex="row" justify="between" items="center">
                <Text size={16} weight="medium" color={colors.foreground}>Analyst Ratings</Text>
                <Frame px={10} py={4} bg="#22C55E20" rounded={radius.default}>
                    <Text size={12} weight="medium" color={statusColors.up}>Strong Buy</Text>
                </Frame>
            </Frame>

            {/* Rating Bars */}
            <Frame flex="col" gap={12}>
                <Frame flex="row" gap={12} items="center">
                    <Text size={12} color={colors.mutedForeground} w={60}>Buy</Text>
                    <Frame grow={1} h={8} bg={colors.muted} rounded={radius.full}>
                        <Frame w="75%" h={8} bg={statusColors.up} rounded={radius.full} />
                    </Frame>
                    <Text size={12} weight="medium" color={colors.foreground} w={24}>28</Text>
                </Frame>

                <Frame flex="row" gap={12} items="center">
                    <Text size={12} color={colors.mutedForeground} w={60}>Hold</Text>
                    <Frame grow={1} h={8} bg={colors.muted} rounded={radius.full}>
                        <Frame w="20%" h={8} bg={colors.chart5} rounded={radius.full} />
                    </Frame>
                    <Text size={12} weight="medium" color={colors.foreground} w={24}>8</Text>
                </Frame>

                <Frame flex="row" gap={12} items="center">
                    <Text size={12} color={colors.mutedForeground} w={60}>Sell</Text>
                    <Frame grow={1} h={8} bg={colors.muted} rounded={radius.full}>
                        <Frame w="5%" h={8} bg={statusColors.down} rounded={radius.full} />
                    </Frame>
                    <Text size={12} weight="medium" color={colors.foreground} w={24}>2</Text>
                </Frame>
            </Frame>

            {/* Price Targets */}
            <Frame flex="col" gap={12}>
                <Text size={14} weight="medium" color={colors.foreground}>Price Target</Text>
                <Frame flex="row" gap={16}>
                    <Frame flex="col" gap={2} grow={1} p={12} bg={colors.muted} rounded={radius.default}>
                        <Text size={12} color={colors.mutedForeground}>Low</Text>
                        <Text size={16} weight="medium" color={colors.foreground}>$165</Text>
                    </Frame>
                    <Frame flex="col" gap={2} grow={1} p={12} bg={colors.primary} rounded={radius.default}>
                        <Text size={12} color={colors.mutedForeground}>Average</Text>
                        <Text size={16} weight="bold" color={colors.primaryForeground}>$195</Text>
                    </Frame>
                    <Frame flex="col" gap={2} grow={1} p={12} bg={colors.muted} rounded={radius.default}>
                        <Text size={12} color={colors.mutedForeground}>High</Text>
                        <Text size={16} weight="medium" color={colors.foreground}>$220</Text>
                    </Frame>
                </Frame>
            </Frame>
        </Frame>
    )
}

// =============================================================================
// FINANCIALS SUMMARY
// =============================================================================

function FinancialsSummary() {
    return (
        <Frame name="Financials" grow={1} bg={colors.card} rounded={radius.lg} p={24} flex="col" gap={20} stroke={colors.border} strokeWidth={1}>
            <Frame flex="row" justify="between" items="center">
                <Text size={16} weight="medium" color={colors.foreground}>Financials (TTM)</Text>
                <Frame flex="row" gap={4}>
                    <Frame px={12} py={6} bg={colors.primary} rounded={radius.default}>
                        <Text size={12} weight="medium" color={colors.primaryForeground}>Income</Text>
                    </Frame>
                    <Frame px={12} py={6} bg={colors.secondary} rounded={radius.default}>
                        <Text size={12} color={colors.foreground}>Balance</Text>
                    </Frame>
                    <Frame px={12} py={6} bg={colors.secondary} rounded={radius.default}>
                        <Text size={12} color={colors.foreground}>Cash Flow</Text>
                    </Frame>
                </Frame>
            </Frame>

            {/* Financials Grid */}
            <Frame flex="row" gap={24}>
                <Frame flex="col" gap={16} grow={1}>
                    <Frame flex="col" gap={4}>
                        <Text size={12} color={colors.mutedForeground}>Revenue</Text>
                        <Text size={20} weight="bold" color={colors.foreground}>$383.29B</Text>
                        <Frame flex="row" gap={4} items="center">
                            <Icon icon="lucide:trending-up" size={12} color={statusColors.up} />
                            <Text size={12} color={statusColors.up}>+2.8% YoY</Text>
                        </Frame>
                    </Frame>

                    <Frame flex="col" gap={4}>
                        <Text size={12} color={colors.mutedForeground}>Gross Profit</Text>
                        <Text size={20} weight="bold" color={colors.foreground}>$170.78B</Text>
                        <Frame flex="row" gap={4} items="center">
                            <Icon icon="lucide:trending-up" size={12} color={statusColors.up} />
                            <Text size={12} color={statusColors.up}>+0.9% YoY</Text>
                        </Frame>
                    </Frame>
                </Frame>

                <Frame flex="col" gap={16} grow={1}>
                    <Frame flex="col" gap={4}>
                        <Text size={12} color={colors.mutedForeground}>Operating Income</Text>
                        <Text size={20} weight="bold" color={colors.foreground}>$114.30B</Text>
                        <Frame flex="row" gap={4} items="center">
                            <Icon icon="lucide:trending-down" size={12} color={statusColors.down} />
                            <Text size={12} color={statusColors.down}>-2.3% YoY</Text>
                        </Frame>
                    </Frame>

                    <Frame flex="col" gap={4}>
                        <Text size={12} color={colors.mutedForeground}>Net Income</Text>
                        <Text size={20} weight="bold" color={colors.foreground}>$96.99B</Text>
                        <Frame flex="row" gap={4} items="center">
                            <Icon icon="lucide:trending-down" size={12} color={statusColors.down} />
                            <Text size={12} color={statusColors.down}>-2.8% YoY</Text>
                        </Frame>
                    </Frame>
                </Frame>

                <Frame flex="col" gap={16} grow={1}>
                    <Frame flex="col" gap={4}>
                        <Text size={12} color={colors.mutedForeground}>Gross Margin</Text>
                        <Text size={20} weight="bold" color={colors.foreground}>44.6%</Text>
                        <Text size={12} color={colors.mutedForeground}>vs 43.3% last year</Text>
                    </Frame>

                    <Frame flex="col" gap={4}>
                        <Text size={12} color={colors.mutedForeground}>Profit Margin</Text>
                        <Text size={20} weight="bold" color={colors.foreground}>25.3%</Text>
                        <Text size={12} color={colors.mutedForeground}>vs 25.6% last year</Text>
                    </Frame>
                </Frame>
            </Frame>
        </Frame>
    )
}

// =============================================================================
// NEWS SECTION
// =============================================================================

function NewsSection() {
    return (
        <Frame name="News" w={480} bg={colors.card} rounded={radius.lg} p={24} flex="col" gap={20} stroke={colors.border} strokeWidth={1}>
            <Frame flex="row" justify="between" items="center">
                <Text size={16} weight="medium" color={colors.foreground}>Latest News</Text>
                <Text size={14} color={colors.chart1}>View All</Text>
            </Frame>

            <Frame flex="col" gap={16}>
                {/* News Item 1 */}
                <Frame flex="col" gap={8} pb={16} stroke={colors.border} strokeWidth={1} strokeAlign="inside" strokeSides="bottom">
                    <Text size={14} weight="medium" color={colors.foreground}>Apple Vision Pro Launches in China, Boosting Revenue Outlook</Text>
                    <Frame flex="row" gap={8}>
                        <Text size={12} color={colors.mutedForeground}>Reuters</Text>
                        <Text size={12} color={colors.mutedForeground}>•</Text>
                        <Text size={12} color={colors.mutedForeground}>2 hours ago</Text>
                    </Frame>
                </Frame>

                {/* News Item 2 */}
                <Frame flex="col" gap={8} pb={16} stroke={colors.border} strokeWidth={1} strokeAlign="inside" strokeSides="bottom">
                    <Text size={14} weight="medium" color={colors.foreground}>Q1 Earnings Preview: Analysts Expect Strong iPhone Sales</Text>
                    <Frame flex="row" gap={8}>
                        <Text size={12} color={colors.mutedForeground}>Bloomberg</Text>
                        <Text size={12} color={colors.mutedForeground}>•</Text>
                        <Text size={12} color={colors.mutedForeground}>5 hours ago</Text>
                    </Frame>
                </Frame>

                {/* News Item 3 */}
                <Frame flex="col" gap={8}>
                    <Text size={14} weight="medium" color={colors.foreground}>Apple's AI Strategy: What to Expect at WWDC 2025</Text>
                    <Frame flex="row" gap={8}>
                        <Text size={12} color={colors.mutedForeground}>TechCrunch</Text>
                        <Text size={12} color={colors.mutedForeground}>•</Text>
                        <Text size={12} color={colors.mutedForeground}>1 day ago</Text>
                    </Frame>
                </Frame>
            </Frame>
        </Frame>
    )
}

// =============================================================================
// MAIN PAGE
// =============================================================================

export default function StockAnalysisPage() {
    return (
        <Frame name="Stock Analysis Dashboard" w={1440} flex="col" bg={colors.background}>
            <Header />

            {/* Main Content */}
            <Frame px={32} py={24} flex="col" gap={24}>
                <StockHeader />

                {/* Chart + Key Metrics Row */}
                <Frame flex="row" gap={24}>
                    <PriceChart />
                    <KeyMetrics />
                </Frame>

                {/* Analyst + Financials + News Row */}
                <Frame flex="row" gap={24}>
                    <AnalystRatings />
                    <FinancialsSummary />
                </Frame>

                {/* News Row */}
                <Frame flex="row" gap={24}>
                    <NewsSection />
                    <Frame grow={1} bg={colors.card} rounded={radius.lg} p={24} flex="col" gap={16} stroke={colors.border} strokeWidth={1}>
                        <Text size={16} weight="medium" color={colors.foreground}>Similar Stocks</Text>
                        <Frame flex="row" gap={16}>
                            {/* MSFT */}
                            <Frame flex="col" gap={8} p={16} bg={colors.secondary} rounded={radius.default} grow={1}>
                                <Frame flex="row" justify="between" items="center">
                                    <Text size={14} weight="medium" color={colors.foreground}>MSFT</Text>
                                    <Frame flex="row" gap={2} items="center">
                                        <Icon icon="lucide:trending-up" size={12} color={statusColors.up} />
                                        <Text size={12} color={statusColors.up}>+0.82%</Text>
                                    </Frame>
                                </Frame>
                                <Text size={12} color={colors.mutedForeground}>Microsoft Corp</Text>
                                <Text size={16} weight="bold" color={colors.foreground}>$415.28</Text>
                            </Frame>

                            {/* GOOGL */}
                            <Frame flex="col" gap={8} p={16} bg={colors.secondary} rounded={radius.default} grow={1}>
                                <Frame flex="row" justify="between" items="center">
                                    <Text size={14} weight="medium" color={colors.foreground}>GOOGL</Text>
                                    <Frame flex="row" gap={2} items="center">
                                        <Icon icon="lucide:trending-down" size={12} color={statusColors.down} />
                                        <Text size={12} color={statusColors.down}>-0.45%</Text>
                                    </Frame>
                                </Frame>
                                <Text size={12} color={colors.mutedForeground}>Alphabet Inc</Text>
                                <Text size={16} weight="bold" color={colors.foreground}>$152.19</Text>
                            </Frame>

                            {/* AMZN */}
                            <Frame flex="col" gap={8} p={16} bg={colors.secondary} rounded={radius.default} grow={1}>
                                <Frame flex="row" justify="between" items="center">
                                    <Text size={14} weight="medium" color={colors.foreground}>AMZN</Text>
                                    <Frame flex="row" gap={2} items="center">
                                        <Icon icon="lucide:trending-up" size={12} color={statusColors.up} />
                                        <Text size={12} color={statusColors.up}>+1.23%</Text>
                                    </Frame>
                                </Frame>
                                <Text size={12} color={colors.mutedForeground}>Amazon.com Inc</Text>
                                <Text size={16} weight="bold" color={colors.foreground}>$178.92</Text>
                            </Frame>

                            {/* META */}
                            <Frame flex="col" gap={8} p={16} bg={colors.secondary} rounded={radius.default} grow={1}>
                                <Frame flex="row" justify="between" items="center">
                                    <Text size={14} weight="medium" color={colors.foreground}>META</Text>
                                    <Frame flex="row" gap={2} items="center">
                                        <Icon icon="lucide:trending-up" size={12} color={statusColors.up} />
                                        <Text size={12} color={statusColors.up}>+2.15%</Text>
                                    </Frame>
                                </Frame>
                                <Text size={12} color={colors.mutedForeground}>Meta Platforms</Text>
                                <Text size={16} weight="bold" color={colors.foreground}>$505.63</Text>
                            </Frame>
                        </Frame>
                    </Frame>
                </Frame>
            </Frame>
        </Frame>
    )
}
