import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mission Control | PTD Fitness AI Platform',
  description: 'Autonomous AI agent management platform for PTD Fitness UAE operations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <div className="flex h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
