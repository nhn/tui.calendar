import { useCallback } from 'preact/hooks';

import { createCalendarDispatchers, createCalendarSlice } from '@src/store/calendar';
import { createStoreContext } from '@src/store/context';
import { createStore } from '@src/store/internal';
import { createOptionDispatchers, createOptionSlice } from '@src/store/options';
import { createPopupDispatchers, createPopupSlice } from '@src/store/popup';
import { createTemplateSlice } from '@src/store/template';
import {
  createWeekViewLayoutDispatchers,
  createWeekViewLayoutSlice,
} from '@src/store/weekViewLayout';
import { pick } from '@src/util/utils';

import { CalendarStore, Dispatchers } from '@t/store';

export const initializeStore = () =>
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

export function topLevelStateSelector<Group extends keyof CalendarStore>(
  group: Group
): (state: CalendarStore) => CalendarStore[Group] {
  return (state: CalendarStore) => state[group];
}
