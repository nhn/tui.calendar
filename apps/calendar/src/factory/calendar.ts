import CalendarControl from '@src/factory/calendarControl';
import Month from '@src/factory/month';
import Week from '@src/factory/week';
import Day from '@src/factory/day';
import { Option } from '@src/model';

export default class Calendar extends CalendarControl {
  private _view: CalendarControl;

  constructor(container: Element, option: Option = {}) {
    super(container, option);

    const { defaultView = 'month' } = option;

    if (defaultView === 'month') {
      this._view = new Month(container, option);
    } else if (defaultView === 'week') {
      this._view = new Week(container, option);
    } else if (defaultView === 'day') {
      this._view = new Day(container, option);
    } else {
      throw new Error('Not supported type');
    }
  }

  protected getComponent() {
    return null;
  }

  render() {
    this._view.render();

    return this;
  }

  renderToString() {
    return this._view.renderToString();
  }
}
