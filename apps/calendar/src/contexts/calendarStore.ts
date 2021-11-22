import { useCallback } from 'preact/hooks';

import { createCalendarDispatchers, createCalendarSlice } from '@src/slices/calendar';
import { createDndDispatchers, createDndSlice } from '@src/slices/dnd';
import { createOptionDispatchers, createOptionSlice } from '@src/slices/options';
import { createPopupDispatchers, createPopupSlice } from '@src/slices/popup';
import { createTemplateSlice } from '@src/slices/template';
import { createViewDispatchers, createViewSlice } from '@src/slices/view';
import {
  createWeekViewLayoutDispatchers,
  createWeekViewLayoutSlice,
} from '@src/slices/weekViewLayout';
import { createStoreContext } from '@src/store';
import { devtools } from '@src/store/devtool';
import { createStore } from '@src/store/internal';
import { pick } from '@src/utils/object';

import { Option } from '@t/option';
import { CalendarStore, Dispatchers, SetState, StoreCreator } from '@t/store';

// eslint-disable-next-line no-process-env
const isDevelopmentMode = process.env.NODE_ENV === 'development';
const storeCreator = (option: Option) => (set: SetState<CalendarStore>) => {
  return {
    ...createOptionSlice(option),
    ...createTemplateSlice(option.template),
    ...createPopupSlice(),
    ...createWeekViewLayoutSlice(),
    ...createCalendarSlice(option.calendars),
    ...createViewSlice(option.defaultView),
    ...createDndSlice(),
    dispatch: {
      option: createOptionDispatchers(set),
      popup: createPopupDispatchers(set),
      weekViewLayout: createWeekViewLayoutDispatchers(set),
      calendar: createCalendarDispatchers(set),
      view: createViewDispatchers(set),
      dnd: createDndDispatchers(set),
    },
  };
};

export const initCalendarStore = (option: Option = {}) =>
  createStore<CalendarStore>(
    isDevelopmentMode
      ? (devtools(storeCreator(option), {
          name: 'tui-calendar-store',
          serialize: { options: true },
        }) as StoreCreator<CalendarStore>)
      : storeCreator(option)
  );

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
