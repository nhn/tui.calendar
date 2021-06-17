import TZDate from '@src/time/date';
import ScheduleViewModel from '@src/model/scheduleViewModel';

export interface BaseEvent {
  start: TZDate;
  end: TZDate;
}

export type Matrix<T> = Array<T[]>;
export type Matrix3d<T> = Array<Matrix<T>>;
export type CollisionGroup = Matrix<number>;

export type DayGridEventMatrix = Matrix3d<ScheduleViewModel>;
export type TimeGridEventMatrix = Record<string, Matrix3d<ScheduleViewModel>>;

export type EventModelMap = {
  milestone: ScheduleViewModel[];
  allday: ScheduleViewModel[];
  task: ScheduleViewModel[];
  time: ScheduleViewModel[];
};

export type EventGroupMap = Record<keyof EventModelMap, DayGridEventMatrix | TimeGridEventMatrix>;
