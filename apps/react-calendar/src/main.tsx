import '@toast-ui/calendar/toastui-calendar.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import Calendar from './index';

ReactDOM.createRoot(
  document.getElementById('toastui-calendar-react') ?? document.createElement('div')
).render(
  <React.StrictMode>
    <Calendar />
  </React.StrictMode>
);
