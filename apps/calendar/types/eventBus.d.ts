import EventModel from '@src/model/eventModel';

import { EventModelData } from '@t/events';

type AnyFunc = (...args: any[]) => any;

type ExternalEventTypes = {
  selectDateTime: (/* @TODO */) => void;
  beforeCreateEvent: (event: EventModelData) => void;
  beforeUpdateEvent: (event: EventModel, changes: EventModelData) => void;
  [eventName: string]: AnyFunc;
};
