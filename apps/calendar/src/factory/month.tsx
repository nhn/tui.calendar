import { h } from 'preact';

import { Month as MonthComponent } from '@src/components/view/month';
import CalendarCore from '@src/factory/calendarCore';

import type { Options } from '@t/options';

export default class Month extends CalendarCore {
  constructor(container: Element, options: Options = {}) {
    super(container, options);

    this.render();
  }

  protected getComponent() {
    return <MonthComponent />;
  }

  /**
   * Hide the more view
   */
  hideMoreView() {
    const { hideSeeMorePopup } = this.getStoreDispatchers().popup;

    hideSeeMorePopup();
  }
}
