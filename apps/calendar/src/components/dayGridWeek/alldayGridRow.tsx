import { Fragment, FunctionComponent, h } from 'preact';
import { useMemo, useRef } from 'preact/hooks';

import range from 'tui-code-snippet/array/range';

import { GridSelection } from '@src/components/dayGridCommon/gridSelection';
import { GridCells } from '@src/components/dayGridWeek/gridCells';
import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import Template from '@src/components/template';
import { EVENT_FORM_POPUP_WIDTH } from '@src/constants/popup';
import { PANEL_HEIGHT, WEEK_EVENT_MARGIN_TOP } from '@src/constants/style';
import { useDispatch } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';
import { DRAGGING_TYPE_CONSTANTS } from '@src/helpers/drag';
import { EVENT_HEIGHT, isWithinHeight } from '@src/helpers/grid';
import { createMousePositionDataGrabberWeek } from '@src/helpers/view';
import { useDOMNode } from '@src/hooks/common/domNode';
import { useDrag } from '@src/hooks/common/drag';
import { useAlldayGridRowEventResize } from '@src/hooks/dayGridWeek/alldayGridRowEventResize';
import { useAlldayGridRowSelection } from '@src/hooks/dayGridWeek/alldayGridRowSelection';
import { useGridRowHeightController } from '@src/hooks/dayGridWeek/gridRowHeightController';
import EventUIModel from '@src/model/eventUIModel';
import { PopupType } from '@src/slices/popup';
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
  height = PANEL_HEIGHT,
  options = {},
  useCreationPopup,
  gridInfo,
  gridColWidthMap,
  timesWidth = 120,
  timezonesCount = 1,
}) => {
  const dragStartPos = useRef<{ x: number; y: number } | null>(null);
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

  const { dragTargetEvent, resizingWidth } = useAlldayGridRowEventResize({
    events,
    cells,
    gridColWidthMap,
    mousePositionDataGrabber,
  });

  const gridSelection = useAlldayGridRowSelection(mousePositionDataGrabber, cells);

  const { show } = useDispatch('popup');

  const { onMouseDown } = useDrag(DRAGGING_TYPE_CONSTANTS.alldayGridRowSelection, {
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

      const { start, end } = gridSelection;
      const { x, y } = dragStartPos.current;
      const { pageX, pageY } = e;

      dragStartPos.current = null;
      e.stopPropagation();
      show({
        type: PopupType.form,
        param: {
          start,
          end,
          isAllday: true,
          popupRect: {
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
