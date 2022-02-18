import TZDate from '@src/time/date';

export function createDate(y: number, M: number, d: number): TZDate {
  const year = String(y);
  let month = String(M);
  let day = String(d);

  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }

  return new TZDate(`${[year, month, day].join('-')}T00:00:00`);
}
