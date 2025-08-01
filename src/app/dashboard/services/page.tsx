'use client'

import { useAuth } from '@/hooks/useAuth'

export default function View() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Lecturas</h2>
      <p>Este es el contenido principal de la página.</p>
    </>
  )
}