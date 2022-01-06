type AnyFunc = (...args: any[]) => any;

type ExternalEventTypes = {
  selectDateTime: (/* @TODO */) => void;
  beforeCreateEvent: (/* @TODO */) => void;
  beforeUpdateEvent: (/* @TODO */) => void;
  [eventName: string]: AnyFunc;
};
