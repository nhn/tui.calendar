import EventModel from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import Collection from '@src/util/collection';

import { CalendarInfo } from '@t/option';

export type Matrix<T> = T[][];
export type Matrix3d<T> = Matrix<T>[];
export type CollisionGroup = Matrix<number>;

export type DayGridEventMatrix = Matrix3d<EventUIModel>;
export type TimeGridEventMatrix = Record<string, Matrix3d<EventUIModel>>;

export type EventModelMap = {
  milestone: EventUIModel[];
  allday: EventUIModel[];
  task: EventUIModel[];
  time: EventUIModel[];
};

export type EventGroupMap = Record<keyof EventModelMap, DayGridEventMatrix | TimeGridEventMatrix>;

export type DateType = Date | string | number | TZDate;

export type IDS_OF_DAY = Record<string, number[]>;

export interface CalendarData {
  calendars: CalendarInfo[];
  events: Collection<EventModel>;
  idsOfDay: IDS_OF_DAY;
}

export type EventCategory = 'milestone' | 'task' | 'allday' | 'time' | 'background';

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

export type TimeUnit = 'second' | 'minute' | 'hour' | 'date' | 'month' | 'year';
