import { h } from 'preact';

import { Day as DayComponent } from '@src/components/view/day';
import CalendarControl from '@src/factory/calendarControl';

import { Options } from '@t/options';

export default class Day extends CalendarControl {
  constructor(container: Element, options: Options = {}) {
    super(container, options);

    this.render();
  }

  protected getComponent() {
    return <DayComponent />;
  }
}
