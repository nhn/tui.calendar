import { filterByCategory, getDateRange } from '@src/controller/base';
import {
  convertToUIModel,
  getCollisionGroup,
  getEventInDateRangeFilter,
  getMatrices,
  limitRenderRange,
  positionUIModels,
} from '@src/controller/core';
import type EventModel from '@src/model/eventModel';
import type EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import {
  makeDateRange,
  millisecondsFrom,
  MS_EVENT_MIN_DURATION,
  MS_PER_DAY,
  toEndOfDay,
  toFormat,
  toStartOfDay,
} from '@src/time/datetime';
import array from '@src/utils/array';
import type { Filter } from '@src/utils/collection';
import Collection from '@src/utils/collection';
import { isNil } from '@src/utils/type';

import type {
  CalendarData,
  DayGridEventMatrix,
  EventGroupMap,
  IDS_OF_DAY,
  Matrix,
  Matrix3d,
} from '@t/events';
import type { WeekOptions } from '@t/options';
import type { Panel } from '@t/panel';

/**********
 * TIME GRID VIEW
 **********/

/**
 * Make array with start and end times on events.
 * @param {Matrix} matrix - matrix from controller.
 * @returns {Matrix3d} starttime, endtime array (exclude first row's events)
 */
export function generateTimeArrayInRow(matrix: Matrix<EventModel | EventUIModel>) {
  const map: Matrix3d<number> = [];
  const maxColLen = Math.max(...matrix.map((col) => col.length));
  let cursor = [];
  let row;
  let col;
  let event;
  let start;
  let end;

  for (col = 1; col < maxColLen; col += 1) {
    row = 0;
    event = matrix?.[row]?.[col];

    while (event) {
      const { goingDuration, comingDuration } = event.valueOf();
      start = event.getStarts().getTime() - millisecondsFrom('minute', goingDuration);
      end = event.getEnds().getTime() + millisecondsFrom('minute', comingDuration);

      if (Math.abs(end - start) < MS_EVENT_MIN_DURATION) {
        end += MS_EVENT_MIN_DURATION;
      }

      cursor.push([start, end]);

      row += 1;
      event = matrix?.[row]?.[col];
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
 * @param {number} start - event start time that want to detect collisions.
 * @param {number} end - event end time that want to detect collisions.
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
 * Initialize values to ui models for detect real collision at rendering phase.
 * @param {array[]} matrices - Matrix data.
 * @returns {array[]} matrices - Matrix data with collision information
 */
export function getCollides(matrices: Matrix3d<EventUIModel>) {
  matrices.forEach((matrix) => {
    const binaryMap = generateTimeArrayInRow(matrix);
    const maxRowLength = Math.max(...matrix.map((row) => row.length));

    matrix.forEach((row) => {
      row.forEach((uiModel, col) => {
        if (!uiModel) {
          return;
        }

        const { goingDuration, comingDuration } = uiModel.valueOf();
        let startTime = uiModel.getStarts().getTime();
        let endTime = uiModel.getEnds().getTime();

        if (Math.abs(endTime - startTime) < MS_EVENT_MIN_DURATION) {
          endTime += MS_EVENT_MIN_DURATION;
        }

        startTime -= millisecondsFrom('minute', goingDuration);
        endTime += millisecondsFrom('minute', comingDuration);

        endTime -= 1;

        for (let i = col + 1; i < maxRowLength; i += 1) {
          const collided = hasCollision(binaryMap[i - 1], startTime, endTime);

          if (collided) {
            uiModel.hasCollide = true;
            break;
          }

          uiModel.extraSpace += 1;
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
  return (uiModel: EventModel | EventUIModel) => {
    const ownHourStart = uiModel.getStarts();
    const ownHourEnd = uiModel.getEnds();
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
 * make ui model function depending on start and end hour
 * if time view options has start or end hour condition
 * it add filter
 * @param {number} hourStart - start hour to be shown
 * @param {number} hourEnd - end hour to be shown
 * @returns {function} function
 */
export function _makeGetUIModelFuncForTimeView(
  hourStart: number,
  hourEnd: number
): (uiModelColl: Collection<EventUIModel>) => EventUIModel[] {
  if (hourStart === 0 && hourEnd === 24) {
    return (uiModelColl: Collection<EventUIModel>) => {
      return uiModelColl.sort(array.compare.event.asc);
    };
  }

  return (uiModelColl: Collection<EventUIModel>) => {
    return uiModelColl
      .filter(_makeHourRangeFilter(hourStart, hourEnd))
      .sort(array.compare.event.asc);
  };
}

/**
 * split event model by ymd.
 * @param {IDS_OF_DAY} idsOfDay - ids of days
 * @param {TZDate} start - start date
 * @param {TZDate} end - end date
 * @param {Collection<EventUIModel>} uiModelColl - collection of ui models.
 * @returns {object.<string, Collection>} splitted event model collections.
 */
export function splitEventByDateRange(
  idsOfDay: IDS_OF_DAY,
  start: TZDate,
  end: TZDate,
  uiModelColl: Collection<EventModel> | Collection<EventUIModel>
) {
  const result: Record<string, Collection<EventModel | EventUIModel>> = {};
  const range = getDateRange(start, end);

  range.forEach((date: TZDate) => {
    const ymd = toFormat(date, 'YYYYMMDD');
    const ids = idsOfDay[ymd];
    const collection = (result[ymd] = new Collection<EventModel | EventUIModel>((event) => {
      return event.cid();
    }));

    if (ids && ids.length) {
      ids.forEach((id) => {
        uiModelColl.doWhenHas(id, (event: EventModel | EventUIModel) => {
          collection.add(event);
        });
      });
    }
  }, {});

  return result;
}

/**
 * create ui model for time view part
 * @param {IDS_OF_DAY} idsOfDay - model controller
 * @param {object} condition - find options
 *  @param {TZDate} condition.start - start date.
 *  @param {TZDate} condition.end - end date.
 *  @param {Collection} condition.uiModelTimeColl - collection of ui models.
 *  @param {number} condition.hourStart - start hour to be shown
 *  @param {number} condition.hourEnd - end hour to be shown
 * @returns {object} ui model for time part.
 */
export function getUIModelForTimeView(
  idsOfDay: IDS_OF_DAY,
  condition: {
    start: TZDate;
    end: TZDate;
    uiModelTimeColl: Collection<EventUIModel>;
    hourStart: number;
    hourEnd: number;
  }
) {
  const { start, end, uiModelTimeColl, hourStart, hourEnd } = condition;
  const ymdSplitted = splitEventByDateRange(idsOfDay, start, end, uiModelTimeColl);
  const result: Record<string, Matrix3d<EventUIModel>> = {};

  const _getUIModel = _makeGetUIModelFuncForTimeView(hourStart, hourEnd);
  const usingTravelTime = true;

  Object.entries(ymdSplitted).forEach(([ymd, uiModelColl]) => {
    const uiModels = _getUIModel(uiModelColl as Collection<EventUIModel>);
    const collisionGroups = getCollisionGroup(uiModels, usingTravelTime);
    const matrices = getMatrices(uiModelColl, collisionGroups, usingTravelTime);

    result[ymd] = getCollides(matrices as Matrix3d<EventUIModel>);
  });

  return result;
}

/**********
 * ALLDAY VIEW
 **********/

/**
 * Set hasMultiDates flag to true and set date ranges for rendering
 * @param {Collection} uiModelColl - collection of ui models.
 */
export function _addMultiDatesInfo(uiModelColl: Collection<EventUIModel>) {
  uiModelColl.each((uiModel) => {
    const { model } = uiModel;

    model.hasMultiDates = true;
    uiModel.renderStarts = toStartOfDay(model.getStarts());
    uiModel.renderEnds = toEndOfDay(model.getEnds());
  });
}

/**
 * create ui model for allday view part
 * @param {TZDate} start start date.
 * @param {TZDate} end end date.
 * @param {Collection} uiModelColl - ui models of allday event.
 * @returns {DayGridEventMatrix} matrix of allday event ui models.
 */
export function getUIModelForAlldayView(
  start: TZDate,
  end: TZDate,
  uiModelColl: Collection<EventUIModel>
): DayGridEventMatrix {
  if (!uiModelColl || !uiModelColl.size) {
    return [];
  }

  _addMultiDatesInfo(uiModelColl);
  limitRenderRange(start, end, uiModelColl);

  const uiModels = uiModelColl.sort(array.compare.event.asc);
  const usingTravelTime = true;
  const collisionGroups = getCollisionGroup(uiModels, usingTravelTime);
  const matrices = getMatrices(uiModelColl, collisionGroups, usingTravelTime);

  positionUIModels(start, end, matrices);

  return matrices;
}

/**********
 * READ
 **********/

/**
 * Populate events in date range.
 * @param {CalendarData} calendarData - data store
 * @param {object} condition - find options
 *  @param {IDS_OF_DAY} condition.idsOfDay - model controller
 *  @param {TZDate} condition.start start date.
 *  @param {TZDate} condition.end end date.
 *  @param {Array.<object>} condition.panels - event panels like 'milestone', 'task', 'allday', 'time'
 *  @param {function[]} condition.[andFilters] - optional filters to applying search query
 *  @param {Object} condition.options - week view options
 * @returns {object} events grouped by dates.
 */
export function findByDateRange(
  calendarData: CalendarData,
  condition: {
    start: TZDate;
    end: TZDate;
    panels: Panel[];
    andFilters: Filter<EventModel | EventUIModel>[];
    options: WeekOptions;
  }
) {
  const { start, end, panels, andFilters = [], options } = condition;
  const { events, idsOfDay } = calendarData;
  const hourStart = options?.hourStart ?? 0;
  const hourEnd = options?.hourEnd ?? 24;
  const filterFn = Collection.and(...[getEventInDateRangeFilter(start, end)].concat(andFilters));
  const uiModelColl = convertToUIModel(events.filter(filterFn));

  const group: Record<string, Collection<EventUIModel>> = uiModelColl.groupBy(filterByCategory);

  return panels.reduce<EventGroupMap>(
    (acc, cur) => {
      const { name, type } = cur;

      if (isNil(group[name])) {
        return acc;
      }

      return {
        ...acc,
        [name]:
          type === 'daygrid'
            ? getUIModelForAlldayView(start, end, group[name])
            : getUIModelForTimeView(idsOfDay, {
                start,
                end,
                uiModelTimeColl: group[name],
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
 * @param {number} maxCount - exceed event count
 * @param {Matrix3d} eventsInDateRange  - matrix of EventUIModel
 * @param {Array.<TZDate>} range - date range of one week
 * @returns {object} exceedDate
 */
export function getExceedDate(
  maxCount: number,
  eventsInDateRange: Matrix3d<EventUIModel>,
  range: TZDate[]
) {
  const exceedDate: Record<string, number> = {};

  range.forEach((date) => {
    const ymd = getYMD(date);
    exceedDate[ymd] = 0;
  });

  eventsInDateRange.forEach((matrix) => {
    matrix.forEach((column) => {
      column.forEach((uiModel) => {
        if (!uiModel || uiModel.top < maxCount) {
          return;
        }

        const period = makeDateRange(uiModel.getStarts(), uiModel.getEnds(), MS_PER_DAY);

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
 * Exclude overflow events from matrices
 * @param {Matrix3d} matrices - The matrices for event placing.
 * @param {number} visibleEventCount - maximum visible count on panel
 * @returns {array} - The matrices for event placing except overflowed events.
 */
export function excludeExceedEvents(matrices: Matrix3d<EventUIModel>, visibleEventCount: number) {
  return matrices.map((matrix) => {
    return matrix.map((row) => {
      if (row.length > visibleEventCount) {
        return row.filter((item) => item.top < visibleEventCount);
      }

      return row;
    });
  });
}
