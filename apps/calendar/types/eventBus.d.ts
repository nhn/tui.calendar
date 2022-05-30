import type { EventObject, EventObjectWithDefaultValues } from '@t/events';

type AnyFunc = (...args: any[]) => any;

interface SelectDateTimeInfo {
  start: Date;
  end: Date;
  isAllday: boolean;
  nativeEvent?: MouseEvent;
}

interface UpdatedEventInfo {
  event: EventObjectWithDefaultValues;
  changes: EventObject;
}

interface DaynameInfo {
  date: string;
}

interface EventInfo {
  event: EventObjectWithDefaultValues;
  nativeEvent: MouseEvent;
}

interface MoreEventsButton {
  date: Date;
  target: HTMLDivElement; // NOTE: More events popup element
}

type ExternalEventTypes = {
  selectDateTime: (info: SelectDateTimeInfo) => void;
  beforeCreateEvent: (event: EventObject) => void;
  beforeUpdateEvent: (updatedEventInfo: UpdatedEventInfo) => void;
  beforeDeleteEvent: (event: EventObjectWithDefaultValues) => void;
  afterRenderEvent: (event: EventObjectWithDefaultValues) => void;
  clickDayname: (daynameInfo: DaynameInfo) => void;
  clickEvent: (eventInfo: EventInfo) => void;
  clickMoreEventsBtn: (moreEventsBtnInfo: MoreEventsButton) => void;
  clickTimezonesCollapseBtn: (prevCollapsedState: boolean) => void;
  [eventName: string]: AnyFunc;
};
