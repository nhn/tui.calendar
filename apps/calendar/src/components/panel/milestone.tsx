import { h, FunctionComponent, createContext } from 'preact';
import { useContext } from 'preact/hooks';

import Panel from '@src/components/panel';
import { cls } from '@src/util/cssHelper';

const TIME_GRID_PANEL_TITLE = cls('panel-title');

interface Props {
  timesWidth?: number;
}

const timeGridPanelContext = createContext({ timezonesLength: 1 });

export const Milestone: FunctionComponent<Props> = ({ timesWidth = 120 }) => {
  const { timezonesLength } = useContext(timeGridPanelContext);
  const columnWidth = timesWidth * timezonesLength;

  return (
    <Panel name="Milestone" resizable height={20}>
      <div className={TIME_GRID_PANEL_TITLE} style={{ width: columnWidth }}>
        TimeGrid title1
      </div>
      <div>Milestone</div>
    </Panel>
  );
};
