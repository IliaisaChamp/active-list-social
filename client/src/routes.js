import { useSelector } from 'react-redux';
import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import Layout from './components/Layout/Layout';
import Profile from './pages/Profile';
import User from './components/NearestFolder/User';
import Top from './components/TopFolder/Top';
import Timeline from './pages/Timeline';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import Report from './pages/Report';
import Chat from './components/ChatFolder/Chat/Chat';
import ReportForm from './components/ReportForm/ReportForm';
import DetailReport from './components/DetailReport/DetailReport';
import Loader from './components/Loader/Loader'
// import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  const user = useSelector((state) => state.user);
  const isLoading = useSelector((state) => state.isLoading)

  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children:
        
        
        [{
          path: '/profile/:id',
          element: !user ? <Navigate to="/" /> : <Profile />,
        },
        {
          path: '/tasks',
          element: <Tasks />,
        },
        { path: '/timeline', element: <Timeline /> },
        {
          path: '/reports',
          element: <Report />,
          children: [
            {
              path: 'task/:id',
              element: <ReportForm />,
            },
            {
              path: ':id',
              element: <DetailReport />,
            },
          ],
        },
        { path: '/chats', element: <Chat /> },
        { path: '/nearest', element: <User /> },
        { path: '/top', element: <Top /> },
      ],
    },
    { path: '/login', element: user ? <Navigate to={'/profile/' + user.id} /> : <Login /> },
    { path: '/register', element: user ? <Navigate to={'/profile/' + user.id} /> : <Register /> },
    // { path: '*', element: <NotFound /> },
  ]);
}
