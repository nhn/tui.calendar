import type EventModel from '@src/model/eventModel';
import type EventUIModel from '@src/model/eventUIModel';
import type TZDate from '@src/time/date';
import type Collection from '@src/utils/collection';

import type { CalendarInfo } from '@t/options';

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

export type EventState = 'Busy' | 'Free';

export interface EventModelData {
  id?: string;
  calendarId?: string;
  title?: string;
  body?: string;
  start?: DateType;
  end?: DateType;
  goingDuration?: number;
  comingDuration?: number;
  isAllday?: boolean;
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
  state?: EventState;
  raw?: any;
}

export type BooleanKeyOfEventModelData =
  | 'isPrivate'
  | 'isAllday'
  | 'isPending'
  | 'isFocused'
  | 'isVisible'
  | 'isReadOnly';

export type TimeUnit = 'second' | 'minute' | 'hour' | 'date' | 'month' | 'year';
