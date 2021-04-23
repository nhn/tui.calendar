import { h, FunctionComponent, Fragment } from 'preact';
import range from 'tui-code-snippet/array/range';

import { cls } from '@src/util/cssHelper';
import { addDate } from '@src/time/datetime';
import { PanelGrid } from '@src/components/panelgrid/panelgrid';
import { PanelEvents } from '@src/components/panelgrid/panelEvents';
import TZDate from '@src/time/date';

import type { MilestoneEvent } from '@t/events';
import type { GridInfoList } from '@t/panel';

const PANEL_TITLE_CLASS_NAME = cls('panel-title');
const PANEL_MILESTONE_CLASS_NAME = cls('panel-milestone');
const defaultPanelInfoList: TZDate[] = range(0, 7).map((day) => {
  const now = new TZDate();

  return addDate(now, day - now.getDay());
});

interface Props {
  events: MilestoneEvent[];
  gridInfoList?: GridInfoList;
  timesWidth?: number;
  timezonesCount?: number;
}

// @TODO: remove after store module merged
const useStore = (store: string) => {
  return { state: { narrowWeekend: true, eventHeight: 20 } };
};

export const Milestone: FunctionComponent<Props> = ({
  events,
  gridInfoList = defaultPanelInfoList,
  timesWidth = 120,
  timezonesCount = 1,
}) => {
  const columnWidth = timesWidth * timezonesCount;
  const { state } = useStore('options');

  return (
    <Fragment>
      <div className={PANEL_TITLE_CLASS_NAME} style={{ width: columnWidth }}>
        Title
      </div>
      <div className={PANEL_MILESTONE_CLASS_NAME}>
        <PanelGrid gridInfoList={gridInfoList} {...state} />
        <PanelEvents gridInfoList={gridInfoList} events={events} {...state} />
      </div>
    </Fragment>
  );
};
