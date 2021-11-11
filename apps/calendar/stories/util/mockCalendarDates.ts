import range from 'tui-code-snippet/array/range';

import TZDate from '@src/time/date';

function getMockCurrentDate() {
  const current = new Date();
  const year = current.getFullYear();
  const month = current.getMonth();
  const date = current.getDate();
  const dayOfWeek = current.getDay();

  return { year, month, date, dayOfWeek };
}

export function getWeekDates() {
  const { year, month, date, dayOfWeek } = getMockCurrentDate();

  return range(7).map((index) => new TZDate(year, month, date + (index - dayOfWeek)));
}

export function getWeekendDates() {
  const { year, month } = getMockCurrentDate();
  const [, , , , , , saturday] = getWeekDates();

  return [saturday, new TZDate(year, month, saturday.getDate() + 1)];
}
