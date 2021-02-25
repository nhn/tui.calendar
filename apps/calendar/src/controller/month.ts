/**
 * @fileoverview Controller for Month View
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import isUndefined from 'tui-code-snippet/type/isUndefined';
import inArray from 'tui-code-snippet/array/inArray';

import TZDate from '@src/time/date';
import Schedule from '@src/model/schedule';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import Collection, { Filter } from '@src/util/collection';
import {
  limitRenderRange,
  getScheduleInDateRangeFilter,
  convertToViewModel,
  getCollisionGroup,
  getMatrices,
  positionViewModels,
} from '@src/controller/core';
import { toFormat, isSameDate, toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { IDS_OF_DAY } from './base';
import array from '@src/util/array';
import { DataStore } from '@src/model';

/**
 * Filter function for find allday schedule
 * @param {ScheduleViewModel} viewModel - schedule view model
 * @returns {boolean} whether model is allday schedule?
 */
function _isAllDay({ model }: ScheduleViewModel) {
  return model.isAllDay || model.hasMultiDates;
}

/**
 * Filter function for find time schedule
 * @param {ScheduleViewModel} viewModel - schedule view model
 * @returns {boolean} whether model is time schedule?
 */
function _isNotAllday(viewModel: ScheduleViewModel) {
  return !_isAllDay(viewModel);
}

/**
 * Weight top value +1 for month view render
 * @param {ScheduleViewModel} viewModel - schedule view model
 */
function _weightTopValue(viewModel: ScheduleViewModel) {
  viewModel.top = viewModel.top || 0;
  viewModel.top += 1;
}

/**
 * Adjust render range to render properly.
 *
 * Limit start, end for each allday schedules and expand start, end for
 * each time schedules
 * @param {TZDate} start - render start date
 * @param {TZDate} end - render end date
 * @param {Collection} viewModelColl - view model collection property.
 */
function _adjustRenderRange(
  start: TZDate,
  end: TZDate,
  viewModelColl: Collection<ScheduleViewModel>
) {
  viewModelColl.each((viewModel) => {
    if (viewModel.model.isAllDay || viewModel.model.hasMultiDates) {
      limitRenderRange(start, end, viewModel);
    }
  });
}

/**
 * Get max top index value for allday schedules in specific date (YMD)
 * @param {string} ymd - yyyymmdd formatted value
 * @param {Collection} viewModelAlldayColl - collection of allday schedules
 * @returns {number} max top index value in date
 */
function _getAlldayMaxTopIndexAtYMD(
  idsOfDay: IDS_OF_DAY,
  ymd: string,
  viewModelAlldayColl: Collection<ScheduleViewModel>
) {
  const topIndexesInDate: number[] = [];

  idsOfDay[ymd].forEach((cid) => {
    viewModelAlldayColl.doWhenHas(cid, (viewModel) => {
      topIndexesInDate.push(viewModel.top);
    });
  });

  if (topIndexesInDate.length > 0) {
    return Math.max(...topIndexesInDate);
  }

  return 0;
}

/**
 * Adjust time view model's top index value
 * @param {Collection} viewModelColl - collection of schedule view model
 */
function _adjustTimeTopIndex(idsOfDay: IDS_OF_DAY, viewModelColl: Collection<ScheduleViewModel>) {
  const vAlldayColl = viewModelColl.find(_isAllDay);
  const sortedTimeSchedules = viewModelColl.find(_isNotAllday).sort(array.compare.schedule.asc);
  const maxIndexInYMD: Record<string, number> = {};

  sortedTimeSchedules.forEach((timeViewModel) => {
    const scheduleYMD = toFormat(timeViewModel.getStarts(), 'YYYYMMDD');
    let alldayMaxTopInYMD = maxIndexInYMD[scheduleYMD];

    if (isUndefined(alldayMaxTopInYMD)) {
      alldayMaxTopInYMD = maxIndexInYMD[scheduleYMD] = _getAlldayMaxTopIndexAtYMD(
        idsOfDay,
        scheduleYMD,
        vAlldayColl
      );
    }
    maxIndexInYMD[scheduleYMD] = timeViewModel.top = alldayMaxTopInYMD + 1;
  });
}

/**
 * Adjust time view model's top index value
 * @param {Collection} viewModelColl - collection of schedule view model
 */
function _stackTimeFromTop(idsOfDay: IDS_OF_DAY, viewModelColl: Collection<ScheduleViewModel>) {
  const viewModelAlldayColl = viewModelColl.find(_isAllDay);
  const sortedTimeSchedules = viewModelColl.find(_isNotAllday).sort(array.compare.schedule.asc);
  const indiceInYMD: Record<string, number[]> = {};

  sortedTimeSchedules.forEach((timeViewModel) => {
    const scheduleYMD = toFormat(timeViewModel.getStarts(), 'YYYYMMDD');
    let topArrayInYMD = indiceInYMD[scheduleYMD];

    if (isUndefined(topArrayInYMD)) {
      topArrayInYMD = indiceInYMD[scheduleYMD] = [];
      idsOfDay[scheduleYMD].forEach((cid) => {
        viewModelAlldayColl.doWhenHas(cid, (viewModel) => {
          topArrayInYMD.push(viewModel.top);
        });
      });
    }

    if (inArray(timeViewModel.top, topArrayInYMD) >= 0) {
      const maxTopInYMD = Math.max(...topArrayInYMD) + 1;
      for (let i = 1; i <= maxTopInYMD; i += 1) {
        timeViewModel.top = i;
        if (inArray(timeViewModel.top, topArrayInYMD) < 0) {
          break;
        }
      }
    }
    topArrayInYMD.push(timeViewModel.top);
  });
}

/**
 * Convert multi-date time schedule to all-day schedule
 * @param {Collection} viewModelColl - view model collection
 * property.
 */
function _addMultiDatesInfo(viewModelColl: Collection<ScheduleViewModel>) {
  viewModelColl.each((viewModel) => {
    const { model } = viewModel;
    const start = model.getStarts();
    const end = model.getEnds();

    model.hasMultiDates = !isSameDate(start, end);

    if (!model.isAllDay && model.hasMultiDates) {
      viewModel.renderStarts = toStartOfDay(start);
      viewModel.renderEnds = toEndOfDay(end);
    }
  });
}

/**
 * Find schedule and get view model for specific month
 * @param {Collection<Schedule>} schedules - model controller
 * @param {TZDate} start - start date to find schedules
 * @param {TZDate} end - end date to find schedules
 * @param {Filter[]} [andFilters] - optional filters to applying search query
 * @param {boolean} [alldayFirstMode=false] if true, time schedule is lower than all-day schedule. Or stack schedules from the top.
 * @returns {object} view model data
 */
export function findByDateRange(
  dataStore: DataStore,
  condition: {
    start: TZDate;
    end: TZDate;
    andFilters?: Filter<Schedule | ScheduleViewModel>[];
    alldayFirstMode?: boolean;
  }
) {
  const { start, end, andFilters = [], alldayFirstMode = false } = condition;
  const { schedules, idsOfDay } = dataStore;
  const filter = Collection.and(...[getScheduleInDateRangeFilter(start, end)].concat(andFilters));

  const coll = schedules.find(filter);
  const viewModelColl = convertToViewModel(coll);
  _addMultiDatesInfo(viewModelColl);
  _adjustRenderRange(start, end, viewModelColl);
  const vList = viewModelColl.sort(array.compare.schedule.asc);

  const collisionGroup = getCollisionGroup(vList);
  const matrices = getMatrices(viewModelColl, collisionGroup);
  positionViewModels(start, end, matrices, _weightTopValue);

  if (alldayFirstMode) {
    _adjustTimeTopIndex(idsOfDay, viewModelColl);
  } else {
    _stackTimeFromTop(idsOfDay, viewModelColl);
  }

  return matrices;
}
