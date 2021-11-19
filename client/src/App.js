import { useEffect } from 'react';
import {useDispatch} from 'react-redux'
import { checkUser } from './store/ac/authAC';
// routes
import Router from './routes';

// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';

// components
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

// delete
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUser());
  }, [])

  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <ErrorMessage/>
      <Router />
    </ThemeConfig>
  );
}

export default App;
