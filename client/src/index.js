import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { HelmetProvider } from 'react-helmet-async';
import { store } from './store/store';
import i18n from './i18n';
import 'simplebar/src/simplebar.css';

import App from './App';

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
  document.getElementById('root'),
);
