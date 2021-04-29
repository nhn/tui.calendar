import { Fragment, FunctionComponent, h } from 'preact';
import { useContext } from 'preact/hooks';
import range from 'tui-code-snippet/array/range';

import { cls } from '@src/util/cssHelper';
import { addDate } from '@src/time/datetime';
import { PanelGrid } from '@src/components/panelgrid/panelgrid';
import TZDate from '@src/time/date';
import { PanelStateStore } from '@src/components/layout';
import Schedule from '@src/model/schedule';

import type { GridInfoList } from '@t/panel';
import { PanelEventsTest } from '@src/components/panelgrid/panelEventsTest';

const PANEL_TITLE_CLASS_NAME = cls('panel-title');
const PANEL_MILESTONE_CLASS_NAME = cls('panel-milestone');
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
  const { state } = useContext(PanelStateStore);

  return (
    <Fragment>
      <div className={PANEL_TITLE_CLASS_NAME} style={{ width: columnWidth }}>
        Title
      </div>
      <div className={PANEL_MILESTONE_CLASS_NAME}>
        <PanelGrid name="milestone" gridInfoList={gridInfoList} {...state?.milestone} />
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
