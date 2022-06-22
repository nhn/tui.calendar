import { h } from 'preact';

import { Week as WeekComponent } from '@src/components/view/week';
import CalendarCore from '@src/factory/calendarCore';

import type { Options } from '@t/options';

export default class Week extends CalendarCore {
  constructor(container: Element, options: Options = {}) {
    super(container, options);

    this.render();
  }

  protected getComponent() {
    return <WeekComponent />;
  }
}
