import { Fragment, FunctionComponent, h } from 'preact';
import range from 'tui-code-snippet/array/range';

import { cls } from '@src/util/cssHelper';
import { addDate } from '@src/time/datetime';
import { PanelGrid } from '@src/components/panelgrid/panelgrid';
import { PanelTitle } from '@src/components/panelgrid/panelTitle';
import TZDate from '@src/time/date';
import GridEvents from '@src/components/daygrid/gridEvents';
import { DEFAULT_PANEL_HEIGHT } from '@src/controller/panel';
import ScheduleViewModel from '@src/model/scheduleViewModel';

import type { Cells, DayGridEventType } from '@t/panel';
import { convertPxToNum } from '@src/util/units';
import { useTheme } from '@src/components/hooks/theme';

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
  narrowWeekend: boolean;
}

export const DayGridEvents: FunctionComponent<Props> = ({
  type = 'milestone',
  events,
  cells = defaultPanelInfoList,
  timesWidth = 120,
  timezonesCount = 1,
  height = DEFAULT_PANEL_HEIGHT,
  narrowWeekend,
}) => {
  const {
    week: { dayGridSchedule },
  } = useTheme();
  const columnWidth = timesWidth * timezonesCount;

  return (
    <Fragment>
      <PanelTitle width={columnWidth} template={type} model={type} />
      <div className={cls(`panel-${type}`)}>
        <PanelGrid
          name={type}
          cells={cells}
          events={events}
          height={height}
          options={{ narrowWeekend }}
        />
        <GridEvents
          name={type}
          cells={cells}
          height={height}
          events={events}
          narrowWeekend={narrowWeekend}
          className={cls(`panel-${type}-events`)}
          headerHeight={0}
          eventTopMargin={convertPxToNum(dayGridSchedule.marginTop)}
        />
      </div>
    </Fragment>
  );
};
