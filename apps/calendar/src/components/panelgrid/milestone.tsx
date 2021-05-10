import { Fragment, FunctionComponent, h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import range from 'tui-code-snippet/array/range';

import { cls } from '@src/util/cssHelper';
import { addDate } from '@src/time/datetime';
import { PanelGrid } from '@src/components/panelgrid/panelgrid';
import { PanelEvents } from '@src/components/panelgrid/panelEvents';
import { PanelTitle } from '@src/components/panelgrid/panelTitle';
import TZDate from '@src/time/date';
import Schedule from '@src/model/schedule';
import { PanelActionType, PanelStore } from '@src/components/layout';

import type { GridInfoList } from '@t/panel';

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
  panelHeight?: number;
}

export const Milestone: FunctionComponent<Props> = ({
  events,
  gridInfoList = defaultPanelInfoList,
  timesWidth = 120,
  timezonesCount = 1,
  panelHeight = DEFAULT_MILESTONE_PANEL_HEIGHT,
}) => {
  const columnWidth = timesWidth * timezonesCount;
  const panelType = 'milestone';
  const { state, dispatch } = useContext(PanelStore);

  useEffect(() => {
    dispatch({
      type: PanelActionType.UPDATE_PANEL_HEIGHT,
      panelType,
      state: {
        panelHeight,
      },
    });
  }, [dispatch, panelHeight]);

  return (
    <Fragment>
      <PanelTitle width={columnWidth} template={panelType} model={panelType} />
      <div className={cls('panel-milestone')}>
        <PanelGrid
          name={panelType}
          gridInfoList={gridInfoList}
          events={events}
          defaultPanelHeight={panelHeight}
          options={state?.milestone}
        />
        <PanelEvents
          name={panelType}
          gridInfoList={gridInfoList}
          events={events}
          options={state?.milestone}
        />
      </div>
    </Fragment>
  );
};
