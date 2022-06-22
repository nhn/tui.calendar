import type { EventObject, EventObjectWithDefaultValues } from '@t/events';

export type AnyFunc = (...args: any[]) => any;

export interface SelectDateTimeInfo {
  start: Date;
  end: Date;
  isAllday: boolean;
  nativeEvent?: MouseEvent;
  gridSelectionElements: Element[];
}

export interface UpdatedEventInfo {
  event: EventObjectWithDefaultValues;
  changes: EventObject;
}

export interface DayNameInfo {
  date: string;
}

export interface EventInfo {
  event: EventObjectWithDefaultValues;
  nativeEvent: MouseEvent;
}

export interface MoreEventsButton {
  date: Date;
  target: HTMLDivElement; // NOTE: More events popup element
}

export type ScrollBehaviorOptions = ScrollToOptions['behavior'];

export type ExternalEventTypes = {
  selectDateTime: (info: SelectDateTimeInfo) => void;
  beforeCreateEvent: (event: EventObject) => void;
  beforeUpdateEvent: (updatedEventInfo: UpdatedEventInfo) => void;
  beforeDeleteEvent: (event: EventObjectWithDefaultValues) => void;
  afterRenderEvent: (event: EventObjectWithDefaultValues) => void;
  clickDayName: (dayNameInfo: DayNameInfo) => void;
  clickEvent: (eventInfo: EventInfo) => void;
  clickMoreEventsBtn: (moreEventsBtnInfo: MoreEventsButton) => void;
  clickTimezonesCollapseBtn: (prevCollapsedState: boolean) => void;
  [eventName: string]: AnyFunc;
};

export type InternalEventTypes = {
  scrollToNow: (scrollBehavior?: ScrollBehaviorOptions) => void;
};
