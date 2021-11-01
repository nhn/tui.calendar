import { VNode } from 'preact';

import { IDS_OF_DAY } from '@src/controller/base';
import { EventHandler } from '@src/event';
import { ExternalEventName } from '@src/event/externalEventType';
import { InternalEventName } from '@src/event/internalEventType';
import EventModel, { EventCategory } from '@src/model/eventModel';
import { ThemeKeyValue } from '@src/theme/themeProps';
import TZDate from '@src/time/date';
import Collection from '@src/util/collection';

import { TuiDateConstructor } from '@toast-ui/date';

export type DateType = Date | string | number | TZDate;

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
  category?: EventCategory;
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
  state?: string;
  raw?: any;
}

export interface CalendarData {
  calendars: CalendarInfo[];
  events: Collection<EventModel>;
  idsOfDay: IDS_OF_DAY;
}

export interface AppContext {
  options: Option;
  calendarData: CalendarData;
  templates: Template;
  internalEvent: EventHandler<InternalEventName>;
  externalEvent: EventHandler<ExternalEventName>;
}

export interface GridUIModel {
  day: number;
  width: number;
  left: number;
}

export type TimeUnit = 'second' | 'minute' | 'hour' | 'date' | 'month' | 'year';

export interface TemplateTimeGridHourLabel {
  hidden: boolean;
  hour: number;
  minutes: number;
}

export interface TemplateCurrentTime {
  unit: TimeUnit;
  time: TZDate;
  format: string;
}

export interface TemplateMonthGrid {
  date: string;
  day: number;
  hiddenEventCount: number;
  isOtherMonth: boolean;
  isToday: boolean;
  month: number;
  ymd: string;
}

export interface TemplateMoreTitleDate {
  ymd: string;
  date: number;
  day: number;
}

export interface TemplateWeekDay {
  date: number;
  day: number;
  dayName: string;
  isToday: boolean;
  renderDate: string;
}

export interface TemplateMonthDayName {
  day: number;
  label: string;
}

export interface TemplateTimezone extends TimezoneConfig {
  timezoneOffset: number;
}

export type TemplateReturnType = string | VNode;

export interface Template {
  milestoneTitle: () => TemplateReturnType;
  milestone: (event: EventModel) => TemplateReturnType;
  taskTitle: () => TemplateReturnType;
  task: (event: EventModel) => TemplateReturnType;
  alldayTitle: () => TemplateReturnType;
  allday: (event: EventModel) => TemplateReturnType;
  time: (event: EventModel) => TemplateReturnType;
  goingDuration: (event: EventModel) => TemplateReturnType;
  comingDuration: (event: EventModel) => TemplateReturnType;
  monthMoreTitleDate: (moreTitle: TemplateMoreTitleDate) => TemplateReturnType;
  monthMoreClose: () => TemplateReturnType;
  monthGridHeader: (model: TemplateMonthGrid) => TemplateReturnType;
  monthGridHeaderExceed: (hiddenEvents: number) => TemplateReturnType;
  monthGridFooter: (model: TemplateMonthGrid) => TemplateReturnType;
  monthGridFooterExceed: (hiddenEvents: number) => TemplateReturnType;
  monthDayname: (model: TemplateMonthDayName) => TemplateReturnType;
  weekDayname: (model: TemplateWeekDay) => TemplateReturnType;
  weekGridFooterExceed: (hiddenEvents: number) => TemplateReturnType;
  dayGridTitle: (viewName: EventCategory) => TemplateReturnType;
  event: (event: EventModel) => TemplateReturnType;
  collapseBtnTitle: () => TemplateReturnType;
  timezoneDisplayLabel: (props: TemplateTimezone) => TemplateReturnType;
  timegridDisplayPrimaryTime: (props: TemplateCurrentTime) => TemplateReturnType;
  timegridDisplayTime: (props: TemplateCurrentTime) => TemplateReturnType;
  timegridCurrentTime: (props: TemplateCurrentTime) => TemplateReturnType;
  popupIsAllDay: () => TemplateReturnType;
  popupStateFree: () => TemplateReturnType;
  popupStateBusy: () => TemplateReturnType;
  titlePlaceholder: () => TemplateReturnType;
  locationPlaceholder: () => TemplateReturnType;
  startDatePlaceholder: () => TemplateReturnType;
  endDatePlaceholder: () => TemplateReturnType;
  popupSave: () => TemplateReturnType;
  popupUpdate: () => TemplateReturnType;
  popupDetailDate: (isAllDay: boolean, start: TZDate, end: TZDate) => TemplateReturnType;
  popupDetailLocation: (event: EventModel) => TemplateReturnType;
  popupDetailUser: (event: EventModel) => TemplateReturnType;
  popupDetailState: (event: EventModel) => TemplateReturnType;
  popupDetailRepeat: (event: EventModel) => TemplateReturnType;
  popupDetailBody: (event: EventModel) => TemplateReturnType;
  popupEdit: () => TemplateReturnType;
  popupDelete: () => TemplateReturnType;
}

export type TemplateConfig = Partial<Template>;

export interface WeekOption {
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

export interface MonthOption {
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
  eventFilter?: (event: Required<EventModelData>) => boolean;
}

export interface CustomTimezone {
  dateConstructor?: TuiDateConstructor; // YourCustomDate or LocalDate, UTCDate, MomentDate from @toast-ui/date;
  offset?: number; // If using YourCustomDate or MomentDate
  name?: string; // If using YourCustomDate or MomentDate
}

export interface TimezoneConfig {
  timezoneOffset?: number;
  timezoneName?: string;
  displayLabel?: string;
  tooltip?: string;
}

export interface CalendarColor {
  color?: string;
  bgColor?: string;
  dragBgColor?: string;
  borderColor?: string;
}

export interface CalendarInfo extends CalendarColor {
  id: string;
  name: string;
}

export type ViewType = 'month' | 'week' | 'day';

export interface Option {
  defaultView?: ViewType;
  taskView?: boolean | string[];
  eventView?: boolean | string[];
  theme?: ThemeKeyValue;
  template?: TemplateConfig;
  week?: WeekOption;
  month?: MonthOption;
  calendars?: CalendarInfo[];
  useCreationPopup?: boolean;
  useDetailPopup?: boolean;
  disableDblClick?: boolean;
  disableClick?: boolean;
  isReadOnly?: boolean;
  usageStatistics?: boolean;
  timezone?: CustomTimezone;
}
