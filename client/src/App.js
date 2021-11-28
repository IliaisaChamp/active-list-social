import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { checkUser, deleteUser } from './store/ac/authAC';
import Router from './routes';
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import FlashMessage from './components/FlashMessage/FlashMessage';
import Notification from './components/Notification/Notification';
import useSocket from './hooks/useSocket';
import { BASE_URL } from './config/constants';

//--------------------------------------------------------------------------------

function App() {
  const dispatch = useDispatch();
  useSocket(dispatch);

  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = BASE_URL;
  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.status === 401) {
        dispatch(deleteUser);
      }
      return Promise.reject(err);
    },
  );

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Notification />
      <FlashMessage />
      <Router />
    </ThemeConfig>
  );
}

export default App;
