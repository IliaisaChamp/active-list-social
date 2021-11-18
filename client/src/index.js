import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// удалить
import { HelmetProvider } from 'react-helmet-async';

// scroll bar
import 'simplebar/src/simplebar.css';

import App from './App';

ReactDOM.render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>,
  document.getElementById('root')
);
