import EventModel from '@src/model/eventModel';

import { EventModelData } from '@t/events';

type AnyFunc = (...args: any[]) => any;

interface SelectDateTimeInfo {
  start: Date;
  end: Date;
  isAllday: boolean;
  nativeEvent?: MouseEvent;
}

interface EventInfo {
  event: EventModel;
  nativeEvent: MouseEvent;
}

type ExternalEventTypes = {
  selectDateTime: (info: SelectDateTimeInfo) => void;
  beforeCreateEvent: (event: EventModelData) => void;
  beforeUpdateEvent: (event: EventModel, changes: EventModelData) => void;
  clickEvent: (eventInfo: EventInfo) => void;
  [eventName: string]: AnyFunc;
};
