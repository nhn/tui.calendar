import { Fragment, FunctionComponent, h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import range from 'tui-code-snippet/array/range';

import { cls } from '@src/util/cssHelper';
import { addDate } from '@src/time/datetime';
import { PanelGrid } from '@src/components/panelgrid/panelgrid';
import { PanelEvents } from '@src/components/panelgrid/panelEvents';
import TZDate from '@src/time/date';
import Schedule from '@src/model/schedule';
import { PanelActionType, PanelStore } from '@src/components/layout';

import type { Cells } from '@t/panel';

const DEFAULT_MILESTONE_PANEL_HEIGHT = 20;
const defaultPanelInfoList: TZDate[] = range(0, 7).map((day) => {
  const now = new TZDate();

  return addDate(now, day - now.getDay());
});

interface Props {
  events: Schedule[];
  cells?: Cells;
  timesWidth?: number;
  timezonesCount?: number;
  panelHeight?: number;
}

export const Milestone: FunctionComponent<Props> = ({
  events,
  cells = defaultPanelInfoList,
  timesWidth = 120,
  timezonesCount = 1,
  panelHeight = DEFAULT_MILESTONE_PANEL_HEIGHT,
}) => {
  const columnWidth = timesWidth * timezonesCount;
  const { state, dispatch } = useContext(PanelStore);

  useEffect(() => {
    dispatch({
      type: PanelActionType.UPDATE_PANEL_HEIGHT,
      panelType: 'milestone',
      state: {
        panelHeight,
      },
    });
  }, [dispatch, panelHeight]);

  return (
    <Fragment>
      <div className={cls('panel-title')} style={{ width: columnWidth }}>
        Title
      </div>
      <div className={cls('panel-milestone')}>
        <PanelGrid
          name="milestone"
          cells={cells}
          events={events}
          defaultPanelHeight={panelHeight}
          options={state?.milestone}
        />
        <PanelEvents name="milestone" cells={cells} events={events} options={state?.milestone} />
      </div>
    </Fragment>
  );
};
