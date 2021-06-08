import { FunctionComponent, h } from 'preact';

import { cls } from '@src/util/cssHelper';
import { DayEvent } from '@src/components/events/dayEvent';
import { EVENT_HEIGHT } from '@src/util/gridHelper';
import { useStore } from '@src/components/hooks/store';
import { getViewModels } from '@src/util/panelEvent';

import type { Cells } from '@t/panel';
import type { CalendarWeekOption } from '@t/store';
import type { DayGridEventMatrix } from '@t/events';

interface Props {
  name: string;
  cells: Cells;
  events: DayGridEventMatrix;
  options?: CalendarWeekOption;
}

export const PanelEvents: FunctionComponent<Props> = ({ name, events }) => {
  const { state } = useStore('layout');
  const height = state[name]?.height ?? EVENT_HEIGHT;

  const viewModels = getViewModels(events);

  const dayEvents = viewModels.map((viewModel, index) => (
    <DayEvent viewModel={viewModel} key={`${name}-DayEvent-${index}`} />
  ));

  return (
    <div className={cls('panel-event-wrapper')} style={{ height }}>
      {dayEvents}
    </div>
  );
};
