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
import { toEndOfDay, toFormat, toStartOfDay } from '@src/time/datetime';
import array from '@src/utils/array';
import type { Filter } from '@src/utils/collection';
import Collection from '@src/utils/collection';
import { isNil } from '@src/utils/type';

import type {
  CalendarData,
  DayGridEventMatrix,
  EventGroupMap,
  IDS_OF_DAY,
  Matrix3d,
} from '@t/events';
import type { WeekOptions } from '@t/options';
import type { Panel } from '@t/panel';

/**********
 * TIME GRID VIEW
 **********/

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

    result[ymd] = matrices as Matrix3d<EventUIModel>;
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
