/**
 * @fileoverview Core methods for schedule block placing
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import ScheduleViewModel from '@src/model/scheduleViewModel';
import inArray from 'tui-code-snippet/array/inArray';
import isUndefined from 'tui-code-snippet/type/isUndefined';

import Collection, { Filter } from '@src/util/collection';
import Schedule from '@src/model/schedule';
import TZDate from '@src/time/date';
import {
  makeDateRange,
  MILLISECONDS_PER_DAY,
  format,
  toStartOfDay,
  toEndOfDay
} from '@src/time/datetime';

export type CollisionGroup = Array<number[]>;
export type Matrix<T> = Array<Array<T[]>>;
export type ScheduleMatrix<T> = Matrix<T>;
export type ScheduleMatrix2d<T> = Array<T[]>;

/**
 * Calculate collision group.
 * @param {Array<Schedule|ScheduleViewModel>} schedules List of viewmodels.
 * @returns {Array<number[]>} Collision Group.
 */
export function getCollisionGroup(schedules: Schedule[] | ScheduleViewModel[]) {
  const collisionGroups: CollisionGroup = [];
  let previousScheduleList: Array<Schedule | ScheduleViewModel>;

  if (!schedules.length) {
    return collisionGroups;
  }

  collisionGroups[0] = [schedules[0].cid()];
  schedules.slice(1).forEach((schedule: Schedule | ScheduleViewModel, index: number) => {
    previousScheduleList = schedules.slice(0, index + 1).reverse();

    // If overlapping previous schedules, find a Collision Group of overlapping schedules and add this schedules
    const found = previousScheduleList.find((previous: Schedule | ScheduleViewModel) => {
      return schedule.collidesWith(previous);
    });

    if (!found) {
      // This schedule is a schedule that does not overlap with the previous schedule, so a new Collision Group is constructed.
      collisionGroups.push([schedule.cid()]);
    } else {
      collisionGroups
        .slice()
        .reverse()
        .some(group => {
          if (~inArray(found.cid(), group)) {
            // If you find a previous schedule that overlaps, include it in the Collision Group to which it belongs.
            group.push(schedule.cid());

            return true; // returning true can stop this loop
          }

          return false;
        });
    }
  });

  return collisionGroups;
}

/**
 * Get row length by column index in 2d matrix.
 * @param {array[]} arr2d Matrix
 * @param {number} col Column index.
 * @returns {number} Last row number in column or -1
 */
export function getLastRowInColumn(arr2d: Array<any[]>, col: number) {
  let row = arr2d.length;

  while (row > 0) {
    row -= 1;
    if (!isUndefined(arr2d[row][col])) {
      return row;
    }
  }

  return -1;
}

/**
 * Calculate matrix for appointment block element placing.
 * @param {Collection} collection model collection.
 * @param {Array<number[]>} collisionGroups Collision groups for schedule set.
 * @returns {array} matrices
 */
export function getMatrices<T extends Schedule | ScheduleViewModel>(
  collection: Collection<T>,
  collisionGroups: CollisionGroup
): ScheduleMatrix<T> {
  const result: ScheduleMatrix<T> = [];

  collisionGroups.forEach(function(group) {
    const matrix: Array<T[]> = [[]];

    group.forEach(function(scheduleID) {
      const schedule: T = collection.items[scheduleID];
      let col = 0;
      let found = false;
      let nextRow;
      let lastRowInColumn;

      while (!found) {
        lastRowInColumn = getLastRowInColumn(matrix, col);

        if (lastRowInColumn === -1) {
          matrix[0].push(schedule);
          found = true;
        } else if (!schedule.collidesWith(matrix[lastRowInColumn][col])) {
          nextRow = lastRowInColumn + 1;
          if (isUndefined(matrix[nextRow])) {
            matrix[nextRow] = [];
          }
          matrix[nextRow][col] = schedule;
          found = true;
        }

        col += 1;
      }
    });

    result.push(matrix);
  });

  return result;
}

/**
 * Filter that get schedule model in supplied date ranges.
 * @param {TZDate} start - start date
 * @param {TZDate} end - end date
 * @returns {function} schedule filter function
 */
export function getScheduleInDateRangeFilter(
  start: TZDate,
  end: TZDate
): Filter<Schedule | ScheduleViewModel> {
  return model => {
    const ownStarts = model.getStarts();
    const ownEnds = model.getEnds();

    // shorthand condition of
    //
    // (ownStarts >= start && ownEnds <= end) ||
    // (ownStarts < start && ownEnds >= start) ||
    // (ownEnds > end && ownStarts <= end)
    return !(ownEnds < start || ownStarts > end);
  };
}

/**
 * Position each view model for placing into container
 * @param {TZDate} start - start date to render
 * @param {TZDate} end - end date to render
 * @param {ScheduleMatrix} matrices - matrices from controller
 * @param {function} [iteratee] - iteratee function invoke each view models
 */
export function positionViewModels(
  start: TZDate,
  end: TZDate,
  matrices: ScheduleMatrix<ScheduleViewModel>,
  iteratee?: (viewModel: ScheduleViewModel) => void
) {
  const ymdListToRender = makeDateRange(start, end, MILLISECONDS_PER_DAY).map(date => {
    return format(date, 'YYYYMMDD');
  });

  matrices.forEach(matrix => {
    matrix.forEach(column => {
      column.forEach((viewModel, index) => {
        if (!viewModel) {
          return;
        }

        const ymd = format(viewModel.getStarts(), 'YYYYMMDD');
        const dateLength = makeDateRange(
          toStartOfDay(viewModel.getStarts()),
          toEndOfDay(viewModel.getEnds()),
          MILLISECONDS_PER_DAY
        ).length;

        viewModel.top = index;
        viewModel.left = inArray(ymd, ymdListToRender);
        viewModel.width = dateLength;

        if (iteratee) {
          iteratee(viewModel);
        }
      });
    });
  });
}

/**
 * Limit render range for view models
 * @param {ScheduleViewModel} viewModel - view model instance
 * @returns {ScheduleViewModel} view model that limited render range
 */
function limit(start: TZDate, end: TZDate, viewModel: ScheduleViewModel) {
  if (viewModel.getStarts() < start) {
    viewModel.exceedLeft = true;
    viewModel.renderStarts = new TZDate(start);
  }

  if (viewModel.getEnds() > end) {
    viewModel.exceedRight = true;
    viewModel.renderEnds = new TZDate(end);
  }

  return viewModel;
}

/**
 * Limit start, end date each view model for render properly
 * @param {TZDate} start - start date to render
 * @param {TZDate} end - end date to render
 * @param {Collection<ScheduleViewModel>|ScheduleViewModel} viewModelColl - schedule view
 *  model collection or ScheduleViewModel
 * @returns {ScheduleViewModel} return view model when third parameter is
 *  view model
 */
export function limitRenderRange(
  start: TZDate,
  end: TZDate,
  viewModelColl: Collection<ScheduleViewModel> | ScheduleViewModel
) {
  if (viewModelColl instanceof Collection) {
    viewModelColl.each(viewModel => {
      limit(start, end, viewModel);

      return true;
    });

    return null;
  }

  return limit(start, end, viewModelColl);
}

/**
 * Convert schedule model collection to view model collection.
 * @param {Collection} scheduleCollection - collection of schedule model
 * @returns {Collection} collection of schedule view model
 */
export function convertToViewModel(scheduleCollection: Collection<Schedule>) {
  const viewModelColl = new Collection<ScheduleViewModel>(viewModel => {
    return viewModel.cid();
  });

  scheduleCollection.each(function(schedule) {
    viewModelColl.add(ScheduleViewModel.create(schedule));
  });

  return viewModelColl;
}
