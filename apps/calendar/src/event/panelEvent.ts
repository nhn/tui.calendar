import ScheduleViewModel from '@src/model/scheduleViewModel';
import { DataStore } from '@src/model';
import { findByDateRange } from '@src/controller/week';
import { toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { getEventLeftAndWidth } from '@src/util/gridHelper';

import type { Cells, Panel } from '@t/panel';
import type { DayGridEventMatrix, EventModelMap, TimeGridEventMatrix } from '@t/events';

export const getViewModels = (events: DayGridEventMatrix) => {
  if (!events.length) {
    return [];
  }
  const [[viewModels]] = events;

  return viewModels;
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

const getModels = (models: ScheduleViewModel[]) => models.filter((model) => !!model);

const getTimeGridEventModels = (
  eventModels: TimeGridEventMatrix,
  cells: Cells,
  narrowWeekend = false
): ScheduleViewModel[] => {
  const result: ScheduleViewModel[] = [];

  Object.values(eventModels).forEach((matrices) =>
    matrices.forEach((matrix) => {
      matrix.forEach((row) => {
        result.push(...getModels(row));
      });
    })
  );

  return result;
};

export const getDayGridEvents = (
  cells: Cells,
  dataStore: DataStore,
  narrowWeekend: boolean
): EventModelMap => {
  const panels = [
    {
      name: 'milestone',
      type: 'daygrid',
      show: true,
    },
    {
      name: 'task',
      type: 'daygrid',
      show: true,
    },
    {
      name: 'allday',
      type: 'daygrid',
      show: true,
    },
    {
      name: 'time',
      type: 'timegrid',
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
  const eventModelMap: EventModelMap = {};

  Object.entries(eventModels).forEach(([name, events]) => {
    if (Array.isArray(events)) {
      eventModelMap[name] = getDayGridEventModels(events, cells, narrowWeekend);
    } else {
      eventModelMap[name] = getTimeGridEventModels(events, cells, narrowWeekend);
    }
  });

  return eventModelMap;
};
