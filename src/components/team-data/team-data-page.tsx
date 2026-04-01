"use client"

import * as React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  CalendarIcon,
  HelpCircleIcon,
  ChevronDownIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Data ────────────────────────────────────────────────────────────────────

const SEGMENTS = ["日", "周", "月", "年"] as const
const HEATMAP_METRICS = ["使用时长", "渲染产出", "创建项目"] as const

const STAT_CARDS = [
  { title: "使用时长", value: "853", unit: "h", sub: "Daily Avg 4.2h" },
  { title: "进阶功能", value: "652", unit: "", sub: "Daily Avg 285" },
  { title: "渲染产出", value: "888", unit: "", sub: "Daily Avg 20" },
  { title: "活跃用户", value: "30", unit: "/40", sub: "" },
] as const

const barChartData = Array.from({ length: 29 }, (_, i) => ({
  date: `Date`,
  studio: Math.round(40 + Math.sin(i * 0.7) * 30 + Math.random() * 20),
  showreel: Math.round(30 + Math.cos(i * 0.5) * 25 + Math.random() * 15),
  ai: Math.round(15 + Math.sin(i * 1.1) * 12 + Math.random() * 10),
  other: Math.round(5 + Math.random() * 8),
}))

const barChartConfig = {
  studio: { label: "Studio", color: "#4ade80" },
  showreel: { label: "Showreel", color: "#60a5fa" },
  ai: { label: "AI", color: "#a78bfa" },
  other: { label: "Other", color: "rgba(255,255,255,0.10)" },
} satisfies ChartConfig

const TABLE_ROWS = [
  {
    name: "Username",
    nick: "(Nickname)",
    email: "username@email.com",
    active: "24 Sep 2025",
    time: "8h",
    image: 23,
    video: 4,
    tour: "-",
    ai: 12,
    studio: "-",
    assets: 4,
    other: "-",
  },
  {
    name: "Username",
    nick: "(Nickname)",
    email: "username@email.com",
    active: "24 Sep 2025",
    time: "8h",
    image: 23,
    video: 4,
    tour: "-",
    ai: 12,
    studio: "-",
    assets: 4,
    other: "-",
  },
] as const

const LEGEND_ORDER = ["ai", "showreel", "studio", "other"]

function OrderedLegend(
  props: React.ComponentProps<typeof ChartLegendContent>
) {
  const sorted = props.payload
    ? [...props.payload].sort(
        (a, b) =>
          LEGEND_ORDER.indexOf(String(a.dataKey ?? a.value)) -
          LEGEND_ORDER.indexOf(String(b.dataKey ?? b.value))
      )
    : props.payload
  return (
    <ChartLegendContent {...props} payload={sorted} className="text-white/50" />
  )
}

// ─── Heatmap helpers ─────────────────────────────────────────────────────────

const HEATMAP_FILLS = [
  "bg-white/[0.04]",
  "bg-white/[0.10]",
  "bg-white/[0.25]",
  "bg-white/[0.50]",
  "bg-[#dcdcdc]",
] as const

const HEATMAP_LEGEND_COLORS = [
  "rgba(255,255,255,0.04)",
  "rgba(255,255,255,0.10)",
  "rgba(255,255,255,0.25)",
  "rgba(255,255,255,0.50)",
  "#dcdcdc",
] as const

const WEEKDAY_LABELS = ["一", "二", "三", "四", "五", "六", "日"]
const CELLS_PER_ROW = 30

type HeatmapRow = { date: string; level: number; value: number }[]

function generateHeatmapGrid(): HeatmapRow[] {
  const rows: HeatmapRow[] = []
  for (let r = 0; r < 7; r++) {
    const row: HeatmapRow = []
    for (let c = 0; c < CELLS_PER_ROW; c++) {
      const seed = (r * 17 + c * 13 + r * c * 7) % 97
      const level = seed % 5
      const value = level === 0 ? 0 : Math.round(level * 1.5 + (seed % 3))
      const month = Math.min(Math.floor(c / 2.5), 11) + 1
      const day = (c % 4) * 7 + r + 1
      const dateStr = `2025-${String(month).padStart(2, "0")}-${String(Math.min(day, 28)).padStart(2, "0")}`
      row.push({ date: dateStr, level, value })
    }
    rows.push(row)
  }
  return rows
}

function HeatmapCell({
  level,
  date,
  value,
  unit,
}: {
  level: number
  date: string
  value: number
  unit: string
}) {
  if (level < 0) {
    return <div />
  }

  const bg = HEATMAP_FILLS[level] ?? HEATMAP_FILLS[0]

  return (
    <div className="group/cell relative w-full" style={{ paddingBottom: "100%" }}>
      <div
        className={cn(
          "absolute inset-0 rounded-[3px] transition-shadow group-hover/cell:ring-1 group-hover/cell:ring-white/30",
          bg
        )}
      />
      <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#1c1c1c] px-2.5 py-1.5 text-[11px] leading-tight text-white shadow-xl group-hover/cell:block">
        <div className="font-medium tabular-nums">
          {value > 0 ? `${value} ${unit}` : "No activity"}
        </div>
        <div className="mt-0.5 text-[10px] text-white/40">{date}</div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1c1c1c]" />
      </div>
    </div>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

export function TeamDataPage() {
  const [period, setPeriod] = React.useState<(typeof SEGMENTS)[number]>("日")
  const [heatmapTab, setHeatmapTab] =
    React.useState<(typeof HEATMAP_METRICS)[number]>("使用时长")

  const heatmapGrid = React.useMemo(generateHeatmapGrid, [])

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-[#0c0c0c] text-white">
      {/* Header */}
      <div className="px-10 pt-4 pb-2">
        <h1 className="text-xl font-semibold leading-5 tracking-tight">
          团队数据
        </h1>
        <p className="mt-2 text-xs leading-[18px] text-white/60">
          数据更新存在 1 / 2天延迟，具体统计规则可查看{" "}
          <a
            href="#"
            className="text-white/60 underline underline-offset-2 hover:text-white/80"
          >
            帮助文档
          </a>
        </p>
      </div>

      {/* Date + Period selectors */}
      <div className="flex items-center justify-between px-10 py-3">
        <button
          type="button"
          className="inline-flex h-8 items-center gap-2 rounded-md border border-white/[0.06] bg-transparent px-3 text-xs text-white/80 hover:bg-white/[0.04]"
        >
          <CalendarIcon className="size-3.5 opacity-60" />
          Sep. 5 - Oct 5
          <ChevronDownIcon className="size-3 opacity-40" />
        </button>
        <div className="inline-flex rounded-md border border-white/[0.06] p-0.5">
          {SEGMENTS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setPeriod(s)}
              className={cn(
                "rounded-[4px] px-3 py-1 text-xs font-medium transition-colors",
                period === s
                  ? "bg-white/[0.10] text-white"
                  : "text-white/40 hover:text-white/60"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-0 px-10 pb-6">
        {STAT_CARDS.map((card, idx) => (
          <div
            key={card.title}
            className={cn(
              "border-y border-r border-white/[0.06] px-4 py-3",
              idx === 0 && "rounded-l-lg border-l",
              idx === STAT_CARDS.length - 1 && "rounded-r-lg"
            )}
          >
            <div className="mb-3 flex items-center gap-1.5 text-xs text-white/60">
              <span>{card.title}</span>
              <HelpCircleIcon className="size-3 opacity-40" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[28px] font-semibold leading-8 tabular-nums">
                {card.value}
              </span>
              {card.unit && (
                <span className="text-sm text-white/50">{card.unit}</span>
              )}
              {card.sub && (
                <span className="ml-auto text-xs text-white/35">
                  {card.sub}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Stacked bar chart */}
      <div className="mx-10 mb-6 rounded-lg border border-white/[0.06] bg-[#111] p-6">
        <h2 className="mb-4 text-sm font-medium">Advanced</h2>
        <ChartContainer
          config={barChartConfig}
          className="aspect-auto h-[320px] w-full [&_.recharts-cartesian-axis-tick_text]:fill-white/30 [&_.recharts-cartesian-grid_line]:stroke-white/[0.06] [&_.recharts-rectangle.recharts-tooltip-cursor]:!fill-white/[0.06]"
        >
          <BarChart data={barChartData} barGap={0} barSize={12} barCategoryGap="30%">
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              fontSize={10}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              fontSize={10}
              tickMargin={4}
              width={28}
            />
            <ChartTooltip
              cursor={{ fill: "rgba(255,255,255,0.06)", radius: 4 }}
              content={
                <ChartTooltipContent
                  className="border-white/10 bg-[#1a1a1a] text-white"
                  labelClassName="text-white/70"
                />
              }
            />
            <ChartLegend content={<OrderedLegend />} />
            <Bar
              dataKey="studio"
              stackId="a"
              fill="var(--color-studio)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="showreel"
              stackId="a"
              fill="var(--color-showreel)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="ai"
              stackId="a"
              fill="var(--color-ai)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="other"
              stackId="a"
              fill="var(--color-other)"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </div>

      {/* Heatmap */}
      <div className="mx-10 mb-6 rounded-lg border border-white/[0.06] bg-[#111] p-6">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex h-7 items-center gap-1 rounded-md border border-white/[0.06] bg-transparent px-2.5 text-xs"
              >
                2025
                <ChevronDownIcon className="size-3 opacity-40" />
              </button>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs text-white/60">
              <span>年度使用时长</span>
              <HelpCircleIcon className="size-3 opacity-40" />
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-[28px] font-semibold leading-8 tabular-nums">
                853
              </span>
              <span className="text-sm text-white/50">h</span>
            </div>
          </div>
          <div className="inline-flex rounded-md border border-white/[0.06] p-0.5">
            {HEATMAP_METRICS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setHeatmapTab(m)}
                className={cn(
                  "rounded-[4px] px-3 py-1 text-[11px] font-medium transition-colors",
                  heatmapTab === m
                    ? "bg-white/[0.10] text-white"
                    : "text-white/40 hover:text-white/60"
                )}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Month labels + Grid */}
        <div className="mx-auto w-full max-w-[960px]">
          {/* Month labels */}
          <div className="mb-1 flex">
            <div className="w-[28px] shrink-0" />
            <div className="flex flex-1" style={{ gap: "4px", paddingLeft: "2px", paddingRight: "2px" }}>
              {(["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"] as const).map((m) => (
                <span key={m} className="flex-1 text-center text-[11px] text-[#ebebeb]">
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Heatmap rows */}
          <div className="flex gap-[4px]">
            {/* Weekday labels */}
            <div className="flex w-[28px] shrink-0 flex-col" style={{ gap: "8px" }}>
              {WEEKDAY_LABELS.map((d) => (
                <div key={d} className="flex items-center justify-center text-[11px] text-[#ebebeb]" style={{ paddingBottom: "100%", position: "relative" }}>
                  <span className="absolute inset-0 flex items-center justify-center">{d}</span>
                </div>
              ))}
            </div>

            {/* Cell grid */}
            <div
              className="grid flex-1"
              style={{
                gridTemplateColumns: `repeat(${CELLS_PER_ROW}, 1fr)`,
                gap: "8px",
              }}
            >
              {heatmapGrid.flatMap((row, ri) =>
                row.map((cell, ci) => (
                  <HeatmapCell
                    key={`${ri}-${ci}`}
                    level={cell.level}
                    date={cell.date}
                    value={cell.value}
                    unit="h"
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-2 flex items-center justify-start gap-2 text-xs text-white/35">
          <span>Less</span>
          <div className="flex gap-[3px]">
            {HEATMAP_LEGEND_COLORS.map((color, i) => (
              <div
                key={i}
                className="size-[11px] rounded"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Member table */}
      <div className="mx-10 mb-10 rounded-lg border border-white/[0.06] bg-[#111] p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-8 items-center gap-2 rounded-md border border-white/[0.06] bg-transparent px-3 text-xs text-white/80"
            >
              <CalendarIcon className="size-3.5 opacity-60" />
              Sep. 5 - Oct 5
              <ChevronDownIcon className="size-3 opacity-40" />
            </button>
            {(["7d", "30d", "365d"] as const).map((t, i) => (
              <button
                key={t}
                type="button"
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium",
                  i === 1
                    ? "bg-white/[0.12] text-white"
                    : "text-white/40 hover:bg-white/[0.06]"
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="inline-flex rounded-md border border-white/[0.06] p-0.5 text-xs">
            <button
              type="button"
              className="rounded-[4px] bg-white/[0.10] px-3 py-1 font-medium text-white"
            >
              在团队中
            </button>
            <button
              type="button"
              className="rounded-[4px] px-3 py-1 text-white/40 hover:text-white/60"
            >
              全部成员
            </button>
          </div>
        </div>

        <Table className="border-separate border-spacing-0 text-xs text-white/80 [&_td]:border-b [&_td]:border-white/[0.05] [&_th]:border-b [&_th]:border-white/[0.06]">
          <TableHeader>
            <TableRow className="border-0 hover:bg-transparent">
              <TableHead className="h-9 text-[11px] font-medium text-white/50">
                Member
              </TableHead>
              <TableHead className="h-9 text-[11px] font-medium text-white/50">
                Active
              </TableHead>
              <TableHead className="h-9 text-[11px] font-medium text-white/50">
                Time
              </TableHead>
              <TableHead className="h-9 text-[11px] font-medium text-white/50">
                Image
              </TableHead>
              <TableHead className="h-9 text-[11px] font-medium text-white/50">
                Video
              </TableHead>
              <TableHead className="h-9 text-[11px] font-medium text-white/50">
                Tour
              </TableHead>
              <TableHead className="h-9 text-[11px] font-medium text-white/50">
                AI
              </TableHead>
              <TableHead className="h-9 text-[11px] font-medium text-white/50">
                Studio
              </TableHead>
              <TableHead className="h-9 text-[11px] font-medium text-white/50">
                Assets
              </TableHead>
              <TableHead className="h-9 text-[11px] font-medium text-white/50">
                Others
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TABLE_ROWS.map((row, idx) => (
              <TableRow
                key={idx}
                className="border-0 hover:bg-white/[0.02]"
              >
                <TableCell className="py-3">
                  <div className="flex items-center gap-2.5">
                    <Avatar className="size-8 border border-white/10">
                      <AvatarFallback className="bg-emerald-600/70 text-[11px] font-medium">
                        A
                      </AvatarFallback>
                    </Avatar>
                    <div className="leading-tight">
                      <div className="text-xs font-medium text-white">
                        {row.name}
                        <span className="font-normal text-white/40">
                          {row.nick}
                        </span>
                      </div>
                      <div className="text-[11px] text-white/30">
                        {row.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="tabular-nums text-white/55">
                  {row.active}
                </TableCell>
                <TableCell className="tabular-nums">{row.time}</TableCell>
                <TableCell className="tabular-nums">{row.image}</TableCell>
                <TableCell className="tabular-nums">{row.video}</TableCell>
                <TableCell className="tabular-nums text-white/35">
                  {row.tour}
                </TableCell>
                <TableCell className="tabular-nums">{row.ai}</TableCell>
                <TableCell className="tabular-nums text-white/35">
                  {row.studio}
                </TableCell>
                <TableCell className="tabular-nums">{row.assets}</TableCell>
                <TableCell className="tabular-nums text-white/35">
                  {row.other}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
