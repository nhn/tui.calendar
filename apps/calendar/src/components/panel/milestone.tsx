import { h, FunctionComponent } from 'preact';
import range from 'tui-code-snippet/array/range';

import Panel from '@src/components/panel';
import { cls } from '@src/util/cssHelper';
import TZDate from '@src/time/date';
import { addDate } from '@src/time/datetime';
import { Column } from '@src/components/timegrid/column';

const TIME_GRID_PANEL_TITLE = cls('panel-title');
const defaultPanelInfoList: TZDate[] = range(0, 7).map((day) => {
  const now = new TZDate();

  return addDate(now, day - now.getDay());
});

interface Props {
  panelInfoList?: TZDate[];
  timesWidth?: number;
  timezonesCount?: number;
}

export const Milestone: FunctionComponent<Props> = ({
  panelInfoList = defaultPanelInfoList,
  timesWidth = 120,
  timezonesCount = 1,
}) => {
  const columnWidth = timesWidth * timezonesCount;

  return (
    <Panel name="Milestone" resizable minHeight={20} height={20}>
      <div className={TIME_GRID_PANEL_TITLE} style={{ width: columnWidth }}>
        TimeGrid title1
      </div>
      {panelInfoList.map((panelInfo) => {
        console.log(panelInfo);

        return <Column />;
      })}
    </Panel>
  );
};
