import { h } from 'preact';

import { Main } from '@src/components/view/main';
import { VIEW_TYPE } from '@src/constants/view';
import CalendarControl from '@src/factory/calendarControl';

import { Option, ViewType } from '@t/option';

// @TODO: move this function to a separate file such as util
function isValidViewType(viewType: string): viewType is ViewType {
  return !!Object.values(VIEW_TYPE).find((type) => type === viewType);
}

export default class Calendar extends CalendarControl {
  constructor(container: Element, option: Option = {}) {
    super(container, option);

    const { defaultView = 'month' } = option;

    if (!isValidViewType(defaultView)) {
      throw new Error(`Invalid view type: ${defaultView}`);
    }
  }

  protected getComponent() {
    return <Main />;
  }
}
