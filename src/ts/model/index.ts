import { DateConstructor } from '@toast-ui/date';
import TZDate from '@src/time/date';
import Schedule, { ScheduleCategory } from '@src/model/schedule';
import { EventHandler } from '@src/event';
import { ExternalEventName } from '@src/event/externalEventType';
import { InternalEventName } from '@src/event/internalEventType';

import Theme from '@src/theme';
import { ThemeKeyValue } from '@src/theme/themeProps';
import { IDS_OF_DAY } from '@src/controller/base';
import Collection from '@src/util/collection';

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

export interface TemplateTimeGridHourLabel {
  hidden: boolean;
  hour: number;
  minutes: number;
}

export interface TemplateTimezoneHourMarker {
  hourmarker: TZDate;
  dateDifferenceSign: string;
  dateDifference: number;
}

export interface TemplateMonthGrid {
  date: string;
  day: number;
  hiddenSchedules: number;
  isOtherMonth: boolean;
  isToday: boolean;
  month: number;
  ymd: string;
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

export interface Template extends Record<string, Function> {
  milestoneTitle: () => string;
  milestone: (schedule: Schedule) => string;
  taskTitle: () => string;
  task: (schedule: Schedule) => string;
  alldayTitle: () => string;
  allday: (schedule: Schedule) => string;
  time: (schedule: Schedule) => string;
  goingDuration: (schedule: Schedule) => string;
  comingDuration: (schedule: Schedule) => string;
  monthMoreTitleDate: (date: string, dayname: string) => string;
  monthMoreClose: () => string;
  monthGridHeader: (model: TemplateMonthGrid) => string;
  monthGridHeaderExceed: (hiddenSchedules: number) => string;
  monthGridFooter: (model: TemplateMonthGrid) => string;
  monthGridFooterExceed: (hiddenSchedules: number) => string;
  monthDayname: (model: TemplateMonthDayName) => string;
  weekDayname: (model: TemplateWeekDay) => string;
  weekGridFooterExceed: (hiddenSchedules: number) => string;
  dayGridTitle: (viewName: ScheduleCategory) => string;
  schedule: (schedule: Schedule) => string;
  collapseBtnTitle: () => string;
  timezoneDisplayLabel: (timezoneOffset: number, displayLabel: string) => string;
  timegridDisplayPrimaryTime: (time: TemplateTimeGridHourLabel) => string;
  timegridDisplayTime: (time: TemplateTimeGridHourLabel) => string;
  timegridCurrentTime: (hourMarker: TemplateTimezoneHourMarker) => string;
  popupIsAllDay: () => string;
  popupStateFree: () => string;
  popupStateBusy: () => string;
  titlePlaceholder: () => string;
  locationPlaceholder: () => string;
  startDatePlaceholder: () => string;
  endDatePlaceholder: () => string;
  popupSave: () => string;
  popupUpdate: () => string;
  popupDetailDate: (isAllDay: boolean, start: TZDate, end: TZDate) => string;
  popupDetailLocation: (schedule: Schedule) => string;
  popupDetailUser: (schedule: Schedule) => string;
  popupDetailState: (schedule: Schedule) => string;
  popupDetailRepeat: (schedule: Schedule) => string;
  popupDetailBody: (schedule: Schedule) => string;
  popupEdit: () => string;
  popupDelete: () => string;
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
  scheduleFilter?: (schedule: ScheduleData) => boolean;
}

export interface CustomTimezone {
  dateConstructor?: DateConstructor; // YourCustomDate or LocalDate, UTCDate, MomentDate from @toast-ui/date;
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
