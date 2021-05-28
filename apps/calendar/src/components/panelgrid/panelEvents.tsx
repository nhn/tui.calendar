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
import { DayGridEventMatrix, TimeGridEventMatrix } from '@src/components/panelgrid/specialEvents';
import ScheduleViewModel from '@src/model/scheduleViewModel';

interface Props {
  name: string;
  cells: Cells;
  events: DayGridEventMatrix | TimeGridEventMatrix;
  options?: CalendarWeekOption;
}

export const PanelEvents: FunctionComponent<Props> = ({ name, cells, events, options = {} }) => {
  const { narrowWeekend = false } = options;
  const { state } = useStore('layout');
  const height = state[name]?.height ?? EVENT_HEIGHT;
  // const viewModels = getViewModels(events, cells);
  // setViewModelsInfo(viewModels, cells, { narrowWeekend } as CalendarWeekOption);

  // const filteredViewModels = events.filter(isWithinHeight(height, EVENT_HEIGHT));
  let viewModels: ScheduleViewModel[] = [];
  if (Array.isArray(events)) {
    if (Array.isArray(events[0])) {
      [[viewModels]] = events;
    }
  }

  const dayEvents = viewModels.map((viewModel, index) => (
    <DayEvent viewModel={viewModel} key={`${name}-DayEvent-${index}`} />
  ));

  return <div className={cls('panel-event-wrapper')}>{dayEvents}</div>;
};
