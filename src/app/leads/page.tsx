'use client'

import { Sidebar } from '@/components/Sidebar'
import { Users, Filter, Download, Plus } from 'lucide-react'

const leads = [
  { id: 1, name: 'Sarah Al Maktoum', email: 'sarah.al@email.ae', phone: '+971501234567', source: 'Facebook', status: 'SQL', score: 92, value: 'High', created: '2 hours ago' },
  { id: 2, name: 'Ahmed Hassan', email: 'ahmed.h@company.ae', phone: '+971552345678', source: 'Instagram', status: 'MQL', score: 78, value: 'High', created: '4 hours ago' },
  { id: 3, name: 'Fatima Al Qasimi', email: 'fatima.q@outlook.ae', phone: '+971501987654', source: 'Facebook', status: 'SQL', score: 88, value: 'Premium', created: '5 hours ago' },
  { id: 4, name: 'Khalid Bin Rashid', email: 'khalid.br@business.ae', phone: '+971554567890', source: 'Google', status: 'MQL', score: 65, value: 'Medium', created: '8 hours ago' },
  { id: 5, name: 'Mariam Al Nahyan', email: 'mariam.n@gulfmail.ae', phone: '+971501234890', source: 'Facebook', status: 'Lead', score: 45, value: 'Medium', created: '12 hours ago' },
]

export default function LeadsPage() {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-black">
        <div className="border-b border-white/10 bg-black/50 backdrop-blur-xl">
          <div className="flex items-center justify-between px-8 py-6">
            <div>
              <h2 className="text-2xl font-bold">Leads</h2>
              <p className="mt-1 text-sm text-neutral-400">
                847 total leads | 278 SQLs this week
              </p>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm transition-colors hover:bg-white/10">
                <Filter className="h-4 w-4" />
                Filter
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm transition-colors hover:bg-white/10">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
            <table className="w-full">
              <thead className="border-b border-white/10 bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-neutral-400">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-neutral-400">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-neutral-400">Source</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-neutral-400">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-neutral-400">Score</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-neutral-400">Value</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-neutral-400">Created</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-medium">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium">{lead.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-400">
                      <div>{lead.email}</div>
                      <div>{lead.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-sm">{lead.source}</td>
                    <td className="px-6 py-4">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                        lead.status === 'SQL' ? 'bg-green-500/20 text-green-500' :
                        lead.status === 'MQL' ? 'bg-blue-500/20 text-blue-500' :
                        'bg-neutral-500/20 text-neutral-400'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 rounded-full bg-black">
                          <div
                            className={`h-full rounded-full ${
                              lead.score >= 80 ? 'bg-green-500' :
                              lead.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${lead.score}%` }}
                          />
                        </div>
                        <span className="text-sm">{lead.score}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`${
                        lead.value === 'Premium' ? 'text-purple-400' :
                        lead.value === 'High' ? 'text-green-400' : 'text-neutral-400'
                      }`}>
                        {lead.value}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-500">{lead.created}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
