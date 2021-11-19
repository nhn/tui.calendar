import { Fragment, FunctionComponent, h } from 'preact';
import { useMemo, useState } from 'preact/hooks';

import range from 'tui-code-snippet/array/range';

import { GridSelection } from '@src/components/dayGridCommon/gridSelection';
import { GridCell } from '@src/components/dayGridWeek/gridCell';
import { TempHorizontalEvent } from '@src/components/events/tempHorizontalEvent';
import { useAlldayGridRowDnd } from '@src/components/hooks/alldayGridRow';
import { useDOMNode } from '@src/components/hooks/domNode';
import { useDrag } from '@src/components/hooks/drag';
import { useGridSelectionGridRow } from '@src/components/hooks/gridSelectionGridRow';
import Template from '@src/components/template';
import { PANEL_HEIGHT, WEEK_EVENT_MARGIN_TOP } from '@src/constants/style';
import { useDispatch } from '@src/contexts/calendarStore';
import { cls, toPercent } from '@src/helpers/css';
import {
  EVENT_HEIGHT,
  getExceedCount,
  getGridWidthAndLeftPercentValues,
  isInGrid,
  isWithinHeight,
  TOTAL_WIDTH,
} from '@src/helpers/grid';
import { createMousePositionDataGrabberWeek } from '@src/helpers/view';
import EventUIModel from '@src/model/eventUIModel';
import { WeekGridRows } from '@src/slices/weekViewLayout';
import TZDate from '@src/time/date';
import { addDate } from '@src/time/datetime';

import { WeekOption } from '@t/option';
import { Cells, DayGridEventType } from '@t/panel';

type GridRowTitleTemplate = `${DayGridEventType}Title`;

interface Props {
  type: DayGridEventType;
  events: EventUIModel[];
  cells?: Cells;
  timesWidth?: number;
  timezonesCount?: number;
  height?: number;
  options?: WeekOption;
  shouldRenderDefaultPopup?: boolean;
  gridInfo: GridInfo[];
  gridColWidthMap: string[][];
}

const defaultPanelInfoList: TZDate[] = range(0, 7).map((day) => {
  const now = new TZDate();

  return addDate(now, day - now.getDay());
});

export const TempAlldayGridRow: FunctionComponent<Props> = ({
  events,
  cells = defaultPanelInfoList,
  type,
  height = PANEL_HEIGHT,
  options = {},
  gridInfo,
  gridColWidthMap,
  timesWidth = 120,
  timezonesCount = 1,
}) => {
  const [panelContainer, setPanelContainerRef] = useDOMNode<HTMLDivElement>();
  const [clickedIndex, setClickedIndex] = useState(0);
  const [isClickedCount, setClickedCount] = useState(false);
  const { setDraggingState, endDrag } = useDispatch('dnd');
  const { updateDayGridRowHeight } = useDispatch('weekViewLayout');
  // @TODO: get margin value dynamically
  const eventTopMargin = 2;
  const maxTop = Math.max(0, ...events.map(({ top }) => top));
  const { narrowWeekend = false } = options;
  const rowTitleTemplate: GridRowTitleTemplate = `${type}Title`;

  const { widthList, leftList } = getGridWidthAndLeftPercentValues(
    cells,
    narrowWeekend,
    TOTAL_WIDTH
  );
  const columnWidth = timesWidth * timezonesCount;

  const mousePositionDataGrabber = useMemo(
    () =>
      panelContainer
        ? createMousePositionDataGrabberWeek(cells, gridInfo, panelContainer)
        : () => null,
    [cells, gridInfo, panelContainer]
  );

  const { dragTargetEvent, resizingWidth } = useAlldayGridRowDnd({
    events,
    cells,
    gridColWidthMap,
    mousePositionDataGrabber,
  });

  const gridSelection = useGridSelectionGridRow(mousePositionDataGrabber, cells);

  const { onMouseDown } = useDrag({
    onDragStart: (e) => {
      setDraggingState({
        draggingItemType: 'grid-selection',
        initX: e.clientX,
        initY: e.clientY,
      });
    },
    onDrag: (e) => {
      setDraggingState({
        draggingItemType: 'grid-selection',
        x: e.clientX,
        y: e.clientY,
      });
    },
    onDragEnd: endDrag,
  });

  const onClickExceedCount = (index: number) => {
    setClickedCount(true);
    setClickedIndex(index);
    updateDayGridRowHeight({
      rowName: type as WeekGridRows,
      height: (maxTop + 1) * EVENT_HEIGHT,
    });
  };
  const onClickCollapseButton = () => {
    setClickedCount(false);
    updateDayGridRowHeight({
      rowName: type as WeekGridRows,
      height: PANEL_HEIGHT,
    });
  };

  const gridCells = cells.map((cell, index) => {
    const width = toPercent(widthList[index]);
    const left = toPercent(leftList[index]);

    const eventModelsInCell = events.filter(isInGrid(cell));
    const exceedCount = getExceedCount(eventModelsInCell, height, EVENT_HEIGHT + eventTopMargin);
    const isClickedIndex = index === clickedIndex;

    return (
      <GridCell
        key={`panel-grid-${cell.getDate()}`}
        width={width}
        left={left}
        index={index}
        exceedCount={exceedCount}
        isClicked={isClickedCount}
        onClickExceedCount={onClickExceedCount}
        isClickedIndex={isClickedIndex}
        onClickCollapseButton={onClickCollapseButton}
      />
    );
  });
  const horizontalEvents = events
    .filter(isWithinHeight(height, EVENT_HEIGHT + WEEK_EVENT_MARGIN_TOP))
    .map((uiModel) => (
      <TempHorizontalEvent
        key={`${type}-DayEvent-${uiModel.cid()}`}
        uiModel={uiModel}
        isResizing={uiModel.cid() === dragTargetEvent?.cid()}
        eventHeight={EVENT_HEIGHT}
        headerHeight={0}
      />
    ));

  return (
    <Fragment>
      <div className={cls('panel-title')} style={{ width: columnWidth }}>
        <Template template={rowTitleTemplate} model={type} />
      </div>
      <div className={cls('allday-panel')} ref={setPanelContainerRef} onMouseDown={onMouseDown}>
        <div className={cls('panel-grid-wrapper')}>{gridCells}</div>
        <GridSelection
          gridSelectionData={gridSelection}
          cells={cells}
          narrowWeekend={narrowWeekend}
        />
        <div className={cls(`panel-${type}-events`)}>{horizontalEvents}</div>
        {dragTargetEvent && (
          <TempHorizontalEvent
            uiModel={dragTargetEvent}
            eventHeight={EVENT_HEIGHT}
            headerHeight={0}
            resizingWidth={resizingWidth}
          />
        )}
      </div>
    </Fragment>
  );
};
