import { Fragment, h } from 'preact';
import { useMemo } from 'preact/hooks';

import { GridCells } from '@src/components/dayGridWeek/gridCells';
import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import { Template } from '@src/components/template';
import { DEFAULT_PANEL_HEIGHT, WEEK_EVENT_MARGIN_TOP } from '@src/constants/style';
import { useTheme } from '@src/contexts/themeStore';
import { cls } from '@src/helpers/css';
import { EVENT_HEIGHT, isWithinHeight } from '@src/helpers/grid';
import { useGridRowHeightController } from '@src/hooks/dayGridWeek/useGridRowHeightController';
import type EventUIModel from '@src/model/eventUIModel';
import { weekDayGridLeftSelector } from '@src/selectors/theme';
import type TZDate from '@src/time/date';

import type { WeekOptions } from '@t/options';
import type { AlldayEventCategory } from '@t/panel';

type GridRowTitleTemplate = `${AlldayEventCategory}Title`;

interface Props {
  category: Exclude<AlldayEventCategory, 'allday'>;
  events: EventUIModel[];
  weekDates: TZDate[];
  timesWidth?: number;
  timezonesCount?: number;
  height?: number;
  options?: WeekOptions;
  gridColWidthMap: string[][];
}

export function OtherGridRow({
  events,
  weekDates,
  category,
  height = DEFAULT_PANEL_HEIGHT,
  options = {},
}: Props) {
  const dayGridLeftTheme = useTheme(weekDayGridLeftSelector);

  const maxTop = useMemo(() => Math.max(0, ...events.map(({ top }) => top)), [events]);
  const { narrowWeekend = false } = options;
  const rowTitleTemplate: GridRowTitleTemplate = `${category}Title`;

  const { clickedIndex, isClickedCount, onClickExceedCount, onClickCollapseButton } =
    useGridRowHeightController(maxTop, category);

  const horizontalEvents = useMemo(
    () =>
      events
        .filter(isWithinHeight(height, EVENT_HEIGHT + WEEK_EVENT_MARGIN_TOP))
        .map((uiModel) => (
          <HorizontalEvent
            key={`${category}-DayEvent-${uiModel.cid()}`}
            uiModel={uiModel}
            eventHeight={EVENT_HEIGHT}
            headerHeight={0}
          />
        )),
    [category, events, height]
  );

  return (
    <Fragment>
      <div className={cls('panel-title')} style={dayGridLeftTheme}>
        <Template template={rowTitleTemplate} param={category} />
      </div>
      <div className={cls('allday-panel')}>
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
        <div className={cls(`panel-${category}-events`)}>{horizontalEvents}</div>
      </div>
    </Fragment>
  );
}
