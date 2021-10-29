/**
 * @fileoverview Controller for Month View
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import inArray from 'tui-code-snippet/array/inArray';
import isUndefined from 'tui-code-snippet/type/isUndefined';

import {
  convertToUIModel,
  getCollisionGroup,
  getMatrices,
  getScheduleInDateRangeFilter,
  limitRenderRange,
  positionUIModels,
} from '@src/controller/core';
import { CalendarData } from '@src/model';
import EventUIModel from '@src/model/eventUIModel';
import Schedule from '@src/model/schedule';
import TZDate from '@src/time/date';
import { isSameDate, toEndOfDay, toFormat, toStartOfDay } from '@src/time/datetime';
import array from '@src/util/array';
import Collection, { Filter } from '@src/util/collection';

import { IDS_OF_DAY } from './base';

/**
 * Filter function for find allday schedule
 * @param {EventUIModel} uiModel - ui model
 * @returns {boolean} whether model is allday schedule?
 */
function _isAllDay({ model }: EventUIModel) {
  return model.isAllDay || model.hasMultiDates;
}

/**
 * Filter function for find time schedule
 * @param {EventUIModel} uiModel - ui model
 * @returns {boolean} whether model is time schedule?
 */
function _isNotAllday(uiModel: EventUIModel) {
  return !_isAllDay(uiModel);
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
 * Limit start, end for each allday schedules and expand start, end for
 * each time schedules
 * @param {TZDate} start - render start date
 * @param {TZDate} end - render end date
 * @param {Collection} uiModelColl - collection of ui model.
 */
function _adjustRenderRange(start: TZDate, end: TZDate, uiModelColl: Collection<EventUIModel>) {
  uiModelColl.each((uiModel) => {
    if (uiModel.model.isAllDay || uiModel.model.hasMultiDates) {
      limitRenderRange(toStartOfDay(start), toEndOfDay(end), uiModel);
    }
  });
}

/**
 * Get max top index value for allday schedules in specific date (YMD)
 * @param idsOfDay
 * @param {string} ymd - yyyymmdd formatted value
 * @param {Collection} uiModelAlldayColl - collection of allday schedules
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
  const vAlldayColl = uiModelColl.find(_isAllDay);
  const sortedTimeSchedules = uiModelColl.find(_isNotAllday).sort(array.compare.schedule.asc);
  const maxIndexInYMD: Record<string, number> = {};

  sortedTimeSchedules.forEach((timeUIModel) => {
    const scheduleYMD = toFormat(timeUIModel.getStarts(), 'YYYYMMDD');
    let alldayMaxTopInYMD = maxIndexInYMD[scheduleYMD];

    if (isUndefined(alldayMaxTopInYMD)) {
      alldayMaxTopInYMD = maxIndexInYMD[scheduleYMD] = _getAlldayMaxTopIndexAtYMD(
        idsOfDay,
        scheduleYMD,
        vAlldayColl
      );
    }
    maxIndexInYMD[scheduleYMD] = timeUIModel.top = alldayMaxTopInYMD + 1;
  });
}

/**
 * Adjust time ui model's top index value
 * @param {Collection} uiModelColl - collection of ui ui model
 */
function _stackTimeFromTop(idsOfDay: IDS_OF_DAY, uiModelColl: Collection<EventUIModel>) {
  const uiModelAlldayColl = uiModelColl.find(_isAllDay);
  const sortedTimeSchedules = uiModelColl.find(_isNotAllday).sort(array.compare.schedule.asc);
  const indiceInYMD: Record<string, number[]> = {};

  sortedTimeSchedules.forEach((timeUIModel) => {
    const scheduleYMD = toFormat(timeUIModel.getStarts(), 'YYYYMMDD');
    let topArrayInYMD = indiceInYMD[scheduleYMD];

    if (isUndefined(topArrayInYMD)) {
      topArrayInYMD = indiceInYMD[scheduleYMD] = [];
      idsOfDay[scheduleYMD].forEach((cid) => {
        uiModelAlldayColl.doWhenHas(cid, (uiModel) => {
          topArrayInYMD.push(uiModel.top);
        });
      });
    }

    if (inArray(timeUIModel.top, topArrayInYMD) >= 0) {
      const maxTopInYMD = Math.max(...topArrayInYMD) + 1;
      for (let i = 1; i <= maxTopInYMD; i += 1) {
        timeUIModel.top = i;
        if (inArray(timeUIModel.top, topArrayInYMD) < 0) {
          break;
        }
      }
    }
    topArrayInYMD.push(timeUIModel.top);
  });
}

/**
 * Convert multi-date time schedule to all-day schedule
 * @param {Collection} uiModelColl - collection of ui models.
 * property.
 */
function _addMultiDatesInfo(uiModelColl: Collection<EventUIModel>) {
  uiModelColl.each((uiModel) => {
    const { model } = uiModel;
    const start = model.getStarts();
    const end = model.getEnds();

    model.hasMultiDates = !isSameDate(start, end);

    if (!model.isAllDay && model.hasMultiDates) {
      uiModel.renderStarts = toStartOfDay(start);
      uiModel.renderEnds = toEndOfDay(end);
    }
  });
}

/**
 * Find schedule and get ui model for specific month
 * @returns {object} ui model data
 * @param calendarData
 * @param condition
 */
export function findByDateRange(
  calendarData: CalendarData,
  condition: {
    start: TZDate;
    end: TZDate;
    andFilters?: Filter<Schedule | EventUIModel>[];
    alldayFirstMode?: boolean;
  }
) {
  const { start, end, andFilters = [], alldayFirstMode = false } = condition;
  const { schedules, idsOfDay } = calendarData;
  const filter = Collection.and(...[getScheduleInDateRangeFilter(start, end)].concat(andFilters));

  const coll = schedules.find(filter);
  const uiModelColl = convertToUIModel(coll);
  _addMultiDatesInfo(uiModelColl);
  _adjustRenderRange(start, end, uiModelColl);
  const vList = uiModelColl.sort(array.compare.schedule.asc);
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
