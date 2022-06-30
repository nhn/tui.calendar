import { TZDate } from '@toast-ui/calendar';

export function clone(date: TZDate): TZDate {
  return new TZDate(date);
}

export function addHours(d: TZDate, step: number) {
  const date = clone(d);
  date.setHours(d.getHours() + step);

  return date;
}

export function addDate(d: TZDate, step: number) {
  const date = clone(d);
  date.setDate(d.getDate() + step);

  return date;
}

export function subtractDate(d: TZDate, steps: number) {
  const date = clone(d);
  date.setDate(d.getDate() - steps);

  return date;
}
