import { deepMergedCopy } from '@src/utils/object';

import { ViewType } from '@t/option';
import { CalendarStore, SetState } from '@t/store';

export type ViewSlice = {
  view: {
    currentView: ViewType;
  };
};

export type ViewDispatchers = {
  changeView: (view: ViewType) => void;
};

export function createViewSlice(initialView: ViewType = 'month'): ViewSlice {
  return {
    view: {
      currentView: initialView,
    },
  };
}

export function createViewDispatchers(set: SetState<CalendarStore>): ViewDispatchers {
  return {
    changeView: (nextView: ViewType) =>
      set((state) => ({
        view: deepMergedCopy(state.view, {
          currentView: nextView,
        }),
      })),
  };
}
