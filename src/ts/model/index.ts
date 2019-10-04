import TZDate from '@src/time/date';
import { EventHandler } from '@src/event';
import { ExternalEventName } from '@src/event/externalEventType';
import { InternalEventName } from '@src/event/internalEventType';

import Theme from '@src/theme';
import { ThemeKeyValue } from '@src/theme/themeProps';

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
  state?: string;
  raw?: any;
}

export interface AppContext {
  options: Option;
  theme: Theme;
  templates: Record<string, Function>;
  event: EventHandler<InternalEventName>;
  outerEvent: EventHandler<ExternalEventName>;
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

export interface TemplateConfig {
  milestoneTitle?: () => string;
  milestone?: (schedule: ScheduleData) => string;
  taskTitle?: () => string;
  task?: (schedule: ScheduleData) => string;
  alldayTitle?: () => string;
  allday?: (schedule: ScheduleData) => string;
  time?: (schedule: ScheduleData) => string;
  goingDuration?: (schedule: ScheduleData) => string;
  comingDuration?: (schedule: ScheduleData) => string;
  monthMoreTitleDate?: (date: string, dayname: string) => string;
  monthMoreClose?: () => string;
  monthGridHeader?: (model: TemplateMonthGrid) => string;
  monthGridHeaderExceed?: (hiddenSchedules: number) => string;
  monthGridFooter?: (model: TemplateMonthGrid) => string;
  monthGridFooterExceed?: (hiddenSchedules: number) => string;
  monthDayname?: (model: TemplateMonthDayName) => string;
  weekDayname?: (model: TemplateWeekDay) => string;
  weekGridFooterExceed?: (hiddenSchedules: number) => string;
  dayGridTitle?: (viewName: string) => string;
  schedule?: (schedule: ScheduleData) => string;
  collapseBtnTitle?: () => string;
  timezoneDisplayLabel?: (timezoneOffset: number, displayLabel: string) => string;
  timegridDisplayPrimayTime?: (time: TemplateTimeGridHourLabel) => string;
  timegridDisplayPrimaryTime?: (time: TemplateTimeGridHourLabel) => string;
  timegridDisplayTime?: (time: TemplateTimeGridHourLabel) => string;
  timegridCurrentTime?: (hourMarker: TemplateTimezoneHourMarker) => string;
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
  popupDetailLocation?: (schedule: ScheduleData) => string;
  popupDetailUser?: (schedule: ScheduleData) => string;
  popupDetailState?: (schedule: ScheduleData) => string;
  popupDetailRepeat?: (schedule: ScheduleData) => string;
  popupDetailBody?: (schedule: ScheduleData) => string;
  popupEdit?: () => string;
  popupDelete?: () => string;
}

export interface WeekOption {
  startDayOfWeek?: number;
  daynames?: string[];
  narrowWeekend?: boolean;
  workweek?: boolean;
  showTimezoneCollapseButton?: boolean;
  timezonesCollapsed?: boolean;
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

export interface TimezoneConfig {
  timezoneOffset?: number;
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

export interface Option {
  defaultView?: string;
  taskView?: boolean | string[];
  scheduleView?: boolean | string[];
  theme?: ThemeKeyValue;
  template?: TemplateConfig;
  week?: WeekOption;
  month?: MonthOption;
  calendars?: CalendarData[];
  useCreationPopup?: boolean;
  useDetailPopup?: boolean;
  timezones?: TimezoneConfig[];
  disableDblClick?: boolean;
  disableClick?: boolean;
  isReadOnly?: boolean;
  usageStatistics?: boolean;
}
