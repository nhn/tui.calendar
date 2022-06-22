import { h } from 'preact';

import { Day as DayComponent } from '@src/components/view/day';
import CalendarCore from '@src/factory/calendarCore';

import type { Options } from '@t/options';

export default class Day extends CalendarCore {
  constructor(container: Element, options: Options = {}) {
    super(container, options);

    this.render();
  }

  protected getComponent() {
    return <DayComponent />;
  }
}
