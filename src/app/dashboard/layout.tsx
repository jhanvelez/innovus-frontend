'use client'

import React, { useState } from 'react'

// components
import { Sidebar } from "@/components/Sidebar"
import { Header } from "@/components/Header"
import { Breadcrumbs } from "@/components/Breadcrumbs"

interface PropsLayout {
  children:  React.ReactNode
}

export default function Layout({
  children
}: PropsLayout) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div>
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="lg:pl-72">
          <Header
            setSidebarOpen={setSidebarOpen}
          />

          <Breadcrumbs />

          <main className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
