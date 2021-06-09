import { Fragment, FunctionComponent, h } from 'preact';
import range from 'tui-code-snippet/array/range';

import { cls } from '@src/util/cssHelper';
import { addDate } from '@src/time/datetime';
import { PanelGrid } from '@src/components/panelgrid/panelgrid';
import { PanelTitle } from '@src/components/panelgrid/panelTitle';
import TZDate from '@src/time/date';
import GridEvents from '@src/components/daygrid/gridEvents';

import type { Cells, DayGridEventType } from '@t/panel';
import type { DayGridEventMatrix } from '@t/events';
import { flattenMatrix, getModels, setDayGridEventModels } from '@src/util/gridEvent';

const DEFAULT_PANEL_HEIGHT = 66;
const defaultPanelInfoList: TZDate[] = range(0, 7).map((day) => {
  const now = new TZDate();

  return addDate(now, day - now.getDay());
});

interface Props {
  type: DayGridEventType;
  events: DayGridEventMatrix;
  cells?: Cells;
  timesWidth?: number;
  timezonesCount?: number;
  panelHeight?: number;
}

export const DayGridEvents: FunctionComponent<Props> = ({
  type = 'milestone',
  events,
  cells = defaultPanelInfoList,
  timesWidth = 120,
  timezonesCount = 1,
  panelHeight = DEFAULT_PANEL_HEIGHT,
}) => {
  const columnWidth = timesWidth * timezonesCount;

  const eventModels = flattenMatrix(events);
  setDayGridEventModels(eventModels);

  return (
    <Fragment>
      <PanelTitle width={columnWidth} template={type} model={type} />
      <div className={cls(`panel-${type}`)}>
        <PanelGrid name={type} cells={cells} events={events} height={panelHeight} />
        <GridEvents
          name={type}
          cells={cells}
          height={panelHeight}
          events={eventModels}
          narrowWeekend={false}
          className={cls(`panel-${type}-events`)}
          headerHeight={0}
        />
      </div>
    </Fragment>
  );
};
