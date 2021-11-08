import { h } from 'preact';

import WeekView from '@src/components/view/week';
import CalendarControl from '@src/factory/calendarControl';
import { Option } from '@src/model';

export default class Week extends CalendarControl {
  constructor(container: Element, options: Option = {}) {
    super(container, options);
  }

  protected getComponent() {
    return <WeekView />;
  }
}
