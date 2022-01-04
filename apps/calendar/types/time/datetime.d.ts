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

interface CellStyleInfo {
  width: number;
  left: number;
}

interface CellInfo extends CellStyleInfo {
  date: TZDate;
}
