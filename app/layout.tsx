import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Media Generator Pro',
  description: 'Generate stunning images and videos with AI - DALL-E 3, Runway, Stability AI, Luma AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
