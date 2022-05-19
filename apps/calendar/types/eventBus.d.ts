import type EventModel from '@src/model/eventModel';

import type { EventModelData } from '@t/events';

type AnyFunc = (...args: any[]) => any;

interface SelectDateTimeInfo {
  start: Date;
  end: Date;
  isAllday: boolean;
  nativeEvent?: MouseEvent;
}

interface UpdatedEventInfo {
  event: EventModel;
  changes: EventModelData;
}

interface DaynameInfo {
  date: string;
}

interface EventInfo {
  event: EventModel;
  nativeEvent: MouseEvent;
}

interface MoreEventsButton {
  date: Date;
  target: HTMLDivElement; // NOTE: More events popup element
}

type ExternalEventTypes = {
  selectDateTime: (info: SelectDateTimeInfo) => void;
  beforeCreateEvent: (event: EventModelData) => void;
  beforeUpdateEvent: (updatedEventInfo: UpdatedEventInfo) => void;
  beforeDeleteEvent: (event: EventModel) => void;
  clickDayname: (daynameInfo: DaynameInfo) => void;
  clickEvent: (eventInfo: EventInfo) => void;
  clickMoreEventsBtn: (moreEventsBtnInfo: MoreEventsButton) => void;
  clickTimezonesCollapseBtn: (prevCollapsedState: boolean) => void;
  [eventName: string]: AnyFunc;
};
