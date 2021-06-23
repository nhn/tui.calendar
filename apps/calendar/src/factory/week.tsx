import { h } from 'preact';

import WeekView from '@src/components/view/weekView';
import CalendarControl from '@src/factory/calendarControl';

export default class Week extends CalendarControl {
  protected getComponent() {
    return <WeekView />;
  }
}
