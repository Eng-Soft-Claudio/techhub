import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/store/slices/auth.slice';

export default function ProtectedRoute() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
