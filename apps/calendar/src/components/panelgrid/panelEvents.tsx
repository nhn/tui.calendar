import { FunctionComponent, h } from 'preact';

import { cls } from '@src/util/cssHelper';
import Schedule from '@src/model/schedule';
import { DayEvent } from '@src/components/events/dayEvent';
import { getViewModels, setViewModelsInfo } from '@src/time/panelEvent';
import ScheduleViewModel from '@src/model/scheduleViewModel';

import type { GridInfoList } from '@t/panel';
import type { PanelState } from '@src/components/layout';

const EVENT_HEIGHT = 20;

interface Props {
  name: string;
  gridInfoList: GridInfoList;
  events: Schedule[];
  options?: PanelState;
}

const isWithinHeight = (panelHeight: number, eventHeight: number) => {
  return ({ top }: ScheduleViewModel) => panelHeight >= (top + 1) * eventHeight;
};

export const PanelEvents: FunctionComponent<Props> = ({
  name,
  gridInfoList,
  events,
  options = {},
}) => {
  const { narrowWeekend = false, panelHeight = EVENT_HEIGHT } = options;
  const viewModels = getViewModels(events, gridInfoList);
  setViewModelsInfo(viewModels, gridInfoList, { narrowWeekend });

  const filteredViewModels = viewModels.filter(isWithinHeight(panelHeight, EVENT_HEIGHT));

  const dayEvents = filteredViewModels.map((viewModel, index) => (
    <DayEvent viewModel={viewModel} key={`${name}-DayEvent-${index}`} />
  ));

  return <div className={cls('panel-event-wrapper')}>{dayEvents}</div>;
};
