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
import {
  getEventLeftAndWidth,
  getGridWidthAndLeftPercentValues,
  TOTAL_WIDTH,
} from '@src/util/gridHelper';

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

const getDayGridEventModels = (
  eventModels: DayGridEventMatrix,
  cells: Cells,
  narrowWeekend = false
): DayGridEventMatrix => {
  eventModels.forEach((matrix) => {
    matrix.forEach((row) => {
      row.forEach((viewModel) => {
        const modelStart = viewModel.getStarts();
        const modelEnd = viewModel.getEnds();
        const { width, left } = getEventLeftAndWidth(modelStart, modelEnd, cells, narrowWeekend);

        viewModel.width = width;
        viewModel.left = left;
      });
    });
  });

  return eventModels;
};

const getTimeGridEventModels = (
  eventModels: TimeGridEventMatrix,
  cells: Cells,
  narrowWeekend = false
): ScheduleViewModel[] => {
  let result: ScheduleViewModel[] = [];

  console.log('before', eventModels);

  Object.values(eventModels).forEach((matrices) =>
    matrices.forEach((matrix) => {
      matrix.forEach((row) => {
        row.forEach((model) => {
          if (model) {
            result.push(model);
          }
        });
        // result = [...result, ...row];

        // row.forEach((viewModel) => {
        //   const modelStart = viewModel.getStarts();
        //   const modelEnd = viewModel.getEnds();
        //   const { width, left } = getEventLeftAndWidth(modelStart, modelEnd, cells, narrowWeekend);
        //
        //   viewModel.width = width;
        //   viewModel.left = left;
        // });
      });
    })
  );

  console.log('result', result);

  return result;
};

export const getSpecialEvents = (
  cells: Cells,
  dataStore: DataStore,
  narrowWeekend: boolean
): Record<string, DayGridEventMatrix | ScheduleViewModel[]> => {
  const { idsOfDay, schedules } = dataStore;
  const panels = [
    {
      name: 'milestone',
      type: 'daygrid',
      handlers: ['click', 'creation', 'move', 'resize'],
      show: true,
    },
    {
      name: 'task',
      type: 'daygrid',
      handlers: ['click', 'creation', 'move', 'resize'],
      show: true,
    },
    {
      name: 'allday',
      type: 'daygrid',
      handlers: ['click', 'creation', 'move', 'resize'],
      show: true,
    },
    {
      name: 'time',
      type: 'timegrid',
      handlers: ['click', 'creation', 'move', 'resize'],
      show: true,
    },
  ] as Panel[];
  const eventModels = findByDateRange(dataStore, {
    start: toStartOfDay(cells[0]),
    end: toEndOfDay(cells[cells.length - 1]),
    panels,
    andFilters: [],
    options: {
      hourStart: 0,
      hourEnd: 24,
    },
  });
  // const idEventModelMap: Record<number, ScheduleViewModel> = [];
  const eventModelMap: Record<string, DayGridEventMatrix | ScheduleViewModel[]> = {};

  Object.entries(eventModels).forEach(([name, events]) => {
    if (Array.isArray(events)) {
      eventModelMap[name] = getDayGridEventModels(events, cells, narrowWeekend);
    } else {
      eventModelMap[name] = getTimeGridEventModels(events, cells, narrowWeekend);
    }
  });
  // Object.values(eventModels).forEach((events) => setEventModels(events as DayGridEventMatrix));
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
  return eventModelMap;
};
