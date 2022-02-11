interface GridSelectionData {
  initRowIndex: number;
  initColIndex: number;
  currentRowIndex: number;
  currentColIndex: number;
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
