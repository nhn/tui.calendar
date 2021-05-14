import Schedule from '@src/model/schedule';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import array from '@src/util/array';
import TZDate from '@src/time/date';

import type { Cells } from '@t/panel';

const isBetweenEvent = (schedule: Schedule, gridStart: TZDate, gridEnd: TZDate) => {
  const scheduleStart = schedule.getStarts();
  const scheduleEnd = schedule.getEnds();

  return (
    (gridStart <= scheduleStart && scheduleStart <= gridEnd) ||
    (gridStart <= scheduleEnd && scheduleEnd <= gridEnd)
  );
};

export const getViewModels = (events: Schedule[], cells: Cells) => {
  const [cellStart] = cells;
  const cellEnd = cells[cells.length - 1];

  return events
    .filter((event) => isBetweenEvent(event, cellStart, cellEnd))
    .sort(array.compare.schedule.asc)
    .map(ScheduleViewModel.create);
};
