import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/store/slices/auth.slice';

export default function ProtectedRoute() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
