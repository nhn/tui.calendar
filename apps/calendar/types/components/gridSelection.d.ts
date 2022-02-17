interface GridSelectionData {
  startRowIndex: number;
  startColumnIndex: number;
  endRowIndex: number;
  endColumnIndex: number;
}

interface GridSelectionDataByRow {
  startCellIndex: number;
  endCellIndex: number;
}

interface TimeGridSelectionDataByCol {
  startRowIndex: number;
  endRowIndex: number;
  isStartingColumn: boolean;
  isSelectingMultipleColumns: boolean;
}
