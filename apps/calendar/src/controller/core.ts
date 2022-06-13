import type EventModel from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import { makeDateRange, MS_PER_DAY, toEndOfDay, toFormat, toStartOfDay } from '@src/time/datetime';
import type { Filter } from '@src/utils/collection';
import Collection from '@src/utils/collection';
import { isUndefined } from '@src/utils/type';

import type { CollisionGroup, Matrix, Matrix3d } from '@t/events';

/**
 * Calculate collision group.
 * @param {Array<EventModel|EventUIModel>} events list of ui models.
 * @param {boolean} [usingTravelTime = true]
 * @returns {Array<number[]>} Collision Group.
 */
export function getCollisionGroup<Events extends EventModel | EventUIModel>(
  events: Events[],
  usingTravelTime = true
) {
  const collisionGroups: CollisionGroup = [];
  let previousEventList: Array<Events>;

  if (!events.length) {
    return collisionGroups;
  }

  collisionGroups[0] = [events[0].cid()];
  events.slice(1).forEach((event: Events, index: number) => {
    previousEventList = events.slice(0, index + 1).reverse();

    // If overlapping previous events, find a Collision Group of overlapping events and add this events
    const found = previousEventList.find((previous: Events) =>
      event.collidesWith(previous, usingTravelTime)
    );

    if (!found) {
      // This event is a event that does not overlap with the previous event, so a new Collision Group is constructed.
      collisionGroups.push([event.cid()]);
    } else {
      collisionGroups
        .slice()
        .reverse()
        .some((group) => {
          if (~group.indexOf(found.cid())) {
            // If you find a previous event that overlaps, include it in the Collision Group to which it belongs.
            group.push(event.cid());

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
 * @param {Array<number[]>} collisionGroups Collision groups for event set.
 * @param {boolean} [usingTravelTime = true]
 * @returns {array} matrices
 */
export function getMatrices<T extends EventModel | EventUIModel>(
  collection: Collection<T>,
  collisionGroups: CollisionGroup,
  usingTravelTime = true
): Matrix3d<T> {
  const result: Matrix3d<T> = [];

  collisionGroups.forEach((group) => {
    const matrix: Matrix<T> = [[]];

    group.forEach((eventID) => {
      const event = collection.get(eventID) as T;
      let col = 0;
      let found = false;
      let nextRow;
      let lastRowInColumn;

      while (!found) {
        lastRowInColumn = getLastRowInColumn(matrix, col);

        if (lastRowInColumn === -1) {
          matrix[0].push(event);
          found = true;
        } else if (!event.collidesWith(matrix[lastRowInColumn][col], usingTravelTime)) {
          nextRow = lastRowInColumn + 1;
          if (isUndefined(matrix[nextRow])) {
            matrix[nextRow] = [];
          }
          matrix[nextRow][col] = event;
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
 * Filter that get event model in supplied date ranges.
 * @param {TZDate} start - start date
 * @param {TZDate} end - end date
 * @returns {function} event filter function
 */
export function getEventInDateRangeFilter(
  start: TZDate,
  end: TZDate
): Filter<EventModel | EventUIModel> {
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
        uiModel.left = ymdListToRender.indexOf(ymd);
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
 * @param {Collection<EventUIModel>|EventUIModel} uiModelColl - collection of EventUIModel or EventUIModel
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
 * Convert event model collection to ui model collection.
 * @param {Collection} eventCollection - collection of event model
 * @returns {Collection} collection of event ui model
 */
export function convertToUIModel(eventCollection: Collection<EventModel>) {
  const uiModelColl = new Collection<EventUIModel>((uiModel) => {
    return uiModel.cid();
  });

  eventCollection.each(function (event) {
    uiModelColl.add(new EventUIModel(event));
  });

  return uiModelColl;
}
