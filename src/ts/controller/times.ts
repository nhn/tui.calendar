import TZDate from '@src/time/date';
import { ratio, limit } from '@src/util/math';

/**
 * @param {TZDate} [time] - target time which is converted to percent value
 * @param {TZDate} [start] - start time
 * @param {TZDate} [end] - end time
 * @returns {number} The percent value represent current time between start and end
 */
export function getTopPercentByTime(date: TZDate, start: TZDate, end: TZDate) {
  const s = start.getTime();
  const e = end.getTime();
  const time = limit(date.getTime(), [s], [e]) - s;
  const max = e - s;

  const topPercent = ratio(max, 100, time);

  return limit(topPercent, [0], [100]);
}
