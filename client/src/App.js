import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUser, deleteUser } from './store/ac/authAC';
import io from 'socket.io-client';
// routes
import Router from './routes';

// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';

// components
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

// delete
import { BaseOptionChartStyle } from "./components/charts/BaseOptionChart";
import FlashMessage from "./components/FlashMessage/FlashMessage";
import Notification from "./components/Notification/Notification";
import axios from "axios";
import { createSocketConnect, setOnline } from "./store/ac/onlineUsersAc";
import { setSocket } from "./store/ac/socketAc";
import { setNewReportNotification } from "./store/ac/notificationAC";
import useSocket from "./hooks/useSocket";



function App() {
  useSocket();
  const dispatch = useDispatch();

  axios.defaults.withCredentials = true;

  axios.defaults.baseURL = "http://localhost:3001";



  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      console.log('intereceptor USED');
      if (err.status === 401) {
        dispatch(deleteUser);
      }
      return Promise.reject(err);
    },
  );



  // useEffect(() => {
  //   dispatch(createSocketConnect(socket));
  //   return () => socket.current.emit('logout');
  // }, [socket, dispatch]);

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);

  // useEffect(() => {
  //     console.log(user)
  //   if (user) {
  //     socket.current = io("http://localhost:3001", {
  //       query: { id: user.id },
  //     });
  //       socket.current.on('notification', (msg) => {
  //           console.log('NOTIFICATION', msg)
  //           dispatch(setNewReportNotification(msg.message))
  //       } );
  //       socket.current.on("broadcast-online", (msg) => {
  //           console.log('USERS ONLINE', msg);
  //           dispatch(setOnline(msg.users));
  //       });
  //     dispatch(createSocketConnect(socket, user));
  //   }
  //   // return () => socket.current.emit('logout');
  // }, [user, dispatch]);

  console.log('APP RENDER');
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
