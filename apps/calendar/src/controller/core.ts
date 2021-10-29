/**
 * @fileoverview Core methods for schedule block placing
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
import inArray from 'tui-code-snippet/array/inArray';

import EventUIModel from '@src/model/eventUIModel';
import Schedule from '@src/model/schedule';
import TZDate from '@src/time/date';
import { makeDateRange, MS_PER_DAY, toEndOfDay, toFormat, toStartOfDay } from '@src/time/datetime';
import Collection, { Filter } from '@src/util/collection';
import { isUndefined } from '@src/util/utils';

import { CollisionGroup, Matrix, Matrix3d } from '@t/events';

/**
 * Calculate collision group.
 * @param {Array<Schedule|EventUIModel>} schedules List of ui models.
 * @param {boolean} [usingTravelTime = true]
 * @returns {Array<number[]>} Collision Group.
 */
export function getCollisionGroup<Events extends Schedule | EventUIModel>(
  schedules: Events[],
  usingTravelTime = true
) {
  const collisionGroups: CollisionGroup = [];
  let previousScheduleList: Array<Events>;

  if (!schedules.length) {
    return collisionGroups;
  }

  collisionGroups[0] = [schedules[0].cid()];
  schedules.slice(1).forEach((schedule: Events, index: number) => {
    previousScheduleList = schedules.slice(0, index + 1).reverse();

    // If overlapping previous schedules, find a Collision Group of overlapping schedules and add this schedules
    const found = previousScheduleList.find((previous: Events) =>
      schedule.collidesWith(previous, usingTravelTime)
    );

    if (!found) {
      // This schedule is a schedule that does not overlap with the previous schedule, so a new Collision Group is constructed.
      collisionGroups.push([schedule.cid()]);
    } else {
      collisionGroups
        .slice()
        .reverse()
        .some((group) => {
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
 * @param {array[]} matrix Matrix
 * @param {number} col Column index.
 * @returns {number} Last row number in column or -1
 */
export function getLastRowInColumn(matrix: Array<any[]>, col: number) {
  let { length: row } = matrix;

  while (row > 0) {
    row -= 1;
    if (!isUndefined(matrix[row][col])) {
      return row;
    }
  }

  return -1;
}

/**
 * Calculate matrix for appointment block element placing.
 * @param {Collection} collection model collection.
 * @param {Array<number[]>} collisionGroups Collision groups for schedule set.
 * @param {boolean} [usingTravelTime = true]
 * @returns {array} matrices
 */
export function getMatrices<T extends Schedule | EventUIModel>(
  collection: Collection<T>,
  collisionGroups: CollisionGroup,
  usingTravelTime = true
): Matrix3d<T> {
  const result: Matrix3d<T> = [];

  collisionGroups.forEach((group) => {
    const matrix: Matrix<T> = [[]];

    group.forEach((scheduleID) => {
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
        } else if (!schedule.collidesWith(matrix[lastRowInColumn][col], usingTravelTime)) {
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
): Filter<Schedule | EventUIModel> {
  return (model) => {
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
 * Position each ui model for placing into container
 * @param {TZDate} start - start date to render
 * @param {TZDate} end - end date to render
 * @param {Matrix3d} matrices - matrices from controller
 * @param {function} [iteratee] - iteratee function invoke each ui models
 */
export function positionUIModels(
  start: TZDate,
  end: TZDate,
  matrices: Matrix3d<EventUIModel>,
  iteratee?: (uiModel: EventUIModel) => void
) {
  const ymdListToRender = makeDateRange(start, end, MS_PER_DAY).map((date) =>
    toFormat(date, 'YYYYMMDD')
  );

  matrices.forEach((matrix) => {
    matrix.forEach((column) => {
      column.forEach((uiModel, index) => {
        if (!uiModel) {
          return;
        }

        const ymd = toFormat(uiModel.getStarts(), 'YYYYMMDD');
        const dateLength = makeDateRange(
          toStartOfDay(uiModel.getStarts()),
          toEndOfDay(uiModel.getEnds()),
          MS_PER_DAY
        ).length;

        uiModel.top = index;
        uiModel.left = inArray(ymd, ymdListToRender);
        uiModel.width = dateLength;

        iteratee?.(uiModel);
      });
    });
  });
}

/**
 * Limit render range for ui models
 * @param {TZDate} start
 * @param {TZDate} end
 * @param {EventUIModel} uiModel - ui model instance
 * @returns {EventUIModel} ui model that limited render range
 */
function limit(start: TZDate, end: TZDate, uiModel: EventUIModel) {
  if (uiModel.getStarts() < start) {
    uiModel.exceedLeft = true;
    uiModel.renderStarts = new TZDate(start);
  }

  if (uiModel.getEnds() > end) {
    uiModel.exceedRight = true;
    uiModel.renderEnds = new TZDate(end);
  }

  return uiModel;
}

/**
 * Limit start, end date each ui model for render properly
 * @param {TZDate} start - start date to render
 * @param {TZDate} end - end date to render
 * @param {Collection<EventUIModel>|EventUIModel} uiModelColl - schedule view
 *  model collection or EventUIModel
 * @returns {?EventUIModel} return ui model when third parameter is
 *  ui model
 */
export function limitRenderRange(
  start: TZDate,
  end: TZDate,
  uiModelColl: Collection<EventUIModel> | EventUIModel
) {
  if (uiModelColl instanceof Collection) {
    uiModelColl.each((uiModel) => {
      limit(start, end, uiModel);

      return true;
    });

    return null;
  }

  return limit(start, end, uiModelColl);
}

/**
 * Convert schedule model collection to ui model collection.
 * @param {Collection} scheduleCollection - collection of schedule model
 * @returns {Collection} collection of schedule ui model
 */
export function convertToUIModel(scheduleCollection: Collection<Schedule>) {
  const uiModelColl = new Collection<EventUIModel>((uiModel) => {
    return uiModel.cid();
  });

  scheduleCollection.each(function (schedule) {
    uiModelColl.add(EventUIModel.create(schedule));
  });

  return uiModelColl;
}
