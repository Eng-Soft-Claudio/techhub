import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/pages/Home';
import CategoryList from '@/pages/CategoryList';
import AdminDashboard from '@/pages/AdminDashboard';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/categorias', element: <CategoryList /> },
  { path: '/admin', element: <AdminDashboard /> },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
