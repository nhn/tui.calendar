import type { useGridSelection } from '@src/hooks/gridSelection/useGridSelection';
import type TZDate from '@src/time/date';
import { setTimeStrToDate } from '@src/time/datetime';
import { isBetween, isBetween as isBetweenValue } from '@src/utils/math';
import { isNil, isPresent } from '@src/utils/type';

import type {
  GridSelectionData,
  GridSelectionDataByRow,
  TimeGridSelectionDataByCol,
} from '@t/components/gridSelection';
import type { GridPosition, TimeGridData } from '@t/grid';

type RequiredGridSelectionHookParams = Pick<
  Parameters<typeof useGridSelection>[0],
  'selectionSorter' | 'dateGetter'
>;
type GridSelectionHelper<
  SelectionCalculator extends (
    gridSelection: GridSelectionData | null,
    ...rest: any[]
  ) => (TimeGridSelectionDataByCol | null) | (GridSelectionDataByRow | null)
> = {
  sortSelection: RequiredGridSelectionHookParams['selectionSorter'];
  getDateFromCollection: RequiredGridSelectionHookParams['dateGetter'];
  calculateSelection: SelectionCalculator;
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

function calculateTimeGridSelectionByCurrentIndex(
  timeGridSelection: GridSelectionData | null,
  columnIndex: number,
  maxRowIndex: number // maxRowIndex is the last row index of the `timeGridData.row`
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
    resultGridSelection.endRowIndex = maxRowIndex;
  } else if (startColumnIndex !== endColumnIndex) {
    if (startColumnIndex === columnIndex) {
      resultGridSelection.endRowIndex = maxRowIndex;
    } else if (endColumnIndex === columnIndex) {
      resultGridSelection.startRowIndex = 0;
    }
  }

  return resultGridSelection;
}

export const timeGridSelectionHelper: GridSelectionHelper<
  typeof calculateTimeGridSelectionByCurrentIndex
> = {
  sortSelection: (initPos, currentPos) => {
    const isReversed =
      initPos.columnIndex > currentPos.columnIndex ||
      (initPos.columnIndex === currentPos.columnIndex && initPos.rowIndex > currentPos.rowIndex);

    return createSortedGridSelection(initPos, currentPos, isReversed);
  },
  getDateFromCollection: (dateCollection, gridSelection) => {
    const timeGridData = dateCollection as TimeGridData;

    const startDate = setTimeStrToDate(
      timeGridData.columns[gridSelection.startColumnIndex].date,
      timeGridData.rows[gridSelection.startRowIndex].startTime
    );
    const endDate = setTimeStrToDate(
      timeGridData.columns[gridSelection.endColumnIndex].date,
      timeGridData.rows[gridSelection.endRowIndex].endTime
    );

    return [startDate, endDate];
  },
  calculateSelection: calculateTimeGridSelectionByCurrentIndex,
};

function calculateDayGridMonthSelectionByCurrentIndex(
  gridSelection: GridSelectionData | null,
  currentIndex: number,
  weekLength: number
) {
  if (!(isPresent(gridSelection) && isPresent(currentIndex) && isPresent(weekLength))) {
    return null;
  }

  const { startRowIndex, startColumnIndex, endRowIndex, endColumnIndex } = gridSelection;

  if (
    !isBetween(
      currentIndex,
      Math.min(startRowIndex, endRowIndex),
      Math.max(startRowIndex, endRowIndex)
    )
  ) {
    return null;
  }

  let startCellIndex = startColumnIndex;
  let endCellIndex = endColumnIndex;

  if (startRowIndex < currentIndex) {
    startCellIndex = 0;
  }

  if (endRowIndex > currentIndex) {
    endCellIndex = weekLength - 1;
  }

  return { startCellIndex, endCellIndex };
}

export const dayGridMonthSelectionHelper: GridSelectionHelper<
  typeof calculateDayGridMonthSelectionByCurrentIndex
> = {
  sortSelection: (initPos, currentPos) => {
    const isReversed =
      initPos.rowIndex > currentPos.rowIndex ||
      (initPos.rowIndex === currentPos.rowIndex && initPos.columnIndex > currentPos.columnIndex);

    return createSortedGridSelection(initPos, currentPos, isReversed);
  },
  getDateFromCollection: (dateCollection, gridSelection) => {
    const dateMatrix = dateCollection as TZDate[][];

    return [
      dateMatrix[gridSelection.startRowIndex][gridSelection.startColumnIndex],
      dateMatrix[gridSelection.endRowIndex][gridSelection.endColumnIndex],
    ];
  },
  calculateSelection: calculateDayGridMonthSelectionByCurrentIndex,
};

function calculateAlldayGridRowSelectionByCurrentIndex(gridSelection: GridSelectionData | null) {
  return isPresent(gridSelection)
    ? {
        startCellIndex: gridSelection.startColumnIndex,
        endCellIndex: gridSelection.endColumnIndex,
      }
    : null;
}

export const alldayGridRowSelectionHelper: GridSelectionHelper<
  typeof calculateAlldayGridRowSelectionByCurrentIndex
> = {
  sortSelection: (initPos, currentPos) => {
    const isReversed = initPos.columnIndex > currentPos.columnIndex;

    return createSortedGridSelection(initPos, currentPos, isReversed);
  },
  getDateFromCollection: (dateCollection, gridSelection) => {
    const weekDates = dateCollection as TZDate[];

    return [weekDates[gridSelection.startColumnIndex], weekDates[gridSelection.endColumnIndex]];
  },
  calculateSelection: calculateAlldayGridRowSelectionByCurrentIndex,
};
