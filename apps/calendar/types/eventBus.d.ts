import { EventModelData } from '@t/events';

type AnyFunc = (...args: any[]) => any;

type ExternalEventTypes = {
  selectDateTime: (/* @TODO */) => void;
  beforeCreateEvent: (event: EventModelData) => void;
  beforeUpdateEvent: (/* @TODO */) => void;
  [eventName: string]: AnyFunc;
};
