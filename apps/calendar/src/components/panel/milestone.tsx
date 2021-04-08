import { h, FunctionComponent } from 'preact';
import range from 'tui-code-snippet/array/range';

import Panel from '@src/components/panel';
import { cls } from '@src/util/cssHelper';
import { addDate } from '@src/time/datetime';
import { Grid } from '@src/components/panel/grid';
import { Schedules, Task } from '@src/components/panel/schedules';
import TZDate from '@src/time/date';

const PANEL_TITLE_CLASS_NAME = cls('panel-title');
const PANEL_MILESTONE_CLASS_NAME = cls('panel-milestone');
const defaultPanelInfoList: TZDate[] = range(0, 7).map((day) => {
  const now = new TZDate();

  return addDate(now, day - now.getDay());
});
const MIN_HEIGHT = 20;

interface Props {
  events: Task[];
  gridInfoList?: TZDate[];
  timesWidth?: number;
  timezonesCount?: number;
}

export const Milestone: FunctionComponent<Props> = ({
  events,
  gridInfoList = defaultPanelInfoList,
  timesWidth = 120,
  timezonesCount = 1,
}) => {
  const columnWidth = timesWidth * timezonesCount;

  return (
    <Panel name="Milestone" resizable minHeight={MIN_HEIGHT} height={20}>
      <div className={PANEL_TITLE_CLASS_NAME} style={{ width: columnWidth }}>
        Title
      </div>
      <div className={PANEL_MILESTONE_CLASS_NAME}>
        <Grid gridInfoList={gridInfoList} />
        <Schedules gridInfoList={gridInfoList} events={events} />
      </div>
    </Panel>
  );
};
