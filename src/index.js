import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.less'

// react-router-dom
import { BrowserRouter } from 'react-router-dom';
import Routing from './Routing';

// localization
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routing />
  </BrowserRouter>
);