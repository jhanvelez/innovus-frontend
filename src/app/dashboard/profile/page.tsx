'use client'

// Hook
import { useAuth } from '@/hooks/useAuth'
export default function Profile() {
  const { isAuthenticated } = useAuth()

  return (
    <div>
      <h2>Perfil</h2>
      <p>Aca se pone el perfil de este mierdero</p>
    </div>
  )
}