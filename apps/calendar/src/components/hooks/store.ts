import Store from '@src/store';
import { getActions, getState } from '@src/util/storeHelper';
import {
  CalendarActions,
  CalendarState,
  ModuleKeys,
  ModulePayloadActionMap,
  PayloadActions,
  PayloadModuleActions,
} from '@t/store';
import { createContext } from 'preact';
import { useContext, useMemo, useState } from 'preact/hooks';

let calendarActions: PayloadActions;

type StateType<S> = S extends keyof CalendarState ? CalendarState[S] : never;
type ActionType<A> = A extends keyof CalendarActions ? CalendarActions[A] : never;

export const StoreContext = createContext<CalendarState | null>(null);

export function useCreateStore(store: Store<CalendarState>) {
  const [state, setCalendarState] = useState(store.state);
  const { actions } = store;

  store.setStateUpdater(setCalendarState);
  calendarActions = actions;

  return state;
}

export function useActions(): ModulePayloadActionMap;
export function useActions(names: ModuleKeys[]): Partial<ModulePayloadActionMap>;
export function useActions<T extends ModuleKeys>(names: T): PayloadModuleActions<ActionType<T>>;
export function useActions(names?: ModuleKeys | ModuleKeys[]) {
  return useMemo(() => getActions(calendarActions, names), [names]);
}

export function useStore(): { state: CalendarState; actions: ModulePayloadActionMap };
export function useStore(
  names: ModuleKeys[]
): { state: Partial<CalendarState>; actions: Partial<ModulePayloadActionMap> };
export function useStore<T extends ModuleKeys>(
  names: T | boolean
): { state: StateType<T>; actions: PayloadModuleActions<ActionType<T>> };
export function useStore(names?: ModuleKeys | ModuleKeys[]) {
  const state = useContext(StoreContext);

  if (!state) {
    throw new Error('There is no state available.');
  }

  return {
    state: useMemo(() => getState(state, names), [state, names]),
    actions: useMemo(() => getActions(calendarActions, names), [names]),
  };
}
