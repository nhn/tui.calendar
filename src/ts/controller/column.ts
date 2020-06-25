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

interface RenderInfoOption {
  baseWidth: number;
  columnIndex: number;
  renderStart: TZDate;
  renderEnd: TZDate;
  modelStart: TZDate;
  modelEnd: TZDate;
  goingStart: TZDate;
  comingEnd: TZDate;
  startColumnTime: TZDate;
  endColumnTime: TZDate;
}

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

    return !(ownEnds <= startColumnTime || ownStarts >= endColumnTime);
  };
}

function hasGoingDuration(viewModel: ScheduleViewModel, option: RenderInfoOption) {
  const { goingStart, startColumnTime } = option;
  const { goingDuration = 0 } = viewModel.valueOf();

  return goingDuration && startColumnTime <= goingStart;
}

function hasComingDuration(viewModel: ScheduleViewModel, option: RenderInfoOption) {
  const { comingEnd, endColumnTime } = option;
  const { comingDuration = 0 } = viewModel.valueOf();

  return comingDuration && endColumnTime >= comingEnd;
}

function setInnerHeights(viewModel: ScheduleViewModel, option: RenderInfoOption) {
  const { renderStart, renderEnd, modelStart, modelEnd } = option;
  let modelDurationHeight = 100;

  if (hasGoingDuration(viewModel, option)) {
    const { height: goingDurationHeight } = getTopHeightByTime(
      renderStart,
      modelStart,
      renderStart,
      renderEnd
    );
    viewModel.goingDurationHeight = goingDurationHeight;
    modelDurationHeight -= goingDurationHeight;
  }

  if (hasComingDuration(viewModel, option)) {
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
}

function setCroppedEdges(viewModel: ScheduleViewModel, option: RenderInfoOption) {
  const { goingStart, comingEnd, startColumnTime, endColumnTime } = option;

  if (goingStart < startColumnTime) {
    viewModel.croppedStart = true;
  }
  if (comingEnd > endColumnTime) {
    viewModel.croppedEnd = true;
  }
}

function setDimension(viewModel: ScheduleViewModel, option: RenderInfoOption) {
  const { renderStart, renderEnd, startColumnTime, endColumnTime, baseWidth, columnIndex } = option;
  const { top, height } = getTopHeightByTime(
    renderStart,
    renderEnd,
    startColumnTime,
    endColumnTime
  );
  const left = baseWidth * columnIndex;
  viewModel.top = top;
  viewModel.left = left;
  viewModel.width = baseWidth;
  viewModel.height = height < MIN_HEIGHT_PERCENT ? MIN_HEIGHT_PERCENT : height;
}

function setRenderInfo(
  viewModel: ScheduleViewModel,
  columnIndex: number,
  baseWidth: number,
  startColumnTime: TZDate,
  endColumnTime: TZDate
) {
  const { goingDuration = 0, comingDuration = 0 } = viewModel.valueOf();
  const modelStart = viewModel.getStarts();
  const modelEnd = viewModel.getEnds();
  const goingStart = addMinutes(modelStart, -goingDuration);
  const comingEnd = addMinutes(modelEnd, comingDuration);
  const renderStart = max(goingStart, startColumnTime);
  const renderEnd = min(comingEnd, endColumnTime);
  const renderInfoOption = {
    baseWidth,
    columnIndex,
    modelStart,
    modelEnd,
    renderStart,
    renderEnd,
    goingStart,
    comingEnd,
    startColumnTime,
    endColumnTime
  };

  setDimension(viewModel, renderInfoOption);
  setInnerHeights(viewModel, renderInfoOption);
  setCroppedEdges(viewModel, renderInfoOption);
}

/**
 * Convert to ScheduleViewModel and make rendering information of events
 * @param {Schedule[]} events - event list
 * @param {TZDate} startColumnTime - start date
 * @param {TZDate} endColumnTime - end date
 */
export function getViewModels(events: Schedule[], startColumnTime: TZDate, endColumnTime: TZDate) {
  const viewModels: ScheduleViewModel[] = events
    .filter(isTimeEvent)
    .filter(isBetween(startColumnTime, endColumnTime))
    .sort(array.compare.schedule.asc)
    .map(ScheduleViewModel.create);
  const viewModelColl = createScheduleCollection(...viewModels);
  const collisionGroups = getCollisionGroup(viewModels);
  const matrices = getCollides(getMatrices(viewModelColl, collisionGroups));

  matrices.forEach(matrix => {
    const maxRowLength = Math.max(...matrix.map(row => row.length));
    const baseWidth = 100 / maxRowLength;

    matrix.forEach(row => {
      row.forEach((viewModel, col) => {
        setRenderInfo(viewModel, col, baseWidth, startColumnTime, endColumnTime);
      });
    });
  });

  return viewModels;
}
