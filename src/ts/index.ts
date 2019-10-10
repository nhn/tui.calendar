/* eslint-disable global-require */
import Calendar from '@src/factory/calendar';
import Month from '@src/factory/month';
import Week from '@src/factory/week';

export default Calendar;

export { Month, Week };

// [TODO]
// // for jquery
// if (global.jQuery) {
//   global.jQuery.fn.tuiCalendar = function(options: string | object = {}, optionData): Calendar {
//     const el = this.get(0);

//     if (el) {
//       let instance = global.jQuery.data(el, 'tuiCalendar');

//       if (instance) {
//         if (typeof options === 'string' && instance[options]) {
//           return instance[options].apply(instance, optionData);
//         }
//       } else {
//         instance = new Calendar(el, options);
//         global.jQuery.data(el, 'tuiCalendar', instance);
//       }
//     }

//     return this;
//   };
// }

if (module.hot) {
  // tslint:disable-next-line: no-var-requires
  require('preact/debug');
}
