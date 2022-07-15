import { createEventCollection } from '@src/controller/base';
import { getCollisionGroup, getMatrices } from '@src/controller/core';
import { getTopHeightByTime } from '@src/controller/times';
import { isTimeEvent } from '@src/model/eventModel';
import type EventUIModel from '@src/model/eventUIModel';
import type TZDate from '@src/time/date';
import { addMinutes, max, min } from '@src/time/datetime';
import type { EventObjectWithDefaultValues } from '@src/types/events';
import array from '@src/utils/array';

const MIN_HEIGHT_PERCENT = 1;

const COLLAPSED_DUPLICATE_EVENT_WIDTH = 5;

/**
 * TODO @dotaitch
 * remove temporary options
 */
const collapseDuplicateEvents = {
  getDuplicateEvents: (
    targetEvent: EventObjectWithDefaultValues,
    events: EventObjectWithDefaultValues[]
  ) => events.filter((event: EventObjectWithDefaultValues) => event.id === targetEvent.id),
  sortDuplicateEvents: (events: EventObjectWithDefaultValues[]) =>
    events.sort((a, b) => (a.calendarId > b.calendarId ? 1 : -1)),
  getMainEvent: (events: EventObjectWithDefaultValues[]) => events[events.length - 1],
};

interface RenderInfoOptions {
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

function setInnerHeights(uiModel: EventUIModel, options: RenderInfoOptions) {
  const { renderStart, renderEnd, modelStart, modelEnd } = options;
  const { goingDuration = 0, comingDuration = 0 } = uiModel.model;

  let modelDurationHeight = 100;

  if (goingDuration > 0) {
    const { height: goingDurationHeight } = getTopHeightByTime(
      renderStart,
      modelStart,
      renderStart,
      renderEnd
    );
    uiModel.goingDurationHeight = goingDurationHeight;
    modelDurationHeight -= goingDurationHeight;
  }

  if (comingDuration > 0) {
    const { height: comingDurationHeight } = getTopHeightByTime(
      modelEnd,
      renderEnd,
      renderStart,
      renderEnd
    );
    uiModel.comingDurationHeight = comingDurationHeight;
    modelDurationHeight -= comingDurationHeight;
  }

  uiModel.modelDurationHeight = modelDurationHeight;
}

function setCroppedEdges(uiModel: EventUIModel, options: RenderInfoOptions) {
  const { goingStart, comingEnd, startColumnTime, endColumnTime } = options;

  if (goingStart < startColumnTime) {
    uiModel.croppedStart = true;
  }
  if (comingEnd > endColumnTime) {
    uiModel.croppedEnd = true;
  }
}

function setDimensionOfDuplicateEvent(uiModel: EventUIModel, options: RenderInfoOptions) {
  const { startColumnTime, endColumnTime, baseWidth, columnIndex } = options;
  const { duplicateEvents } = uiModel;
  let cumulativeLeft = baseWidth * columnIndex;

  duplicateEvents.forEach((event) => {
    const { renderStart, renderEnd } = getRenderInfoOptions(
      event,
      columnIndex,
      baseWidth,
      startColumnTime,
      endColumnTime
    );
    const { top, height } = getTopHeightByTime(
      renderStart,
      renderEnd,
      startColumnTime,
      endColumnTime
    );
    const width = event.collapse
      ? COLLAPSED_DUPLICATE_EVENT_WIDTH
      : baseWidth - COLLAPSED_DUPLICATE_EVENT_WIDTH * (duplicateEvents.length - 1);
    event.setUIProps({
      top,
      height,
      width,
      left: cumulativeLeft,
    });

    cumulativeLeft += width;
  });
}

function setDimension(uiModel: EventUIModel, options: RenderInfoOptions) {
  const { startColumnTime, endColumnTime, baseWidth, columnIndex } = options;

  if (uiModel.duplicateEvents.length === 0) {
    const { renderStart, renderEnd } = options;
    const { top, height } = getTopHeightByTime(
      renderStart,
      renderEnd,
      startColumnTime,
      endColumnTime
    );
    uiModel.setUIProps({
      top,
      left: baseWidth * columnIndex,
      width: baseWidth,
      height: Math.max(MIN_HEIGHT_PERCENT, height),
    });
  } else {
    setDimensionOfDuplicateEvent(uiModel, options);
  }
}

function getRenderInfoOptions(
  uiModel: EventUIModel,
  columnIndex: number,
  baseWidth: number,
  startColumnTime: TZDate,
  endColumnTime: TZDate
) {
  const { goingDuration = 0, comingDuration = 0 } = uiModel.model;
  const modelStart = uiModel.getStarts();
  const modelEnd = uiModel.getEnds();
  const goingStart = addMinutes(modelStart, -goingDuration);
  const comingEnd = addMinutes(modelEnd, comingDuration);
  const renderStart = max(goingStart, startColumnTime);
  const renderEnd = min(comingEnd, endColumnTime);

  return {
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
    duplicateEvents: uiModel.duplicateEvents,
  };
}

function setRenderInfo(
  uiModel: EventUIModel,
  columnIndex: number,
  baseWidth: number,
  startColumnTime: TZDate,
  endColumnTime: TZDate
) {
  const renderInfoOptions = getRenderInfoOptions(
    uiModel,
    columnIndex,
    baseWidth,
    startColumnTime,
    endColumnTime
  );

  setDimension(uiModel, renderInfoOptions);
  setInnerHeights(uiModel, renderInfoOptions);
  setCroppedEdges(uiModel, renderInfoOptions);
}

function setDuplicateEvents(
  uiModels: EventUIModel[],
  options: typeof collapseDuplicateEvents,
  selectedDuplicateEventCid: number
) {
  const { getDuplicateEvents, sortDuplicateEvents, getMainEvent } = options;

  const eventObjects = uiModels.map((uiModel) => uiModel.model.toEventObject());

  uiModels.forEach((targetUIModel) => {
    if (targetUIModel.collapse || targetUIModel.duplicateEvents.length > 0) {
      return;
    }

    const duplicateEvents = getDuplicateEvents(targetUIModel.model.toEventObject(), eventObjects);

    if (duplicateEvents.length <= 1) {
      return;
    }

    const sortedDuplicateEvents = sortDuplicateEvents(duplicateEvents);
    const mainEvent = getMainEvent(sortedDuplicateEvents);

    const sortedDuplicateEventUIModel = sortedDuplicateEvents.map(
      (event) => uiModels.find((uiModel) => uiModel.cid() === event.__cid) as EventUIModel
    );
    const isSelectedGroup = !!(
      selectedDuplicateEventCid > -1 &&
      duplicateEvents.find((event) => event.__cid === selectedDuplicateEventCid)
    );

    sortedDuplicateEventUIModel.forEach((event) => {
      const isMain = event.cid() === mainEvent.__cid;
      const collapse = !(
        (isSelectedGroup && event.cid() === selectedDuplicateEventCid) ||
        (!isSelectedGroup && isMain)
      );

      event.setUIProps({
        duplicateEvents: sortedDuplicateEventUIModel,
        collapse,
        isMain,
      });
    });
  });

  return uiModels;
}

/**
 * Convert to EventUIModel and make rendering information of events
 * @param {EventUIModel[]} events - event list
 * @param {TZDate} startColumnTime - start date
 * @param {TZDate} endColumnTime - end date
 */
export function setRenderInfoOfUIModels(
  events: EventUIModel[],
  startColumnTime: TZDate,
  endColumnTime: TZDate,
  selectedDuplicateEventCid: number
) {
  const uiModels: EventUIModel[] = events
    .filter(isTimeEvent)
    .filter(isBetween(startColumnTime, endColumnTime))
    .sort(array.compare.event.asc);

  if (collapseDuplicateEvents) {
    setDuplicateEvents(uiModels, collapseDuplicateEvents, selectedDuplicateEventCid);
  }
  const expandedEvents = uiModels.filter((uiModel) => !uiModel.collapse);

  const uiModelColl = createEventCollection(...expandedEvents);
  const usingTravelTime = true;
  const collisionGroups = getCollisionGroup(expandedEvents, usingTravelTime);
  const matrices = getMatrices(uiModelColl, collisionGroups, usingTravelTime);

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
