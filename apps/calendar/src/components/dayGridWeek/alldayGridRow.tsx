import { Fragment, FunctionComponent, h } from 'preact';
import { useMemo, useState } from 'preact/hooks';

import range from 'tui-code-snippet/array/range';

import { GridSelection } from '@src/components/dayGridCommon/gridSelection';
import { GridCell } from '@src/components/dayGridWeek/gridCell';
import { HorizontalEvent } from '@src/components/events/horizontalEvent';
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
import { AlldayEventCategory, Cells } from '@t/panel';

type GridRowTitleTemplate = `${Props['category']}Title`;

interface Props {
  category: Exclude<AlldayEventCategory, 'milestone' | 'task'>;
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

export const AlldayGridRow: FunctionComponent<Props> = ({
  events,
  cells = defaultPanelInfoList,
  category,
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
  const { updateDayGridRowHeight } = useDispatch('weekViewLayout');
  // @TODO: get margin value dynamically
  const eventTopMargin = 2;
  const maxTop = Math.max(0, ...events.map(({ top }) => top));
  const { narrowWeekend = false } = options;
  const rowTitleTemplate: GridRowTitleTemplate = `${category}Title`;

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

  const { onMouseDown } = useDrag('grid-selection');

  const onClickExceedCount = (index: number) => {
    setClickedCount(true);
    setClickedIndex(index);
    updateDayGridRowHeight({
      rowName: category as WeekGridRows,
      height: (maxTop + 1) * EVENT_HEIGHT,
    });
  };
  const onClickCollapseButton = () => {
    setClickedCount(false);
    updateDayGridRowHeight({
      rowName: category as WeekGridRows,
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
      <HorizontalEvent
        key={`${category}-DayEvent-${uiModel.cid()}`}
        uiModel={uiModel}
        isResizing={uiModel.cid() === dragTargetEvent?.cid()}
        eventHeight={EVENT_HEIGHT}
        headerHeight={0}
      />
    ));

  return (
    <Fragment>
      <div className={cls('panel-title')} style={{ width: columnWidth }}>
        <Template template={rowTitleTemplate} model={category} />
      </div>
      <div className={cls('allday-panel')} ref={setPanelContainerRef} onMouseDown={onMouseDown}>
        <div className={cls('panel-grid-wrapper')}>{gridCells}</div>
        <GridSelection
          gridSelectionData={gridSelection}
          cells={cells}
          narrowWeekend={narrowWeekend}
        />
        <div className={cls(`panel-${category}-events`)}>{horizontalEvents}</div>
        {dragTargetEvent && (
          <HorizontalEvent
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
