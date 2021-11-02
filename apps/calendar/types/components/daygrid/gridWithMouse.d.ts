import TZDate from '@src/time/date';

interface GridSelectionData {
  start: TZDate;
  end: TZDate;
  x: number;
  y: number;
  rowIndex: number;
  columnIndex: number;
}
