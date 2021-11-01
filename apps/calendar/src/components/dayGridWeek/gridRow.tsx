import { ComponentProps, FunctionComponent, h } from 'preact';

import { WeekEvents } from '@src/components/dayGridWeek/weekEvents';
import Panel from '@src/components/panel';

type Props = Pick<
  ComponentProps<typeof WeekEvents>,
  'events' | 'cells' | 'type' | 'height' | 'options' | 'gridInfo' | 'gridColWidthMap'
> & { rowName: string };

export const GridRow: FunctionComponent<Props> = ({
  rowName,
  events,
  cells,
  type,
  height,
  options,
  gridInfo,
  gridColWidthMap,
}) => (
  <Panel name={rowName} resizable>
    <WeekEvents
      events={events}
      cells={cells}
      type={type}
      height={height}
      options={options}
      gridInfo={gridInfo}
      gridColWidthMap={gridColWidthMap}
    />
  </Panel>
);
