import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import Layout from './components/Layout/Layout';
import User from './components/NearestFolder/User';
// import DashboardLayout from './layouts/dashboard';
// import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
// import Login from './pages/Login';
// import Register from './pages/Register';
// import DashboardApp from './pages/DashboardApp';
// import Products from './pages/Products';
// import Blog from './pages/Blog';
// import User from './pages/User';
// import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // {
    //   path: '/dashboard',
    //   element: <DashboardLayout />,
    //   children: [
    //     { element: <Navigate to="/dashboard/app" replace /> },
    //     { path: 'app', element: <DashboardApp /> },
    //     { path: 'user', element: <User /> },
    //     { path: 'products', element: <Products /> },
    //     { path: 'blog', element: <Blog /> }
    //   ]
    // },
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/profile', element: <>Profile</> },
        { path: '/lenta', element: <>Lenta</> },
        { path: '/chats', element: <>chats</> },
        { path: '/nearest', element: <User/> },
        { path: '/top', element: <>Top</> },
        // { path: '*', element: <Navigate to="/404" /> }
      ],
    },
    // { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
