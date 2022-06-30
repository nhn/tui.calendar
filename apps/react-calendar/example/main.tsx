import '@toast-ui/calendar/toastui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.min.css';
import 'tui-time-picker/dist/tui-time-picker.min.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app';

ReactDOM.render(
  <React.StrictMode>
    <App view="month" />
  </React.StrictMode>,
  document.getElementById('app')
);
