import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import store from './store/store';

// удалить
import { HelmetProvider } from 'react-helmet-async';

// scroll bar
import 'simplebar/src/simplebar.css';

import App from './App';


axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3001';

ReactDOM.render(
  <HelmetProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </HelmetProvider>,
  document.getElementById('root')
);
