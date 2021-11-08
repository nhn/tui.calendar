import { h } from 'preact';

import MonthView from '@src/components/view/month';
import CalendarControl from '@src/factory/calendarControl';
import { Option } from '@src/model';

export default class Month extends CalendarControl {
  constructor(container: Element, options: Option = {}) {
    super(container, options);

    this._internalEvent.on('render', this.onRender, this);

    this.render();
  }

  protected getComponent() {
    return <MonthView />;
  }

  private onRender() {
    this.render();
  }

  /**
   * Hide the more view
   * @todo implement this
   */
  hideMoreView() {
    console.log('hideMoreView');
  }
}
