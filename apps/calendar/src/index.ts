import Calendar from '@src/factory/calendar';
import Month from '@src/factory/month';
import Week from '@src/factory/week';

export default Calendar;

export { Month, Week };

if (module.hot) {
  // eslint-disable-next-line global-require
  require('preact/debug');
}
export { useDispatch } from '@src/contexts/calendarStore';
export { initCalendarStore } from '@src/contexts/calendarStore';
