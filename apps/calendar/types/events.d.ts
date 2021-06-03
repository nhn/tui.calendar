import TZDate from '@src/time/date';
import ScheduleViewModel from '@src/model/scheduleViewModel';

import type { PanelName, DayGridEventType } from '@t/panel';

export interface BaseEvent {
  start: TZDate;
  end: TZDate;
}

export type CollisionGroup = Array<number[]>;
export type Matrix<T> = Array<Array<T[]>>;
export type ScheduleMatrix2d<T> = Array<T[]>;

export type DayGridEventMatrix = Matrix<ScheduleViewModel>;
export type TimeGridEventMatrix = Record<string, Matrix<ScheduleViewModel>>;

export type EventGroupMap = Record<PanelName, DayGridEventMatrix | TimeGridEventMatrix>;

export type EventModelMap =
  | Record<string, DayGridEventMatrix | ScheduleViewModel[]>
  | ({
      [key in DayGridEventType]: DayGridEventMatrix;
    } & {
      time: ScheduleViewModel[];
    });
