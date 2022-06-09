export interface GridSelectionData {
  startRowIndex: number;
  startColumnIndex: number;
  endRowIndex: number;
  endColumnIndex: number;
}

export interface GridSelectionDataByRow {
  startCellIndex: number;
  endCellIndex: number;
}

export interface TimeGridSelectionDataByCol {
  startRowIndex: number;
  endRowIndex: number;
  isStartingColumn: boolean;
  isSelectingMultipleColumns: boolean;
}
