import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://akhirugwpozlxfvtqmvj.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Agent = {
  id: string
  name: string
  role: string
  status: 'active' | 'idle' | 'error' | 'offline'
  model: string
  sessions: number
  last_active: string
  memory_usage: number
  capabilities: string[]
}

export type Workflow = {
  id: string
  name: string
  status: 'running' | 'paused' | 'stopped' | 'error'
  last_run: string
  triggers: string[]
  tasks_completed: number
  success_rate: number
}

export type Metric = {
  id: string
  timestamp: string
  roas: number
  spend: number
  revenue: number
  leads: number
  sql_rate: number
  cpl: number
  cpa: number
}
