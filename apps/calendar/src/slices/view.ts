import produce from 'immer';

import TZDate from '@src/time/date';

import { ViewType } from '@t/options';
import { CalendarState, CalendarStore, SetState } from '@t/store';

export type ViewSlice = {
  view: {
    currentView: ViewType;
    renderDate: TZDate;
  };
};

export type ViewDispatchers = {
  changeView: (view: ViewType) => void;
  setRenderDate: (date: TZDate) => void;
};

export function createViewSlice(initialView: ViewType = 'month'): ViewSlice {
  return {
    view: {
      currentView: initialView,
      renderDate: new TZDate(),
    },
  };
}

export function createViewDispatchers(set: SetState<CalendarStore>): ViewDispatchers {
  return {
    changeView: (nextView: ViewType) =>
      set(
        produce((state: CalendarState) => {
          state.view.currentView = nextView;
        })
      ),
    setRenderDate: (date: TZDate) =>
      set(
        produce((state: CalendarState) => {
          state.view.renderDate = date;
        })
      ),
  };
}
