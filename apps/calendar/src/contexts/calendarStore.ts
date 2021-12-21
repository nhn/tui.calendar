import { useCallback } from 'preact/hooks';

import { createCalendarDispatchers, createCalendarSlice } from '@src/slices/calendar';
import { createDndDispatchers, createDndSlice } from '@src/slices/dnd';
import { createWeekViewLayoutDispatchers, createWeekViewLayoutSlice } from '@src/slices/layout';
import { createOptionsDispatchers, createOptionsSlice } from '@src/slices/options';
import { createPopupDispatchers, createPopupSlice } from '@src/slices/popup';
import { createTemplateSlice } from '@src/slices/template';
import { createViewDispatchers, createViewSlice } from '@src/slices/view';
import { createStoreContext } from '@src/store';
import { devtools } from '@src/store/devtool';
import { createStore } from '@src/store/internal';
import { pick } from '@src/utils/object';

import { Options } from '@t/options';
import { CalendarStore, Dispatchers, SetState, StoreCreator } from '@t/store';

// eslint-disable-next-line no-process-env
const isDevelopmentMode = process.env.NODE_ENV === 'development';
const storeCreator = (options: Options) => (set: SetState<CalendarStore>) => {
  return {
    ...createOptionsSlice(options),
    ...createTemplateSlice(options.template),
    ...createPopupSlice(),
    ...createWeekViewLayoutSlice(),
    ...createCalendarSlice(options.calendars),
    ...createViewSlice(options.defaultView),
    ...createDndSlice(),
    dispatch: {
      options: createOptionsDispatchers(set),
      popup: createPopupDispatchers(set),
      weekViewLayout: createWeekViewLayoutDispatchers(set),
      calendar: createCalendarDispatchers(set),
      view: createViewDispatchers(set),
      dnd: createDndDispatchers(set),
    },
  };
};

export const initCalendarStore = (options: Options = {}) =>
  createStore<CalendarStore>(
    isDevelopmentMode
      ? (devtools(storeCreator(options), {
          name: 'tui-calendar-store',
          serialize: { options: true },
        }) as StoreCreator<CalendarStore>)
      : storeCreator(options)
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
