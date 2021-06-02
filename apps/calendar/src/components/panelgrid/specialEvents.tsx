import { Fragment, FunctionComponent, h } from 'preact';
import range from 'tui-code-snippet/array/range';

import { cls } from '@src/util/cssHelper';
import { addDate } from '@src/time/datetime';
import { PanelGrid } from '@src/components/panelgrid/panelgrid';
import { PanelEvents } from '@src/components/panelgrid/panelEvents';
import { PanelTitle } from '@src/components/panelgrid/panelTitle';
import TZDate from '@src/time/date';

import type { Cells, SpecialEventType } from '@t/panel';
import type { DayGridEventMatrix } from '@t/events';

const DEFAULT_PANEL_HEIGHT = 20;
const defaultPanelInfoList: TZDate[] = range(0, 7).map((day) => {
  const now = new TZDate();

  return addDate(now, day - now.getDay());
});

interface Props {
  type: SpecialEventType;
  events: DayGridEventMatrix;
  cells?: Cells;
  timesWidth?: number;
  timezonesCount?: number;
  panelHeight?: number;
}

export const SpecialEvents: FunctionComponent<Props> = ({
  type = 'milestone',
  events,
  cells = defaultPanelInfoList,
  timesWidth = 120,
  timezonesCount = 1,
  panelHeight = DEFAULT_PANEL_HEIGHT,
}) => {
  const columnWidth = timesWidth * timezonesCount;

  return (
    <Fragment>
      <PanelTitle width={columnWidth} template={type} model={type} />
      <div className={cls(`panel-${type}`)}>
        <PanelGrid name={type} cells={cells} events={events} defaultPanelHeight={panelHeight} />
        <PanelEvents name={type} cells={cells} events={events} />
      </div>
    </Fragment>
  );
};
