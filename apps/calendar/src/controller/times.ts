import getMousePosition from 'tui-code-snippet/domEvent/getMousePosition';
import getTarget from 'tui-code-snippet/domEvent/getTarget';
import closest from 'tui-code-snippet/domUtil/closest';
import TZDate from '@src/time/date';
import { ratio, limit } from '@src/util/math';
import { millisecondsTo, clone, addSeconds, addMilliseconds } from '@src/time/datetime';
import { getSize } from '@src/util/domutil';
import { TimeUnit } from '@src/model';
import { ColumnInfo } from '@src/components/timegrid/columns';

const DEFAULT_SLOT = 30;

type GridColumnInfo = Omit<ColumnInfo, 'times'>;

/**
 * @param {TZDate} [time] - target time which is converted to percent value
 * @param {TZDate} [start] - start time
 * @param {TZDate} [end] - end time
 * @returns {number} The percent value represent current time between start and end
 */
export function getTopPercentByTime(date: TZDate, start: TZDate, end: TZDate) {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const time = limit(date.getTime(), [startTime], [endTime]) - startTime;
  const max = endTime - startTime;

  const topPercent = ratio(max, 100, time);

  return limit(topPercent, [0], [100]);
}

/**
 * @typedef {Object} VerticalPositionsByTime
 * @property {number} top - top percent
 * @property {number} height - height percent
 */
/**
 *
 * @param {TZDate} start target time which is converted to percent value
 * @param {TZDate} end target time which is converted to percent value
 * @param {TZDate} minTime start time
 * @param {TZDate} maxTime end time
 * @returns {VerticalPositionsByTime} verticalPositions
 */
export function getTopHeightByTime(start: TZDate, end: TZDate, minTime: TZDate, maxTime: TZDate) {
  const top = getTopPercentByTime(start, minTime, maxTime);
  const bottom = getTopPercentByTime(end, minTime, maxTime);
  const height = bottom - top;

  return {
    top,
    height,
  };
}

function setValueByUnit(time: TZDate, value: number, unit: TimeUnit) {
  if (unit === 'minute') {
    time.setMinutes(value, 0, 0);
  } else if (unit === 'hour') {
    time.setHours(value, 0, 0, 0);
  } else if (unit === 'date') {
    time.setHours(0, 0, 0, 0);
    time.setDate(value + 1);
  } else if (unit === 'month') {
    time.setHours(0, 0, 0, 0);
    time.setMonth(value, 1);
  } else if (unit === 'year') {
    time.setHours(0, 0, 0, 0);
    time.setFullYear(value, 0, 1);
  }

  return time;
}

/**
 * Get a previous grid time before the time
 * @param {TZDate} time - target time
 * @returns {TZDate} - next grid time
 */
export function getPrevGridTime(time: TZDate, slot: number, unit: TimeUnit) {
  let index = 0;
  let prevGridTime = setValueByUnit(clone(time), slot * index, unit);
  let nextGridTime;

  index += 1;
  do {
    nextGridTime = setValueByUnit(clone(time), slot * index, unit);
    index += 1;

    if (nextGridTime < time) {
      prevGridTime = clone(nextGridTime);
    }
  } while (nextGridTime <= time);

  return prevGridTime;
}

/**
 * Get a next grid time after the time
 * @param {TZDate} time - target time
 * @returns {TZDate} - next grid time
 */
export function getNextGridTime(time: TZDate, slot: number, unit: TimeUnit) {
  let index = 0;
  let nextGridTime;

  do {
    nextGridTime = setValueByUnit(clone(time), slot * index, unit);
    index += 1;
  } while (nextGridTime < time);

  return nextGridTime;
}

/**
 * Get Y index ratio(unit like hour) in time grids by supplied parameters.
 * @param {TZDate} startTime - start time
 * @param {number} y - Y coordinate to calculate hour ratio.
 * @param {number} height - container element height.
 * @param {number} baseMs - base milliseconds number for supplied height.
 * @returns {number} hour index ratio value.
 */
function convertYPosToTime(startTime: TZDate, y: number, height: number, baseMs: number) {
  const secondsOfY = millisecondsTo('second', (y * baseMs) / height);

  return addSeconds(startTime, secondsOfY);
}

/**
 * Get a nearest grid time from mouseEvent between startTime and endTime
 * @param {MouseEvent} mouseEvent - mouse event
 * @param {TZDate} startGridTime - start time
 * @param {TZDate} endGridTime - end time
 * @param {string} containerSelector - a selector of container element to limit
 * @returns {number} nearestGridTimeY - nearest grid time of yAxis
 */
export function getPrevGridTimeFromMouseEvent(
  mouseEvent: MouseEvent,
  gridColumnInfo: GridColumnInfo,
  containerSelector: string
) {
  const {
    start: startGridTime,
    end: endGridTime,
    slot = DEFAULT_SLOT,
    unit = 'minute',
  } = gridColumnInfo;
  const target = getTarget(mouseEvent);
  const container = closest(target, containerSelector) || target;
  const { height: containerHeight } = getSize(container);
  const containerMilliseconds = endGridTime.getTime() - startGridTime.getTime();

  const [, mouseY] = getMousePosition(mouseEvent, container);
  let time = convertYPosToTime(startGridTime, mouseY, containerHeight, containerMilliseconds);

  if (time < startGridTime) {
    time = clone(startGridTime);
  } else if (time >= endGridTime) {
    time = addMilliseconds(endGridTime, -1);
  } else {
    time = addMilliseconds(time, 1);
  }

  return getPrevGridTime(time, slot, unit);
}
