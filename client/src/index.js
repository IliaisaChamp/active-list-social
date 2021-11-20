import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import { store } from './store/store';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n.js';

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
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </Provider>
    </BrowserRouter>
  </HelmetProvider>,
  document.getElementById('root')
);
