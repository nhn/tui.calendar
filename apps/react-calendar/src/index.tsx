import ToastUICalendar from '@toast-ui/calendar';
import type { ExternalEventTypes } from '@toast-ui/calendar/types/types/eventBus';
import type { EventObject } from '@toast-ui/calendar/types/types/events';
import type { Options } from '@toast-ui/calendar/types/types/options';
import React from 'react';

import { isEqual } from './isEqual';

type CalendarOptions = ConstructorParameters<typeof ToastUICalendar>[1];
type CalendarView = Required<Options>['defaultView'];

type CalendarExternalEventNames = Extract<keyof ExternalEventTypes, string>;
type ReactCalendarEventNames = `on${Capitalize<CalendarExternalEventNames>}`;
type ReactCalendarEventHandler = ExternalEventTypes[CalendarExternalEventNames];
type ReactCalendarExternalEvents = {
  [events in ReactCalendarEventNames]: ReactCalendarEventHandler;
};

type Props = CalendarOptions & {
  height: string;
  events?: EventObject[];
  view?: CalendarView;
} & ReactCalendarExternalEvents;

const optionsProps: (keyof Options)[] = [
  'useFormPopup',
  'useDetailPopup',
  'isReadOnly',
  'week',
  'month',
  'gridSelection',
  'usageStatistics',
  'eventFilter',
  'timezone',
  'template',
];

export default class Calendar extends React.Component<Props> {
  containerElementRef = React.createRef<HTMLDivElement>();

  calendarInstance: ToastUICalendar | null = null;

  static defaultProps = {
    height: '800px',
    view: 'week',
  };

  componentDidMount() {
    const { height, events = [], ...options } = this.props;
    const container = this.containerElementRef.current;

    if (container) {
      this.calendarInstance = new ToastUICalendar(container, options);

      container.style.height = height;
    }

    this.setEvents(events);
    this.bindEventHandlers(options);
  }

  shouldComponentUpdate(nextProps: Readonly<Props>) {
    const { calendars, height, events, theme, view } = this.props;
    const {
      calendars: nextCalendars,
      height: nextHeight,
      events: nextEvents,
      theme: nextTheme = {},
      view: nextView = 'week',
    } = nextProps;

    if (!isEqual(height, nextHeight) && this.containerElementRef.current) {
      this.containerElementRef.current.style.height = nextHeight;
    }

    if (!isEqual(calendars, nextCalendars)) {
      this.setCalendars(nextCalendars);
    }

    if (!isEqual(events, nextEvents)) {
      this.calendarInstance?.clear();
      this.setEvents(nextEvents);
    }

    if (!isEqual(theme, nextTheme)) {
      this.calendarInstance?.setTheme(nextTheme);
    }

    if (!isEqual(view, nextView)) {
      this.calendarInstance?.changeView(nextView);
    }

    const nextOptions = optionsProps.reduce((acc, key) => {
      if (!isEqual(this.props[key], nextProps[key])) {
        acc[key] = nextProps[key];
      }

      return acc;
    }, {} as Record<keyof Options, any>);

    this.calendarInstance?.setOptions(nextOptions);

    this.bindEventHandlers(nextProps);

    return false;
  }

  componentWillUnmount() {
    this.calendarInstance?.destroy();
  }

  setCalendars(calendars?: Options['calendars']) {
    if (calendars) {
      this.calendarInstance?.setCalendars(calendars);
    }
  }

  setEvents(events?: EventObject[]) {
    if (events) {
      this.calendarInstance?.createEvents(events);
    }
  }

  bindEventHandlers(externalEvents: ReactCalendarExternalEvents) {
    const eventNames = Object.keys(externalEvents).filter((key) => /^on[A-Z][a-zA-Z]+/.test(key));

    eventNames.forEach((key) => {
      const eventName = key[2].toLowerCase() + key.slice(3);

      if (this.calendarInstance) {
        this.calendarInstance.off(eventName);
        this.calendarInstance.on(eventName, externalEvents[key as ReactCalendarEventNames]);
      }
    });
  }

  getInstance() {
    return this.calendarInstance;
  }

  getRootElement() {
    return this.containerElementRef.current;
  }

  render() {
    return <div className="container" ref={this.containerElementRef} />;
  }
}
