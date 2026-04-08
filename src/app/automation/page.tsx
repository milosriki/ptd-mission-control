'use client'

import { Sidebar } from '@/components/Sidebar'
import { Zap, Plus, Play, Pause, Settings, GitBranch } from 'lucide-react'

const automations = [
  {
    id: '1',
    name: 'Lead Score Routing',
    description: 'Automatically scores and routes leads based on engagement',
    status: 'active',
    executions: 1247,
    lastRun: '5 min ago',
    trigger: 'New HubSpot contact'
  },
  {
    id: '2',
    name: 'Facebook Budget Optimization',
    description: 'Automatically reallocates budget to top performing ads',
    status: 'active',
    executions: 89,
    lastRun: '1 hour ago',
    trigger: 'Every 6 hours'
  },
  {
    id: '3',
    name: 'SQL Notification',
    description: 'Sends Slack/WhatsApp notification when new SQL is created',
    status: 'active',
    executions: 278,
    lastRun: '2 hours ago',
    trigger: 'SQL created'
  },
  {
    id: '4',
    name: 'Weekly Report Generation',
    description: 'Generates and emails weekly performance report',
    status: 'active',
    executions: 13,
    lastRun: '1 day ago',
    trigger: 'Every Monday'
  },
  {
    id: '5',
    name: 'Competitor Monitoring',
    description: 'Monitors competitor activity and alerts on changes',
    status: 'paused',
    executions: 45,
    lastRun: '3 days ago',
    trigger: 'Daily'
  },
]

export default function AutomationPage() {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-black">
        <div className="border-b border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="flex items-center justify-between px-8 py-6">
            <div>
              <h2 className="text-2xl font-bold">Automation</h2>
              <p className="mt-1 text-sm text-neutral-400">
                N8N-powered workflow automation
              </p>
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-neutral-200">
              <Plus className="h-4 w-4" />
              Create Automation
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {automations.map((automation) => (
              <div
                key={automation.id}
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-white/10 p-3">
                      <Zap className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{automation.name}</h3>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          automation.status === 'active'
                            ? 'bg-green-500/20 text-green-500'
                            : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {automation.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-neutral-400">
                        {automation.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-4 text-sm text-neutral-500">
                  <div className="flex items-center gap-1">
                    <GitBranch className="h-4 w-4" />
                    {automation.trigger}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
                  <div className="flex items-center gap-4 text-sm">
                    <span>{automation.executions} executions</span>
                    <span className="text-neutral-500">Last: {automation.lastRun}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20">
                      {automation.status === 'active' ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </button>
                    <button className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20">
                      <Settings className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
