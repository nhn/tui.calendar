import { Fragment, FunctionComponent, h } from 'preact';
import { useMemo, useRef } from 'preact/hooks';

import range from 'tui-code-snippet/array/range';

import { GridSelection } from '@src/components/dayGridCommon/gridSelection';
import { GridCells } from '@src/components/dayGridWeek/gridCells';
import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import Template from '@src/components/template';
import { EVENT_FORM_POPUP_WIDTH } from '@src/constants/popup';
import { DEFAULT_PANEL_HEIGHT, WEEK_EVENT_MARGIN_TOP } from '@src/constants/style';
import { useDispatch } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { DRAGGING_TYPE_CONSTANTS } from '@src/helpers/drag';
import { EVENT_HEIGHT, isWithinHeight } from '@src/helpers/grid';
import { createMousePositionDataGrabberWeek } from '@src/helpers/view';
import { useDOMNode } from '@src/hooks/common/domNode';
import { useDrag } from '@src/hooks/common/drag';
import { useDayGridSelection } from '@src/hooks/dayGridCommon/dayGridSelection';
import { useAlldayGridRowEventMove } from '@src/hooks/dayGridWeek/alldayGridRowEventMove';
import { useAlldayGridRowEventResize } from '@src/hooks/dayGridWeek/alldayGridRowEventResize';
import { useGridRowHeightController } from '@src/hooks/dayGridWeek/gridRowHeightController';
import EventUIModel from '@src/model/eventUIModel';
import { PopupType } from '@src/slices/popup';
import TZDate from '@src/time/date';
import { addDate } from '@src/time/datetime';

import { WeekOptions } from '@t/options';
import { AlldayEventCategory, Cells } from '@t/panel';

type GridRowTitleTemplate = `${Props['category']}Title`;

interface Props {
  category: Exclude<AlldayEventCategory, 'milestone' | 'task'>;
  events: EventUIModel[];
  cells?: Cells;
  timesWidth?: number;
  timezonesCount?: number;
  height?: number;
  options?: WeekOptions;
  useCreationPopup: boolean;
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
  height = DEFAULT_PANEL_HEIGHT,
  options = {},
  useCreationPopup,
  gridInfo,
  gridColWidthMap,
  timesWidth = 120,
  timezonesCount = 1,
}) => {
  const [panelContainer, setPanelContainerRef] = useDOMNode<HTMLDivElement>();
  const { show } = useDispatch('popup');

  const dragStartPos = useRef<{ x: number; y: number } | null>(null);

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
    events,
    cells,
    gridColWidthMap,
    mousePositionDataGrabber,
  });
  const { movingEvent, movingLeft } = useAlldayGridRowEventMove({
    events,
    cells,
    gridInfo,
    mousePositionDataGrabber,
  });

  const gridSelection = useDayGridSelection(mousePositionDataGrabber);
  const gridSelectionData = gridSelection
    ? {
        startCellIndex: gridSelection.initColIndex,
        endCellIndex: gridSelection.currentColIndex,
      }
    : null;

  const { onMouseDown } = useDrag(DRAGGING_TYPE_CONSTANTS.dayGridSelection, {
    onDragStart: (e) => {
      dragStartPos.current = {
        x: e.pageX,
        y: e.pageY,
      };
    },
    onDragEnd: (e) => {
      if (!gridSelection || !useCreationPopup || !dragStartPos.current) {
        return;
      }

      const { initColIndex, currentColIndex } = gridSelection;
      const { x, y } = dragStartPos.current;
      const { pageX, pageY } = e;

      dragStartPos.current = null;
      e.stopPropagation();

      const start = cells[Math.min(initColIndex, currentColIndex)];
      const end = cells[Math.max(initColIndex, currentColIndex)];

      show({
        type: PopupType.form,
        param: {
          start,
          end,
          isAllday: true,
          popupPosition: {
            left: (pageX + x - EVENT_FORM_POPUP_WIDTH) / 2,
            top: (pageY + y) / 2,
          },
        },
      });
    },
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
