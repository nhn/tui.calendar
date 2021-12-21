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
): {
  initRowIdx: number;
  initColIdx: number;
  currentRowIdx: number;
  currentColIdx: number;
} | null {
  const [currentCoords, setCurrentCoords] = useState<{
    currentRowIdx: number;
    currentColIdx: number;
  } | null>(null);
  const initCoordsRef = useRef<{ initRowIdx: number; initColIdx: number } | null>(null);
  const prevCoordsRef = useRef<{
    currentRowIdx: number;
    currentColIdx: number;
  } | null>(null);
  const { draggingItemType, draggingState, x, y, initX, initY } = useStore(dndSelector);
  const isSelectingGrid =
    draggingItemType === DRAGGING_TYPE_CONSTANTS.dayGridSelection &&
    draggingState > DraggingState.INIT;
  const hasCurrentCoords = isPresent(x) && isPresent(y);

  useEffect(() => {
    if (isSelectingGrid && isPresent(initX) && isPresent(initY) && !prevCoordsRef.current) {
      const data = mousePositionDataGrabber({ clientX: initX, clientY: initY } as MouseEvent);
      if (data) {
        initCoordsRef.current = {
          initRowIdx: data.gridY,
          initColIdx: data.gridX,
        };
      }
    }
  }, [initX, initY, isSelectingGrid, mousePositionDataGrabber]);

  useEffect(() => {
    if (isSelectingGrid && hasCurrentCoords) {
      const data = mousePositionDataGrabber({ clientX: x, clientY: y } as MouseEvent);
      if (data) {
        setCurrentCoords({ currentColIdx: data.gridX, currentRowIdx: data.gridY });
        prevCoordsRef.current = { currentColIdx: data.gridX, currentRowIdx: data.gridY };
      }
    }
  }, [hasCurrentCoords, isSelectingGrid, mousePositionDataGrabber, x, y]);

  useEffect(() => {
    if (draggingState === DraggingState.IDLE && isPresent(prevCoordsRef.current)) {
      setCurrentCoords(prevCoordsRef.current);
      prevCoordsRef.current = null;
    }
  }, [draggingState]);

  return isPresent(initCoordsRef.current) && isPresent(currentCoords)
    ? {
        ...currentCoords,
        initRowIdx: initCoordsRef.current.initRowIdx,
        initColIdx: initCoordsRef.current.initColIdx,
      }
    : null;
}
