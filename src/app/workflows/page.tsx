'use client'

import { Sidebar } from '@/components/Sidebar'
import { Workflow, Plus, Play, Pause, Trash2, Settings } from 'lucide-react'

const workflows = [
  {
    id: '1',
    name: 'Weekly Performance Report',
    description: 'Generates comprehensive weekly performance analysis',
    status: 'running',
    trigger: 'Schedule (Every Monday 01:20 UTC)',
    lastRun: '2026-04-08 01:20:00',
    successRate: 98,
    totalRuns: 13,
  },
  {
    id: '2',
    name: 'Lead Qualification Pipeline',
    description: 'Qualifies leads and routes to appropriate workflows',
    status: 'running',
    trigger: 'HubSpot + AnyTrack',
    lastRun: '2026-04-08 11:05:00',
    successRate: 94,
    totalRuns: 847,
  },
  {
    id: '3',
    name: 'Facebook Ad Optimization',
    description: 'Optimizes ad spend based on ROAS performance',
    status: 'paused',
    trigger: 'Schedule (Every 6 hours)',
    lastRun: '2026-04-07 18:00:00',
    successRate: 87,
    totalRuns: 124,
  },
  {
    id: '4',
    name: 'HubSpot CRM Sync',
    description: 'Synchronizes leads and deals between platforms',
    status: 'running',
    trigger: 'Real-time Webhook',
    lastRun: '2026-04-08 11:15:00',
    successRate: 100,
    totalRuns: 2341,
  },
  {
    id: '5',
    name: 'Content Generation',
    description: 'Creates and optimizes SEO content',
    status: 'idle',
    trigger: 'Manual + AI Trigger',
    lastRun: '2026-04-06 14:30:00',
    successRate: 92,
    totalRuns: 45,
  },
  {
    id: '6',
    name: 'Midday Optimization',
    description: 'Daily midday performance review and optimization',
    status: 'running',
    trigger: 'Schedule (Every day 12:00 GST)',
    lastRun: '2026-04-08 12:00:00',
    successRate: 96,
    totalRuns: 89,
  },
]

export default function WorkflowsPage() {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-black">
        <div className="border-b border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="flex items-center justify-between px-8 py-6">
            <div>
              <h2 className="text-2xl font-bold">Workflows</h2>
              <p className="mt-1 text-sm text-neutral-400">
                Automate complex tasks with n8n workflow engine
              </p>
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-neutral-200">
              <Plus className="h-4 w-4" />
              Create Workflow
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-white/10 p-3">
                      <Workflow className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{workflow.name}</h3>
                        <div
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            workflow.status === 'running'
                              ? 'bg-green-500/20 text-green-500'
                              : workflow.status === 'paused'
                              ? 'bg-yellow-500/20 text-yellow-500'
                              : 'bg-neutral-500/20 text-neutral-500'
                          }`}
                        >
                          {workflow.status}
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-neutral-400">
                        {workflow.description}
                      </p>
                      <div className="mt-3 flex items-center gap-6 text-sm text-neutral-500">
                        <span>Trigger: {workflow.trigger}</span>
                        <span>Last run: {workflow.lastRun}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold">{workflow.successRate}%</p>
                      <p className="text-xs text-neutral-500">
                        {workflow.totalRuns} runs
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20">
                        <Play className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20">
                        <Pause className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg bg-white/10 p-2 transition-colors hover:bg-white/20">
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 h-1.5 rounded-full bg-black">
                  <div
                    className="h-full rounded-full bg-white/30"
                    style={{ width: `${workflow.successRate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
