import { TuiDateConstructor } from '@toast-ui/date';

export type DateType = string | Date | TZDate;
export type EventHandlerType = IEvents[keyof IEvents];
export type CustomEventType = keyof IEvents;

export interface IEventObject {
  eventData: EventModelData;
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
  eventData: EventModelData;
}

export interface IEvents {
  afterRenderEvent?: (eventObj: { eventData: EventModelData }) => void;
  beforeCreateEvent?: (eventData: EventModelData) => void;
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
  bgColor?: string;
  dragBgColor?: string;
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
  milestone?: (eventData: EventModelData) => string;
  taskTitle?: () => string;
  task?: (eventData: EventModelData) => string;
  alldayTitle?: () => string;
  allday?: (eventData: EventModelData) => string;
  time?: (eventData: EventModelData) => string;
  goingDuration?: (eventData: EventModelData) => string;
  comingDuration?: (eventData: EventModelData) => string;
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
  eventData?: (eventData: EventModelData) => string;
  collapseBtnTitle?: () => string;
  timezoneDisplayLabel?: (timezoneOffset: number, displayLabel: string) => string;
  timegridDisplayPrimayTime?: (time: ITimeGridHourLabel) => string;
  timegridDisplayPrimaryTime?: (time: ITimeGridHourLabel) => string;
  timegridDisplayTime?: (time: ITimeGridHourLabel) => string;
  timegridCurrentTime?: (hourMarker: ITimezoneHourMarker) => string;
  popupIsAllDay?: () => string;
  popupStateFree?: () => string;
  popupStateBusy?: () => string;
  titlePlaceholder?: () => string;
  locationPlaceholder?: () => string;
  startDatePlaceholder?: () => string;
  endDatePlaceholder?: () => string;
  popupSave?: () => string;
  popupUpdate?: () => string;
  popupDetailDate?: (isAllDay: boolean, start: DateType, end: DateType) => string;
  popupDetailLocation?: (eventData: EventModelData) => string;
  popupDetailUser?: (eventData: EventModelData) => string;
  popupDetailState?: (eventData: EventModelData) => string;
  popupDetailRepeat?: (eventData: EventModelData) => string;
  popupDetailBody?: (eventData: EventModelData) => string;
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
  eventFilter?: (eventData: EventModelData) => boolean;
}

export interface EventModelData {
  id?: string;
  calendarId?: string;
  title?: string;
  body?: string;
  start?: DateType;
  end?: DateType;
  goingDuration?: number;
  comingDuration?: number;
  isAllDay?: boolean;
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
  bgColor?: string;
  dragBgColor?: string;
  borderColor?: string;
  customStyle?: string;
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
  bgColor?: string;
  dragBgColor?: string;
  borderColor?: string;
}

export interface ITheme {
  [k: string]: string;
}

export interface IOptions {
  defaultView?: string;
  taskView?: boolean | string[];
  eventView?: boolean | string[];
  theme?: ITheme;
  template?: ITemplateConfig;
  week?: IWeekOptions;
  month?: IMonthOptions;
  calendars?: ICalendarInfo[];
  useCreationPopup?: boolean;
  useDetailPopup?: boolean;
  disableDblClick?: boolean;
  disableClick?: boolean;
  isReadOnly?: boolean;
  usageStatistics?: boolean;
  timezone?: ICustomTimezone;
}

export default class Calendar {
  constructor(container: Element | string, options?: IOptions);

  public changeView(newViewName: string, force?: boolean): void;

  public clear(immediately?: boolean): void;

  public createEvents(events: EventModelData[], silent?: boolean): void;

  public deleteEvent(eventId: string, calendarId: string, silent?: boolean): void;

  public destroy(): void;

  public getDate(): TZDate;

  public getDateRangeEnd(): TZDate;

  public getDateRangeStart(): TZDate;

  public getElement(eventId: string, calendarId: string): Element;

  public getOptions(): IOptions;

  public getEvent(eventId: string, calendarId: string): EventModelData;

  public getViewName(): string;

  public hideMoreView(): void;

  public next(): void;

  public openCreationPopup(eventData: EventModelData): void;

  public prev(): void;

  public render(immediately?: boolean): void;

  public scrollToNow(): void;

  public setCalendarColor(calendarId: string, options: ICalendarColor, silent?: boolean): void;

  public setCalendars(calendars: ICalendarInfo[]): void;

  public setDate(date: Date | string): void;

  public setOptions(options: IOptions, silent?: boolean): void;

  public setTheme(theme: ITheme): string[];

  public today(): void;

  public toggleEvents(calendarId: string, toHide: boolean, render?: boolean): void;

  public toggleEventView(enabled: boolean): void;

  public toggleTaskView(enabled: boolean): void;

  public updateEvent(
    eventId: string,
    calendarId: string,
    eventData: EventModelData,
    silent?: boolean
  ): void;

  public off(
    eventName?: string | object | EventHandlerType,
    handler?: EventHandlerType | string
  ): void;

  public on(event: CustomEventType | IEvents, handler?: EventHandlerType): void;
}
