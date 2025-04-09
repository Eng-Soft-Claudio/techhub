import { useAuth } from '@/store/useAuth'
import { JSX } from 'react'
import { Navigate } from 'react-router-dom'

interface Props {
  children: JSX.Element
}

export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
