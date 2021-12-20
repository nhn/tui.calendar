import { useEffect, useMemo, useRef, useState } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import { DRAGGING_TYPE_CONSTANTS } from '@src/helpers/drag';
import { MousePositionDataGrabber } from '@src/helpers/view';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import TZDate from '@src/time/date';
import { isSame, toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { isPresent } from '@src/utils/type';

import { CellDateRange } from '@t/components/daygrid/gridSelectionData';
import { GridSelectionData } from '@t/components/daygrid/gridWithMouse';
import { Cells } from '@t/panel';

function isDateMatrix(value: TZDate[][] | Cells): value is TZDate[][] {
  return Array.isArray(value[0]);
}

function getGridInfoList(dateMatrixOrRow: TZDate[][] | Cells): CellDateRange[][] {
  if (isDateMatrix(dateMatrixOrRow)) {
    const dateMatrix = dateMatrixOrRow;

    return dateMatrix.map((row) => {
      return row.map((cell) => {
        const start = toStartOfDay(cell);
        const end = toEndOfDay(cell);

        return { start, end };
      });
    });
  }

  const dateRow = dateMatrixOrRow;

  return [
    dateRow.map<CellDateRange>((cell) => {
      const start = toStartOfDay(cell);
      const end = toEndOfDay(cell);

      return { start, end };
    }),
  ];
}

function getGridSelectionData(
  mouseData: MousePositionData,
  gridInfoList: CellDateRange[][]
): GridSelectionData {
  const { gridX: columnIndex, gridY: rowIndex, x, y } = mouseData;
  const { start, end } = gridInfoList[rowIndex][columnIndex];

  return { start, end, rowIndex, columnIndex, x, y };
}

function getSelectionTime(
  selectionStartData: GridSelectionData | null,
  { start, end }: { start: TZDate; end: TZDate }
) {
  let selectionStartTime = start;
  let selectionEndTime = end;

  if (selectionStartData) {
    selectionStartTime = selectionStartData?.start ?? start;
    selectionEndTime = selectionStartData?.end ?? end;
  }

  return { selectionStartTime, selectionEndTime };
}

export function useDayGridSelection(
  mousePositionDataGrabber: MousePositionDataGrabber,
  dateMatrixOrRow: TZDate[][] | Cells
) {
  const [gridSelection, setGridSelection] = useState<GridSelectionData | null>(null);
  const initSelectionDataRef = useRef<GridSelectionData | null>(null);
  const prevSelectionDataRef = useRef<GridSelectionData | null>(null);
  const { draggingItemType, draggingState, x, y, initX, initY } = useStore(dndSelector);
  const isSelectingGrid =
    draggingItemType === DRAGGING_TYPE_CONSTANTS.dayGridSelection &&
    draggingState > DraggingState.INIT;
  const hasCurrentCoords = isPresent(x) && isPresent(y);

  const gridInfoList = useMemo(() => getGridInfoList(dateMatrixOrRow), [dateMatrixOrRow]);

  const currentSelectionData = useMemo(() => {
    if (!isSelectingGrid || !hasCurrentCoords) {
      return null;
    }

    const data = mousePositionDataGrabber({ clientX: x, clientY: y } as MouseEvent);
    if (!data) {
      return null;
    }

    const gridSelectionData = getGridSelectionData(data, gridInfoList);
    const { selectionStartTime, selectionEndTime } = getSelectionTime(
      initSelectionDataRef.current,
      {
        start: gridSelectionData.start,
        end: gridSelectionData.end,
      }
    );

    const nextSelectionData =
      gridSelectionData.start < selectionStartTime
        ? {
            ...gridSelectionData,
            end: selectionEndTime,
          }
        : {
            ...gridSelectionData,
            start: selectionStartTime,
          };

    if (
      prevSelectionDataRef.current &&
      isSame(nextSelectionData.start, prevSelectionDataRef.current.start) &&
      isSame(nextSelectionData.end, prevSelectionDataRef.current.end)
    ) {
      return null;
    }

    prevSelectionDataRef.current = nextSelectionData;

    return nextSelectionData;
  }, [isSelectingGrid, hasCurrentCoords, mousePositionDataGrabber, x, y, gridInfoList]);

  useEffect(() => {
    if (isSelectingGrid && isPresent(initX) && isPresent(initY)) {
      const data = mousePositionDataGrabber({ clientX: initX, clientY: initY } as MouseEvent);
      if (data) {
        initSelectionDataRef.current = getGridSelectionData(data, gridInfoList);
      }
    }
  }, [gridInfoList, initX, initY, isSelectingGrid, mousePositionDataGrabber]);

  useEffect(() => {
    if (isPresent(currentSelectionData)) {
      setGridSelection(currentSelectionData);
    }
  }, [currentSelectionData]);

  useEffect(() => {
    if (draggingState === DraggingState.IDLE && isPresent(prevSelectionDataRef.current)) {
      setGridSelection(prevSelectionDataRef.current);
      prevSelectionDataRef.current = null;
    }
  }, [draggingState]);

  return gridSelection;
}
