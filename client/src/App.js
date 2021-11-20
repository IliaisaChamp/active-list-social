import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkUser, deleteUser } from "./store/ac/authAC";
// routes
import Router from "./routes";

// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";

// components
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

// delete
import { BaseOptionChartStyle } from "./components/charts/BaseOptionChart";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Notification from "./components/Notification/Notification";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "http://localhost:3001";
  axios.interceptors.response.use(
    (res) => res,
    (err) => {
        console.log('intereceptor USED')
      if (err.status === 401) {
        dispatch(deleteUser);
      }
      return Promise.reject(err);
    }
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
      <ErrorMessage />
      <Router />
    </ThemeConfig>
  );
}

export default App;
