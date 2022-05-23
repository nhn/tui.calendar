import type { VNode } from 'preact';

import type EventModel from '@src/model/eventModel';
import type TZDate from '@src/time/date';

import type { EventCategory, TimeUnit } from '@t/events';
import type { TimezoneConfig } from '@t/options';

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

export interface TemplateTimezone extends TimezoneConfig {
  timezoneOffset: number;
}

export type TemplateReturnType = string | VNode<{ className: string }>;

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
  monthGridHeader: (cellData: TemplateMonthGrid) => TemplateReturnType;
  monthGridHeaderExceed: (hiddenEventsCount: number) => TemplateReturnType;
  monthGridFooter: (cellData: TemplateMonthGrid) => TemplateReturnType;
  monthGridFooterExceed: (hiddenEventsCount: number) => TemplateReturnType;
  monthDayname: (monthDaynameData: TemplateMonthDayName) => TemplateReturnType;
  weekDayname: (weekDaynameData: TemplateWeekDayName) => TemplateReturnType;
  weekGridFooterExceed: (hiddenEventsCount: number) => TemplateReturnType;
  dayGridTitle: (viewName: EventCategory) => TemplateReturnType;
  event: (event: EventModel) => TemplateReturnType;
  collapseBtnTitle: () => TemplateReturnType;
  timezoneDisplayLabel: (props: TemplateTimezone) => TemplateReturnType;
  timegridDisplayPrimaryTime: (props: TemplateCurrentTime) => TemplateReturnType;
  timegridDisplayTime: (props: TemplateCurrentTime) => TemplateReturnType;
  timegridCurrentTime: (props: TemplateCurrentTime) => TemplateReturnType;
  popupIsAllday: () => TemplateReturnType;
  popupStateFree: () => TemplateReturnType;
  popupStateBusy: () => TemplateReturnType;
  titlePlaceholder: () => TemplateReturnType;
  locationPlaceholder: () => TemplateReturnType;
  startDatePlaceholder: () => TemplateReturnType;
  endDatePlaceholder: () => TemplateReturnType;
  popupSave: () => TemplateReturnType;
  popupUpdate: () => TemplateReturnType;
  popupDetailTitle: (event: EventModel) => TemplateReturnType;
  popupDetailDate: (event: EventModel) => TemplateReturnType;
  popupDetailLocation: (event: EventModel) => TemplateReturnType;
  popupDetailAttendees: (event: EventModel) => TemplateReturnType;
  popupDetailState: (event: EventModel) => TemplateReturnType;
  popupDetailRecurrenceRule: (event: EventModel) => TemplateReturnType;
  popupDetailBody: (event: EventModel) => TemplateReturnType;
  popupEdit: () => TemplateReturnType;
  popupDelete: () => TemplateReturnType;
}

export type TemplateConfig = Partial<Template>;
