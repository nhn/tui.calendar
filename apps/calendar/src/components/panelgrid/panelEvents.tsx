import { FunctionComponent, h } from 'preact';

import { cls } from '@src/util/cssHelper';
import Schedule from '@src/model/schedule';
import { DayEvent } from '@src/components/events/dayEvent';
import { getViewModels } from '@src/event/panelEvent';
import { setViewModelsInfo } from '@src/event/gridEvent';
import { EVENT_HEIGHT, isWithinHeight } from '@src/util/gridHelper';
import { useStore } from '@src/components/hooks/store';

import type { Cells } from '@t/panel';
import type { CalendarWeekOption } from '@t/store';

interface Props {
  name: string;
  cells: Cells;
  events: Schedule[];
  options?: CalendarWeekOption;
}

export const PanelEvents: FunctionComponent<Props> = ({ name, cells, events, options = {} }) => {
  const { narrowWeekend = false } = options;
  const { state } = useStore('layout');
  const height = state[name]?.height ?? EVENT_HEIGHT;
  const viewModels = getViewModels(events, cells);
  setViewModelsInfo(viewModels, cells, { narrowWeekend });

  const filteredViewModels = viewModels.filter(isWithinHeight(height, EVENT_HEIGHT));

  const dayEvents = filteredViewModels.map((viewModel, index) => (
    <DayEvent viewModel={viewModel} key={`${name}-DayEvent-${index}`} />
  ));

  return <div className={cls('panel-event-wrapper')}>{dayEvents}</div>;
};
