import type { useGridSelection } from '@src/hooks/gridSelection/gridSelection';
import { clone } from '@src/time/datetime';
import { isBetween as isBetweenValue } from '@src/utils/math';

import { TimeGridData } from '@t/grid';

type GridSelectionHelpers<CalcResultData> = Omit<
  Parameters<typeof useGridSelection>[0],
  'type' | 'dateCollection' | 'gridPositionFinder'
> & {
  calculatorByCurrentIndex: (
    gridSelection: GridSelectionData | null,
    currentIndex: number
  ) => CalcResultData | null;
};

export const timeGridSelectionHelpers: GridSelectionHelpers<TimeGridSelectionDataByCol> = {
  selectionSorter: (initPos, currentPos) => {
    const isReversed =
      initPos.columnIndex > currentPos.columnIndex ||
      (initPos.columnIndex === currentPos.columnIndex && initPos.rowIndex > currentPos.rowIndex);

    return {
      startColumnIndex: isReversed ? currentPos.columnIndex : initPos.columnIndex,
      startRowIndex: isReversed ? currentPos.rowIndex : initPos.rowIndex,
      endColumnIndex: isReversed ? initPos.columnIndex : currentPos.columnIndex,
      endRowIndex: isReversed ? initPos.rowIndex : currentPos.rowIndex,
    };
  },
  dateGetter: (_dateCollection, gridSelection) => {
    const dateCollection = _dateCollection as TimeGridData;

    const startDate = clone(dateCollection.columns[gridSelection.startColumnIndex].date);
    const endDate = clone(dateCollection.columns[gridSelection.endColumnIndex].date);
    const { startTime } = dateCollection.rows[gridSelection.startRowIndex];
    const { endTime } = dateCollection.rows[gridSelection.endRowIndex];

    startDate.setHours(...(startTime.split(':').map(Number) as [number, number]));
    endDate.setHours(...(endTime.split(':').map(Number) as [number, number]));

    return [startDate, endDate];
  },
  calculatorByCurrentIndex: (timeGridSelection: GridSelectionData | null, columnIndex: number) => {
    if (!timeGridSelection) {
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
  },
};
