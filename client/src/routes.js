import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import Layout from './components/Layout/Layout';
import Profile from './pages/Profile';
// import User from './components/NearestFolder/User';
import Top from './components/TopFolder/Top';
import Timeline from './pages/Timeline';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import Report from './pages/Report';
import Chat from './components/ChatFolder/Chat/Chat';
import ReportForm from './components/Report/ReportForm';
import DetailReport from './components/Report/DetailReport';
import Recommendations from './pages/Recommendations';
// import Loader from './components/Loader/Loader';
import { getSubsribes } from './store/ac/subscribesAC';
// import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  const user = useSelector((state) => state.user);
  // const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(getSubsribes(user.id));
    }
  }, [user]);

  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
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
        { path: '/recommendations', element: <Recommendations /> },
        { path: '/top', element: <Top /> },
      ],
    },
    { path: '/login', element: user ? <Navigate to={'/profile/' + user.id} /> : <Login /> },
    { path: '/register', element: user ? <Navigate to={'/profile/' + user.id} /> : <Register /> },
    // { path: '*', element: <NotFound /> },
  ]);
}
