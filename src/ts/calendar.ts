import Month from '@src/month';
import Week from '@src/week';

export default class Calendar {
  public static Month = Month;

  public static Week = Week;

  public render(): Calendar {
    // console.log('Calendar.prototype.render');

    return this;
  }
}
