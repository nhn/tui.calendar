import type TZDate from '@src/time/date';

import type { ClientMousePosition } from '@t/mouse';

import type { FormattedTimeString } from './time/datetime';

export interface GridUIModel {
  day: number;
  width: number;
  left: number;
}

export interface GridPosition {
  columnIndex: number;
  rowIndex: number;
}

export interface CommonGridColumn {
  date: TZDate;
  left: number;
  width: number;
}

export interface TimeGridRow {
  top: number;
  height: number;
  startTime: FormattedTimeString;
  endTime: FormattedTimeString;
}

export interface TimeGridData {
  rows: TimeGridRow[];
  columns: CommonGridColumn[];
}

export type GridPositionFinder = (mousePosition: ClientMousePosition) => GridPosition | null;
