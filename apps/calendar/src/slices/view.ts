import produce from 'immer';

import TZDate from '@src/time/date';
import { toStartOfDay } from '@src/time/datetime';

import type { ViewType } from '@t/options';
import type { CalendarState, CalendarStore, SetState } from '@t/store';

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

export function createViewSlice(initialView: ViewType = 'week'): ViewSlice {
  const renderDate = new TZDate();
  renderDate.setHours(0, 0, 0, 0);

  return {
    view: {
      currentView: initialView,
      renderDate,
    },
  };
}

export function createViewDispatchers(set: SetState<CalendarStore>): ViewDispatchers {
  return {
    changeView: (nextView: ViewType) =>
      set(
        produce<CalendarState>((state) => {
          state.view.currentView = nextView;
        })
      ),
    setRenderDate: (date: TZDate) =>
      set(
        produce<CalendarState>((state) => {
          state.view.renderDate = toStartOfDay(date);
        })
      ),
  };
}
