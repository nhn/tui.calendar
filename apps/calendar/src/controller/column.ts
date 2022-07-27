import { DEFAULT_DUPLICATE_EVENT_CID } from '@src/constants/layout';
import {
  COLLAPSED_DUPLICATE_EVENT_WIDTH_PX,
  TIME_EVENT_CONTAINER_MARGIN_LEFT,
} from '@src/constants/style';
import { createEventCollection } from '@src/controller/base';
import { getCollisionGroup, getMatrices } from '@src/controller/core';
import { getTopHeightByTime } from '@src/controller/times';
import { extractPercentPx, toPercent, toPx } from '@src/helpers/css';
import { isTimeEvent } from '@src/model/eventModel';
import type EventUIModel from '@src/model/eventUIModel';
import type TZDate from '@src/time/date';
import { addMinutes, max, min } from '@src/time/datetime';
import type { CollapseDuplicateEventsOptions } from '@src/types/options';
import array from '@src/utils/array';

const MIN_HEIGHT_PERCENT = 1;

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

function getDuplicateLeft(uiModel: EventUIModel, baseLeft: number) {
  const { duplicateEvents, duplicateEventIndex } = uiModel;

  const prevEvent = duplicateEvents[duplicateEventIndex - 1];
  let left: number | string = baseLeft;
  if (prevEvent) {
    // duplicateLeft = prevEvent.duplicateLeft + prevEvent.duplicateWidth + marginLeft
    const { percent: leftPercent, px: leftPx } = extractPercentPx(`${prevEvent.duplicateLeft}`);
    const { percent: widthPercent, px: widthPx } = extractPercentPx(`${prevEvent.duplicateWidth}`);
    const percent = leftPercent + widthPercent;
    const px = leftPx + widthPx + TIME_EVENT_CONTAINER_MARGIN_LEFT;

    if (percent !== 0) {
      left = `calc(${toPercent(percent)} ${px > 0 ? '+' : '-'} ${toPx(Math.abs(px))})`;
    } else {
      left = toPx(px);
    }
  } else {
    left = toPercent(left);
  }

  return left;
}

function getDuplicateWidth(uiModel: EventUIModel, baseWidth: number) {
  const { collapse } = uiModel;

  // if it is collapsed, (COLLAPSED_DUPLICATE_EVENT_WIDTH_PX)px
  // if it is expanded, (baseWidth)% - (other duplicate events' width + marginLeft)px - (its marginLeft)px
  return collapse
    ? `${COLLAPSED_DUPLICATE_EVENT_WIDTH_PX}px`
    : `calc(${toPercent(baseWidth)} - ${toPx(
        (COLLAPSED_DUPLICATE_EVENT_WIDTH_PX + TIME_EVENT_CONTAINER_MARGIN_LEFT) *
          (uiModel.duplicateEvents.length - 1) +
          TIME_EVENT_CONTAINER_MARGIN_LEFT
      )})`;
}

function setDimension(uiModel: EventUIModel, options: RenderInfoOptions) {
  const { startColumnTime, endColumnTime, baseWidth, columnIndex, renderStart, renderEnd } =
    options;
  const { duplicateEvents } = uiModel;
  const { top, height } = getTopHeightByTime(
    renderStart,
    renderEnd,
    startColumnTime,
    endColumnTime
  );
  const dimension = {
    top,
    left: baseWidth * columnIndex,
    width: baseWidth,
    height: Math.max(MIN_HEIGHT_PERCENT, height),
    duplicateLeft: '',
    duplicateWidth: '',
  };

  if (duplicateEvents.length > 0) {
    dimension.duplicateLeft = getDuplicateLeft(uiModel, dimension.left);
    dimension.duplicateWidth = getDuplicateWidth(uiModel, dimension.width);
  }

  uiModel.setUIProps(dimension);
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

function setRenderInfo({
  uiModel,
  columnIndex,
  baseWidth,
  startColumnTime,
  endColumnTime,
  isDuplicateEvent = false,
}: {
  uiModel: EventUIModel;
  columnIndex: number;
  baseWidth: number;
  startColumnTime: TZDate;
  endColumnTime: TZDate;
  isDuplicateEvent?: boolean;
}) {
  if (!isDuplicateEvent && uiModel.duplicateEvents.length > 0) {
    uiModel.duplicateEvents.forEach((event) => {
      setRenderInfo({
        uiModel: event,
        columnIndex,
        baseWidth,
        startColumnTime,
        endColumnTime,
        isDuplicateEvent: true,
      });
    });

    return;
  }

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
  options: CollapseDuplicateEventsOptions,
  selectedDuplicateEventCid: number
) {
  const { getDuplicateEvents, getMainEvent } = options;

  const eventObjects = uiModels.map((uiModel) => uiModel.model.toEventObject());

  uiModels.forEach((targetUIModel) => {
    if (targetUIModel.collapse || targetUIModel.duplicateEvents.length > 0) {
      return;
    }

    const duplicateEvents = getDuplicateEvents(targetUIModel.model.toEventObject(), eventObjects);

    if (duplicateEvents.length <= 1) {
      return;
    }

    const mainEvent = getMainEvent(duplicateEvents);

    const duplicateEventUIModels = duplicateEvents.map(
      (event) => uiModels.find((uiModel) => uiModel.cid() === event.__cid) as EventUIModel
    );
    const isSelectedGroup = !!(
      selectedDuplicateEventCid > DEFAULT_DUPLICATE_EVENT_CID &&
      duplicateEvents.find((event) => event.__cid === selectedDuplicateEventCid)
    );
    const duplicateStarts = duplicateEvents.reduce((acc, { start, goingDuration }) => {
      const renderStart = addMinutes(start, -goingDuration);
      return min(acc, renderStart);
    }, duplicateEvents[0].start);
    const duplicateEnds = duplicateEvents.reduce((acc, { end, comingDuration }) => {
      const renderEnd = addMinutes(end, comingDuration);
      return max(acc, renderEnd);
    }, duplicateEvents[0].end);

    duplicateEventUIModels.forEach((event, index) => {
      const isMain = event.cid() === mainEvent.__cid;
      const collapse = !(
        (isSelectedGroup && event.cid() === selectedDuplicateEventCid) ||
        (!isSelectedGroup && isMain)
      );

      event.setUIProps({
        duplicateEvents: duplicateEventUIModels,
        duplicateEventIndex: index,
        collapse,
        isMain,
        duplicateStarts,
        duplicateEnds,
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
  selectedDuplicateEventCid: number,
  collapseDuplicateEventsOptions?: CollapseDuplicateEventsOptions
) {
  const uiModels: EventUIModel[] = events
    .filter(isTimeEvent)
    .filter(isBetween(startColumnTime, endColumnTime))
    .sort(array.compare.event.asc);

  if (collapseDuplicateEventsOptions) {
    setDuplicateEvents(uiModels, collapseDuplicateEventsOptions, selectedDuplicateEventCid);
  }
  const expandedEvents = uiModels.filter((uiModel) => !uiModel.collapse);

  const uiModelColl = createEventCollection(...expandedEvents);
  const usingTravelTime = true;
  const collisionGroups = getCollisionGroup(expandedEvents, usingTravelTime);
  const matrices = getMatrices(uiModelColl, collisionGroups, usingTravelTime);

  matrices.forEach((matrix) => {
    const maxRowLength = Math.max(...matrix.map((row) => row.length));
    const baseWidth = Math.round(100 / maxRowLength);

    matrix.forEach((row) => {
      row.forEach((uiModel, columnIndex) => {
        setRenderInfo({ uiModel, columnIndex, baseWidth, startColumnTime, endColumnTime });
      });
    });
  });

  return uiModels;
}
