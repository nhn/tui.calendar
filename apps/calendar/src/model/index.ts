import { TuiDateConstructor } from '@toast-ui/date';
import TZDate from '@src/time/date';
import Schedule, { ScheduleCategory } from '@src/model/schedule';
import { EventHandler } from '@src/event';
import { ExternalEventName } from '@src/event/externalEventType';
import { InternalEventName } from '@src/event/internalEventType';

import Theme from '@src/theme';
import { ThemeKeyValue } from '@src/theme/themeProps';
import { IDS_OF_DAY } from '@src/controller/base';
import Collection from '@src/util/collection';
import { VNode } from 'preact';

export type DateType = Date | string | number | TZDate;

export interface ScheduleData {
  id?: string;
  calendarId?: string;
  title?: string;
  body?: string;
  start?: DateType;
  end?: DateType;
  goingDuration?: number;
  comingDuration?: number;
  isAllDay?: boolean;
  category?: ScheduleCategory;
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

export interface DataStore {
  calendars: CalendarData[];
  schedules: Collection<Schedule>;
  idsOfDay: IDS_OF_DAY;
}

export interface AppContext {
  options: Option;
  dataStore: DataStore;
  theme: Theme;
  templates: Template;
  internalEvent: EventHandler<InternalEventName>;
  externalEvent: EventHandler<ExternalEventName>;
}

export interface GridViewModel {
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

type TemplateReturnType = string | VNode;

export interface Template {
  milestoneTitle: () => TemplateReturnType;
  milestone: (schedule: Schedule) => TemplateReturnType;
  taskTitle: () => TemplateReturnType;
  task: (schedule: Schedule) => TemplateReturnType;
  alldayTitle: () => TemplateReturnType;
  allday: (schedule: Schedule) => TemplateReturnType;
  time: (schedule: Schedule) => TemplateReturnType;
  goingDuration: (schedule: Schedule) => TemplateReturnType;
  comingDuration: (schedule: Schedule) => TemplateReturnType;
  monthMoreTitleDate: (moreTitle: TemplateMoreTitleDate) => TemplateReturnType;
  monthMoreClose: () => TemplateReturnType;
  monthGridHeader: (model: TemplateMonthGrid) => TemplateReturnType;
  monthGridHeaderExceed: (hiddenSchedules: number) => TemplateReturnType;
  monthGridFooter: (model: TemplateMonthGrid) => TemplateReturnType;
  monthGridFooterExceed: (hiddenSchedules: number) => TemplateReturnType;
  monthDayname: (model: TemplateMonthDayName) => TemplateReturnType;
  weekDayname: (model: TemplateWeekDay) => TemplateReturnType;
  weekGridFooterExceed: (hiddenSchedules: number) => TemplateReturnType;
  dayGridTitle: (viewName: ScheduleCategory) => TemplateReturnType;
  schedule: (schedule: Schedule) => TemplateReturnType;
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
  popupDetailLocation: (schedule: Schedule) => TemplateReturnType;
  popupDetailUser: (schedule: Schedule) => TemplateReturnType;
  popupDetailState: (schedule: Schedule) => TemplateReturnType;
  popupDetailRepeat: (schedule: Schedule) => TemplateReturnType;
  popupDetailBody: (schedule: Schedule) => TemplateReturnType;
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
  visibleScheduleCount?: number;
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
  scheduleFilter?: (schedule: Required<ScheduleData>) => boolean;
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

export interface CalendarData extends CalendarColor {
  id: string;
  name: string;
}

export type ViewType = 'month' | 'week' | 'day';

export interface Option {
  defaultView?: ViewType;
  taskView?: boolean | string[];
  scheduleView?: boolean | string[];
  theme?: ThemeKeyValue;
  template?: TemplateConfig;
  week?: WeekOption;
  month?: MonthOption;
  calendars?: CalendarData[];
  useCreationPopup?: boolean;
  useDetailPopup?: boolean;
  disableDblClick?: boolean;
  disableClick?: boolean;
  isReadOnly?: boolean;
  usageStatistics?: boolean;
  timezone?: CustomTimezone;
}
