import { h } from 'preact';
import CalendarControl from '@src/factory/calendarControl';
import WeekView from '@src/components/view/weekView';

export default class Week extends CalendarControl {
  protected getComponent() {
    return <WeekView />;
  }
}
