/**
 * Calendar component in Nuxt UI style with Iconify icons
 * Using Tailwind-like shorthand style props
 */

import * as React from 'react'
import { Frame, Text, Icon } from '../../src/render/index.ts'

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const MONTH_DAYS = [
  [null, null, null, null, null, 1, 2],
  [3, 4, 5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14, 15, 16],
  [17, 18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 29, 30],
  [31, null, null, null, null, null, null]
]

const c = {
  bg: '#FFFFFF',
  bgHover: '#EFF6FF',
  text: '#111827',
  muted: '#6B7280',
  border: '#E5E7EB',
  primary: '#3B82F6',
  white: '#FFFFFF'
}

const DayHeader = ({ day }: { day: string }) => (
  <Frame name={`header-${day}`} style={{ w: 40, h: 28, flex: 'col', justify: 'center', items: 'center' }}>
    <Text style={{ size: 12, weight: 600, color: c.muted }}>{day}</Text>
  </Frame>
)

const DayCell = ({ day, isSelected, isToday }: { day: number | null; isSelected?: boolean; isToday?: boolean }) => {
  if (!day) return <Frame name="empty" style={{ w: 40, h: 36 }} />

  const color = isSelected ? c.white : isToday ? c.primary : c.text
  const bg = isSelected ? c.primary : isToday ? c.bgHover : undefined

  return (
    <Frame name={`day-${day}`} style={{ w: 40, h: 36, rounded: 8, flex: 'col', justify: 'center', items: 'center', bg }}>
      <Text style={{ size: 14, weight: isSelected || isToday ? 600 : 400, color }}>{String(day)}</Text>
    </Frame>
  )
}

const WeekRow = ({ days, selectedDay, today }: { days: (number | null)[]; selectedDay?: number; today?: number }) => (
  <Frame style={{ flex: 'row', gap: 4, w: 308, h: 36 }}>
    {days.map((day, i) => (
      <DayCell key={i} day={day} isSelected={day === selectedDay} isToday={day === today} />
    ))}
  </Frame>
)

const NavButton = ({ direction }: { direction: 'left' | 'right' }) => (
  <Frame name={`nav-${direction}`} style={{ w: 32, h: 32, rounded: 6, bg: c.bgHover, flex: 'row', justify: 'center', items: 'center' }}>
    <Icon icon={direction === 'left' ? 'lucide:chevron-left' : 'lucide:chevron-right'} size={16} color={c.muted} />
  </Frame>
)

export default function Calendar() {
  return (
    <Frame name="Calendar" style={{ w: 340, bg: c.bg, rounded: 12, p: 16, flex: 'col', gap: 8, borderColor: c.border, borderWidth: 1 }}>
      {/* Header */}
      <Frame name="header" style={{ flex: 'row', items: 'center', justify: 'between', w: 308, h: 40 }}>
        <NavButton direction="left" />
        <Frame style={{ h: 32, flex: 'row', justify: 'center', items: 'center', gap: 6 }}>
          <Text style={{ size: 16, weight: 600, color: c.text }}>January 2026</Text>
          <Icon icon="lucide:calendar" size={16} color={c.primary} />
        </Frame>
        <NavButton direction="right" />
      </Frame>

      {/* Days header + Grid as one group */}
      <Frame name="grid" style={{ flex: 'col', gap: 2 }}>
        <Frame style={{ flex: 'row', gap: 4, w: 308, h: 28 }}>
          {DAYS.map((day) => <DayHeader key={day} day={day} />)}
        </Frame>
        {MONTH_DAYS.map((week, i) => <WeekRow key={i} days={week} selectedDay={18} today={17} />)}
      </Frame>

      {/* Footer */}
      <Frame name="footer" style={{ flex: 'row', justify: 'center', items: 'center', w: 308 }}>
        <Frame name="today-button" style={{ flex: 'row', items: 'center', justify: 'center', gap: 6, px: 14, h: 32, rounded: 6, bg: c.bgHover }}>
          <Icon icon="lucide:calendar-check" size={14} color={c.primary} />
          <Text style={{ size: 13, weight: 500, color: c.primary }}>Today</Text>
        </Frame>
      </Frame>
    </Frame>
  )
}
