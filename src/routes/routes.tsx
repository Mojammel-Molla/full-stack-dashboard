import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { admin_route_config } from '@/constants/routes.constants';
import routeGenerator from '@/utils/route_generator';
import ProtectedRoute from './ProtectedRoute';
import AdminDashboard from '@/layouts/AdminDashboard';
import Empty from '@/pages/Empty';
import Login from '@/pages/Login';
const Routes = () => {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      ),
      children: routeGenerator(admin_route_config),
      errorElement: <Empty />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default Routes;
