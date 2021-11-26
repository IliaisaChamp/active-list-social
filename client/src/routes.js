import { useSelector } from 'react-redux';
import { Navigate, useRoutes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Profile from './pages/Profile';
import Top from './components/TopFolder/Top';
import Timeline from './pages/Timeline';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import Report from './pages/Report';
import Chat from './components/ChatFolder/Chat/Chat';
import ReportForm from './components/Report/ReportForm';
import DetailReport from './components/Report/DetailReport';
import CurrentTaskReportLenta from './components/CurrentTasksReportsFolder/CurrentTaskReportLenta';
import Recommendations from './pages/Recommendations';
import Salut from './components/Salut/Salut';

// ----------------------------------------------------------------------

export default function Router() {
  const user = useSelector((state) => state.user);

  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '',
          element: <Top />,
        },
        {
          path: '/profile/:id',
          element: !user ? <Navigate to={'/login'} /> : <Profile />,
        },
        {
          path: '/tasks',
          element: !user ? <Navigate to={'/login'} /> : <Tasks />,
        },
        {
          path: '/tasks/:id',
          element: !user ? <Navigate to={'/login'} /> : <CurrentTaskReportLenta />,
        },
        { path: '/timeline', element: <Timeline /> },
        {
          path: '/reports',
          element: !user ? <Navigate to={'/login'} /> : <Report />,
          children: [
            {
              path: 'task/:id',
              element: !user ? <Navigate to={'/login'} /> : <ReportForm />,
            },
            {
              path: ':id',
              element: !user ? <Navigate to={'/login'} /> : <DetailReport />,
            },
          ],
        },
        { path: '/chats', element: !user ? <Navigate to={'/login'} /> : <Chat /> },
        { path: '/recommendations', element: !user ? <Navigate to={'/login'} /> : <Recommendations /> },
        { path: '/top', element: <Top /> },
      ],
    },
    { path: '/login', element: user ? <Navigate to={'/profile/' + user.id} /> : <Login /> },
    { path: '/register', element: user ? <Navigate to={'/profile/' + user.id} /> : <Register /> },
    { path: '/elbrus', element: <Salut /> },
    { path: '*', element: <Navigate to={'/top'} /> },
  ]);
}
