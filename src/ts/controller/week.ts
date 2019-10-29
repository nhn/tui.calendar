/**
 * @fileoverview Controller modules for day views.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import pick from 'tui-code-snippet/object/pick';
import forEach from 'tui-code-snippet/collection/forEach';
import pluck from 'tui-code-snippet/collection/pluck';

import {
  MILLISECONDS_SCHEDULE_MIN_DURATION,
  millisecondsFrom,
  toStartOfDay,
  toEndOfDay,
  format,
  makeDateRange,
  MILLISECONDS_PER_DAY
} from '@src/time/datetime';
import {
  ScheduleMatrix,
  ScheduleMatrix2d,
  getCollisionGroup,
  getMatrices,
  positionViewModels,
  limitRenderRange,
  getScheduleInDateRangeFilter,
  convertToViewModel,
  Matrix
} from '@src/controller/core';
import { getDateRange, IDS_OF_DAY, filterByCategory } from '@src/controller/base';
import Schedule from '@src/model/schedule';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import Collection, { Filter } from '@src/util/collection';
import TZDate from '@src/time/date';
import { WeekOption, DataStore } from '@src/model';
import array from '@src/util/array';

export type PANEL_NAME = 'milestone' | 'task' | 'allday' | 'time';
export type PANEL_TYPE = 'daygrid' | 'timegrid';
export interface PANEL {
  name: PANEL_NAME;
  type: PANEL_TYPE;
  minHeight?: number;
  maxHeight?: number;
  showExpandableButton?: boolean;
  maxExpandableHeight?: number;
  handlers?: ['click', 'creation', 'move', 'resize'];
  show?: boolean;
}

const SCHEDULE_MIN_DURATION = MILLISECONDS_SCHEDULE_MIN_DURATION;

/**********
 * TIME GRID VIEW
 **********/

/**
 * Make array with start and end times on schedules.
 * @param {ScheduleMatrix2d} matrix - matrix from controller.
 * @returns {Matrix} starttime, endtime array (exclude first row's schedules)
 */
export function generateTimeArrayInRow<T>(matrix: ScheduleMatrix2d<T>) {
  const map: Matrix<number> = [];
  const maxColLen = Math.max(...matrix.map(col => col.length));
  let cursor = [];
  let row;
  let col;
  let schedule;
  let start;
  let end;

  for (col = 1; col < maxColLen; col += 1) {
    row = 0;
    schedule = pick(matrix, row, col);

    while (schedule) {
      start =
        schedule.getStarts().getTime() -
        millisecondsFrom('minutes', schedule.valueOf().goingDuration);
      end =
        schedule.getEnds().getTime() +
        millisecondsFrom('minutes', schedule.valueOf().comingDuration);

      if (Math.abs(end - start) < SCHEDULE_MIN_DURATION) {
        end += SCHEDULE_MIN_DURATION;
      }

      cursor.push([start, end]);

      row += 1;
      schedule = pick(matrix, row, col);
    }

    map.push(cursor);
    cursor = [];
  }

  return map;
}

function searchFunc(index: number) {
  return (block: any[]) => block[index];
}

/**
 * Get collision information from list
 * @param {array.<number[]>} arr - list to detecting collision. [[start, end], [start, end]]
 * @param {number} start - schedule start time that want to detect collisions.
 * @param {number} end - schedule end time that want to detect collisions.
 * @returns {boolean} target has collide in supplied array?
 */
export function hasCollision(arr: Array<number[]> = [], start: number, end: number) {
  if (!arr.length) {
    return false;
  }

  const compare = array.compare.num.asc;

  const startStart = Math.abs(array.bsearch(arr, start, searchFunc(0), compare));
  const startEnd = Math.abs(array.bsearch(arr, start, searchFunc(1), compare));
  const endStart = Math.abs(array.bsearch(arr, end, searchFunc(0), compare));
  const endEnd = Math.abs(array.bsearch(arr, end, searchFunc(1), compare));
  const collided = !(startStart === startEnd && startEnd === endStart && endStart === endEnd);

  return collided;
}

/**
 * Initialize values to viewmodels for detect real collision at rendering phase.
 * @param {array[]} matrices - Matrix data.
 */
export function getCollides(matrices: ScheduleMatrix<ScheduleViewModel>) {
  matrices.forEach(matrix => {
    const binaryMap = generateTimeArrayInRow<ScheduleViewModel>(matrix);
    const maxRowLength = Math.max(...matrix.map(row => row.length));

    matrix.forEach(row => {
      row.forEach((viewModel, col) => {
        if (!viewModel) {
          return;
        }

        let startTime = viewModel.getStarts().getTime();
        let endTime = viewModel.getEnds().getTime();

        if (Math.abs(endTime - startTime) < SCHEDULE_MIN_DURATION) {
          endTime += SCHEDULE_MIN_DURATION;
        }

        startTime -= millisecondsFrom('minutes', viewModel.valueOf().goingDuration);
        endTime += millisecondsFrom('minutes', viewModel.valueOf().comingDuration);

        endTime -= 1;

        for (let i = col + 1; i < maxRowLength; i += 1) {
          const collided = hasCollision(binaryMap[i - 1], startTime, endTime);

          if (collided) {
            viewModel.hasCollide = true;
            break;
          }

          viewModel.extraSpace += 1;
        }
      });
    });
  });
}

/**
 * make a filter function that is not included range of start, end hour
 * @param {number} hStart - hour start
 * @param {number} hEnd - hour end
 * @returns {function} - filtering function
 */
export function _makeHourRangeFilter(hStart: number, hEnd: number) {
  return (viewModel: Schedule | ScheduleViewModel) => {
    const ownHourStart = viewModel.getStarts();
    const ownHourEnd = viewModel.getEnds();
    const ownHourStartTime = ownHourStart.getTime();
    const ownHourEndTime = ownHourEnd.getTime();
    const yyyy = ownHourStart.getFullYear();
    const mm = ownHourStart.getMonth();
    const dd = ownHourStart.getDate();

    const hourStart = new TZDate(yyyy, mm, dd).setHours(hStart);
    const hourEnd = new TZDate(yyyy, mm, dd).setHours(hEnd);

    return (
      (ownHourStartTime >= hourStart && ownHourStartTime < hourEnd) ||
      (ownHourEndTime > hourStart && ownHourEndTime <= hourEnd) ||
      (ownHourStartTime < hourStart && ownHourEndTime > hourStart) ||
      (ownHourEndTime > hourEnd && ownHourStartTime < hourEnd)
    );
  };
}

/**
 * make view model function depending on start and end hour
 * if time view option has start or end hour condition
 * it add filter
 * @param {number} hourStart - start hour to be shown
 * @param {number} hourEnd - end hour to be shown
 * @returns {function} function
 */
export function _makeGetViewModelFuncForTimeView(
  hourStart: number,
  hourEnd: number
): (viewModelColl: Collection<ScheduleViewModel>) => ScheduleViewModel[] {
  if (hourStart === 0 && hourEnd === 24) {
    return (viewModelColl: Collection<ScheduleViewModel>) => {
      return viewModelColl.sort(array.compare.schedule.asc);
    };
  }

  return (viewModelColl: Collection<ScheduleViewModel>) => {
    return viewModelColl
      .find(_makeHourRangeFilter(hourStart, hourEnd))
      .sort(array.compare.schedule.asc);
  };
}

/**
 * split schedule model by ymd.
 * @param {TZDate} start - start date
 * @param {TZDate} end - end date
 * @param {Collection<ScheduleViewModel>} viewModelColl - collection of schedule view model.
 * @returns {object.<string, Collection>} splitted schedule model collections.
 */
export function splitScheduleByDateRange(
  idsOfDay: IDS_OF_DAY,
  start: TZDate,
  end: TZDate,
  viewModelColl: Collection<Schedule> | Collection<ScheduleViewModel>
) {
  const result: Record<string, Collection<Schedule | ScheduleViewModel>> = {};
  const range = getDateRange(start, end);

  range.forEach((date: TZDate) => {
    const ymd = format(date, 'YYYYMMDD');
    const ids = idsOfDay[ymd];
    const collection = (result[ymd] = new Collection<Schedule | ScheduleViewModel>(schedule => {
      return schedule.cid();
    }));

    if (ids && ids.length) {
      ids.forEach(id => {
        viewModelColl.doWhenHas(id, (schedule: Schedule | ScheduleViewModel) => {
          collection.add(schedule);
        });
      });
    }
  }, {});

  return result;
}

/**
 * create view model for time view part
 * @param {IDS_OF_DAY} idsOfDay - model controller
 * @param {TZDate} start - start date.
 * @param {TZDate} end - end date.
 * @param {Collection} viewModelTimeColl - view model collection.
 * @param {number} hourStart - start hour to be shown
 * @param {number} hourEnd - end hour to be shown
 * @returns {object} view model for time part.
 */
export function getViewModelForTimeView(
  idsOfDay: IDS_OF_DAY,
  condition: {
    start: TZDate;
    end: TZDate;
    viewModelTimeColl: Collection<ScheduleViewModel>;
    hourStart: number;
    hourEnd: number;
  }
) {
  const { start, end, viewModelTimeColl, hourStart, hourEnd } = condition;
  const ymdSplitted = splitScheduleByDateRange(idsOfDay, start, end, viewModelTimeColl);
  const result: Record<string, ScheduleMatrix<ScheduleViewModel>> = {};

  const _getViewModel = _makeGetViewModelFuncForTimeView(hourStart, hourEnd);

  forEach(ymdSplitted, (viewModelColl: Collection<ScheduleViewModel>, ymd: string) => {
    const viewModels = _getViewModel(viewModelColl);
    const collisionGroups = getCollisionGroup(viewModels);
    const matrices = getMatrices(viewModelColl, collisionGroups);
    getCollides(matrices);

    result[ymd] = matrices;
  });

  return result;
}

/**********
 * ALLDAY VIEW
 **********/

/**
 * Set hasMultiDates flag to true and set date ranges for rendering
 * @param {Collection} viewModelColl - view model collection
 */
export function _addMultiDatesInfo(viewModelColl: Collection<ScheduleViewModel>) {
  viewModelColl.each(viewModel => {
    const { model } = viewModel;

    model.hasMultiDates = true;
    viewModel.renderStarts = toStartOfDay(model.getStarts());
    viewModel.renderEnds = toEndOfDay(model.getEnds());
  });
}

/**
 * create view model for allday view part
 * @param {TZDate} start start date.
 * @param {TZDate} end end date.
 * @param {Collection} viewModelColl - allday schedule viewModel viewModels.
 * @returns {object} allday viewModel.
 */
export function getViewModelForAlldayView(
  start: TZDate,
  end: TZDate,
  viewModelColl: Collection<ScheduleViewModel>
) {
  if (!viewModelColl || !viewModelColl.length) {
    return [];
  }

  _addMultiDatesInfo(viewModelColl);
  limitRenderRange(start, end, viewModelColl);

  const viewModels = viewModelColl.sort(array.compare.schedule.asc);
  const collisionGroups = getCollisionGroup(viewModels);

  const matrices = getMatrices(viewModelColl, collisionGroups);

  positionViewModels(start, end, matrices);

  return matrices;
}

/**********
 * READ
 **********/

/**
 * Populate schedules in date range.
 * @param {Collection<Schedule>} schedules - model controller
 * @param {IDS_OF_DAY} idsOfDay - model controller
 * @param {TZDate} start start date.
 * @param {TZDate} end end date.
 * @param {Array.<object>} panels - schedule panels like 'milestone', 'task', 'allday', 'time'
 * @param {function[]} [andFilters] - optional filters to applying search query
 * @param {Object} options - week view options
 * @returns {object} schedules grouped by dates.
 */
export function findByDateRange(
  dataStore: DataStore,
  condition: {
    start: TZDate;
    end: TZDate;
    panels: PANEL[];
    andFilters: Filter<Schedule | ScheduleViewModel>[];
    options: WeekOption;
  }
) {
  const { start, end, panels, andFilters = [], options } = condition;
  const { schedules, idsOfDay } = dataStore;
  const scheduleTypes = pluck(panels, 'name');
  const hourStart = pick(options, 'hourStart');
  const hourEnd = pick(options, 'hourEnd');
  const filter = Collection.and(...[getScheduleInDateRangeFilter(start, end)].concat(andFilters));
  const viewModelColl = convertToViewModel(schedules.find(filter));

  const group: Record<PANEL_NAME, Collection<ScheduleViewModel>> = viewModelColl.groupBy(
    scheduleTypes,
    filterByCategory
  );
  const resutGroup: Record<
    PANEL_NAME,
    ScheduleMatrix<ScheduleViewModel> | Record<string, ScheduleMatrix<ScheduleViewModel>>
  > = {
    milestone: [],
    task: [],
    allday: [],
    time: []
  };

  panels.forEach(({ name, type }) => {
    if (type === 'daygrid') {
      resutGroup[name] = getViewModelForAlldayView(start, end, group[name]);
    } else if (type === 'timegrid') {
      resutGroup[name] = getViewModelForTimeView(idsOfDay, {
        start,
        end,
        viewModelTimeColl: group[name],
        hourStart,
        hourEnd
      });
    }
  });

  return resutGroup;
}

function getYMD(date: TZDate, fmt = 'YYYYMMDD') {
  return format(date, fmt);
}

/* eslint max-nested-callbacks: 0 */
/**
 * Make exceed date information
 * @param {number} maxCount - exceed schedule count
 * @param {ScheduleMatrix} eventsInDateRange  - matrix of ScheduleViewModel
 * @param {Array.<TZDate>} range - date range of one week
 * @returns {object} exceedDate
 */
export function getExceedDate(
  maxCount: number,
  eventsInDateRange: ScheduleMatrix<ScheduleViewModel>,
  range: TZDate[]
) {
  const exceedDate: Record<string, number> = {};

  range.forEach(date => {
    const ymd = getYMD(date);
    exceedDate[ymd] = 0;
  });

  eventsInDateRange.forEach(matrix => {
    matrix.forEach(column => {
      column.forEach(viewModel => {
        if (!viewModel || viewModel.top < maxCount) {
          return;
        }

        const period = makeDateRange(
          viewModel.getStarts(),
          viewModel.getEnds(),
          MILLISECONDS_PER_DAY
        );

        period.forEach(date => {
          const ymd = getYMD(date);
          exceedDate[ymd] += 1;
        });
      });
    });
  });

  return exceedDate;
}

/**
 * Exclude overflow schedules from matrices
 * @param {ScheduleMatrix} matrices - The matrices for schedule placing.
 * @param {number} visibleScheduleCount - maximum visible count on panel
 * @returns {array} - The matrices for schedule placing except overflowed schedules.
 */
export function excludeExceedSchedules(
  matrices: ScheduleMatrix<ScheduleViewModel>,
  visibleScheduleCount: number
) {
  return matrices.map(matrix => {
    return matrix.map(row => {
      if (row.length > visibleScheduleCount) {
        return row.filter(item => item.top < visibleScheduleCount);
      }

      return row;
    });
  });
}
