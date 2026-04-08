'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Bot,
  Workflow,
  Settings,
  Activity,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/agents', label: 'Agents', icon: Bot },
  { href: '/workflows', label: 'Workflows', icon: Workflow },
  { href: '/performance', label: 'Performance', icon: TrendingUp },
  { href: '/leads', label: 'Leads', icon: Users },
  { href: '/automation', label: 'Automation', icon: Zap },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="flex h-full flex-col">
        <div className="border-b border-white/10 p-6">
          <h1 className="text-xl font-bold tracking-tight">MISSION CONTROL</h1>
          <p className="mt-1 text-xs text-neutral-500">PTD Fitness UAE</p>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-white text-black'
                    : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-xs text-green-500">System Online</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
