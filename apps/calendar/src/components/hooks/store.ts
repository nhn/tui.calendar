import { createContext } from 'preact';
import { useContext, useMemo, useState } from 'preact/hooks';

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

let calendarActions: PayloadActions;

type StateType<NAME> = NAME extends keyof CalendarState ? CalendarState[NAME] : never;
type ActionType<NAME> = NAME extends keyof CalendarActions ? CalendarActions[NAME] : never;

export const StoreContext = createContext<CalendarState | null>(null);

export function useCalendarState(store: Store<CalendarState>) {
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

  return {
    state: useMemo(() => getState(state ?? {}, names), [state, names]),
    actions: useMemo(() => getActions(calendarActions, names), [names]),
  };
}
