import { Fragment, FunctionComponent, h } from 'preact';

import range from 'tui-code-snippet/array/range';

import { GridCells } from '@src/components/dayGridWeek/gridCells';
import { HorizontalEvent } from '@src/components/events/horizontalEvent';
import Template from '@src/components/template';
import { DEFAULT_PANEL_HEIGHT, WEEK_EVENT_MARGIN_TOP } from '@src/constants/style';
import { cls } from '@src/helpers/css';
import { EVENT_HEIGHT, isWithinHeight } from '@src/helpers/grid';
import { useGridRowHeightController } from '@src/hooks/dayGridWeek/gridRowHeightController';
import EventUIModel from '@src/model/eventUIModel';
import TZDate from '@src/time/date';
import { addDate } from '@src/time/datetime';

import { WeekOption } from '@t/option';
import { AlldayEventCategory, Cells } from '@t/panel';

type GridRowTitleTemplate = `${AlldayEventCategory}Title`;

interface Props {
  category: Exclude<AlldayEventCategory, 'allday'>;
  events: EventUIModel[];
  cells?: Cells;
  timesWidth?: number;
  timezonesCount?: number;
  height?: number;
  options?: WeekOption;
  gridColWidthMap: string[][];
}

const defaultPanelInfoList: TZDate[] = range(0, 7).map((day) => {
  const now = new TZDate();

  return addDate(now, day - now.getDay());
});

export const OtherGridRow: FunctionComponent<Props> = ({
  events,
  cells = defaultPanelInfoList,
  category,
  height = DEFAULT_PANEL_HEIGHT,
  options = {},
  timesWidth = 120,
  timezonesCount = 1,
}) => {
  const maxTop = Math.max(0, ...events.map(({ top }) => top));
  const { narrowWeekend = false } = options;
  const rowTitleTemplate: GridRowTitleTemplate = `${category}Title`;

  const columnWidth = timesWidth * timezonesCount;

  const { clickedIndex, isClickedCount, onClickExceedCount, onClickCollapseButton } =
    useGridRowHeightController(maxTop, category);

  const horizontalEvents = events
    .filter(isWithinHeight(height, EVENT_HEIGHT + WEEK_EVENT_MARGIN_TOP))
    .map((uiModel) => (
      <HorizontalEvent
        key={`${category}-DayEvent-${uiModel.cid()}`}
        uiModel={uiModel}
        eventHeight={EVENT_HEIGHT}
        headerHeight={0}
      />
    ));

  return (
    <Fragment>
      <div className={cls('panel-title')} style={{ width: columnWidth }}>
        <Template template={rowTitleTemplate} model={category} />
      </div>
      <div className={cls('allday-panel')}>
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
        <div className={cls(`panel-${category}-events`)}>{horizontalEvents}</div>
      </div>
    </Fragment>
  );
};
