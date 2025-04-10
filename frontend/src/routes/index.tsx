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
    element: <ProtectedRoute />, // Aqui você protege as rotas dentro do painel admin
    children: [
      {
        element: <AdminLayout />, // AdminLayout é usado para todas as páginas do painel
        children: [
          { path: 'dashboard', element: <Dashboard /> },
          { path: 'manage', element: <Manage /> },
          // Adicione outras rotas protegidas aqui
        ],
      },
    ],
  },
]);
