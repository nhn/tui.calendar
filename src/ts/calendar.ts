import Month from '@src/month';
import Week from '@src/week';

export default class Calendar {
  static Month = Month;

  static Week = Week;

  render(): Calendar {
    // console.log('Calendar.prototype.render');

    return this;
  }
}
