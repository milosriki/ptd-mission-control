'use client'

import { Sidebar } from '@/components/Sidebar'
import { Bot, Plus, Settings, Play, Pause, Trash2 } from 'lucide-react'

const agents = [
  {
    id: '1',
    name: 'CRAW',
    role: 'Main Agent',
    status: 'active',
    model: 'claude-opus-4.6',
    sessions: 12,
    memory: 67,
    lastActive: '2 min ago',
    description: 'Primary autonomous agent for complex task execution',
  },
  {
    id: '2',
    name: 'RIKI',
    role: 'Sales Agent',
    status: 'active',
    model: 'gpt-5.2',
    sessions: 8,
    memory: 45,
    lastActive: '15 min ago',
    description: 'Handles sales inquiries and lead qualification',
  },
  {
    id: '3',
    name: 'NOVA',
    role: 'Marketing Agent',
    status: 'idle',
    model: 'minimax-m2.5',
    sessions: 5,
    memory: 32,
    lastActive: '1 hour ago',
    description: 'Social media, content creation, and ad optimization',
  },
  {
    id: '4',
    name: 'ATLAS',
    role: 'Business Agent',
    status: 'active',
    model: 'gemini-3.1-pro',
    sessions: 6,
    memory: 58,
    lastActive: '5 min ago',
    description: 'Business intelligence and market research',
  },
  {
    id: '5',
    name: 'SHERLOCK',
    role: 'Forensic Agent',
    status: 'active',
    model: 'claude-sonnet-4.6',
    sessions: 3,
    memory: 41,
    lastActive: '32 min ago',
    description: 'Deep analysis and root cause investigation',
  },
  {
    id: '6',
    name: 'GEO-SE0',
    role: 'SEO Agent',
    status: 'active',
    model: 'gpt-5.2',
    sessions: 4,
    memory: 28,
    lastActive: '10 min ago',
    description: 'Search optimization and content ranking',
  },
  {
    id: '7',
    name: 'FORGE',
    role: 'Orchestrator',
    status: 'active',
    model: 'claude-opus-4.6',
    sessions: 2,
    memory: 52,
    lastActive: '1 min ago',
    description: 'Coordinates multiple agents on complex workflows',
  },
]

export default function AgentsPage() {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-black">
        <div className="border-b border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="flex items-center justify-between px-8 py-6">
            <div>
              <h2 className="text-2xl font-bold">AI Agents</h2>
              <p className="mt-1 text-sm text-neutral-400">
                Manage your autonomous AI agent workforce
              </p>
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-neutral-200">
              <Plus className="h-4 w-4" />
              Add Agent
            </button>
          </div>
        </div>

        <div className="p-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className="group rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:border-white/20"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-white/10 p-2">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{agent.name}</h3>
                      <p className="text-xs text-neutral-500">{agent.role}</p>
                    </div>
                  </div>
                  <div
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      agent.status === 'active'
                        ? 'bg-green-500/20 text-green-500'
                        : agent.status === 'idle'
                        ? 'bg-yellow-500/20 text-yellow-500'
                        : 'bg-neutral-500/20 text-neutral-500'
                    }`}
                  >
                    {agent.status}
                  </div>
                </div>

                <p className="mb-4 text-sm text-neutral-400">{agent.description}</p>

                <div className="mb-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Model</span>
                    <span className="font-mono text-xs">{agent.model}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Sessions</span>
                    <span>{agent.sessions} active</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Memory</span>
                    <span>{agent.memory}%</span>
                  </div>
                </div>

                <div className="mb-4 h-1.5 rounded-full bg-black">
                  <div
                    className="h-full rounded-full bg-white/50"
                    style={{ width: `${agent.memory}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>Last active: {agent.lastActive}</span>
                  <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <button className="rounded p-1 hover:bg-white/10">
                      <Play className="h-4 w-4" />
                    </button>
                    <button className="rounded p-1 hover:bg-white/10">
                      <Pause className="h-4 w-4" />
                    </button>
                    <button className="rounded p-1 hover:bg-white/10">
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
