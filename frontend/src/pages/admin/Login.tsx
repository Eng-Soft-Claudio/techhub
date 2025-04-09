import { useAuth } from '@/store/useAuth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = () => {
    login()
    navigate('/admin')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Painel Admin</h1>
      <button onClick={handleLogin}>Login Fake</button>
    </div>
  )
}
