'use client'

import { Sidebar } from '@/components/Sidebar'
import { MetricCard } from '@/components/MetricCard'
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils'
import { TrendingUp, DollarSign, Target, Users, MousePointer, BarChart3 } from 'lucide-react'

const weeklyData = [
  { day: 'Mon', spend: 6500, revenue: 24500, leads: 120, sql: 38 },
  { day: 'Tue', spend: 7200, revenue: 28200, leads: 135, sql: 42 },
  { day: 'Wed', spend: 6800, revenue: 26800, leads: 128, sql: 39 },
  { day: 'Thu', spend: 7100, revenue: 29500, leads: 142, sql: 45 },
  { day: 'Fri', spend: 6900, revenue: 27200, leads: 130, sql: 40 },
  { day: 'Sat', spend: 5890, revenue: 25800, leads: 115, sql: 35 },
  { day: 'Sun', spend: 5500, revenue: 23738, leads: 107, sql: 33 },
]

export default function PerformancePage() {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-black">
        <div className="border-b border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="px-8 py-6">
            <h2 className="text-2xl font-bold">Performance</h2>
            <p className="mt-1 text-sm text-neutral-400">
              Week 13 Report | Mar 31 - Apr 6, 2026
            </p>
          </div>
        </div>

        <div className="p-8">
          {/* Summary Metrics */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="ROAS"
              value="4.2x"
              change={12.5}
              changeLabel="vs last week"
              trend="up"
              icon={<TrendingUp className="h-5 w-5 text-green-500" />}
            />
            <MetricCard
              title="Total Spend"
              value={formatCurrency(45890)}
              change={8.2}
              changeLabel="vs last week"
              trend="up"
              icon={<DollarSign className="h-5 w-5 text-blue-500" />}
            />
            <MetricCard
              title="Revenue"
              value={formatCurrency(192738)}
              change={23.1}
              changeLabel="vs last week"
              trend="up"
              icon={<Target className="h-5 w-5 text-purple-500" />}
            />
            <MetricCard
              title="Total Leads"
              value={formatNumber(847)}
              change={15.4}
              changeLabel="vs last week"
              trend="up"
              icon={<Users className="h-5 w-5 text-orange-500" />}
            />
          </div>

          {/* Chart Area */}
          <div className="mb-8 rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-6 text-lg font-semibold">Daily Performance</h3>
            <div className="flex items-end justify-between gap-2">
              {weeklyData.map((day, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full items-end gap-1" style={{ height: '200px' }}>
                    <div
                      className="w-full rounded-t bg-blue-500/50 transition-all hover:bg-blue-500"
                      style={{ height: `${(day.spend / 8000) * 100}%` }}
                      title={`Spend: ${formatCurrency(day.spend)}`}
                    />
                    <div
                      className="w-full rounded-t bg-green-500/50 transition-all hover:bg-green-500"
                      style={{ height: `${(day.revenue / 30000) * 100}%` }}
                      title={`Revenue: ${formatCurrency(day.revenue)}`}
                    />
                  </div>
                  <span className="text-xs text-neutral-500">{day.day}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-blue-500/50" />
                <span className="text-xs text-neutral-400">Spend</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-green-500/50" />
                <span className="text-xs text-neutral-400">Revenue</span>
              </div>
            </div>
          </div>

          {/* Campaign Performance */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-6 text-lg font-semibold">Campaign Breakdown</h3>
            <div className="space-y-4">
              {[
                { name: 'Dubai - Body Transformation', spend: 18500, revenue: 84500, leads: 340, sqlRate: 38 },
                { name: 'Dubai - Weight Loss', spend: 12000, revenue: 52000, leads: 245, sqlRate: 35 },
                { name: 'Abu Dhabi - All Services', spend: 9800, revenue: 32000, leads: 168, sqlRate: 22 },
                { name: 'Sharjah - Premium', spend: 5590, revenue: 24238, leads: 94, sqlRate: 42 },
              ].map((campaign, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-white/5 bg-black/50 p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="font-medium">{campaign.name}</h4>
                    <span className="text-sm text-green-500">
                      {(campaign.revenue / campaign.spend).toFixed(1)}x ROAS
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-neutral-500">Spend</p>
                      <p className="font-medium">{formatCurrency(campaign.spend)}</p>
                    </div>
                    <div>
                      <p className="text-neutral-500">Revenue</p>
                      <p className="font-medium">{formatCurrency(campaign.revenue)}</p>
                    </div>
                    <div>
                      <p className="text-neutral-500">Leads</p>
                      <p className="font-medium">{campaign.leads}</p>
                    </div>
                    <div>
                      <p className="text-neutral-500">SQL Rate</p>
                      <p className={`font-medium ${campaign.sqlRate < 30 ? 'text-red-500' : 'text-green-500'}`}>
                        {campaign.sqlRate}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
