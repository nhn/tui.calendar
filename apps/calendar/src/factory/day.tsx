import { h } from 'preact';

import DayView from '@src/components/view/dayView';
import CalendarControl from '@src/factory/calendarControl';

export default class Day extends CalendarControl {
  protected getComponent() {
    return <DayView />;
  }
}
