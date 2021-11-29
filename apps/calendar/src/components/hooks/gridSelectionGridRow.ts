import { useEffect, useMemo, useRef, useState } from 'preact/hooks';

import { useStore } from '@src/contexts/calendarStore';
import { dndSelector } from '@src/selectors';
import { DraggingState } from '@src/slices/dnd';
import TZDate from '@src/time/date';
import { isSame, toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { isNil } from '@src/utils/type';

import { CellDateRange } from '@t/components/daygrid/gridSelectionData';
import { GridSelectionData } from '@t/components/daygrid/gridWithMouse';
import { Cells } from '@t/panel';

function getGridInfoList(cells: Cells): CellDateRange[][] {
  return [
    cells.map<CellDateRange>((cell) => {
      const start = toStartOfDay(cell);
      const end = toEndOfDay(cell);

      return { start, end };
    }),
  ];
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

function getGridSelectionData(
  mouseData: MousePositionData,
  gridInfoList: CellDateRange[][]
): GridSelectionData {
  const { gridX: columnIndex, gridY: rowIndex, x, y } = mouseData;
  const { start, end } = gridInfoList[rowIndex][columnIndex];

  return { start, end, rowIndex, columnIndex, x, y };
}

interface MousePositionDataGrabber {
  (mouseEvent: MouseEvent): any;
}

export function useGridSelectionGridRow(
  mousePositionDataGrabber: MousePositionDataGrabber,
  cells: any
) {
  const [gridSelection, setGridSelection] = useState<GridSelectionData | null>(null);
  const initSelectionDataRef = useRef<GridSelectionData | null>(null);
  const prevSelectionDataRef = useRef<GridSelectionData | null>(null);
  const { draggingItemType, draggingState, x, y, initX, initY } = useStore(dndSelector);
  const isSelectingGrid =
    draggingItemType === 'grid-selection' && draggingState > DraggingState.IDLE;
  const hasCurrentCoords = !isNil(x) && !isNil(y);
  const isDraggingEnd = draggingState === DraggingState.END_DRAG;

  const gridInfoList = useMemo(() => getGridInfoList(cells), [cells]);

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
    if (isSelectingGrid && !isNil(initX) && !isNil(initY)) {
      const data = mousePositionDataGrabber({ clientX: initX, clientY: initY } as MouseEvent);
      if (data) {
        initSelectionDataRef.current = getGridSelectionData(data, gridInfoList);
      }
    }
  }, [gridInfoList, initX, initY, isSelectingGrid, mousePositionDataGrabber]);

  useEffect(() => {
    if (!isNil(currentSelectionData)) {
      setGridSelection(currentSelectionData);
    }
  }, [currentSelectionData]);

  useEffect(() => {
    if (isDraggingEnd && !isNil(prevSelectionDataRef.current)) {
      setGridSelection(prevSelectionDataRef.current);
      prevSelectionDataRef.current = null;
    }
  }, [isDraggingEnd]);

  return gridSelection;
}
