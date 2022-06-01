import { useCallback } from 'preact/hooks';

import { createCalendarDispatchers, createCalendarSlice } from '@src/slices/calendar';
import { createDndDispatchers, createDndSlice } from '@src/slices/dnd';
import {
  createGridSelectionDispatchers,
  createGridSelectionSlice,
} from '@src/slices/gridSelection';
import { createWeekViewLayoutDispatchers, createWeekViewLayoutSlice } from '@src/slices/layout';
import { createOptionsDispatchers, createOptionsSlice } from '@src/slices/options';
import { createPopupDispatchers, createPopupSlice } from '@src/slices/popup';
import { createTemplateDispatchers, createTemplateSlice } from '@src/slices/template';
import { createViewDispatchers, createViewSlice } from '@src/slices/view';
import { createStoreContext } from '@src/store';
import { createStore } from '@src/store/internal';

import type { Options } from '@t/options';
import type { CalendarStore, Dispatchers, SetState } from '@t/store';

const storeCreator = (options: Options) => (set: SetState<CalendarStore>) => {
  return {
    ...createOptionsSlice(options),
    ...createTemplateSlice(options.template),
    ...createPopupSlice(),
    ...createWeekViewLayoutSlice(),
    ...createCalendarSlice(options.calendars),
    ...createViewSlice(options.defaultView),
    ...createDndSlice(),
    ...createGridSelectionSlice(),
    dispatch: {
      options: createOptionsDispatchers(set),
      popup: createPopupDispatchers(set),
      weekViewLayout: createWeekViewLayoutDispatchers(set),
      calendar: createCalendarDispatchers(set),
      view: createViewDispatchers(set),
      dnd: createDndDispatchers(set),
      gridSelection: createGridSelectionDispatchers(set),
      template: createTemplateDispatchers(set),
    },
  };
};

export const initCalendarStore = (options: Options = {}) =>
  createStore<CalendarStore>(storeCreator(options));

const { StoreProvider, useStore, useInternalStore } = createStoreContext<CalendarStore>();
export { StoreProvider, useInternalStore, useStore };

export function useDispatch(): Dispatchers;
export function useDispatch<Group extends keyof Dispatchers>(group: Group): Dispatchers[Group];
export function useDispatch<Group extends keyof Dispatchers>(group?: Group) {
  return useStore(
    useCallback(
      (state) => {
        if (!group) {
          return state.dispatch;
        }

        return state.dispatch[group];
      },
      [group]
    )
  );
}
