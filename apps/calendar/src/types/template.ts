import type { VNode } from 'preact';

import type TZDate from '@src/time/date';

import type { EventObjectWithDefaultValues, TimeUnit } from '@t/events';

export interface TemplateTimeGridHourLabel {
  hidden: boolean;
  hour: number;
  minutes: number;
}

export interface TemplateNow {
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

export interface TemplateWeekDayName {
  date: number;
  day: number;
  dayName: string;
  isToday: boolean;
  renderDate: string;
  dateInstance: TZDate;
}

export interface TemplateMonthDayName {
  day: number;
  label: string;
}

/**
 * If display label does not exist in the timezone options,
 * timezone offset based on timezone name will be passed
 */
export type TemplateTimezone =
  | { displayLabel: string; timezoneOffset: null }
  | { displayLabel: null; timezoneOffset: number };

export type TemplateReturnType = string | VNode<{ className: string }>;

export interface Template {
  milestoneTitle: () => TemplateReturnType;
  milestone: (event: EventObjectWithDefaultValues) => TemplateReturnType;
  taskTitle: () => TemplateReturnType;
  task: (event: EventObjectWithDefaultValues) => TemplateReturnType;
  alldayTitle: () => TemplateReturnType;
  allday: (event: EventObjectWithDefaultValues) => TemplateReturnType;
  time: (event: EventObjectWithDefaultValues) => TemplateReturnType;
  goingDuration: (event: EventObjectWithDefaultValues) => TemplateReturnType;
  comingDuration: (event: EventObjectWithDefaultValues) => TemplateReturnType;
  monthMoreTitleDate: (moreTitle: TemplateMoreTitleDate) => TemplateReturnType;
  monthMoreClose: () => TemplateReturnType;
  monthGridHeader: (cellData: TemplateMonthGrid) => TemplateReturnType;
  monthGridHeaderExceed: (hiddenEventsCount: number) => TemplateReturnType;
  monthGridFooter: (cellData: TemplateMonthGrid) => TemplateReturnType;
  monthGridFooterExceed: (hiddenEventsCount: number) => TemplateReturnType;
  monthDayName: (monthDayNameData: TemplateMonthDayName) => TemplateReturnType;
  weekDayName: (weekDayNameData: TemplateWeekDayName) => TemplateReturnType;
  weekGridFooterExceed: (hiddenEventsCount: number) => TemplateReturnType;
  collapseBtnTitle: () => TemplateReturnType;
  timezoneDisplayLabel: (props: TemplateTimezone) => TemplateReturnType;
  timegridDisplayPrimaryTime: (props: TemplateNow) => TemplateReturnType;
  timegridDisplayTime: (props: TemplateNow) => TemplateReturnType;
  timegridNowIndicatorLabel: (props: TemplateNow) => TemplateReturnType;
  popupIsAllday: () => TemplateReturnType;
  popupStateFree: () => TemplateReturnType;
  popupStateBusy: () => TemplateReturnType;
  titlePlaceholder: () => TemplateReturnType;
  locationPlaceholder: () => TemplateReturnType;
  startDatePlaceholder: () => TemplateReturnType;
  endDatePlaceholder: () => TemplateReturnType;
  popupSave: () => TemplateReturnType;
  popupUpdate: () => TemplateReturnType;
  popupDetailTitle: (event: EventObjectWithDefaultValues) => TemplateReturnType;
  popupDetailDate: (event: EventObjectWithDefaultValues) => TemplateReturnType;
  popupDetailLocation: (event: EventObjectWithDefaultValues) => TemplateReturnType;
  popupDetailAttendees: (event: EventObjectWithDefaultValues) => TemplateReturnType;
  popupDetailState: (event: EventObjectWithDefaultValues) => TemplateReturnType;
  popupDetailRecurrenceRule: (event: EventObjectWithDefaultValues) => TemplateReturnType;
  popupDetailBody: (event: EventObjectWithDefaultValues) => TemplateReturnType;
  popupEdit: () => TemplateReturnType;
  popupDelete: () => TemplateReturnType;
}

export type TemplateConfig = Partial<Template>;
