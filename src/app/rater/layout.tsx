// src/app/rater/layout.tsx
import React from 'react'
import RaterNavBar from './navbar'
import RaterFooter from './footer'

export default function RaterLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          {/* Rater-only navbar */}
          {/* @ts-expect-error Server Component renders Client Component */}
          <RaterNavBar />
          <main className="flex-1">{children}</main>
          <RaterFooter />
        </div>
      </body>
    </html>
  )
}