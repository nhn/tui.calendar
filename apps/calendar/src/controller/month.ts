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
import type TZDate from '@src/time/date';
import { isSameDate, toEndOfDay, toFormat, toStartOfDay } from '@src/time/datetime';
import array from '@src/utils/array';
import type { Filter } from '@src/utils/collection';
import Collection from '@src/utils/collection';
import { isUndefined } from '@src/utils/type';

import type { CalendarData, IDS_OF_DAY } from '@t/events';

/**
 * Filter function for find allday event
 * @param {EventUIModel} uiModel - ui model
 * @returns {boolean} whether model is allday event?
 */
function _isAllday({ model }: EventUIModel) {
  return model.isAllday || model.hasMultiDates;
}

/**
 * Filter function for find time event
 * @param {EventUIModel} uiModel - ui model
 * @returns {boolean} whether model is time event?
 */
function _isNotAllday(uiModel: EventUIModel) {
  return !_isAllday(uiModel);
}

/**
 * Weight top value +1 for month view render
 * @param {EventUIModel} uiModel - ui model
 */
function _weightTopValue(uiModel: EventUIModel) {
  uiModel.top = uiModel.top || 0;
  uiModel.top += 1;
}

/**
 * Adjust render range to render properly.
 *
 * Limit start, end for each allday events and expand start, end for
 * each time events
 * @param {TZDate} start - render start date
 * @param {TZDate} end - render end date
 * @param {Collection} uiModelColl - collection of ui model.
 */
function _adjustRenderRange(start: TZDate, end: TZDate, uiModelColl: Collection<EventUIModel>) {
  uiModelColl.each((uiModel) => {
    if (uiModel.model.isAllday || uiModel.model.hasMultiDates) {
      limitRenderRange(toStartOfDay(start), toEndOfDay(end), uiModel);
    }
  });
}

/**
 * Get max top index value for allday events in specific date (YMD)
 * @param idsOfDay
 * @param {string} ymd - yyyymmdd formatted value
 * @param {Collection} uiModelAlldayColl - collection of allday events
 * @returns {number} max top index value in date
 */
function _getAlldayMaxTopIndexAtYMD(
  idsOfDay: IDS_OF_DAY,
  ymd: string,
  uiModelAlldayColl: Collection<EventUIModel>
) {
  const topIndexesInDate: number[] = [];

  idsOfDay[ymd].forEach((cid) => {
    uiModelAlldayColl.doWhenHas(cid, (uiModel) => {
      topIndexesInDate.push(uiModel.top);
    });
  });

  if (topIndexesInDate.length > 0) {
    return Math.max(...topIndexesInDate);
  }

  return 0;
}

/**
 * Adjust time ui model's top index value
 * @param idsOfDay
 * @param {Collection} uiModelColl - collection of ui ui model
 */
function _adjustTimeTopIndex(idsOfDay: IDS_OF_DAY, uiModelColl: Collection<EventUIModel>) {
  const vAlldayColl = uiModelColl.filter(_isAllday);
  const sortedTimeEvents = uiModelColl.filter(_isNotAllday).sort(array.compare.event.asc);
  const maxIndexInYMD: Record<string, number> = {};

  sortedTimeEvents.forEach((timeUIModel) => {
    const eventYMD = toFormat(timeUIModel.getStarts(), 'YYYYMMDD');
    let alldayMaxTopInYMD = maxIndexInYMD[eventYMD];

    if (isUndefined(alldayMaxTopInYMD)) {
      alldayMaxTopInYMD = maxIndexInYMD[eventYMD] = _getAlldayMaxTopIndexAtYMD(
        idsOfDay,
        eventYMD,
        vAlldayColl
      );
    }
    maxIndexInYMD[eventYMD] = timeUIModel.top = alldayMaxTopInYMD + 1;
  });
}

/**
 * Adjust time ui model's top index value
 * @param {IDS_OF_DAY} idsOfDay - ids of days
 * @param {Collection} uiModelColl - collection of ui ui model
 */
function _stackTimeFromTop(idsOfDay: IDS_OF_DAY, uiModelColl: Collection<EventUIModel>) {
  const uiModelAlldayColl = uiModelColl.filter(_isAllday);
  const sortedTimeEvents = uiModelColl.filter(_isNotAllday).sort(array.compare.event.asc);
  const indiceInYMD: Record<string, number[]> = {};

  sortedTimeEvents.forEach((timeUIModel) => {
    const eventYMD = toFormat(timeUIModel.getStarts(), 'YYYYMMDD');
    let topArrayInYMD = indiceInYMD[eventYMD];

    if (isUndefined(topArrayInYMD)) {
      topArrayInYMD = indiceInYMD[eventYMD] = [];
      idsOfDay[eventYMD].forEach((cid) => {
        uiModelAlldayColl.doWhenHas(cid, (uiModel) => {
          topArrayInYMD.push(uiModel.top);
        });
      });
    }

    if (topArrayInYMD.indexOf(timeUIModel.top) >= 0) {
      const maxTopInYMD = Math.max(...topArrayInYMD) + 1;
      for (let i = 1; i <= maxTopInYMD; i += 1) {
        timeUIModel.top = i;
        if (topArrayInYMD.indexOf(timeUIModel.top) < 0) {
          break;
        }
      }
    }
    topArrayInYMD.push(timeUIModel.top);
  });
}

/**
 * Convert multi-date time event to all-day event
 * @param {Collection} uiModelColl - collection of ui models.
 * property.
 */
function _addMultiDatesInfo(uiModelColl: Collection<EventUIModel>) {
  uiModelColl.each((uiModel) => {
    const { model } = uiModel;
    const start = model.getStarts();
    const end = model.getEnds();

    model.hasMultiDates = !isSameDate(start, end);

    if (!model.isAllday && model.hasMultiDates) {
      uiModel.renderStarts = toStartOfDay(start);
      uiModel.renderEnds = toEndOfDay(end);
    }
  });
}

/**
 * Find event and get ui model for specific month
 * @returns {object} ui model data
 * @param calendarData
 * @param condition
 */
export function findByDateRange(
  calendarData: CalendarData,
  condition: {
    start: TZDate;
    end: TZDate;
    andFilters?: Filter<EventModel | EventUIModel>[];
    alldayFirstMode?: boolean;
  }
) {
  const { start, end, andFilters = [], alldayFirstMode = false } = condition;
  const { events, idsOfDay } = calendarData;
  const filterFn = Collection.and(...[getEventInDateRangeFilter(start, end)].concat(andFilters));

  const coll = events.filter(filterFn);
  const uiModelColl = convertToUIModel(coll);
  _addMultiDatesInfo(uiModelColl);
  _adjustRenderRange(start, end, uiModelColl);
  const vList = uiModelColl.sort(array.compare.event.asc);
  const usingTravelTime = false;
  const collisionGroup = getCollisionGroup(vList, usingTravelTime);
  const matrices = getMatrices(uiModelColl, collisionGroup, usingTravelTime);
  positionUIModels(start, end, matrices, _weightTopValue);

  if (alldayFirstMode) {
    _adjustTimeTopIndex(idsOfDay, uiModelColl);
  } else {
    _stackTimeFromTop(idsOfDay, uiModelColl);
  }

  return matrices;
}
