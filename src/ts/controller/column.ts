import ScheduleViewModel from '@src/model/scheduleViewModel';
import Schedule, { isTimeEvent } from '@src/model/schedule';
import TZDate from '@src/time/date';
import array from '@src/util/array';
import { createScheduleCollection } from '@src/controller/base';
import { getCollisionGroup, getMatrices } from '@src/controller/core';
import { getCollides } from '@src/controller/week';
import { getTopHeightByTime } from '@src/controller/times';
import { addMinutes, max, min } from '@src/time/datetime';

const MIN_HEIGHT_PERCENT = 1;
const MIN_MODEL_HEIGHT_PERCENT = 20;

/**
 * Filter that get events in supplied date ranges.
 * @param {TZDate} startColumnTime - start date
 * @param {TZDate} endColumnTime - end date
 * @returns {function} schedule filter function
 */
export function isBetween(startColumnTime: TZDate, endColumnTime: TZDate) {
  return (model: Schedule) => {
    const { start, end, goingDuration = 0, comingDuration = 0 } = model;
    const ownStarts = addMinutes(start, -goingDuration);
    const ownEnds = addMinutes(end, comingDuration);

    // shorthand condition of
    //
    // (ownStarts >= start && ownEnds < end) ||
    // (ownStarts < start && ownEnds > start) ||
    // (ownEnds > end && ownStarts < end)
    return !(ownEnds <= startColumnTime || ownStarts >= endColumnTime);
  };
}

export function getViewModels(events: Schedule[], startColumnTime: TZDate, endColumnTime: TZDate) {
  const viewModels: ScheduleViewModel[] = events
    .filter(isTimeEvent)
    .filter(isBetween(startColumnTime, endColumnTime))
    .sort(array.compare.schedule.asc)
    .map(ScheduleViewModel.create);
  const viewModelColl = createScheduleCollection(...viewModels);
  const collisionGroups = getCollisionGroup(viewModels);
  const matrices = getCollides(getMatrices(viewModelColl, collisionGroups));

  // get positions(top, left, width, height)
  matrices.forEach(matrix => {
    const maxRowLength = Math.max(...matrix.map(row => row.length));
    const baseWidth = 100 / maxRowLength;

    matrix.forEach(row => {
      // eslint-disable-next-line complexity
      row.forEach((viewModel, col) => {
        const { goingDuration = 0, comingDuration = 0 } = viewModel.valueOf();
        const modelStart = viewModel.getStarts();
        const modelEnd = viewModel.getEnds();
        const goingStart = addMinutes(modelStart, -goingDuration);
        const comingEnd = addMinutes(modelEnd, comingDuration);
        const renderStart = max(goingStart, startColumnTime);
        const renderEnd = min(comingEnd, endColumnTime);
        const { top, height } = getTopHeightByTime(
          renderStart,
          renderEnd,
          startColumnTime,
          endColumnTime
        );
        const width = baseWidth;
        const left = width * col;

        viewModel.top = top;
        viewModel.left = left;
        viewModel.width = width;
        viewModel.height = height < MIN_HEIGHT_PERCENT ? MIN_HEIGHT_PERCENT : height;

        let modelDurationHeight = 100;

        if (goingDuration && startColumnTime <= goingStart) {
          const { height: goingDurationHeight } = getTopHeightByTime(
            renderStart,
            modelStart,
            renderStart,
            renderEnd
          );
          viewModel.goingDurationHeight = goingDurationHeight;
          modelDurationHeight -= goingDurationHeight;
        }

        if (comingDuration && endColumnTime >= comingEnd) {
          const { height: comingDurationHeight } = getTopHeightByTime(
            modelEnd,
            renderEnd,
            renderStart,
            renderEnd
          );
          viewModel.comingDurationHeight = comingDurationHeight;
          modelDurationHeight -= comingDurationHeight;
        }

        if (modelDurationHeight <= MIN_MODEL_HEIGHT_PERCENT && renderStart < modelEnd) {
          modelDurationHeight = MIN_MODEL_HEIGHT_PERCENT;
        }

        viewModel.modelDurationHeight = modelDurationHeight;

        if (goingStart < startColumnTime) {
          viewModel.croppedStart = true;
        }
        if (comingEnd > endColumnTime) {
          viewModel.croppedEnd = true;
        }
      });
    });
  });

  return viewModels;
}
