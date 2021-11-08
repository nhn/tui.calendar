import { h } from 'preact';

import { Day as DayComponent } from '@src/components/view/day';
import CalendarControl from '@src/factory/calendarControl';

export default class Day extends CalendarControl {
  protected getComponent() {
    return <DayComponent />;
  }
}
