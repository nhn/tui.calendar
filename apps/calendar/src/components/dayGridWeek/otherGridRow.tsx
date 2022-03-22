import { Fragment, h } from 'preact';
import { useMemo } from 'preact/hooks';

import { GridCells } from '@src/components/dayGridWeek/gridCells';
import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import { Template } from '@src/components/template';
import { DEFAULT_PANEL_HEIGHT, WEEK_EVENT_MARGIN_TOP } from '@src/constants/style';
import { cls } from '@src/helpers/css';
import { isVisibleEvent } from '@src/helpers/events';
import { EVENT_HEIGHT, isWithinHeight } from '@src/helpers/grid';
import { useDayGridRowTitleStyle } from '@src/hooks/dayGridWeek/dayGridRowTitleStyle';
import { useGridRowHeightController } from '@src/hooks/dayGridWeek/gridRowHeightController';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';

import { WeekOptions } from '@t/options';
import { AlldayEventCategory } from '@t/panel';

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
  timesWidth = 120,
  timezonesCount = 1,
}: Props) {
  const style = useDayGridRowTitleStyle(timesWidth, timezonesCount);

  const maxTop = useMemo(() => Math.max(0, ...events.map(({ top }) => top)), [events]);
  const { narrowWeekend = false } = options;
  const rowTitleTemplate: GridRowTitleTemplate = `${category}Title`;

  const { clickedIndex, isClickedCount, onClickExceedCount, onClickCollapseButton } =
    useGridRowHeightController(maxTop, category);

  const horizontalEvents = useMemo(
    () =>
      events
        .filter((uiModel) => isVisibleEvent(uiModel.model))
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
      <div className={cls('panel-title')} style={style}>
        <Template template={rowTitleTemplate} model={category} />
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
