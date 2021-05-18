import { h, FunctionComponent, ComponentChildren } from 'preact';
import getTarget from 'tui-code-snippet/domEvent/getTarget';
import pick from 'tui-code-snippet/object/pick';
import { cls } from '@src/util/cssHelper';
import { getPrevGridTimeFromMouseEvent, getNextGridTime } from '@src/controller/times';
import { isSame, addMilliseconds } from '@src/time/datetime';
import { useDrag } from '@src/components/hooks/drag';
import { CreationGuideInfo } from '@src/components/timegrid';
import { TimeUnit } from '@src/model';
import { TimeProps } from '@src/components/timegrid/times';
import TZDate from '@src/time/date';
import { closest } from '@src/util/domutil';

const classNames = {
  columns: cls('columns'),
  columnsSelector: cls('.column'),
};

interface Props {
  columnLeft: number;
  columnInfoList: ColumnInfo[];
  onGuideStart?: (e: CreationGuideInfo) => void;
  onGuideChange?: (e: CreationGuideInfo) => void;
  onGuideEnd?: (e: CreationGuideInfo) => void;
  onGuideCancel?: () => void;
  children?: ComponentChildren;
}

export interface ColumnInfo {
  start: TZDate;
  end: TZDate;
  unit: TimeUnit;
  slot: number;
  times: TimeProps[];
}

interface ColumnGuideCreationInfo extends CreationGuideInfo {
  columnIndex: number;
}

export const ColumnsWithMouse: FunctionComponent<Props> = (props: Props) => {
  let guideStartData: ColumnGuideCreationInfo | null = null;

  let guidePrevDragData: ColumnGuideCreationInfo | null = null;

  const getColumnIndexFromMouse = (e: MouseEvent) => {
    const target = getTarget(e);
    const container = closest(target, classNames.columnsSelector) || target;
    const columnIndex = Number(container.getAttribute('data-index'));

    return columnIndex;
  };

  const getCreationGuideDataFromMouse = (e: MouseEvent): ColumnGuideCreationInfo => {
    const columnIndex = guideStartData ? guideStartData.columnIndex : getColumnIndexFromMouse(e);
    const columnInfo = props.columnInfoList[columnIndex];
    const { unit, slot } = columnInfo;
    const containerSelector = classNames.columnsSelector;
    const start = getPrevGridTimeFromMouseEvent(e, columnInfo, containerSelector);
    const end = getNextGridTime(addMilliseconds(start, 1), slot, unit);

    return { start, end, unit, columnIndex };
  };

  const onDragStart = (e: MouseEvent) => {
    guideStartData = getCreationGuideDataFromMouse(e);

    if (props.onGuideStart) {
      props.onGuideStart(guideStartData);
    }
  };

  const onDrag = (e: MouseEvent) => {
    const guideData = getCreationGuideDataFromMouse(e);
    const { start, end } = guideData;
    const guideStartTime = pick(guideStartData, 'start') || start;
    const guideEndTime = pick(guideStartData, 'end') || end;
    let guideInfo: ColumnGuideCreationInfo;

    if (start < guideStartTime) {
      guideInfo = {
        ...guideData,
        end: guideEndTime,
        textPosition: 'top',
      };
    } else {
      guideInfo = {
        ...guideData,
        start: guideStartTime,
        textPosition: 'bottom',
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
    guideStartData = null;

    if (props.onGuideEnd) {
      props.onGuideEnd(getCreationGuideDataFromMouse(e));
    }
  };

  const onClick = (e: MouseEvent) => {
    const guideData = getCreationGuideDataFromMouse(e);

    if (props.onGuideStart) {
      props.onGuideStart(guideData);
    }

    if (props.onGuideEnd) {
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

  const { columnLeft, children } = props;

  return (
    <div className={classNames.columns} style={{ left: columnLeft }} onMouseDown={onMouseDown}>
      {children}
    </div>
  );
};
