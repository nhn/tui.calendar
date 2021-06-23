import { h, FunctionComponent } from 'preact';

import { useDrag } from '@src/components/hooks/drag';
import { isSame } from '@src/time/datetime';
import TZDate from '@src/time/date';
import { toPercent } from '@src/util/units';

import { GridGuideInfo } from '@t/components/daygrid/creationGuide';
import { GridCreationGuide } from '@t/components/daygrid/gridWithMouse';

interface Props {
  gridInfoList: GridGuideInfo[][];
  onGuideEnd: (guide: GridCreationGuide | null) => void;
  onGuideChange: (guide: GridCreationGuide | null) => void;
  onGuideCancel: () => void;
  getMousePositionData: (e: MouseEvent) => MousePositionData | null;
}

function getGuideTime(
  guideStartData: GridCreationGuide | null,
  { start, end }: { start: TZDate; end: TZDate }
) {
  let guideStartTime = start;
  let guideEndTime = end;

  if (guideStartData) {
    guideStartTime = guideStartData?.start ?? start;
    guideEndTime = guideStartData?.end ?? end;
  }

  return { guideStartTime, guideEndTime };
}

function getCreationGuideData(
  mouseData: MousePositionData,
  gridInfoList: GridGuideInfo[][]
): GridCreationGuide {
  const { gridX: columnIndex, gridY: rowIndex, x, y } = mouseData;
  const { start, end } = gridInfoList[rowIndex][columnIndex];

  return { start, end, rowIndex, columnIndex, x, y };
}

const GridWithMouse: FunctionComponent<Props> = ({
  gridInfoList,
  onGuideEnd,
  onGuideChange,
  onGuideCancel,
  getMousePositionData,
  children,
}) => {
  let guideStartData: GridCreationGuide | null = null;
  let guidePrevDragData: GridCreationGuide | null = null;

  const onDragStart = (e: MouseEvent) => {
    const mousePositionData = getMousePositionData(e);

    if (!mousePositionData) {
      return;
    }

    guideStartData = getCreationGuideData(mousePositionData, gridInfoList);

    if (guideStartData) {
      onGuideChange(guideStartData);
    }
  };

  const onDrag = (e: MouseEvent) => {
    const mousePositionData = getMousePositionData(e);

    if (!mousePositionData) {
      return;
    }

    const guideData = getCreationGuideData(mousePositionData, gridInfoList);

    const { start, end } = guideData;
    const { guideStartTime, guideEndTime } = getGuideTime(guideStartData, { start, end });

    let guideInfo: GridCreationGuide;

    if (start < guideStartTime) {
      guideInfo = {
        ...guideData,
        end: guideEndTime,
      };
    } else {
      guideInfo = {
        ...guideData,
        start: guideStartTime,
      };
    }

    if (
      guidePrevDragData &&
      isSame(guideInfo.start, guidePrevDragData.start) &&
      isSame(guideInfo.end, guidePrevDragData.end)
    ) {
      return;
    }

    guidePrevDragData = guideInfo;
    onGuideChange(guideInfo);
  };

  const onDragEnd = () => {
    if (guidePrevDragData) {
      onGuideEnd(guidePrevDragData);
    }
  };

  const onClick = (e: MouseEvent) => {
    const mousePositionData = getMousePositionData(e);
    const guideData = mousePositionData
      ? getCreationGuideData(mousePositionData, gridInfoList)
      : null;

    onGuideChange(guideData);
    onGuideEnd(guideData);
  };

  const onCancel = () => onGuideCancel();
  const { onMouseDown } = useDrag({
    onDragStart,
    onDrag,
    onDragEnd,
    onClick,
    onCancel,
  });

  return (
    <div style={{ height: toPercent(100) }} onMouseDown={onMouseDown}>
      {children}
    </div>
  );
};

export default GridWithMouse;
