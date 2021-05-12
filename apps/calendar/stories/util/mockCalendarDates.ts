import TZDate from '@src/time/date';
import { toStartOfDay } from '@src/time/datetime';
import { range } from '@src/util/utils';

export function getMockCurrentDate() {
  const date = new Date();
  const dayIndex = date.getDay();
  const startDateOfWeek = date.getDate() - dayIndex;
  const endDateOfWeek = startDateOfWeek + 6;

  return { date, startDateOfWeek, endDateOfWeek };
}

export function getWeekDates() {
  const { date, startDateOfWeek, endDateOfWeek } = getMockCurrentDate();

  const startDate = toStartOfDay(date.setDate(startDateOfWeek));
  const endDate = toStartOfDay(date.setDate(endDateOfWeek));
  const days = (Number(endDate) - Number(startDate)) / (24 * 1000 * 60 * 60) + 1;

  return range(days).map((index) => new TZDate(startDate).addDate(index));
}

export function getWeekendDates() {
  const { date, endDateOfWeek } = getMockCurrentDate();

  const saturday = endDateOfWeek + 6;
  const sunday = saturday + 1;

  return [new TZDate(date.setDate(saturday)), new TZDate(date.setDate(sunday))];
}
