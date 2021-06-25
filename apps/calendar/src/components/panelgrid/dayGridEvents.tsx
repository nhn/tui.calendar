import { Fragment, FunctionComponent, h } from 'preact';

import range from 'tui-code-snippet/array/range';

import { CreationGuide } from '@src/components/daygrid/creationGuide';
import GridWithMouse from '@src/components/daygrid/gridWithMouse';
import GridEvent from '@src/components/events/gridEvent';
import { useCreationGuide } from '@src/components/hooks/creationGuide';
import { useDOMNode } from '@src/components/hooks/domNode';
import { useTheme } from '@src/components/hooks/theme';
import { PanelGrid } from '@src/components/panelgrid/panelgrid';
import { PanelTitle } from '@src/components/panelgrid/panelTitle';
import { DEFAULT_PANEL_HEIGHT } from '@src/controller/panel';
import { WeekOption } from '@src/model';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import TZDate from '@src/time/date';
import { addDate, getGridLeftAndWidth, toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { cls } from '@src/util/cssHelper';
import { EVENT_HEIGHT, isWithinHeight } from '@src/util/gridHelper';
import { convertPxToNum } from '@src/util/units';
import { createMousePositionDataGrabber } from '@src/util/weekViewHelper';

import type { GridGuideInfo } from '@t/components/daygrid/creationGuide';
import type { Cells, DayGridEventType } from '@t/panel';

const defaultPanelInfoList: TZDate[] = range(0, 7).map((day) => {
  const now = new TZDate();

  return addDate(now, day - now.getDay());
});

interface Props {
  type: DayGridEventType;
  events: ScheduleViewModel[];
  cells?: Cells;
  timesWidth?: number;
  timezonesCount?: number;
  height?: number;
  options?: WeekOption;
  shouldRenderDefaultPopup?: boolean;
}

function getGridInfoList(cells: Cells): GridGuideInfo[][] {
  return [
    cells.map<GridGuideInfo>((cell) => {
      const start = toStartOfDay(cell);
      const end = toEndOfDay(cell);

      return { start, end };
    }),
  ];
}

export const DayGridEvents: FunctionComponent<Props> = ({
  type = 'milestone',
  events,
  cells = defaultPanelInfoList,
  timesWidth = 120,
  timezonesCount = 1,
  height = DEFAULT_PANEL_HEIGHT,
  options = {},
  shouldRenderDefaultPopup = false,
}) => {
  const {
    week: { dayGridSchedule },
  } = useTheme();
  const [panelContainer, setPanelContainerRef] = useDOMNode<HTMLDivElement>();
  const columnWidth = timesWidth * timezonesCount;
  const { narrowWeekend = false, startDayOfWeek = 0, workweek = false } = options;
  const grids = getGridLeftAndWidth(cells.length, narrowWeekend, startDayOfWeek, workweek);
  const getMousePositionData =
    type === 'allday' && panelContainer
      ? createMousePositionDataGrabber(cells, grids, panelContainer)
      : () => null;

  const { creationGuide, onGuideChange, onGuideEnd, onGuideCancel } = useCreationGuide(
    shouldRenderDefaultPopup
  );
  const gridInfoList = getGridInfoList(cells);
  const filteredViewModels = events.filter(
    isWithinHeight(height, EVENT_HEIGHT + convertPxToNum(dayGridSchedule.marginTop))
  );

  return (
    <Fragment>
      <PanelTitle width={columnWidth} template={type} model={type} />
      <div className={cls('allday-panel')} ref={setPanelContainerRef}>
        <GridWithMouse
          gridInfoList={gridInfoList}
          onGuideEnd={onGuideEnd}
          onGuideChange={onGuideChange}
          onGuideCancel={onGuideCancel}
          getMousePositionData={getMousePositionData}
        >
          <PanelGrid
            name={type}
            cells={cells}
            events={events}
            height={height}
            options={{ narrowWeekend }}
          />
          <CreationGuide
            creationGuide={creationGuide}
            cells={cells}
            narrowWeekend={narrowWeekend}
          />
        </GridWithMouse>
        <div className={cls(`panel-${type}-events`)}>
          {filteredViewModels.map((viewModel) => (
            <GridEvent
              viewModel={viewModel}
              key={`${type}-DayEvent-${viewModel.cid()}`}
              eventHeight={EVENT_HEIGHT}
              headerHeight={0}
              getMousePositionData={getMousePositionData}
              grids={grids}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};
