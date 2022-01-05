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
