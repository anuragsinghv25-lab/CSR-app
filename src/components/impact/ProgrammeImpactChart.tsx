import { useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Table2, BarChart3 } from 'lucide-react'
import { programmeDistribution, stateImpact, yearlyTrend, outcomeComparison } from '@/data/impact'
import { programmeBySlug, programmes } from '@/data/programmes'
import { StatusBadge } from '@/components/common/StatusBadge'
import { formatNumber } from '@/lib/utils'
import type { ProgrammeFilter } from './ImpactFilterBar'
import { OutcomeIndicator } from './OutcomeIndicator'

/*
 * Charts deliberately avoid the six programme accents as a categorical
 * palette (they fail colour-blind separation). Each chart is single-hue,
 * or a neutral-grey vs. blue pair, and identity is carried by axis labels.
 */
const BLUE = '#164A91'
const BLUE_MUTED = '#B9C8E0'
const GRID = '#E3E1D9'
const AXIS = '#5C6168'

/** Shared frame: title, explanation, units, data status and a table view. */
function ChartFrame({
  title,
  explanation,
  units,
  table,
  children,
  className,
}: {
  title: string
  explanation: string
  units: string
  table: { columns: string[]; rows: (string | number)[][] }
  children: React.ReactNode
  className?: string
}) {
  const [asTable, setAsTable] = useState(false)
  return (
    <figure className={`flex flex-col rounded-xl border border-line bg-white p-5 md:p-7 ${className ?? ''}`}>
      <figcaption>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h3 className="font-display text-lg font-bold text-charcoal">{title}</h3>
          <StatusBadge status="illustrative" />
        </div>
        <p className="mt-2 max-w-[56ch] text-sm leading-relaxed text-muted">{explanation}</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-xs font-medium text-charcoal">Units: {units}</p>
          <button
            type="button"
            onClick={() => setAsTable((v) => !v)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue hover:underline"
            aria-pressed={asTable}
          >
            {asTable ? <BarChart3 className="size-3.5" aria-hidden /> : <Table2 className="size-3.5" aria-hidden />}
            {asTable ? 'View chart' : 'View as table'}
          </button>
        </div>
      </figcaption>
      <div className="mt-5 flex-1">
        {asTable ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs text-muted">
                  {table.columns.map((c) => (
                    <th key={c} scope="col" className="py-2 pr-4 font-semibold">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((r, i) => (
                  <tr key={i} className="border-b border-line last:border-0">
                    {r.map((v, j) => (
                      <td key={j} className={`py-2 pr-4 ${j === 0 ? 'font-medium text-charcoal' : 'tabular text-muted'}`}>
                        {typeof v === 'number' ? formatNumber(v) : v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          children
        )}
      </div>
    </figure>
  )
}

function ChartTooltip({ active, payload, label, unit }: { active?: boolean; payload?: { value: number; name?: string }[]; label?: string; unit: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-md border border-line bg-white px-3 py-2 text-xs shadow-lg">
      <p className="font-semibold text-charcoal">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="tabular text-muted">
          {p.name ? `${p.name}: ` : ''}
          <span className="font-semibold text-charcoal">{formatNumber(p.value)}</span> {unit}
        </p>
      ))}
    </div>
  )
}

/** Programme distribution — sample projects per programme area. */
export function ProgrammeDistributionChart({ filter }: { filter: ProgrammeFilter }) {
  const data = programmeDistribution.map((d) => ({ name: d.programme, slug: d.slug, value: d.projects }))
  return (
    <ChartFrame
      title="Programme distribution"
      explanation="How the sample project portfolio is spread across the six programme areas. The selected programme is highlighted."
      units="number of illustrative projects"
      table={{ columns: ['Programme', 'Projects'], rows: data.map((d) => [d.name, d.value]) }}
    >
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 36, bottom: 0, left: 0 }} barCategoryGap={8}>
          <CartesianGrid horizontal={false} stroke={GRID} />
          <XAxis type="number" tickLine={false} axisLine={false} allowDecimals={false} stroke={AXIS} />
          <YAxis type="category" dataKey="name" width={92} tickLine={false} axisLine={false} stroke={AXIS} />
          <Tooltip cursor={{ fill: '#F1EEE6' }} content={<ChartTooltip unit="projects" />} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} isAnimationActive>
            {data.map((d) => (
              <Cell key={d.slug} fill={filter === 'all' || filter === d.slug ? BLUE : BLUE_MUTED} />
            ))}
            <LabelList dataKey="value" position="right" className="tabular" fill="#17191D" fontSize={12} fontWeight={600} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}

/** Illustrative yearly trend for the selected programme (or all combined). */
export function YearlyTrendChart({ filter }: { filter: ProgrammeFilter }) {
  const data = yearlyTrend.map((row) => ({
    year: row.year as string,
    value:
      filter === 'all'
        ? programmes.reduce((n, p) => n + (row[p.slug] as number), 0)
        : (row[filter] as number),
  }))
  const label = filter === 'all' ? 'All programmes' : programmeBySlug[filter].title
  return (
    <ChartFrame
      title={`Participants reached each year — ${label}`}
      explanation="An illustrative trend showing how annual reach could be reported. The 2020 dip illustrates disruption during the pandemic year."
      units="thousands of people (illustrative)"
      table={{ columns: ['Year', 'Thousands of people'], rows: data.map((d) => [d.year, d.value]) }}
    >
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
          <defs>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={BLUE} stopOpacity={0.18} />
              <stop offset="100%" stopColor={BLUE} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke={GRID} />
          <XAxis dataKey="year" tickLine={false} axisLine={{ stroke: GRID }} stroke={AXIS} />
          <YAxis tickLine={false} axisLine={false} stroke={AXIS} />
          <Tooltip cursor={{ stroke: '#17191D', strokeOpacity: 0.25 }} content={<ChartTooltip unit="thousand people" />} />
          <Area
            type="monotone"
            dataKey="value"
            name={label}
            stroke={BLUE}
            strokeWidth={2}
            fill="url(#trendFill)"
            dot={{ r: 4, fill: BLUE, stroke: '#fff', strokeWidth: 2 }}
            activeDot={{ r: 6, fill: BLUE, stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}

/** Geographical distribution — sample projects by state for the current filter. */
export function GeographyChart({ filter }: { filter: ProgrammeFilter }) {
  const data = stateImpact
    .filter((s) => filter === 'all' || s.programmes.includes(filter))
    .map((s) => ({ name: s.name, value: filter === 'all' ? s.projects : Math.max(1, Math.ceil(s.projects / s.programmes.length)) }))
    .sort((a, b) => b.value - a.value)
  return (
    <ChartFrame
      title="Geographical distribution"
      explanation={`Sample projects by state${filter === 'all' ? '' : ` for ${programmeBySlug[filter].title.toLowerCase()}`}. States are illustrative; actual presence is pending confirmation.`}
      units="number of illustrative projects"
      table={{ columns: ['State', 'Projects'], rows: data.map((d) => [d.name, d.value]) }}
    >
      <ResponsiveContainer width="100%" height={Math.max(180, data.length * 26)}>
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 32, bottom: 0, left: 0 }} barCategoryGap={6}>
          <CartesianGrid horizontal={false} stroke={GRID} />
          <XAxis type="number" tickLine={false} axisLine={false} allowDecimals={false} stroke={AXIS} />
          <YAxis type="category" dataKey="name" width={128} tickLine={false} axisLine={false} stroke={AXIS} interval={0} />
          <Tooltip cursor={{ fill: '#F1EEE6' }} content={<ChartTooltip unit="projects" />} />
          <Bar dataKey="value" fill="#0E2F5E" radius={[0, 4, 4, 0]}>
            <LabelList dataKey="value" position="right" fill="#17191D" fontSize={12} fontWeight={600} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  )
}

/** Outcome comparison — baseline vs endline, one indicator per programme. */
export function OutcomeComparison({ filter }: { filter: ProgrammeFilter }) {
  const rows = outcomeComparison.filter((o) => filter === 'all' || o.slug === filter)
  return (
    <ChartFrame
      title="Outcome indicators: baseline to endline"
      explanation="How outcome change could be reported for one headline indicator per programme. Grey shows the baseline; colour shows the change by endline."
      units="percent of target population"
      table={{
        columns: ['Indicator', 'Baseline %', 'Endline %'],
        rows: rows.map((r) => [r.indicator, r.baseline, r.endline]),
      }}
    >
      <div className="grid gap-6">
        {rows.map((r) => (
          <div key={r.slug}>
            <p className="mb-1 text-xs font-semibold" style={{ color: programmeBySlug[r.slug].accentColour }}>{programmeBySlug[r.slug].title}</p>
            <OutcomeIndicator label={r.indicator} baseline={r.baseline} endline={r.endline} colour={BLUE} />
          </div>
        ))}
        <div className="flex items-center gap-5 pt-1 text-xs text-muted" aria-hidden>
          <span className="flex items-center gap-2"><span className="h-2 w-5 rounded-full bg-[#b9bdc3]" /> Baseline</span>
          <span className="flex items-center gap-2"><span className="h-2 w-5 rounded-full" style={{ background: BLUE }} /> Change by endline</span>
        </div>
      </div>
    </ChartFrame>
  )
}
