'use client'

import React, { useState } from 'react'

interface Propsdashboard {
  children:  React.ReactNode
}

export default function Dashboard({
  children
}: Propsdashboard) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      <p>Este es el contenido principal de la página.</p>
    </div>
  )
}
