type InitGridSelectionData = {
  initRowIndex: number;
  initColIndex: number;
};

type CurrentGridSelectionData = {
  currentRowIndex: number;
  currentColIndex: number;
};

type GridSelectionData = InitGridSelectionData & CurrentGridSelectionData;

type GridSelectionDataByRow = { startCellIndex: number; endCellIndex: number };
