'use client'

import { Sidebar } from '@/components/Sidebar'
import { Settings, Database, Key, Link, Bell, Shield } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-black">
        <div className="border-b border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="px-8 py-6">
            <h2 className="text-2xl font-bold">Settings</h2>
            <p className="mt-1 text-sm text-neutral-400">
              Configure your Mission Control platform
            </p>
          </div>
        </div>

        <div className="p-8">
          <div className="mx-auto max-w-3xl space-y-6">
            {/* Supabase Connection */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex items-center gap-3">
                <Database className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-semibold">Supabase Database</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-neutral-400">Project ID</label>
                  <input
                    type="text"
                    value="akhirugwpozlxfvtqmvj"
                    disabled
                    className="mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-sm"
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  Connected
                </div>
              </div>
            </div>

            {/* API Keys */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex items-center gap-3">
                <Key className="h-5 w-5 text-purple-500" />
                <h3 className="text-lg font-semibold">API Keys</h3>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Anthropic Claude', status: 'configured' },
                  { name: 'OpenAI GPT-5', status: 'configured' },
                  { name: 'Google Gemini', status: 'configured' },
                  { name: 'MiniMax', status: 'configured' },
                  { name: 'Tavily Search', status: 'configured' },
                  { name: 'Supermemory', status: 'configured' },
                ].map((key) => (
                  <div
                    key={key.name}
                    className="flex items-center justify-between rounded-lg border border-white/5 bg-black/50 p-3"
                  >
                    <span className="text-sm">{key.name}</span>
                    <span className="text-xs text-green-500">{key.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Integrations */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex items-center gap-3">
                <Link className="h-5 w-5 text-green-500" />
                <h3 className="text-lg font-semibold">Integrations</h3>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'HubSpot CRM', status: 'Initiated', icon: '🟠' },
                  { name: 'AnyTrack', status: 'Active', icon: '🟢' },
                  { name: 'Facebook Ads', status: 'Active', icon: '🟢' },
                  { name: 'GitHub', status: 'Active', icon: '🟢' },
                  { name: 'Vercel', status: 'Active', icon: '🟢' },
                  { name: 'N8N Workflows', status: 'Active', icon: '🟢' },
                ].map((integration) => (
                  <div
                    key={integration.name}
                    className="flex items-center justify-between rounded-lg border border-white/5 bg-black/50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span>{integration.icon}</span>
                      <span className="text-sm">{integration.name}</span>
                    </div>
                    <span
                      className={`text-xs ${
                        integration.status === 'Active'
                          ? 'text-green-500'
                          : 'text-yellow-500'
                      }`}
                    >
                      {integration.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex items-center gap-3">
                <Bell className="h-5 w-5 text-orange-500" />
                <h3 className="text-lg font-semibold">Notifications</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Weekly Reports', enabled: true },
                  { label: 'Critical Alerts', enabled: true },
                  { label: 'Workflow Failures', enabled: true },
                  { label: 'Agent Status Changes', enabled: false },
                ].map((notification) => (
                  <label
                    key={notification.label}
                    className="flex cursor-pointer items-center justify-between rounded-lg border border-white/5 bg-black/50 p-3"
                  >
                    <span className="text-sm">{notification.label}</span>
                    <div className="relative">
                      <input
                        type="checkbox"
                        defaultChecked={notification.enabled}
                        className="sr-only"
                      />
                      <div
                        className={`h-5 w-9 rounded-full transition-colors ${
                          notification.enabled ? 'bg-white' : 'bg-neutral-700'
                        }`}
                      >
                        <div
                          className={`mt-0.5 h-4 w-4 rounded-full bg-black transition-transform ${
                            notification.enabled ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
