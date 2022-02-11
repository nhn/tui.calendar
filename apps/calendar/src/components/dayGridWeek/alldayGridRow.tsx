import { Fragment, h } from 'preact';
import { useMemo } from 'preact/hooks';

import { GridSelection } from '@src/components/dayGridCommon/gridSelection';
import { GridCells } from '@src/components/dayGridWeek/gridCells';
import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import { Template } from '@src/components/template';
import { DEFAULT_PANEL_HEIGHT, WEEK_EVENT_MARGIN_TOP } from '@src/constants/style';
import { cls } from '@src/helpers/css';
import { createGridPositionFinder, EVENT_HEIGHT, isWithinHeight } from '@src/helpers/grid';
import { useDOMNode } from '@src/hooks/common/domNode';
import { useAlldayGridRowEventMove } from '@src/hooks/dayGridWeek/alldayGridRowEventMove';
import { useAlldayGridRowEventResize } from '@src/hooks/dayGridWeek/alldayGridRowEventResize';
import { useGridRowHeightController } from '@src/hooks/dayGridWeek/gridRowHeightController';
import { useGridSelection } from '@src/hooks/gridSelection/gridSelection';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';

import { WeekOptions } from '@t/options';
import { AlldayEventCategory } from '@t/panel';
import { CellStyle } from '@t/time/datetime';

type GridRowTitleTemplate = `${Props['category']}Title`;

interface Props {
  category: Exclude<AlldayEventCategory, 'milestone' | 'task'>;
  events: EventUIModel[];
  weekDates: TZDate[];
  timesWidth?: number;
  timezonesCount?: number;
  height?: number;
  options?: WeekOptions;
  shouldRenderDefaultPopup?: boolean;
  rowStyleInfo: CellStyle[];
  gridColWidthMap: string[][];
}

export function AlldayGridRow({
  events,
  weekDates,
  category,
  height = DEFAULT_PANEL_HEIGHT,
  options = {},
  rowStyleInfo,
  gridColWidthMap,
  timesWidth = 120,
  timezonesCount = 1,
}: Props) {
  const [panelContainer, setPanelContainerRef] = useDOMNode<HTMLDivElement>();

  const maxTop = Math.max(0, ...events.map(({ top }) => top));
  const { narrowWeekend = false } = options;
  const rowTitleTemplate: GridRowTitleTemplate = `${category}Title`;

  const columnWidth = timesWidth * timezonesCount;

  const gridPositionFinder = useMemo(
    () =>
      createGridPositionFinder({
        container: panelContainer,
        rowsCount: 1,
        columnsCount: weekDates.length,
      }),
    [weekDates, panelContainer]
  );

  const { resizingEvent, resizingWidth } = useAlldayGridRowEventResize({
    weekDates,
    gridColWidthMap,
    gridPositionFinder,
  });
  const { movingEvent, movingLeft } = useAlldayGridRowEventMove({
    rowStyleInfo,
    gridPositionFinder,
  });

  const { onMouseDown, gridSelection } = useGridSelection({
    type: 'dayGridWeek',
    gridPositionFinder,
  });
  // const onMouseDown = usePopupWithDayGridSelection({
  //   gridSelection,
  //   dateMatrix: [weekDates],
  // });

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
            weekDates={weekDates}
            narrowWeekend={narrowWeekend}
            height={height}
            clickedIndex={clickedIndex}
            isClickedCount={isClickedCount}
            onClickExceedCount={onClickExceedCount}
            onClickCollapseButton={onClickCollapseButton}
          />
        </div>
        {gridSelection ? (
          <GridSelection
            gridSelectionData={{
              startCellIndex: gridSelection.startColumnIndex,
              endCellIndex: gridSelection.endColumnIndex,
            }}
            weekDates={weekDates}
            narrowWeekend={narrowWeekend}
          />
        ) : null}
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
}
