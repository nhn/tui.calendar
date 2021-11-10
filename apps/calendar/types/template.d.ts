import { VNode } from 'preact';

import EventModel from '@src/model/eventModel';
import TZDate from '@src/time/date';

import { EventCategory, TimeUnit } from '@t/events';
import { TimezoneConfig } from '@t/option';

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
