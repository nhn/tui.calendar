import type { useGridSelection } from '@src/hooks/gridSelection/gridSelection';
import TZDate from '@src/time/date';
import { clone } from '@src/time/datetime';
import { isBetween, isBetween as isBetweenValue } from '@src/utils/math';
import { isNil, isPresent } from '@src/utils/type';

import { GridPosition, TimeGridData } from '@t/grid';

type GridSelectionHelpers<
  CalculatorByCurrentIndex extends (
    gridSelection: GridSelectionData | null,
    ...rest: any[]
  ) => (TimeGridSelectionDataByCol | null) | (GridSelectionDataByRow | null)
> = Omit<
  Parameters<typeof useGridSelection>[0],
  'type' | 'dateCollection' | 'gridPositionFinder'
> & {
  calculatorByCurrentIndex: CalculatorByCurrentIndex;
};

function createSortedGridSelection(
  initPos: GridPosition,
  currentPos: GridPosition,
  isReversed: boolean
) {
  return {
    startColumnIndex: isReversed ? currentPos.columnIndex : initPos.columnIndex,
    startRowIndex: isReversed ? currentPos.rowIndex : initPos.rowIndex,
    endColumnIndex: isReversed ? initPos.columnIndex : currentPos.columnIndex,
    endRowIndex: isReversed ? initPos.rowIndex : currentPos.rowIndex,
  };
}

function timeGridSelectionCalculatorByCurrentIndex(
  timeGridSelection: GridSelectionData | null,
  columnIndex: number
) {
  if (isNil(timeGridSelection)) {
    return null;
  }

  const { startColumnIndex, endColumnIndex, endRowIndex, startRowIndex } = timeGridSelection;

  if (!isBetweenValue(columnIndex, startColumnIndex, endColumnIndex)) {
    return null;
  }

  const hasMultipleColumns = startColumnIndex !== endColumnIndex;
  const isStartingColumn = columnIndex === startColumnIndex;
  const resultGridSelection: TimeGridSelectionDataByCol = {
    startRowIndex,
    endRowIndex,
    isSelectingMultipleColumns: hasMultipleColumns,
    isStartingColumn,
  };

  if (startColumnIndex < columnIndex && columnIndex < endColumnIndex) {
    resultGridSelection.startRowIndex = 0;
    resultGridSelection.endRowIndex = 47;
  } else if (startColumnIndex !== endColumnIndex) {
    if (startColumnIndex === columnIndex) {
      resultGridSelection.endRowIndex = 47;
    } else if (endColumnIndex === columnIndex) {
      resultGridSelection.startRowIndex = 0;
    }
  }

  return resultGridSelection;
}
export const timeGridSelectionHelpers: GridSelectionHelpers<
  typeof timeGridSelectionCalculatorByCurrentIndex
> = {
  selectionSorter: (initPos, currentPos) => {
    const isReversed =
      initPos.columnIndex > currentPos.columnIndex ||
      (initPos.columnIndex === currentPos.columnIndex && initPos.rowIndex > currentPos.rowIndex);

    return createSortedGridSelection(initPos, currentPos, isReversed);
  },
  dateGetter: (dateCollection, gridSelection) => {
    const timeGridData = dateCollection as TimeGridData;

    const startDate = clone(timeGridData.columns[gridSelection.startColumnIndex].date);
    const endDate = clone(timeGridData.columns[gridSelection.endColumnIndex].date);
    const { startTime } = timeGridData.rows[gridSelection.startRowIndex];
    const { endTime } = timeGridData.rows[gridSelection.endRowIndex];

    startDate.setHours(...(startTime.split(':').map(Number) as [number, number]));
    endDate.setHours(...(endTime.split(':').map(Number) as [number, number]));

    return [startDate, endDate];
  },
  calculatorByCurrentIndex: timeGridSelectionCalculatorByCurrentIndex,
};

function dayGridMonthCalculatorByCurrentIndex(
  gridSelection: GridSelectionData | null,
  currentIndex: number,
  weekLength: number
) {
  let resultGridSelection: GridSelectionDataByRow | null = null;

  if (isPresent(gridSelection) && isPresent(currentIndex) && isPresent(weekLength)) {
    const { startRowIndex, startColumnIndex, endRowIndex, endColumnIndex } = gridSelection;

    if (
      isBetween(
        currentIndex,
        Math.min(startRowIndex, endRowIndex),
        Math.max(startRowIndex, endRowIndex)
      )
    ) {
      let startCellIndex = startColumnIndex;
      let endCellIndex = endColumnIndex;

      if (startRowIndex < currentIndex) {
        startCellIndex = 0;
      }

      if (endRowIndex > currentIndex) {
        endCellIndex = weekLength - 1;
      }

      resultGridSelection = { startCellIndex, endCellIndex };
    }
  }

  return resultGridSelection;
}
export const dayGridMonthSelectionHelpers: GridSelectionHelpers<
  typeof dayGridMonthCalculatorByCurrentIndex
> = {
  selectionSorter: (initPos, currentPos) => {
    const isReversed =
      initPos.rowIndex > currentPos.rowIndex ||
      (initPos.rowIndex === currentPos.rowIndex && initPos.columnIndex > currentPos.columnIndex);

    return createSortedGridSelection(initPos, currentPos, isReversed);
  },
  dateGetter: (dateCollection, gridSelection) => {
    const dateMatrix = dateCollection as TZDate[][];

    return [
      dateMatrix[gridSelection.startRowIndex][gridSelection.startColumnIndex],
      dateMatrix[gridSelection.endRowIndex][gridSelection.endColumnIndex],
    ];
  },
  calculatorByCurrentIndex: dayGridMonthCalculatorByCurrentIndex,
};

function alldayGridRowCalculatorByCurrentIndex(gridSelection: GridSelectionData | null) {
  return isPresent(gridSelection)
    ? {
        startCellIndex: gridSelection.startColumnIndex,
        endCellIndex: gridSelection.endColumnIndex,
      }
    : null;
}
export const alldayGridRowSelectionHelpers: GridSelectionHelpers<
  typeof alldayGridRowCalculatorByCurrentIndex
> = {
  selectionSorter: (initPos, currentPos) => {
    const isReversed = initPos.columnIndex > currentPos.columnIndex;

    return createSortedGridSelection(initPos, currentPos, isReversed);
  },
  dateGetter: (dateCollection, gridSelection) => {
    const weekDates = dateCollection as TZDate[];

    return [weekDates[gridSelection.startColumnIndex], weekDates[gridSelection.endColumnIndex]];
  },
  calculatorByCurrentIndex: alldayGridRowCalculatorByCurrentIndex,
};
