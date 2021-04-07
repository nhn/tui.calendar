import { h, FunctionComponent } from 'preact';
import range from 'tui-code-snippet/array/range';

import Panel from '@src/components/panel';
import { cls } from '@src/util/cssHelper';
import TZDate from '@src/time/date';
import { addDate } from '@src/time/datetime';
import Schedule from '@src/model/schedule';
import { Grid } from '@src/components/panel/grid';

const PANEL_TITLE_CLASS_NAME = cls('panel-title');
const defaultPanelInfoList: TZDate[] = range(0, 7).map((day) => {
  const now = new TZDate();

  return addDate(now, day - now.getDay());
});
const MIN_HEIGHT = 20;

interface Props {
  events: Schedule[];
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
        TimeGrid title
      </div>
      <Grid gridInfoList={gridInfoList} />
      {/*{gridInfoList.map((panelInfo, index) => {*/}
      {/*  console.log(panelInfo);*/}

      {/*  return <div>{index}</div>;*/}
      {/*})}*/}
    </Panel>
  );
};
