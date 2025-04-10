import { createBrowserRouter } from 'react-router-dom';
import Home from '@/pages/Home';
import CategoryPage from '@/pages/category';
import Dashboard from '@/pages/admin/Dashboard';
import Login from '@/pages/admin/Login';
import Categories from '@/pages/admin/Categories'; // Importando a nova página de categorias
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
          { path: 'categories', element: <Categories /> },  {/* Nova Rota para Gerenciamento de Categorias */}
        ],
      },
    ],
  },
]);
