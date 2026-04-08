'use client'

import { Sidebar } from '@/components/Sidebar'
import { MetricCard } from '@/components/MetricCard'
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils'
import { useAgents, useWorkflows, useActivityLog } from '@/lib/hooks'
import {
  DollarSign,
  Users,
  Target,
  TrendingUp,
  Bot,
  Activity,
  Clock,
  Zap,
} from 'lucide-react'

const mockMetrics = {
  roas: 4.2,
  roasChange: 12.5,
  spend: 45890,
  spendChange: 8.2,
  revenue: 192738,
  revenueChange: 23.1,
  leads: 847,
  leadsChange: 15.4,
  sqlRate: 32.8,
  sqlChange: 4.2,
  cpl: 54.2,
  cplChange: -6.8,
}

function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export default function DashboardPage() {
  const { agents } = useAgents()
  const { workflows } = useWorkflows()
  const { activities } = useActivityLog()

  const displayAgents = agents.length > 0 ? agents : [
    { id: '1', name: 'CRAW', role: 'Main Agent', status: 'active', model: 'Claude Opus 4.6', sessions: 12 },
    { id: '2', name: 'RIKI', role: 'Sales Agent', status: 'active', model: 'GPT-5.2', sessions: 8 },
    { id: '3', name: 'NOVA', role: 'Marketing Agent', status: 'idle', model: 'MiniMax M2.5', sessions: 5 },
    { id: '4', name: 'ATLAS', role: 'Business Agent', status: 'active', model: 'Gemini 3.1', sessions: 6 },
    { id: '5', name: 'SHERLOCK', role: 'Forensic Agent', status: 'active', model: 'Claude Sonnet 4.6', sessions: 3 },
  ]

  const displayWorkflows = workflows.length > 0 ? workflows : [
    { id: '1', name: 'Weekly Performance Report', status: 'running', last_run: new Date(Date.now() - 7200000).toISOString(), success_rate: 98 },
    { id: '2', name: 'Lead Qualification Pipeline', status: 'running', last_run: new Date(Date.now() - 900000).toISOString(), success_rate: 94 },
    { id: '3', name: 'Facebook Ad Optimization', status: 'paused', last_run: new Date(Date.now() - 86400000).toISOString(), success_rate: 87 },
    { id: '4', name: 'HubSpot Sync', status: 'running', last_run: new Date(Date.now() - 300000).toISOString(), success_rate: 100 },
  ]

  const displayActivities = activities.length > 0 ? activities : [
    { time: '2 min ago', action: 'Generated weekly performance report', agent: 'CRAW', created_at: new Date().toISOString() },
    { time: '15 min ago', action: 'Synced 23 new leads from HubSpot', agent: 'ATLAS', created_at: new Date().toISOString() },
    { time: '32 min ago', action: 'Optimized Facebook ad budget allocation', agent: 'NOVA', created_at: new Date().toISOString() },
    { time: '1 hour ago', action: 'Qualified 12 new SQLs', agent: 'RIKI', created_at: new Date().toISOString() },
    { time: '2 hours ago', action: 'Analyzed competitor pricing strategy', agent: 'SHERLOCK', created_at: new Date().toISOString() },
  ]

  return (
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-black">
        <div className="border-b border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="px-8 py-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <p className="mt-1 text-sm text-neutral-400">
              Real-time overview of your AI agent operations
            </p>
          </div>
        </div>

        <div className="p-8">
          {/* Metrics Grid */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="ROAS"
              value={mockMetrics.roas.toFixed(1) + 'x'}
              change={mockMetrics.roasChange}
              changeLabel="vs last week"
              trend={mockMetrics.roasChange > 0 ? 'up' : 'down'}
              icon={<TrendingUp className="h-5 w-5 text-green-500" />}
            />
            <MetricCard
              title="Ad Spend (AED)"
              value={formatCurrency(mockMetrics.spend)}
              change={mockMetrics.spendChange}
              changeLabel="vs last week"
              trend={mockMetrics.spendChange > 0 ? 'up' : 'down'}
              icon={<DollarSign className="h-5 w-5 text-blue-500" />}
            />
            <MetricCard
              title="Revenue (AED)"
              value={formatCurrency(mockMetrics.revenue)}
              change={mockMetrics.revenueChange}
              changeLabel="vs last week"
              trend={mockMetrics.revenueChange > 0 ? 'up' : 'down'}
              icon={<Target className="h-5 w-5 text-purple-500" />}
            />
            <MetricCard
              title="SQL Rate"
              value={formatPercentage(mockMetrics.sqlRate)}
              change={mockMetrics.sqlChange}
              changeLabel="vs last week"
              trend={mockMetrics.sqlChange > 0 ? 'up' : 'down'}
              icon={<Users className="h-5 w-5 text-orange-500" />}
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Agent Status */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Active Agents</h3>
                <Bot className="h-5 w-5 text-neutral-400" />
              </div>

              <div className="space-y-3">
                {displayAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className="flex items-center justify-between rounded-lg border border-white/5 bg-black/50 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={\`h-3 w-3 rounded-full \${
                          agent.status === 'active'
                            ? 'bg-green-500'
                            : agent.status === 'idle'
                            ? 'bg-yellow-500'
                            : 'bg-neutral-500'
                        }\`}
                      />
                      <div>
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-xs text-neutral-500">{agent.role}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-medium">{agent.sessions} sessions</p>
                      <p className="text-xs text-neutral-500">{agent.model}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Workflow Status */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Active Workflows</h3>
                <Activity className="h-5 w-5 text-neutral-400" />
              </div>

              <div className="space-y-3">
                {displayWorkflows.map((workflow) => (
                  <div
                    key={workflow.id}
                    className="flex items-center justify-between rounded-lg border border-white/5 bg-black/50 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={\`h-3 w-3 rounded-full \${
                          workflow.status === 'running'
                            ? 'bg-green-500'
                            : workflow.status === 'paused'
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }\`}
                      />
                      <div>
                        <p className="font-medium">{workflow.name}</p>
                        <p className="text-xs text-neutral-500">
                          <Clock className="mr-1 inline h-3 w-3" />
                          {workflow.last_run ? timeAgo(workflow.last_run) : 'Never'}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-medium">{workflow.success_rate}%</p>
                      <p className="text-xs text-neutral-500">success rate</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Recent Activity</h3>
              <Zap className="h-5 w-5 text-neutral-400" />
            </div>

            <div className="space-y-2">
              {displayActivities.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-lg border border-white/5 bg-black/50 p-3"
                >
                  <span className="text-xs text-neutral-500">{activity.time || timeAgo(activity.created_at)}</span>
                  <span className="text-sm">{activity.action}</span>
                  <span className="ml-auto rounded bg-white/10 px-2 py-1 text-xs">
                    {activity.agent || activity.agent_name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
