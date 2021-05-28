import Schedule from '@src/model/schedule';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import array from '@src/util/array';
import TZDate from '@src/time/date';

import type { Cells, Panel, PanelType } from '@t/panel';
import { DataStore } from '@src/model';
import { findByDateRange } from '@src/controller/week';
import { cell } from '@stories/daygrid.stories';
import { toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { DayGridEventMatrix, TimeGridEventMatrix } from '@src/components/panelgrid/specialEvents';

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

export const getSpecialEvents = (
  cells: Cells,
  dataStore: DataStore,
  narrowWeekend: boolean
): Record<string, DayGridEventMatrix | TimeGridEventMatrix> => {
  const { idsOfDay, schedules } = dataStore;
  const panels = [
    {
      name: 'milestone',
      type: 'daygrid',
      handlers: ['click', 'creation', 'move', 'resize'],
      show: true,
    },
  ] as Panel[];
  const eventViewModels = findByDateRange(dataStore, {
    start: toStartOfDay(cells[0]),
    end: toEndOfDay(cells[cells.length - 1]),
    panels,
    andFilters: [],
    options: {},
  });
  const idEventModelMap: Record<number, ScheduleViewModel> = [];

  console.log(eventViewModels.milestone);

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
  return eventViewModels;
};
