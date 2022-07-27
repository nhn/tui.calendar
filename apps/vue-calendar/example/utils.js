import { TZDate } from '@toast-ui/calendar';

export function clone(date) {
  return new TZDate(date);
}

export function addHours(d, step) {
  const date = clone(d);
  date.setHours(d.getHours() + step);

  return date;
}

export function addDate(d, step) {
  const date = clone(d);
  date.setDate(d.getDate() + step);

  return date;
}

export function subtractDate(d, steps) {
  const date = clone(d);
  date.setDate(d.getDate() - steps);

  return date;
}
