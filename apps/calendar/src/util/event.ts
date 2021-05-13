import { isInGrid } from '@src/event/panelEvent';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import TZDate from '@src/time/date';

export function isWithinHeight(containerHeight: number, eventHeight: number) {
  return ({ top }: ScheduleViewModel) => containerHeight >= (top + 1) * eventHeight;
}

const isExceededHeight = (containerHeight: number, eventHeight: number) => {
  return ({ top }: ScheduleViewModel) => containerHeight < (top + 1) * eventHeight;
};

export function getExceedCount(
  viewModels: ScheduleViewModel[],
  containerHeight: number,
  eventHeight: number,
  gridDate: TZDate
) {
  return viewModels
    .filter(isExceededHeight(containerHeight, eventHeight))
    .filter(isInGrid(gridDate)).length;
}
