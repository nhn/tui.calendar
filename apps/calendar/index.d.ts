import type { DateInterface, TuiDateConstructor } from '@toast-ui/date';

import type { StyleProp } from './types/components/common';
import type { TimezoneConfig } from './types/options';

export type ViewType = 'month' | 'week' | 'day';
export type DateType = string | Date | TZDate;
export type EventHandlerType = IEvents[keyof IEvents];
export type CustomEventType = keyof IEvents;

export interface IEventObject {
  eventData: EventObject;
  end: TZDate;
  start: TZDate;
  calendar?: ICalendarInfo;
  triggerEventName?: 'click' | 'dblclick';
}

export interface IEventDateObject {
  date: string;
}

export interface IEventMoreObject {
  date: TZDate;
  target: Element;
}

export interface IEventEventObject {
  calendar: ICalendarInfo;
  event: MouseEvent;
  eventData: EventObject;
}

export interface IEvents {
  afterRenderEvent?: (eventObj: { eventData: EventObject }) => void;
  beforeCreateEvent?: (eventData: EventObject) => void;
  beforeDeleteEvent?: (eventObj: IEventEventObject) => void;
  beforeUpdateEvent?: (eventObj: IEventObject) => void;
  clickDayname?: (eventObj: IEventDateObject) => void;
  clickMore?: (eventObj: IEventMoreObject) => void;
  clickEvent?: (eventObj: IEventEventObject) => void;
  clickTimezonesCollapseBtn?: (timezonesCollapsed: boolean) => void;
}

export class TZDate {
  public getTime(): number;

  public toDate(): Date;

  public toUTCString(): string;
}

export interface ICalendarColor {
  color?: string;
  backgroundColor?: string;
  dragBackgroundColor?: string;
  borderColor?: string;
}

export interface ITimeGridHourLabel {
  hidden: boolean;
  hour: number;
  minutes: number;
}

export interface ITimezoneHourMarker {
  hourmarker: TZDate;
  dateDifferenceSign: string;
  dateDifference: number;
}

export interface IGridDateModel {
  date: string;
  day: number;
  hiddenEvents: number;
  isOtherMonth: boolean;
  isToday: boolean;
  month: number;
  ymd: string;
}

export interface IWeekDayNameInfo {
  date: number;
  day: number;
  dayName: string;
  isToday: boolean;
  renderDate: string;
}

export interface IMonthDayNameInfo {
  day: number;
  label: string;
}

export interface ITemplateConfig {
  milestoneTitle?: () => string;
  milestone?: (eventData: EventObject) => string;
  taskTitle?: () => string;
  task?: (eventData: EventObject) => string;
  alldayTitle?: () => string;
  allday?: (eventData: EventObject) => string;
  time?: (eventData: EventObject) => string;
  goingDuration?: (eventData: EventObject) => string;
  comingDuration?: (eventData: EventObject) => string;
  monthMoreTitleDate?: (date: string, dayname: string) => string;
  monthMoreClose?: () => string;
  monthGridHeader?: (model: IGridDateModel) => string;
  monthGridHeaderExceed?: (hiddenEvents: number) => string;
  monthGridFooter?: (model: IGridDateModel) => string;
  monthGridFooterExceed?: (hiddenEvents: number) => string;
  monthDayname?: (model: IMonthDayNameInfo) => string;
  weekDayname?: (model: IWeekDayNameInfo) => string;
  weekGridFooterExceed?: (hiddenEvents: number) => string;
  dayGridTitle?: (viewName: string) => string;
  eventData?: (eventData: EventObject) => string;
  collapseBtnTitle?: () => string;
  timezoneDisplayLabel?: (timezoneOffset: number, displayLabel: string) => string;
  timegridDisplayPrimaryTime?: (time: ITimeGridHourLabel) => string;
  timegridDisplayTime?: (time: ITimeGridHourLabel) => string;
  timegridCurrentTime?: (hourMarker: ITimezoneHourMarker) => string;
  popupIsAllday?: () => string;
  popupStateFree?: () => string;
  popupStateBusy?: () => string;
  titlePlaceholder?: () => string;
  locationPlaceholder?: () => string;
  startDatePlaceholder?: () => string;
  endDatePlaceholder?: () => string;
  popupSave?: () => string;
  popupUpdate?: () => string;
  popupDetailDate?: (isAllday: boolean, start: DateType, end: DateType) => string;
  popupDetailLocation?: (eventData: EventObject) => string;
  popupDetailUser?: (eventData: EventObject) => string;
  popupDetailState?: (eventData: EventObject) => string;
  popupDetailRepeat?: (eventData: EventObject) => string;
  popupDetailBody?: (eventData: EventObject) => string;
  popupEdit?: () => string;
  popupDelete?: () => string;
}

export interface IWeekOptions {
  startDayOfWeek?: number;
  daynames?: string[];
  narrowWeekend?: boolean;
  workweek?: boolean;
  showTimezoneCollapseButton?: boolean;
  timezonesCollapsed?: boolean;
  timezones?: TimezoneConfig[];
  hourStart?: number;
  hourEnd?: number;
  eventView?: boolean | string[];
  taskView?: boolean | string[];
}

export interface IMonthOptions {
  daynames?: string[];
  startDayOfWeek?: number;
  narrowWeekend?: boolean;
  visibleWeeksCount?: number;
  isAlways6Week?: boolean;
  workweek?: boolean;
  visibleEventCount?: number;
  moreLayerSize?: {
    width?: string | null;
    height?: string | null;
  };
  grid?: {
    header?: {
      height?: number;
    };
    footer?: {
      height?: number;
    };
  };
}

export interface IGridSelectionOptions {
  enableDblClick?: boolean;
  enableClick?: boolean;
}

export interface EventObject {
  id?: string;
  calendarId?: string;
  title?: string;
  body?: string;
  start?: DateType;
  end?: DateType;
  goingDuration?: number;
  comingDuration?: number;
  isAllday?: boolean;
  category?: string;
  dueDateClass?: string;
  location?: string;
  attendees?: string[];
  recurrenceRule?: string;
  isPending?: boolean;
  isFocused?: boolean;
  isVisible?: boolean;
  isReadOnly?: boolean;
  isPrivate?: boolean;
  color?: string;
  backgroundColor?: string;
  dragBackgroundColor?: string;
  borderColor?: string;
  customStyle?: StyleProp;
  raw?: {
    [propName: string]: string | number | boolean | object | null;
  };
  state?: string;
}

export interface ICustomTimezone {
  dateConstructor?: TuiDateConstructor; // YourCustomDate or LocalDate, UTCDate, MomentDate from @toast-ui/date;
  offset?: number; // If using YourCustomDate or MomentDate
  name?: string; // If using YourCustomDate or MomentDate
}

export interface ITimezone {
  timezoneOffset?: number;
  timezoneName?: string;
  displayLabel?: string;
  tooltip?: string;
}

export interface ICalendarInfo {
  id: string;
  name: string;
  color?: string;
  backgroundColor?: string;
  dragBackgroundColor?: string;
  borderColor?: string;
}

export interface ITheme {
  [k: string]: string;
}

export interface IOptions {
  defaultView?: string;
  theme?: ITheme;
  template?: ITemplateConfig;
  week?: IWeekOptions;
  month?: IMonthOptions;
  calendars?: ICalendarInfo[];
  useCreationPopup?: boolean;
  useDetailPopup?: boolean;
  gridSelection?: boolean | IGridSelectionOptions;
  isReadOnly?: boolean;
  usageStatistics?: boolean;
  timezone?: ICustomTimezone;
  eventFilter?: (event: EventObject) => boolean;
}

export default class Calendar {
  constructor(container: Element | string, options?: IOptions);

  public changeView(viewName: ViewType): void;

  public clear(): void;

  public createEvents(events: EventObject[]): void;

  public deleteEvent(eventId: string, calendarId: string): void;

  public destroy(): void;

  public getDate(): TZDate;

  public getDateRangeEnd(): TZDate;

  public getDateRangeStart(): TZDate;

  public getDateInterface(): DateInterface;

  public getElement(eventId: string, calendarId: string): Element;

  public getOptions(): IOptions;

  public getEvent(eventId: string, calendarId: string): EventObject;

  public getViewName(): ViewType;

  public hideMoreView(): void;

  public next(): void;

  public openFormPopup(event: EventObject): void;

  public prev(): void;

  public render(): Calendar;

  public renderToString(): string;

  public scrollToNow(): void;

  public setCalendarColor(calendarId: string, colorOptions: ICalendarColor): void;

  public setCalendars(calendars: ICalendarInfo[]): void;

  public setDate(date: DateType): void;

  public setOptions(options: IOptions): void;

  public setTheme(theme: ITheme): string[];

  public today(): void;

  public setCalendarVisibility(calendarId: string | string[], isVisible: boolean): void;

  public updateEvent(eventId: string, calendarId: string, changes: EventObject): void;

  public off(
    eventName?: string | object | EventHandlerType,
    handler?: EventHandlerType | string
  ): void;

  public on(event: CustomEventType | IEvents, handler?: EventHandlerType): void;
}
