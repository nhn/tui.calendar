import { FunctionComponent, h } from 'preact';

import { cls } from '@src/util/cssHelper';
import Schedule from '@src/model/schedule';
import { DayEvent } from '@src/components/events/dayEvent';
import { EVENT_HEIGHT, getViewModels } from '@src/event/panelEvent';
import { setViewModelsInfo } from '@src/event/gridEvent';
import ScheduleViewModel from '@src/model/scheduleViewModel';

import type { Cells } from '@t/panel';
import type { PanelState } from '@src/components/layout';

interface Props {
  name: string;
  cells: Cells;
  events: Schedule[];
  options?: PanelState;
}

const isWithinHeight = (panelHeight: number, eventHeight: number) => {
  return ({ top }: ScheduleViewModel) => panelHeight >= (top + 1) * eventHeight;
};

export const PanelEvents: FunctionComponent<Props> = ({ name, cells, events, options = {} }) => {
  const { narrowWeekend = false, panelHeight = EVENT_HEIGHT } = options;
  const viewModels = getViewModels(events, cells);
  setViewModelsInfo(viewModels, cells, { narrowWeekend });

  const filteredViewModels = viewModels.filter(isWithinHeight(panelHeight, EVENT_HEIGHT));

  const dayEvents = filteredViewModels.map((viewModel, index) => (
    <DayEvent viewModel={viewModel} key={`${name}-DayEvent-${index}`} />
  ));

  return <div className={cls('panel-event-wrapper')}>{dayEvents}</div>;
};
