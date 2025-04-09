import { useRoutes } from 'react-router-dom';
import { RouteObject } from 'react-router-dom';
import DefaultLayout from '@/layouts/DefaultLayout';
import AdminLayout from '@/layouts/AdminLayout';
import Home from '@/pages/Home';
import CategoryPage from '@/pages/CategoryPage';
import Dashboard from '@/pages/admin/Dashboard';
import Login from '@/pages/admin/Login';
import ProtectedRoute from './ProtectedRoute';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'categoria/:slug', element: <CategoryPage /> },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '', element: <Dashboard /> },
    ],
  },
  {
    path: '/admin/login',
    element: <Login />,
  },
];

// Componente que aplica as rotas
export function AppRoutes() {
  return useRoutes(routes);
}
