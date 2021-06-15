import { h, FunctionComponent } from 'preact';

import { useDrag } from '@src/components/hooks/drag';
import { isSame } from '@src/time/datetime';
import TZDate from '@src/time/date';
import { toPercent } from '@src/util/units';
import { CreationGuide } from '@src/components/hooks/creationGuide';

import { GridGuideInfo } from '@t/components/daygrid/creationGuide';
import { GridGuideCreationInfo } from '@t/components/daygrid/gridWithMouse';

interface Props {
  gridInfoList: GridGuideInfo[][];
  onGuideStart: (guide: CreationGuide) => void;
  onGuideEnd: (guide: CreationGuide) => void;
  onGuideChange: (guide: GridGuideCreationInfo) => void;
  onGuideCancel: () => void;
  getMousePositionData: (e: MouseEvent) => MousePositionData | null;
}

function getGuideTime(
  guideStartData: CreationGuide,
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
): GridGuideCreationInfo {
  const { x: columnIndex, y: rowIndex } = mouseData;
  const { start, end } = gridInfoList[rowIndex][columnIndex];

  return { start, end, rowIndex, columnIndex };
}

const GridWithMouse: FunctionComponent<Props> = (props) => {
  const {
    gridInfoList,
    onGuideStart,
    onGuideEnd,
    onGuideChange,
    onGuideCancel,
    getMousePositionData,
  } = props;
  let guideStartData: CreationGuide = null;
  let guidePrevDragData: CreationGuide = null;

  const onDragStart = (e: MouseEvent) => {
    const mousePositionData = getMousePositionData(e);

    if (!mousePositionData) {
      return;
    }

    guideStartData = getCreationGuideData(mousePositionData, gridInfoList);

    if (guideStartData && onGuideStart) {
      onGuideStart(guideStartData);
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

    let guideInfo: GridGuideCreationInfo;

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
    if (onGuideChange) {
      onGuideChange(guideInfo);
    }
  };

  const onDragEnd = () => {
    if (guidePrevDragData && props.onGuideEnd) {
      props.onGuideEnd(guidePrevDragData);
    }
  };

  const onClick = (e: MouseEvent) => {
    const mousePositionData = getMousePositionData(e);
    const guideData = mousePositionData
      ? getCreationGuideData(mousePositionData, gridInfoList)
      : null;

    if (onGuideStart) {
      onGuideStart(guideData);
    }

    if (onGuideEnd) {
      onGuideEnd(guideData);
    }
  };

  const onCancel = () => {
    if (onGuideCancel) {
      onGuideCancel();
    }
  };

  const { onMouseDown } = useDrag({
    onDragStart,
    onDrag,
    onDragEnd,
    onClick,
    onCancel,
  });

  return (
    <div style={{ height: toPercent(100) }} onMouseDown={onMouseDown}>
      {props.children}
    </div>
  );
};

export default GridWithMouse;
