'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from './supabase'
import type { Agent, Workflow, Metric, Lead } from './supabase'

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchAgents = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .order('name')
      
      if (error) throw error
      setAgents(data || [])
    } catch (err) {
      setError(err as Error)
      setAgents([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAgents()
    const channel = supabase
      .channel('agents_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'agents' }, () => fetchAgents())
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [fetchAgents])

  return { agents, loading, error, refetch: fetchAgents }
}

export function useWorkflows() {
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchWorkflows = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('workflows')
        .select('*')
        .order('name')
      
      if (error) throw error
      setWorkflows(data || [])
    } catch (err) {
      setError(err as Error)
      setWorkflows([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchWorkflows()
    const channel = supabase
      .channel('workflows_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'workflows' }, () => fetchWorkflows())
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [fetchWorkflows])

  return { workflows, loading, error, refetch: fetchWorkflows }
}

export function useMetrics(days: number = 7) {
  const [metrics, setMetrics] = useState<Metric[]>([])
  const [loading, setLoading] = useState(true)

  const fetchMetrics = useCallback(async () => {
    try {
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - days)
      
      const { data } = await supabase
        .from('metrics')
        .select('*')
        .gte('timestamp', startDate.toISOString())
        .order('timestamp', { ascending: true })
      
      setMetrics(data || [])
    } catch {
      setMetrics([])
    } finally {
      setLoading(false)
    }
  }, [days])

  useEffect(() => { fetchMetrics() }, [fetchMetrics])
  return { metrics, loading, refetch: fetchMetrics }
}

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  const fetchLeads = useCallback(async () => {
    try {
      const { data } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)
      
      setLeads(data || [])
    } catch {
      setLeads([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLeads()
    const channel = supabase
      .channel('leads_changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'leads' }, () => fetchLeads())
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [fetchLeads])

  return { leads, loading, refetch: fetchLeads }
}

export function useActivityLog(limit: number = 20) {
  const [activities, setActivities] = useState<{id: string, agent_name: string, action: string, details: any, created_at: string}[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchActivity() {
      try {
        const { data } = await supabase
          .from('activity_log')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(limit)
        
        setActivities(data || [])
      } catch {
        setActivities([])
      } finally {
        setLoading(false)
      }
    }
    fetchActivity()
  }, [limit])

  return { activities, loading }
}
