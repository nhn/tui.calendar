import type EventModel from '@src/model/eventModel';
import type EventUIModel from '@src/model/eventUIModel';
import type { CalendarDispatchers, CalendarSlice } from '@src/slices/calendar';
import type { DndDispatchers, DndSlice } from '@src/slices/dnd';
import type { GridSelectionDispatchers, GridSelectionSlice } from '@src/slices/gridSelection';
import type { WeekViewLayoutDispatchers, WeekViewLayoutSlice } from '@src/slices/layout';
import type { OptionsDispatchers, OptionsSlice } from '@src/slices/options';
import type { PopupDispatchers, PopupSlice } from '@src/slices/popup';
import type { TemplateDispatchers, TemplateSlice } from '@src/slices/template';
import type { ViewDispatchers, ViewSlice } from '@src/slices/view';
import type TZDate from '@src/time/date';

import type { EventState } from '@t/events';
import type { MonthOptions, WeekOptions } from '@t/options';

export type CalendarMonthOptions = Required<MonthOptions>;
export type CalendarWeekOptions = Required<WeekOptions>;

export type Rect = Pick<DOMRect, 'top' | 'left' | 'width' | 'height'>;

interface BasePopupParam {
  popupPosition?: PopupPosition;
  popupArrowPointPosition?: PopupArrowPointPosition;
  close?: () => void;
}

export type PopupParamMap = {
  seeMore: SeeMorePopupParam;
  form: EventFormPopupParam;
  detail: EventDetailPopupParam;
};

export interface SeeMorePopupParam extends BasePopupParam {
  date: TZDate;
  events: EventUIModel[];
}

export interface EventFormPopupParam extends BasePopupParam {
  isCreationPopup: boolean;
  event?: EventModel;
  title: string;
  location: string;
  start: TZDate;
  end: TZDate;
  isAllday: boolean;
  isPrivate: boolean;
  eventState?: EventState;
}

export interface EventDetailPopupParam extends BasePopupParam {
  event: EventModel;
  eventRect: Rect;
}

export type PopupPosition = {
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
};

export type PopupArrowPointPosition = {
  top: number;
  left: number;
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
  DndSlice &
  GridSelectionSlice;

export type Dispatchers = {
  options: OptionsDispatchers;
  popup: PopupDispatchers;
  weekViewLayout: WeekViewLayoutDispatchers;
  calendar: CalendarDispatchers;
  view: ViewDispatchers;
  dnd: DndDispatchers;
  gridSelection: GridSelectionDispatchers;
  template: TemplateDispatchers;
};

export type CalendarStore = CalendarState & {
  dispatch: Dispatchers;
};
