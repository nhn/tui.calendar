/**
 * @fileoverview Utility module for handling DOM events.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import MonthView from '@src/view/monthView';
import CalendarControl from '@src/factory/calendarControl';
import { Option } from '@src/model';

export default class Month extends CalendarControl {
  constructor(container: Element, options: Option = {}) {
    super(container, options);

    this._event.on('render', this.onRender, this);

    this.render();
  }

  protected getComponent() {
    return MonthView;
  }

  private onRender() {
    this.render();
  }
}
