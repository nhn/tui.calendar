import { MonthOption, WeekOption } from '@src/model';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import { calendarData, grid, options, template } from '@src/modules';
import { layerPopup, PopupType } from '@src/modules/layerPopup';
import Store from '@src/store';
import { CalendarDispatchers, CalendarSlice } from '@src/store/calendar';
import { OptionDispatchers, OptionSlice } from '@src/store/options';
import { PopupDispatchers, PopupSlice } from '@src/store/popup';
import { TemplateSlice } from '@src/store/template';
import { WeekViewLayoutDispatchers, WeekViewLayoutSlice } from '@src/store/weekViewLayout';
import TZDate from '@src/time/date';

import { Options } from './option';

type InitStoreData = {
  options: Options;
};

type ActionParam = {
  type: string;
  payload?: any;
};

interface Action {
  [key: string]: ActionFunc;
}

type ActionFunc = (state: any, payload: any, store: Store) => any;

type StateFunc = (initStoreData: InitStoreData) => any;
type State = Record<string, any> | StateFunc;

interface StoreModule {
  name: string;
  state: State;
  actions?: Action;
}

type GetStateType<T> = T extends (...args: any) => infer R ? R : T;

interface PayloadActionsType {
  [key: string]: (payload: any) => any;
}

type ModuleKeys = keyof ModuleMap;

type PayloadActions = Record<string, Record<string, (payload: any) => void>>;

type PayloadModuleActions<A> = {
  [N in keyof A]: A[N] extends (...args: any) => any
    ? undefined extends Parameters<A[N]>[1]
      ? () => void
      : (payload: Parameters<A[N]>[1]) => void
    : never;
};

type Reducer<S> = (state: S, action: (action: ActionParam) => void) => S;

declare global {
  interface ModuleMap {
    options: typeof options;
    template: typeof template;
    layerPopup: typeof layerPopup;
    calendarData: typeof calendarData;
    grid: typeof grid;
  }
}

type CalendarState = {
  [key in keyof ModuleMap]: 'state' extends keyof ModuleMap[key]
    ? GetStateType<ModuleMap[key]['state']>
    : never;
};

type CalendarActions = {
  [key in keyof ModuleMap]: 'actions' extends keyof ModuleMap[key] ? ModuleMap[key]['actions'] : {};
};

type ModulePayloadActionMap = {
  [key in keyof CalendarActions]: PayloadModuleActions<CalendarActions[key]>;
};

type FlattenActionMap = {
  [key in keyof CalendarActions]: GetFlattenActionMap<key>;
};

type ActionMap<Actions> = {
  [key in keyof Actions]: (payload: any) => void;
};

type ActionMapper<NAME extends ModuleKeys> = ActionMap<CalendarActions[NAME]>;

type GetFlattenActionMap<NAME extends ModuleKeys> = {
  [key in `${NAME}/${string & keyof ActionMapper<NAME>}`]: (payload: any) => void;
};

type ObjKeyof<T> = T extends object ? keyof T : never;
type KeyofKeyof<T> = ObjKeyof<T> | { [K in keyof T]: ObjKeyof<T[K]> }[keyof T];
type StripNever<T> = Pick<T, { [K in keyof T]: [T[K]] extends [never] ? never : K }[keyof T]>;
type Lookup<T, K> = T extends any ? (K extends keyof T ? T[K] : never) : never;
type Flatten<T> = T extends object
  ? StripNever<
      {
        [K in KeyofKeyof<T>]:
          | Exclude<K extends keyof T ? T[K] : never, object>
          | { [P in keyof T]: Lookup<T[P], K> }[keyof T];
      }
    >
  : T;

type FlattenActions = Flatten<FlattenActionMap>;

interface LayerPopupState {
  popupType: PopupType | null;
  param: PopupParamMap[PopupType];
}

type CalendarMonthOption = Required<MonthOption>;
type CalendarWeekOption = Required<WeekOption>;

interface OptionData {
  useCreationPopup: boolean;
  useDetailPopup: boolean;
  month: CalendarMonthOption;
  week: CalendarWeekOption;
}

interface BasePopupParam {
  popupRect: PopupRect;
  close?: () => void;
}

type PopupParamMap = {
  seeMore: SeeMorePopupParam;
  creation: CreationPopupParam;
  detail: DetailPopupParam;
};

interface SeeMorePopupParam extends BasePopupParam {
  date: TZDate;
  events: ScheduleViewModel[];
}

interface CreationPopupParam extends BasePopupParam {
  // @TODO: 팝업 작성 시 타입 정의
  start: TZDate;
  end: TZDate;
  isAllDay: boolean;
}

interface DetailPopupParam extends BasePopupParam {
  // @TODO: 팝업 작성 시 타입 정의
  date: TZDate | Date;
}

type PopupRect = {
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
};

interface PanelState {
  height: number;
}

interface LayoutState {
  [key: string]: PanelState;
}

/**
 * ==================================
 *  New State Management Module
 * ==================================
 */

export type StateWithActions = Record<string, any>;
type PartialStateCreator<
  _State extends StateWithActions,
  Key extends keyof _State = keyof _State
> = (state: _State) => Pick<_State, Key> | _State;
export type StateSelector<_State extends StateWithActions, SelectedState> = (
  state: _State
) => SelectedState;
export type EqualityChecker<_State> = (state: _State, newState: _State) => boolean;
export type StateListener<_State> = (state: _State, previousState: _State) => void;
export type StateSliceListener<StateSlice> = (slice: StateSlice, previousSlice: StateSlice) => void;
export type SetState<_State extends StateWithActions> = <
  Key extends keyof Omit<_State, 'dispatch'>
>(
  partialStateCreator: PartialStateCreator<Omit<_State, 'dispatch'>, Key>
) => void;
export type GetState<_State extends StateWithActions> = () => _State;
type Unsubscribe = () => void;

export interface Subscribe<_State extends StateWithActions> {
  (listener: StateListener<_State>): Unsubscribe;

  <StateSlice>(
    listener: StateSliceListener<StateSlice>,
    selector?: StateSelector<_State, StateSlice>,
    equalityFn?: EqualityChecker<StateSlice>
  ): Unsubscribe;
}

export type ClearListeners = () => void;

export interface InternalStoreAPI<_State extends StateWithActions> {
  setState: SetState<_State>;
  getState: GetState<_State>;
  subscribe: Subscribe<_State>;
  clearListeners: ClearListeners;
}

export type StoreCreator<_State extends StateWithActions> = (set: SetState<_State>) => _State;

export interface UseStore<_State extends StateWithActions> {
  (): _State;

  <StateSlice>(
    selector: StateSelector<_State, StateSlice>,
    equalityFn?: EqualityChecker<StateSlice>
  ): StateSlice;
}

export interface StoreHooks<_State extends StateWithActions> {
  useStore: UseStore<_State>;
  internalStore: InternalStoreAPI<_State>;
}

export type _CalendarState = OptionSlice &
  TemplateSlice &
  PopupSlice &
  WeekViewLayoutSlice &
  CalendarSlice;

export type Dispatchers = {
  option: OptionDispatchers;
  popup: PopupDispatchers;
  weekViewLayout: WeekViewLayoutDispatchers;
  calendar: CalendarDispatchers;
};

export type CalendarStore = _CalendarState & {
  dispatch: Dispatchers;
};
