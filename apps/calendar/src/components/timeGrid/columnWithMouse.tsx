import { ComponentChildren, FunctionComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import getTarget from 'tui-code-snippet/domEvent/getTarget';

import { TimeProps } from '@src/components/timeGrid/times';
import { getNextGridTime, getPrevGridTimeFromMouseEvent } from '@src/controller/times';
import { cls } from '@src/helpers/css';
import { DRAGGING_TYPE_CONSTANTS } from '@src/helpers/drag';
import { useDrag } from '@src/hooks/common/drag';
import TZDate from '@src/time/date';
import { addMilliseconds, isSame } from '@src/time/datetime';
import { closest } from '@src/utils/dom';

import { TimeGridSelectionInfo } from '@t/components/timeGrid/gridSelection';
import { TimeUnit } from '@t/events';

const classNames = {
  columns: cls('columns'),
  column: cls('column'),
};

interface Props {
  columnLeft: number;
  columnInfoList: ColumnInfo[];
  onSelectionStart?: (e: TimeGridSelectionInfo) => void;
  onSelectionChange?: (e: TimeGridSelectionInfo) => void;
  onSelectionEnd?: (e: TimeGridSelectionInfo) => void;
  onSelectionCancel?: () => void;
  children?: ComponentChildren;
}

export interface ColumnInfo {
  start: TZDate;
  end: TZDate;
  unit: TimeUnit;
  slot: number;
  times: TimeProps[];
}

interface SelectionData extends TimeGridSelectionInfo {
  columnIndex: number;
}

export const ColumnWithMouse: FunctionComponent<Props> = (props: Props) => {
  const [selectionStartData, setSelectionStartData] = useState<SelectionData | null>(null);
  const [selectionPrevDragData, setSelectionPrevDragData] = useState<SelectionData | null>(null);

  const getColumnIndexFromMouse = (e: MouseEvent) => {
    const target = getTarget(e);
    const container = closest(target, classNames.column) || target;
    const columnIndex = Number(container.getAttribute('data-index'));

    return columnIndex;
  };

  const getGridSelectionDataFromMouse = (e: MouseEvent): SelectionData => {
    const columnIndex = selectionStartData
      ? selectionStartData.columnIndex
      : getColumnIndexFromMouse(e);
    const columnInfo = props.columnInfoList[columnIndex];
    const { unit, slot } = columnInfo;
    const start = getPrevGridTimeFromMouseEvent(e, columnInfo, classNames.column);
    const end = getNextGridTime(addMilliseconds(start, 1), slot, unit);

    return { start, end, unit, columnIndex };
  };

  const onDragStart = (e: MouseEvent) => {
    const gridSelectionData = getGridSelectionDataFromMouse(e);

    if (props.onSelectionStart) {
      props.onSelectionStart(gridSelectionData);
      setSelectionStartData(gridSelectionData);
    }
  };

  const onDrag = (e: MouseEvent) => {
    const selectionData = getGridSelectionDataFromMouse(e);
    const { start, end } = selectionData;
    const selectionStartTime = selectionStartData?.start ?? start;
    const selectionEndTime = selectionStartData?.end ?? end;
    let timeGridSelectionInfo: SelectionData;

    if (start < selectionStartTime) {
      timeGridSelectionInfo = {
        ...selectionData,
        end: selectionEndTime,
        textPosition: 'top',
      };
    } else {
      timeGridSelectionInfo = {
        ...selectionData,
        start: selectionStartTime,
        textPosition: 'bottom',
      };
    }

    if (
      selectionPrevDragData &&
      isSame(timeGridSelectionInfo.start, selectionPrevDragData.start) &&
      isSame(timeGridSelectionInfo.end, selectionPrevDragData.end)
    ) {
      return;
    }

    setSelectionPrevDragData(timeGridSelectionInfo);

    if (props.onSelectionChange) {
      props.onSelectionChange(timeGridSelectionInfo);
    }
  };

  const onDragEnd = (e: MouseEvent) => {
    setSelectionStartData(null);

    if (props.onSelectionEnd) {
      props.onSelectionEnd(getGridSelectionDataFromMouse(e));
    }
  };

  const onPressESCKey = () => {
    if (props.onSelectionCancel) {
      props.onSelectionCancel();
    }
  };

  const { onMouseDown, isDragging } = useDrag(DRAGGING_TYPE_CONSTANTS.timeGridColumnSelection, {
    onDragStart,
    onDrag,
    onDragEnd,
    onPressESCKey,
  });

  const onMouseUp = (e: MouseEvent) => {
    if (!isDragging) {
      const gridSelectionData = getGridSelectionDataFromMouse(e);

      if (props.onSelectionStart) {
        props.onSelectionStart(gridSelectionData);
      }

      if (props.onSelectionEnd) {
        props.onSelectionEnd(gridSelectionData);
      }
    }
  };

  const { columnLeft, children } = props;

  return (
    <div
      className={classNames.columns}
      style={{ left: columnLeft }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      {children}
    </div>
  );
};
