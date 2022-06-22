import { h } from 'preact';

import { Main } from '@src/components/view/main';
import { VIEW_TYPE } from '@src/constants/view';
import CalendarCore from '@src/factory/calendarCore';
import { InvalidViewTypeError } from '@src/utils/error';

import type { Options, ViewType } from '@t/options';

// TODO: move this function to a separate file such as util
function isValidViewType(viewType: string): viewType is ViewType {
  return !!Object.values(VIEW_TYPE).find((type) => type === viewType);
}

/**
 * Calendar class
 *
 * @class Calendar
 * @extends CalendarCore
 * @param {object} options - Calendar options. Check out {@link CalendarCore} for more information.
 */
export default class Calendar extends CalendarCore {
  constructor(container: Element | string, options: Options = {}) {
    super(container, options);

    const { defaultView = 'week' } = options;

    if (!isValidViewType(defaultView)) {
      throw new InvalidViewTypeError(defaultView);
    }

    this.render();
  }

  protected getComponent() {
    return <Main />;
  }
}
