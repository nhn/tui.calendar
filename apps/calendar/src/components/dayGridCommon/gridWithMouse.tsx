import { FunctionComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { useDrag } from '@src/components/hooks/drag';
import TZDate from '@src/time/date';
import { isSame } from '@src/time/datetime';
import { toPercent } from '@src/util/units';

import { CellDateRange } from '@t/components/daygrid/gridSelectionData';
import { GridSelectionData } from '@t/components/daygrid/gridWithMouse';

interface Props {
  gridInfoList: CellDateRange[][];
  onSelectionEnd: (gridSelectionData: GridSelectionData | null) => void;
  onSelectionChange: (gridSelectionData: GridSelectionData | null) => void;
  onSelectionCancel: () => void;
  getMousePositionData: (e: MouseEvent) => MousePositionData | null;
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

const GridWithMouse: FunctionComponent<Props> = ({
  gridInfoList,
  onSelectionEnd,
  onSelectionChange,
  onSelectionCancel,
  getMousePositionData,
  children,
}) => {
  const [selectionStartData, setSelectionStartData] = useState<GridSelectionData | null>(null);
  const [selectionPrevDragData, setSelectionPrevDragData] = useState<GridSelectionData | null>(
    null
  );

  const onDragStart = (e: MouseEvent) => {
    const mousePositionData = getMousePositionData(e);

    if (!mousePositionData) {
      return;
    }

    const gridSelectionData = getGridSelectionData(mousePositionData, gridInfoList);

    if (gridSelectionData) {
      onSelectionChange(gridSelectionData);
      setSelectionStartData(gridSelectionData);
    }
  };

  const onDrag = (e: MouseEvent) => {
    const mousePositionData = getMousePositionData(e);

    if (!mousePositionData) {
      return;
    }

    const gridSelectionData = getGridSelectionData(mousePositionData, gridInfoList);

    const { start, end } = gridSelectionData;
    const { selectionStartTime, selectionEndTime } = getSelectionTime(selectionStartData, {
      start,
      end,
    });

    let nextGridSelectionData: GridSelectionData;

    if (start < selectionStartTime) {
      nextGridSelectionData = {
        ...gridSelectionData,
        end: selectionEndTime,
      };
    } else {
      nextGridSelectionData = {
        ...gridSelectionData,
        start: selectionStartTime,
      };
    }

    if (
      selectionPrevDragData &&
      isSame(nextGridSelectionData.start, selectionPrevDragData.start) &&
      isSame(nextGridSelectionData.end, selectionPrevDragData.end)
    ) {
      return;
    }

    setSelectionPrevDragData(nextGridSelectionData);
    onSelectionChange(nextGridSelectionData);
  };

  const onDragEnd = () => {
    if (selectionPrevDragData) {
      onSelectionEnd(selectionPrevDragData);
    }
  };

  const onPressESCKey = () => onSelectionCancel();

  const { onMouseDown, isDragging } = useDrag({
    onDragStart,
    onDrag,
    onDragEnd,
    onPressESCKey,
  });

  const onMouseUp = (e: MouseEvent) => {
    if (!isDragging) {
      const mousePositionData = getMousePositionData(e);
      const gridSelectionData = mousePositionData
        ? getGridSelectionData(mousePositionData, gridInfoList)
        : null;

      onSelectionChange(gridSelectionData);
      onSelectionEnd(gridSelectionData);
    }
  };

  return (
    <div style={{ height: toPercent(100) }} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      {children}
    </div>
  );
};

export default GridWithMouse;
