-- Mission Control Database Schema for PTD Fitness UAE
-- Run this in Supabase SQL Editor to set up the database

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Agents Table
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  role VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'offline',
  model VARCHAR(100) NOT NULL,
  sessions INTEGER DEFAULT 0,
  memory_usage INTEGER DEFAULT 0,
  capabilities TEXT[] DEFAULT '{}',
  description TEXT,
  last_active TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Workflows Table
CREATE TABLE IF NOT EXISTS workflows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'idle',
  trigger_type VARCHAR(100),
  trigger_config JSONB DEFAULT '{}',
  success_rate DECIMAL(5,2) DEFAULT 0,
  total_runs INTEGER DEFAULT 0,
  last_run TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Metrics Table
CREATE TABLE IF NOT EXISTS metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  roas DECIMAL(10,2),
  spend DECIMAL(12,2),
  revenue DECIMAL(12,2),
  leads INTEGER,
  sql_rate DECIMAL(5,2),
  cpl DECIMAL(10,2),
  cpa DECIMAL(10,2),
  campaign VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads Table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  source VARCHAR(100),
  status VARCHAR(50) DEFAULT 'new',
  score INTEGER DEFAULT 0,
  value VARCHAR(50) DEFAULT 'Medium',
  campaign VARCHAR(255),
  hubspot_id VARCHAR(100),
  anytrack_id VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity Log Table
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_name VARCHAR(100),
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reports Table
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  period_start DATE,
  period_end DATE,
  metrics JSONB DEFAULT '{}',
  insights TEXT,
  recommendations TEXT,
  status VARCHAR(50) DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default agents
INSERT INTO agents (name, role, status, model, sessions, memory_usage, capabilities, description) VALUES
  ('CRAW', 'Main Agent', 'active', 'claude-opus-4.6', 12, 67, ARRAY['autonomous', 'reasoning', 'coding'], 'Primary autonomous agent'),
  ('RIKI', 'Sales Agent', 'active', 'gpt-5.2', 8, 45, ARRAY['sales', 'qualification'], 'Sales inquiries and lead qualification'),
  ('NOVA', 'Marketing Agent', 'idle', 'minimax-m2.5', 5, 32, ARRAY['social', 'content'], 'Social media and content'),
  ('ATLAS', 'Business Agent', 'active', 'gemini-3.1-pro', 6, 58, ARRAY['research', 'analysis'], 'Business intelligence'),
  ('SHERLOCK', 'Forensic Agent', 'active', 'claude-sonnet-4.6', 3, 41, ARRAY['investigation'], 'Deep analysis'),
  ('GEO-SEO', 'SEO Agent', 'active', 'gpt-5.2', 4, 28, ARRAY['seo', 'content'], 'SEO optimization'),
  ('FORGE', 'Orchestrator', 'active', 'claude-opus-4.6', 2, 52, ARRAY['orchestration'], 'Multi-agent coordination'),
  ('AI-COFOUNDER', 'Strategy Agent', 'idle', 'claude-opus-4.6', 1, 38, ARRAY['strategy'], 'Strategic advisory')
ON CONFLICT (name) DO NOTHING;

-- Insert default workflows
INSERT INTO workflows (name, description, status, trigger_type, success_rate, total_runs) VALUES
  ('Weekly Performance Report', 'Comprehensive weekly analysis', 'active', 'schedule', 98, 13),
  ('Lead Qualification Pipeline', 'Lead routing and qualification', 'active', 'webhook', 94, 847),
  ('Facebook Ad Optimization', 'Budget optimization', 'paused', 'schedule', 87, 124),
  ('HubSpot CRM Sync', 'CRM synchronization', 'active', 'webhook', 100, 2341),
  ('Midday Optimization', 'Daily midday review', 'active', 'schedule', 96, 89)
ON CONFLICT DO NOTHING;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_metrics_timestamp ON metrics(timestamp);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_activity_created ON activity_log(created_at);
CREATE INDEX IF NOT EXISTS idx_reports_type ON reports(type);

-- Enable RLS
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public access" ON agents FOR SELECT USING (true);
CREATE POLICY "Public access" ON workflows FOR SELECT USING (true);
CREATE POLICY "Public access" ON metrics FOR SELECT USING (true);
CREATE POLICY "Public access" ON leads FOR SELECT USING (true);
CREATE POLICY "Public access" ON activity_log FOR SELECT USING (true);
CREATE POLICY "Public access" ON reports FOR SELECT USING (true);
