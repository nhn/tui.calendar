/**
 * @fileoverview Controller modules for day views.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import forEach from 'tui-code-snippet/collection/forEach';
import pluck from 'tui-code-snippet/collection/pluck';
import pick from 'tui-code-snippet/object/pick';

import { filterByCategory, getDateRange, IDS_OF_DAY } from '@src/controller/base';
import {
  convertToViewModel,
  getCollisionGroup,
  getMatrices,
  getScheduleInDateRangeFilter,
  limitRenderRange,
  positionViewModels,
} from '@src/controller/core';
import { CalendarData, WeekOption } from '@src/model';
import Schedule from '@src/model/schedule';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import TZDate from '@src/time/date';
import {
  makeDateRange,
  millisecondsFrom,
  MS_PER_DAY,
  MS_SCHEDULE_MIN_DURATION,
  toEndOfDay,
  toFormat,
  toStartOfDay,
} from '@src/time/datetime';
import array from '@src/util/array';
import Collection, { Filter } from '@src/util/collection';

import type { DayGridEventMatrix, EventGroupMap, Matrix, Matrix3d } from '@t/events';
import type { Panel } from '@t/panel';

const SCHEDULE_MIN_DURATION = MS_SCHEDULE_MIN_DURATION;

/**********
 * TIME GRID VIEW
 **********/

/**
 * Make array with start and end times on schedules.
 * @param {Matrix} matrix - matrix from controller.
 * @returns {Matrix3d} starttime, endtime array (exclude first row's schedules)
 */
export function generateTimeArrayInRow<T>(matrix: Matrix<T>) {
  const map: Matrix3d<number> = [];
  const maxColLen = Math.max(...matrix.map((col) => col.length));
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
      const { goingDuration, comingDuration } = schedule.valueOf();
      start = schedule.getStarts().getTime() - millisecondsFrom('minute', goingDuration);
      end = schedule.getEnds().getTime() + millisecondsFrom('minute', comingDuration);

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
export function hasCollision(arr: Array<number[]>, start: number, end: number) {
  if (!arr?.length) {
    return false;
  }

  const compare = array.compare.num.asc;

  const startStart = Math.abs(array.bsearch(arr, start, searchFunc(0), compare));
  const startEnd = Math.abs(array.bsearch(arr, start, searchFunc(1), compare));
  const endStart = Math.abs(array.bsearch(arr, end, searchFunc(0), compare));
  const endEnd = Math.abs(array.bsearch(arr, end, searchFunc(1), compare));

  return !(startStart === startEnd && startEnd === endStart && endStart === endEnd);
}

/**
 * Initialize values to viewmodels for detect real collision at rendering phase.
 * @param {array[]} matrices - Matrix data.
 * @returns {array[]} matrices - Matrix data with collision information
 */
export function getCollides(matrices: Matrix3d<ScheduleViewModel>) {
  matrices.forEach((matrix) => {
    const binaryMap = generateTimeArrayInRow<ScheduleViewModel>(matrix);
    const maxRowLength = Math.max(...matrix.map((row) => row.length));

    matrix.forEach((row) => {
      row.forEach((viewModel, col) => {
        if (!viewModel) {
          return;
        }

        const { goingDuration, comingDuration } = viewModel.valueOf();
        let startTime = viewModel.getStarts().getTime();
        let endTime = viewModel.getEnds().getTime();

        if (Math.abs(endTime - startTime) < SCHEDULE_MIN_DURATION) {
          endTime += SCHEDULE_MIN_DURATION;
        }

        startTime -= millisecondsFrom('minute', goingDuration);
        endTime += millisecondsFrom('minute', comingDuration);

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

  return matrices;
}

/**
 * make a filter function that is not included range of start, end hour
 * @param {number} hStart - hour start
 * @param {number} hEnd - hour end
 * @returns {function} - filtering function
 */
export function _makeHourRangeFilter(hStart: number, hEnd: number) {
  // eslint-disable-next-line complexity
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
    const ymd = toFormat(date, 'YYYYMMDD');
    const ids = idsOfDay[ymd];
    const collection = (result[ymd] = new Collection<Schedule | ScheduleViewModel>((schedule) => {
      return schedule.cid();
    }));

    if (ids && ids.length) {
      ids.forEach((id) => {
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
 * @param {object} condition - find option
 *  @param {TZDate} condition.start - start date.
 *  @param {TZDate} condition.end - end date.
 *  @param {Collection} condition.viewModelTimeColl - view model collection.
 *  @param {number} condition.hourStart - start hour to be shown
 *  @param {number} condition.hourEnd - end hour to be shown
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
  const result: Record<string, Matrix3d<ScheduleViewModel>> = {};

  const _getViewModel = _makeGetViewModelFuncForTimeView(hourStart, hourEnd);
  const usingTravelTime = true;

  forEach(ymdSplitted, (viewModelColl: Collection<ScheduleViewModel>, ymd: string) => {
    const viewModels = _getViewModel(viewModelColl);
    const collisionGroups = getCollisionGroup(viewModels, usingTravelTime);
    const matrices = getMatrices(viewModelColl, collisionGroups, usingTravelTime);

    result[ymd] = getCollides(matrices);
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
  viewModelColl.each((viewModel) => {
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
): DayGridEventMatrix {
  if (!viewModelColl || !viewModelColl.length) {
    return [];
  }

  _addMultiDatesInfo(viewModelColl);
  limitRenderRange(start, end, viewModelColl);

  const viewModels = viewModelColl.sort(array.compare.schedule.asc);
  const usingTravelTime = true;
  const collisionGroups = getCollisionGroup(viewModels, usingTravelTime);
  const matrices = getMatrices(viewModelColl, collisionGroups, usingTravelTime);

  positionViewModels(start, end, matrices);

  return matrices;
}

/**********
 * READ
 **********/

/**
 * Populate schedules in date range.
 * @param {CalendarData} calendarData - data store
 * @param {object} condition - find option
 *  @param {IDS_OF_DAY} condition.idsOfDay - model controller
 *  @param {TZDate} condition.start start date.
 *  @param {TZDate} condition.end end date.
 *  @param {Array.<object>} condition.panels - schedule panels like 'milestone', 'task', 'allday', 'time'
 *  @param {function[]} condition.[andFilters] - optional filters to applying search query
 *  @param {Object} condition.options - week view options
 * @returns {object} schedules grouped by dates.
 */
export function findByDateRange(
  calendarData: CalendarData,
  condition: {
    start: TZDate;
    end: TZDate;
    panels: Panel[];
    andFilters: Filter<Schedule | ScheduleViewModel>[];
    options: WeekOption;
  }
) {
  const { start, end, panels, andFilters = [], options } = condition;
  const { schedules, idsOfDay } = calendarData;
  const scheduleTypes = pluck(panels, 'name');
  const hourStart = pick(options, 'hourStart');
  const hourEnd = pick(options, 'hourEnd');
  const filter = Collection.and(...[getScheduleInDateRangeFilter(start, end)].concat(andFilters));
  const viewModelColl = convertToViewModel(schedules.find(filter));

  const group: Record<string, Collection<ScheduleViewModel>> = viewModelColl.groupBy(
    scheduleTypes,
    filterByCategory
  );

  return panels.reduce<EventGroupMap>(
    (acc, cur) => {
      const { name, type } = cur;

      return {
        ...acc,
        [name]:
          type === 'daygrid'
            ? getViewModelForAlldayView(start, end, group[name])
            : getViewModelForTimeView(idsOfDay, {
                start,
                end,
                viewModelTimeColl: group[name],
                hourStart,
                hourEnd,
              }),
      };
    },
    {
      milestone: [],
      task: [],
      allday: [],
      time: {},
    }
  );
}

function getYMD(date: TZDate, format = 'YYYYMMDD') {
  return toFormat(date, format);
}

/* eslint max-nested-callbacks: 0 */
/**
 * Make exceed date information
 * @param {number} maxCount - exceed schedule count
 * @param {Matrix3d} eventsInDateRange  - matrix of ScheduleViewModel
 * @param {Array.<TZDate>} range - date range of one week
 * @returns {object} exceedDate
 */
export function getExceedDate(
  maxCount: number,
  eventsInDateRange: Matrix3d<ScheduleViewModel>,
  range: TZDate[]
) {
  const exceedDate: Record<string, number> = {};

  range.forEach((date) => {
    const ymd = getYMD(date);
    exceedDate[ymd] = 0;
  });

  eventsInDateRange.forEach((matrix) => {
    matrix.forEach((column) => {
      column.forEach((viewModel) => {
        if (!viewModel || viewModel.top < maxCount) {
          return;
        }

        const period = makeDateRange(viewModel.getStarts(), viewModel.getEnds(), MS_PER_DAY);

        period.forEach((date) => {
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
 * @param {Matrix3d} matrices - The matrices for schedule placing.
 * @param {number} visibleScheduleCount - maximum visible count on panel
 * @returns {array} - The matrices for schedule placing except overflowed schedules.
 */
export function excludeExceedSchedules(
  matrices: Matrix3d<ScheduleViewModel>,
  visibleScheduleCount: number
) {
  return matrices.map((matrix) => {
    return matrix.map((row) => {
      if (row.length > visibleScheduleCount) {
        return row.filter((item) => item.top < visibleScheduleCount);
      }

      return row;
    });
  });
}
