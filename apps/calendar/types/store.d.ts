import EventModel from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';
import { CalendarDispatchers, CalendarSlice } from '@src/slices/calendar';
import { DndDispatchers, DndSlice } from '@src/slices/dnd';
import { OptionsDispatchers, OptionsSlice } from '@src/slices/options';
import { PopupDispatchers, PopupSlice } from '@src/slices/popup';
import { TemplateSlice } from '@src/slices/template';
import { ViewDispatchers, ViewSlice } from '@src/slices/view';
import { WeekViewLayoutDispatchers, WeekViewLayoutSlice } from '@src/slices/weekViewLayout';
import TZDate from '@src/time/date';

import type { EventState } from '@t/events';
import type { MonthOptions, WeekOptions } from '@t/options';

type CalendarMonthOptions = Required<MonthOptions>;
type CalendarWeekOptions = Required<WeekOptions>;

interface OptionsData {
  useCreationPopup: boolean;
  useDetailPopup: boolean;
  month: CalendarMonthOptions;
  week: CalendarWeekOptions;
}

interface BasePopupParam {
  popupPosition: PopupPosition;
  close?: () => void;
}

type PopupParamMap = {
  seeMore: SeeMorePopupParam;
  form: EventFormPopupParam;
  detail: EventDetailPopupParam;
};

interface SeeMorePopupParam extends BasePopupParam {
  date: TZDate;
  events: EventUIModel[];
}

interface EventFormPopupParam extends BasePopupParam {
  // @TODO: 팝업 작성 시 타입 정의
  start: TZDate;
  end: TZDate;
  isAllday: boolean;
  eventState?: EventState;
}

interface EventDetailPopupParam extends BasePopupParam {
  event: EventModel;
}

type PopupPosition = {
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
}

export type StoreCreator<State extends StateWithActions> = (
  set: SetState<State>,
  get: GetState<State>,
  api: InternalStoreAPI<State>
) => State;

export type CalendarState = OptionsSlice &
  TemplateSlice &
  PopupSlice &
  WeekViewLayoutSlice &
  CalendarSlice &
  ViewSlice &
  DndSlice;

export type Dispatchers = {
  options: OptionsDispatchers;
  popup: PopupDispatchers;
  weekViewLayout: WeekViewLayoutDispatchers;
  calendar: CalendarDispatchers;
  view: ViewDispatchers;
  dnd: DndDispatchers;
};

export type CalendarStore = CalendarState & {
  dispatch: Dispatchers;
};
