import { Fragment, FunctionComponent, h } from 'preact';
import { useMemo } from 'preact/hooks';

import range from 'tui-code-snippet/array/range';

import { GridSelection } from '@src/components/dayGridCommon/gridSelection';
import { GridCells } from '@src/components/dayGridWeek/gridCells';
import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import Template from '@src/components/template';
import { DEFAULT_PANEL_HEIGHT, WEEK_EVENT_MARGIN_TOP } from '@src/constants/style';
import { cls } from '@src/helpers/css';
import { EVENT_HEIGHT, isWithinHeight } from '@src/helpers/grid';
import { createMousePositionDataGrabberWeek } from '@src/helpers/view';
import { useDOMNode } from '@src/hooks/common/domNode';
import { useDayGridSelection } from '@src/hooks/dayGridCommon/dayGridSelection';
import { usePopupWithDayGridSelection } from '@src/hooks/dayGridCommon/popupWithDayGridSelection';
import { useAlldayGridRowEventMove } from '@src/hooks/dayGridWeek/alldayGridRowEventMove';
import { useAlldayGridRowEventResize } from '@src/hooks/dayGridWeek/alldayGridRowEventResize';
import { useGridRowHeightController } from '@src/hooks/dayGridWeek/gridRowHeightController';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import { addDate } from '@src/time/datetime';

import { WeekOptions } from '@t/options';
import { AlldayEventCategory } from '@t/panel';
import { CellStyleInfo } from '@t/time/datetime';

type GridRowTitleTemplate = `${Props['category']}Title`;

interface Props {
  category: Exclude<AlldayEventCategory, 'milestone' | 'task'>;
  events: EventUIModel[];
  cells?: TZDate[];
  timesWidth?: number;
  timezonesCount?: number;
  height?: number;
  options?: WeekOptions;
  shouldRenderDefaultPopup?: boolean;
  gridInfo: CellStyleInfo[];
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
  height = DEFAULT_PANEL_HEIGHT,
  options = {},
  gridInfo,
  gridColWidthMap,
  timesWidth = 120,
  timezonesCount = 1,
}) => {
  const [panelContainer, setPanelContainerRef] = useDOMNode<HTMLDivElement>();

  const maxTop = Math.max(0, ...events.map(({ top }) => top));
  const { narrowWeekend = false } = options;
  const rowTitleTemplate: GridRowTitleTemplate = `${category}Title`;

  const columnWidth = timesWidth * timezonesCount;

  const mousePositionDataGrabber = useMemo(
    () =>
      panelContainer
        ? createMousePositionDataGrabberWeek(cells, gridInfo, panelContainer)
        : () => null,
    [cells, gridInfo, panelContainer]
  );

  const { resizingEvent, resizingWidth } = useAlldayGridRowEventResize({
    cells,
    gridColWidthMap,
    mousePositionDataGrabber,
  });
  const { movingEvent, movingLeft } = useAlldayGridRowEventMove({
    gridInfo,
    mousePositionDataGrabber,
  });

  const gridSelection = useDayGridSelection(mousePositionDataGrabber);
  const gridSelectionData: GridSelectionDataByRow | null = gridSelection
    ? {
        startCellIndex: gridSelection.initColIndex,
        endCellIndex: gridSelection.currentColIndex,
      }
    : null;

  const onMouseDown = usePopupWithDayGridSelection({
    gridSelection,
    dateMatrix: [cells],
  });

  const { clickedIndex, isClickedCount, onClickExceedCount, onClickCollapseButton } =
    useGridRowHeightController(maxTop, category);

  const horizontalEvents = events
    .filter(isWithinHeight(height, EVENT_HEIGHT + WEEK_EVENT_MARGIN_TOP))
    .map((uiModel) => (
      <HorizontalEvent
        key={`${category}-DayEvent-${uiModel.cid()}`}
        uiModel={uiModel}
        isDraggingTarget={
          uiModel.cid() === resizingEvent?.cid() || uiModel.cid() === movingEvent?.cid()
        }
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
        <div className={cls('panel-grid-wrapper')}>
          <GridCells
            uiModels={events}
            cells={cells}
            narrowWeekend={narrowWeekend}
            height={height}
            clickedIndex={clickedIndex}
            isClickedCount={isClickedCount}
            onClickExceedCount={onClickExceedCount}
            onClickCollapseButton={onClickCollapseButton}
          />
        </div>
        <GridSelection
          gridSelectionData={gridSelectionData}
          cells={cells}
          narrowWeekend={narrowWeekend}
        />
        <div className={cls(`panel-${category}-events`)}>{horizontalEvents}</div>
        {resizingEvent && (
          <HorizontalEvent
            uiModel={resizingEvent}
            eventHeight={EVENT_HEIGHT}
            headerHeight={0}
            resizingWidth={resizingWidth}
          />
        )}
        {movingEvent && (
          <HorizontalEvent
            uiModel={movingEvent}
            eventHeight={EVENT_HEIGHT}
            headerHeight={0}
            movingLeft={movingLeft}
          />
        )}
      </div>
    </Fragment>
  );
};
