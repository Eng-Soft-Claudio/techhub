import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import CategoryPage from '@/pages/category';
import Dashboard from '@/pages/admin/Dashboard';
import Login from '@/pages/admin/Login';
import Manage from '@/pages/admin/Manage';
import DefaultLayout from '@/layouts/DefaultLayout';
import AdminLayout from '@/layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';

export const AppRouter = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/categoria/:id', element: <CategoryPage /> },
    ],
  },
  {
    path: '/admin/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'manage', element: <Manage /> },
          // Adicione outras rotas protegidas do admin aqui, se necessário
        ],
      },
    ],
  },
]);
