import { useCallback } from 'preact/hooks';

import { createCalendarDispatchers, createCalendarSlice } from '@src/slices/calendar';
import { createOptionDispatchers, createOptionSlice } from '@src/slices/options';
import { createPopupDispatchers, createPopupSlice } from '@src/slices/popup';
import { createTemplateSlice } from '@src/slices/template';
import {
  createWeekViewLayoutDispatchers,
  createWeekViewLayoutSlice,
} from '@src/slices/weekViewLayout';
import { createStoreContext } from '@src/store';
import { createStore } from '@src/store/internal';
import { pick } from '@src/util/utils';

import { CalendarStore, Dispatchers } from '@t/store';

export const initCalendarStore = () =>
  createStore<CalendarStore>((set) => {
    return {
      ...createOptionSlice(),
      ...createTemplateSlice(),
      ...createPopupSlice(),
      ...createWeekViewLayoutSlice(),
      ...createCalendarSlice(),
      dispatch: {
        option: createOptionDispatchers(set),
        popup: createPopupDispatchers(set),
        weekViewLayout: createWeekViewLayoutDispatchers(set),
        calendar: createCalendarDispatchers(set),
      },
    };
  });

const { StoreProvider, useStore, useInternalStore } = createStoreContext<CalendarStore>();
export { StoreProvider, useInternalStore, useStore };

export function useDispatch(): Dispatchers;
export function useDispatch<Group extends keyof Dispatchers>(group: Group): Dispatchers[Group];
export function useDispatch<Group extends keyof Dispatchers>(
  group: Group[]
): Pick<Dispatchers, Group>;
export function useDispatch<Group extends keyof Dispatchers>(group?: Group | Group[]) {
  return useStore(
    useCallback(
      (state) => {
        if (!group) {
          return state.dispatch;
        }
        if (Array.isArray(group)) {
          return pick(state.dispatch, ...group);
        }

        return state.dispatch[group];
      },
      [group]
    )
  );
}
