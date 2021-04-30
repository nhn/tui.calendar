import { Fragment, FunctionComponent, h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import range from 'tui-code-snippet/array/range';

import { cls } from '@src/util/cssHelper';
import { addDate } from '@src/time/datetime';
import { PanelGridTest } from '@src/components/panelgrid/panelgridTest';
import TZDate from '@src/time/date';
import { PanelStateStore, UPDATE_PANEL_HEIGHT } from '@src/components/layout';
import Schedule from '@src/model/schedule';

import type { GridInfoList } from '@t/panel';
import { PanelEventsTest } from '@src/components/panelgrid/panelEventsTest';

const PANEL_TITLE_CLASS_NAME = cls('panel-title');
const PANEL_MILESTONE_CLASS_NAME = cls('panel-milestone');
const DEFAULT_MILESTONE_PANEL_HEIGHT = 20;
const defaultPanelInfoList: TZDate[] = range(0, 7).map((day) => {
  const now = new TZDate();

  return addDate(now, day - now.getDay());
});

interface Props {
  events: Schedule[];
  gridInfoList?: GridInfoList;
  timesWidth?: number;
  timezonesCount?: number;
}

export const MilestoneTest: FunctionComponent<Props> = ({
  events,
  gridInfoList = defaultPanelInfoList,
  timesWidth = 120,
  timezonesCount = 1,
}) => {
  const columnWidth = timesWidth * timezonesCount;
  const { state, dispatch } = useContext(PanelStateStore);

  useEffect(() => {
    dispatch({
      type: UPDATE_PANEL_HEIGHT,
      panelType: 'milestone',
      state: {
        panelHeight: DEFAULT_MILESTONE_PANEL_HEIGHT,
      },
    });
  }, [dispatch]);

  return (
    <Fragment>
      <div className={PANEL_TITLE_CLASS_NAME} style={{ width: columnWidth }}>
        Title
      </div>
      <div className={PANEL_MILESTONE_CLASS_NAME}>
        <PanelGridTest
          name="milestone"
          gridInfoList={gridInfoList}
          events={events}
          defaultPanelHeight={DEFAULT_MILESTONE_PANEL_HEIGHT}
          {...state?.milestone}
        />
        <PanelEventsTest
          name="milestone"
          gridInfoList={gridInfoList}
          events={events}
          {...state?.milestone}
        />
      </div>
    </Fragment>
  );
};
