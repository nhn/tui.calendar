import { h, Component } from 'preact';
import getTarget from 'tui-code-snippet/domEvent/getTarget';
import closest from 'tui-code-snippet/domUtil/closest';
import pick from 'tui-code-snippet/object/pick';
import { cls } from '@src/util/cssHelper';
import { getPrevGridTimeFromMouseEvent, getNextGridTime } from '@src/controller/times';
import { isSame, addMilliseconds } from '@src/time/datetime';
import { useDrag } from '@src/components/hooks/drag';
import { CreationGuideInfo } from '@src/components/timegrid';
import { TimeUnit } from '@src/model';
import { TimeProps } from '@src/components/timegrid/times';
import TZDate from '@src/time/date';

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

export class ColumnsWithMouse extends Component<Props> {
  static displayName = 'ColumnsWithMouse';

  onMouseDown: (e: MouseEvent) => void;

  guideStartData: ColumnGuideCreationInfo | null = null;

  guidePrevDragData: ColumnGuideCreationInfo | null = null;

  constructor() {
    super();

    const { onMouseDown } = useDrag({
      onDragStart: this.onDragStart.bind(this),
      onDrag: this.onDrag.bind(this),
      onDragEnd: this.onDragEnd.bind(this),
      onClick: this.onClick.bind(this),
      onCancel: this.onCancel.bind(this),
    });

    this.onMouseDown = onMouseDown;
  }

  getColumnIndexFromMouse(e: MouseEvent) {
    const target = getTarget(e);
    const container = closest(target, classNames.columnsSelector) || target;
    const columnIndex = Number(container.getAttribute('data-index'));

    return columnIndex;
  }

  getCreationGuideDataFromMouse(e: MouseEvent): ColumnGuideCreationInfo {
    const columnIndex = this.guideStartData
      ? this.guideStartData.columnIndex
      : this.getColumnIndexFromMouse(e);
    const columnInfo = this.props.columnInfoList[columnIndex];
    const { unit, slot } = columnInfo;
    const containerSelector = classNames.columnsSelector;
    const start = getPrevGridTimeFromMouseEvent(e, columnInfo, containerSelector);
    const end = getNextGridTime(addMilliseconds(start, 1), slot, unit);

    return { start, end, unit, columnIndex };
  }

  onDragStart(e: MouseEvent) {
    this.guideStartData = this.getCreationGuideDataFromMouse(e);

    if (this.props.onGuideStart) {
      this.props.onGuideStart(this.guideStartData);
    }
  }

  // eslint-disable-next-line complexity
  onDrag(e: MouseEvent) {
    const guideData = this.getCreationGuideDataFromMouse(e);
    const { start, end } = guideData;
    const { guideStartData, guidePrevDragData } = this;
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

    this.guidePrevDragData = guideInfo;
    if (this.props.onGuideChange) {
      this.props.onGuideChange(guideInfo);
    }
  }

  onDragEnd(e: MouseEvent) {
    this.guideStartData = null;

    if (this.props.onGuideEnd) {
      this.props.onGuideEnd(this.getCreationGuideDataFromMouse(e));
    }
  }

  onClick(e: MouseEvent) {
    const guideData = this.getCreationGuideDataFromMouse(e);

    if (this.props.onGuideStart) {
      this.props.onGuideStart(guideData);
    }

    if (this.props.onGuideEnd) {
      this.props.onGuideEnd(guideData);
    }
  }

  onCancel() {
    if (this.props.onGuideCancel) {
      this.props.onGuideCancel();
    }
  }

  render() {
    const { columnLeft, children } = this.props;

    return (
      <div
        className={classNames.columns}
        style={{ left: columnLeft }}
        onMouseDown={this.onMouseDown}
      >
        {children}
      </div>
    );
  }
}
