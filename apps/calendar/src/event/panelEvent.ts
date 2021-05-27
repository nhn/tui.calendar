import Schedule from '@src/model/schedule';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import array from '@src/util/array';
import TZDate from '@src/time/date';

import type { Cells } from '@t/panel';
import { DataStore } from '@src/model';
import { findByDateRange } from '@src/controller/month';

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

export const getSpecialEvents = (cells: Cells, dataStore: DataStore, narrowWeekend: boolean) => {
  const { idsOfDay } = dataStore;
  const eventViewModels = findByDateRange(dataStore, {
    start: cells[0],
    end: cells[cells.length - 1],
  });
  const idEventModelMap: Record<number, ScheduleViewModel> = [];

  // eventViewModels.forEach((matrix) => {
  //   matrix.forEach((row) => {
  //     row.forEach((viewModel) => {
  //       const cid = viewModel.model.cid();
  //       idEventModelMap[cid] = getEventViewModelWithPosition(viewModel, cells, narrowWeekend);
  //     });
  //   });
  // });
  //
  // const gridDateEventModelMap = Object.keys(idsOfDay).reduce<Record<string, ScheduleViewModel[]>>(
  //   (acc, ymd) => {
  //     const ids = idsOfDay[ymd];
  //
  //     acc[ymd] = ids.map((cid) => idEventModelMap[cid]).filter((vm) => !!vm);
  //
  //     return acc;
  //   },
  //   {}
  // );

  // return {
  //   viewModels: Object.values(idEventModelMap),
  //   gridDateEventModelMap,
  // };
  return {
    milestone: eventViewModels,
    task: [],
    allday: [],
  };
};
