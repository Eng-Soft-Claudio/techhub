import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './routes';

export default function App() {
  return <RouterProvider router={AppRouter} />;
}
