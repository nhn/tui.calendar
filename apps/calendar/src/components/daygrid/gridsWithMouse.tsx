import { h, FunctionComponent } from 'preact';

import { useDrag } from '@src/components/hooks/drag';

import { CreationGuideInfo } from '@src/components/timegrid';
import getTarget from 'tui-code-snippet/domEvent/getTarget';
import { addMilliseconds, isSame } from '@src/time/datetime';
import { getNextGridTime, getPrevGridTimeFromMouseEvent } from '@src/controller/times';
import { cls } from '@src/util/cssHelper';
import TZDate from '@src/time/date';
import { GridGuideInfo } from '@t/components/daygrid/creationGuide';
import { closest } from '@src/util/domutil';

interface Props {
  gridInfoList: GridGuideInfo[][];
  onGuideStart: (guide: CreationGuideInfo) => void;
  onGuideChange: (guide: CreationGuideInfo) => void;
  onGuideEnd: (guide: CreationGuideInfo) => void;
  onGuideCancel: () => void;
}

interface GridGuideCreationInfo extends CreationGuideInfo {
  rowIndex: number;
  columnIndex: number;
}

function getGuideTime(
  guideStartData: GridGuideCreationInfo | null,
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

const GridsWithMouse: FunctionComponent<Props> = (props) => {
  let guideStartData: GridGuideCreationInfo | null = null;

  let guidePrevDragData: GridGuideCreationInfo | null = null;

  const getGridIndexFromMouse = (e: MouseEvent) => {
    const target = getTarget(e);
    let cell = closest(target, cls('.daygrid-cell')) || target;

    if (!cell) {
      const weekDayContainer = target.closest(cls('.weekday'));
      cell = weekDayContainer?.querySelector(cls('.daygrid-cell')) || target;
    }

    const rowIndex = cell.getAttribute('data-row-index');
    const columnIndex = cell.getAttribute('data-column-index');

    if (rowIndex === null || columnIndex === null) {
      return null;
    }

    return { rowIndex: Number(rowIndex), columnIndex: Number(columnIndex) };
  };

  const getCreationGuideDataFromMouse = (e: MouseEvent): GridGuideCreationInfo | null => {
    const indexes = getGridIndexFromMouse(e);

    if (!indexes) {
      return null;
    }

    const { rowIndex, columnIndex } = indexes;

    const cellInfo = props.gridInfoList[rowIndex][columnIndex];
    const { unit, slot } = cellInfo;
    const containerSelector = cls('daygrid-cell');
    const start = getPrevGridTimeFromMouseEvent(e, cellInfo, containerSelector);
    const end = getNextGridTime(addMilliseconds(start, 1), slot, unit);

    return { start, end, unit, rowIndex, columnIndex };
  };

  const onDragStart = (e: MouseEvent) => {
    guideStartData = getCreationGuideDataFromMouse(e);

    if (guideStartData && props.onGuideStart) {
      props.onGuideStart(guideStartData);
    }
  };

  const onDrag = (e: MouseEvent) => {
    const guideData = getCreationGuideDataFromMouse(e);

    if (!guideData) {
      return;
    }

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
    if (props.onGuideChange) {
      props.onGuideChange(guideInfo);
    }
  };

  const onDragEnd = (e: MouseEvent) => {
    guideStartData = getCreationGuideDataFromMouse(e);

    if (guideStartData && props.onGuideEnd) {
      props.onGuideEnd(guideStartData);
    }
  };

  const onClick = (e: MouseEvent) => {
    const guideData = getCreationGuideDataFromMouse(e);

    if (guideData && props.onGuideStart) {
      props.onGuideStart(guideData);
    }

    if (guideData && props.onGuideEnd) {
      props.onGuideEnd(guideData);
    }
  };

  const onCancel = () => {
    if (props.onGuideCancel) {
      props.onGuideCancel();
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
    <div style={{ height: '100%' }} onMouseDown={onMouseDown}>
      {props.children}
    </div>
  );
};

export default GridsWithMouse;
