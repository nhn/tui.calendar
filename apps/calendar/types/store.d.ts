import { MonthOption, WeekOption } from '@src/model';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import { CalendarDispatchers, CalendarSlice } from '@src/store/calendar';
import { OptionDispatchers, OptionSlice } from '@src/store/options';
import { PopupDispatchers, PopupSlice } from '@src/store/popup';
import { TemplateSlice } from '@src/store/template';
import { WeekViewLayoutDispatchers, WeekViewLayoutSlice } from '@src/store/weekViewLayout';
import TZDate from '@src/time/date';

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

export type StateWithActions = Record<string, any>;
type PartialStateCreator<State extends StateWithActions, Key extends keyof State = keyof State> = (
  state: State
) => Pick<State, Key> | State;
export type StateSelector<State extends StateWithActions, SelectedState> = (
  state: State
) => SelectedState;
export type EqualityChecker<State> = (state: State, newState: State) => boolean;
export type StateListener<State> = (state: State, previousState: State) => void;
export type StateSliceListener<StateSlice> = (slice: StateSlice, previousSlice: StateSlice) => void;
export type SetState<State extends StateWithActions> = <Key extends keyof Omit<State, 'dispatch'>>(
  partialStateCreator: PartialStateCreator<Omit<State, 'dispatch'>, Key>
) => void;
export type GetState<State extends StateWithActions> = () => State;
type Unsubscribe = () => void;

export interface Subscribe<State extends StateWithActions> {
  (listener: StateListener<State>): Unsubscribe;

  <StateSlice>(
    listener: StateSliceListener<StateSlice>,
    selector?: StateSelector<State, StateSlice>,
    equalityFn?: EqualityChecker<StateSlice>
  ): Unsubscribe;
}

export interface InternalStoreAPI<State extends StateWithActions> {
  setState: SetState<State>;
  getState: GetState<State>;
  subscribe: Subscribe<State>;
  clearListeners: () => void;
  debug: () => void;
}

export type StoreCreator<State extends StateWithActions> = (set: SetState<State>) => State;

export type CalendarState = OptionSlice &
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

export type CalendarStore = CalendarState & {
  dispatch: Dispatchers;
};
