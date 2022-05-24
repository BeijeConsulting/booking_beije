import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss'

// react-router-dom
import { BrowserRouter } from 'react-router-dom';
import Routing from './Routing';

// REDUX
import { Provider } from 'react-redux';
import applicationStore from './applicationStore';

// localization
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={applicationStore}>
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  </Provider>
);