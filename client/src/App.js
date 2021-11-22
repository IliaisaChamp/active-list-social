import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUser, deleteUser } from "./store/ac/authAC";
import io from "socket.io-client";
// routes
import Router from "./routes";

// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";

// components
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

// delete
import { BaseOptionChartStyle } from "./components/charts/BaseOptionChart";
import FlashMessage from "./components/FlashMessage/FlashMessage";
import Notification from "./components/Notification/Notification";
import axios from "axios";

import Loader from "./components/Loader/Loader";
import { stopLoading } from "./store/ac/isLoadingAC";
import {setOnline} from "./store/ac/onlineAc";

function App() {
  const user = useSelector((state) => state.user);

  const socket = useRef();

  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:3001";
  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      console.log("intereceptor USED");
      if (err.status === 401) {
        dispatch(deleteUser);
      }
      return Promise.reject(err);
    }
  );

  useEffect(() => {
    dispatch(checkUser());
    socket.current = io("http://localhost:3001");
    socket.current.on("get-online", (onlineUsers) => {
      console.log(onlineUsers);
      dispatch(setOnline(onlineUsers));
    });
  }, [dispatch]);

  useEffect(() => {
    console.log("USER", user);
    if (user) {
      socket.current.emit("online", user.id);
    }
  }, [user]);
console.log('APP RENDER')
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
