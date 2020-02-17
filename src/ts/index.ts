/* eslint-disable global-require */
import Calendar from '@src/factory/calendar';
import Month from '@src/factory/month';
import Week from '@src/factory/week';

export default Calendar;

export { Month, Week };

if (module.hot) {
  // tslint:disable-next-line: no-var-requires
  require('preact/debug');
}
