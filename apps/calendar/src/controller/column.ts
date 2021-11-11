import { createEventCollection } from '@src/controller/base';
import { getCollisionGroup, getMatrices } from '@src/controller/core';
import { getTopHeightByTime } from '@src/controller/times';
import { getCollides } from '@src/controller/week';
import { isTimeEvent } from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import { addMinutes, max, min } from '@src/time/datetime';
import array from '@src/utils/array';

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
 * @returns {function} event filter function
 */
export function isBetween(startColumnTime: TZDate, endColumnTime: TZDate) {
  return (uiModel: EventUIModel) => {
    const { goingDuration = 0, comingDuration = 0 } = uiModel.model;
    const ownStarts = addMinutes(uiModel.getStarts(), -goingDuration);
    const ownEnds = addMinutes(uiModel.getEnds(), comingDuration);

    return !(ownEnds <= startColumnTime || ownStarts >= endColumnTime);
  };
}

function hasGoingDuration(uiModel: EventUIModel, option: RenderInfoOption) {
  const { goingStart, startColumnTime } = option;
  const { goingDuration = 0 } = uiModel.valueOf();

  return goingDuration && startColumnTime <= goingStart;
}

function hasComingDuration(uiModel: EventUIModel, option: RenderInfoOption) {
  const { comingEnd, endColumnTime } = option;
  const { comingDuration = 0 } = uiModel.valueOf();

  return comingDuration && endColumnTime >= comingEnd;
}

function setInnerHeights(uiModel: EventUIModel, option: RenderInfoOption) {
  const { renderStart, renderEnd, modelStart, modelEnd } = option;
  let modelDurationHeight = 100;

  if (hasGoingDuration(uiModel, option)) {
    const { height: goingDurationHeight } = getTopHeightByTime(
      renderStart,
      modelStart,
      renderStart,
      renderEnd
    );
    uiModel.goingDurationHeight = goingDurationHeight;
    modelDurationHeight -= goingDurationHeight;
  }

  if (hasComingDuration(uiModel, option)) {
    const { height: comingDurationHeight } = getTopHeightByTime(
      modelEnd,
      renderEnd,
      renderStart,
      renderEnd
    );
    uiModel.comingDurationHeight = comingDurationHeight;
    modelDurationHeight -= comingDurationHeight;
  }

  if (modelDurationHeight <= MIN_MODEL_HEIGHT_PERCENT && renderStart < modelEnd) {
    modelDurationHeight = MIN_MODEL_HEIGHT_PERCENT;
  }

  uiModel.modelDurationHeight = modelDurationHeight;
}

function setCroppedEdges(uiModel: EventUIModel, option: RenderInfoOption) {
  const { goingStart, comingEnd, startColumnTime, endColumnTime } = option;

  if (goingStart < startColumnTime) {
    uiModel.croppedStart = true;
  }
  if (comingEnd > endColumnTime) {
    uiModel.croppedEnd = true;
  }
}

function setDimension(uiModel: EventUIModel, option: RenderInfoOption) {
  const { renderStart, renderEnd, startColumnTime, endColumnTime, baseWidth, columnIndex } = option;
  const { top, height } = getTopHeightByTime(
    renderStart,
    renderEnd,
    startColumnTime,
    endColumnTime
  );
  const left = baseWidth * columnIndex;
  uiModel.top = top;
  uiModel.left = left;
  uiModel.width = baseWidth;
  uiModel.height = height < MIN_HEIGHT_PERCENT ? MIN_HEIGHT_PERCENT : height;
}

function setRenderInfo(
  uiModel: EventUIModel,
  columnIndex: number,
  baseWidth: number,
  startColumnTime: TZDate,
  endColumnTime: TZDate
) {
  const { goingDuration = 0, comingDuration = 0 } = uiModel.valueOf();
  const modelStart = uiModel.getStarts();
  const modelEnd = uiModel.getEnds();
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
    endColumnTime,
  };

  setDimension(uiModel, renderInfoOption);
  setInnerHeights(uiModel, renderInfoOption);
  setCroppedEdges(uiModel, renderInfoOption);
}

/**
 * Convert to EventUIModel and make rendering information of events
 * @param {EventUIModel[]} events - event list
 * @param {TZDate} startColumnTime - start date
 * @param {TZDate} endColumnTime - end date
 */
export function getUIModels(
  events: EventUIModel[],
  startColumnTime: TZDate,
  endColumnTime: TZDate
) {
  const uiModels: EventUIModel[] = events
    .filter(isTimeEvent)
    .filter(isBetween(startColumnTime, endColumnTime))
    .sort(array.compare.event.asc);
  const uiModelColl = createEventCollection(...uiModels);
  const usingTravelTime = true;
  const collisionGroups = getCollisionGroup(uiModels, usingTravelTime);
  const matrices = getCollides(getMatrices(uiModelColl, collisionGroups, usingTravelTime));

  matrices.forEach((matrix) => {
    const maxRowLength = Math.max(...matrix.map((row) => row.length));
    const baseWidth = 100 / maxRowLength;

    matrix.forEach((row) => {
      row.forEach((uiModel, col) => {
        setRenderInfo(uiModel, col, baseWidth, startColumnTime, endColumnTime);
      });
    });
  });

  return uiModels;
}
