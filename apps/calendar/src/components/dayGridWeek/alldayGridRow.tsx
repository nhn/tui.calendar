import { Fragment, h } from 'preact';
import { useMemo } from 'preact/hooks';

import { AlldayGridSelection } from '@src/components/dayGridWeek/alldayGridSelection';
import { GridCells } from '@src/components/dayGridWeek/gridCells';
import { MovingEventShadow } from '@src/components/dayGridWeek/movingEventShadow';
import { ResizingEventShadow } from '@src/components/dayGridWeek/resizingEventShadow';
import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import { Template } from '@src/components/template';
import { DEFAULT_PANEL_HEIGHT, WEEK_EVENT_MARGIN_TOP } from '@src/constants/style';
import { useStore } from '@src/contexts/calendarStore';
import { useTheme } from '@src/contexts/themeStore';
import { cls } from '@src/helpers/css';
import { createGridPositionFinder, EVENT_HEIGHT, isWithinHeight } from '@src/helpers/grid';
import { alldayGridRowSelectionHelper } from '@src/helpers/gridSelection';
import { useDOMNode } from '@src/hooks/common/useDOMNode';
import { useGridRowHeightController } from '@src/hooks/dayGridWeek/useGridRowHeightController';
import { useGridSelection } from '@src/hooks/gridSelection/useGridSelection';
import type EventUIModel from '@src/model/eventUIModel';
import { optionsSelector } from '@src/selectors';
import { weekDayGridLeftSelector } from '@src/selectors/theme';
import type TZDate from '@src/time/date';
import { Day } from '@src/time/datetime';

import type { WeekOptions } from '@t/options';
import type { CellStyle } from '@t/time/datetime';

interface Props {
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

const rowTitleTemplate = `alldayTitle` as const;

export function AlldayGridRow({
  events,
  weekDates,
  height = DEFAULT_PANEL_HEIGHT,
  options = {},
  rowStyleInfo,
  gridColWidthMap,
}: Props) {
  const { isReadOnly } = useStore(optionsSelector);
  const dayGridLeftTheme = useTheme(weekDayGridLeftSelector);
  const [panelContainer, setPanelContainerRef] = useDOMNode<HTMLDivElement>();

  const { narrowWeekend = false, startDayOfWeek = Day.SUN } = options;

  const maxTop = useMemo(() => Math.max(0, ...events.map(({ top }) => top)), [events]);
  const gridPositionFinder = useMemo(
    () =>
      createGridPositionFinder({
        container: panelContainer,
        rowsCount: 1,
        columnsCount: weekDates.length,
        narrowWeekend,
        startDayOfWeek,
      }),
    [panelContainer, weekDates.length, narrowWeekend, startDayOfWeek]
  );

  const { clickedIndex, isClickedCount, onClickExceedCount, onClickCollapseButton } =
    useGridRowHeightController(maxTop, 'allday');

  const horizontalEvents = useMemo(
    () =>
      events
        .filter(isWithinHeight(height, EVENT_HEIGHT + WEEK_EVENT_MARGIN_TOP))
        .map((uiModel) => (
          <HorizontalEvent
            key={`allday-DayEvent-${uiModel.cid()}`}
            uiModel={uiModel}
            eventHeight={EVENT_HEIGHT}
            headerHeight={0}
          />
        )),
    [events, height]
  );

  const startGridSelection = useGridSelection({
    type: 'dayGridWeek',
    gridPositionFinder,
    dateCollection: weekDates,
    selectionSorter: alldayGridRowSelectionHelper.sortSelection,
    dateGetter: alldayGridRowSelectionHelper.getDateFromCollection,
  });

  const onMouseDown = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    if (isReadOnly || !target.classList.contains(cls('panel-grid'))) {
      return;
    }

    startGridSelection(e);
  };

  return (
    <Fragment>
      <div className={cls('panel-title')} style={dayGridLeftTheme}>
        <Template template={rowTitleTemplate} param="alldayTitle" />
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
        <div className={cls(`panel-allday-events`)}>{horizontalEvents}</div>
        <ResizingEventShadow
          weekDates={weekDates}
          gridPositionFinder={gridPositionFinder}
          gridColWidthMap={gridColWidthMap}
        />
        <MovingEventShadow rowStyleInfo={rowStyleInfo} gridPositionFinder={gridPositionFinder} />
        <AlldayGridSelection weekDates={weekDates} narrowWeekend={narrowWeekend} />
      </div>
    </Fragment>
  );
}
