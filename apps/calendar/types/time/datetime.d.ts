import type TZDate from '@src/time/date';

type RawDate = {
  y: number;
  M: number;
  d: number;
  h: number;
  m: number;
  s: number;
  ms: number;
};

interface CellStyle {
  width: number;
  left: number;
}

interface CellInfo extends CellStyle {
  date: TZDate;
}

type HoursString = `${2}${0 | 1 | 2 | 3 | 4}` | `${0 | 1}${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;
export type FormattedTimeString = `${HoursString}:00`;
