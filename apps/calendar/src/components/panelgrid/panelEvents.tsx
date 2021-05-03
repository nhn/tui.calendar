import { FunctionComponent, h, Fragment } from 'preact';

import { cls } from '@src/util/cssHelper';
import Schedule from '@src/model/schedule';
import { DayEvent } from '@src/components/events/dayEvent';
import { getViewModels, isWithinHeight, setViewModelsInfo } from '@src/time/panelEvent';

import type { GridInfoList, PanelName } from '@t/panel';
import type { PanelState } from '@src/components/layout';

const EVENT_HEIGHT = 20;

interface Props {
  name: PanelName;
  gridInfoList: GridInfoList;
  events: Schedule[];
  options?: PanelState;
}

export const PanelEvents: FunctionComponent<Props> = ({
  name,
  gridInfoList,
  events,
  options = {},
}) => {
  const renderEvents = () => {
    const { narrowWeekend = false, panelHeight = EVENT_HEIGHT } = options;
    const viewModels = getViewModels(events, gridInfoList);
    setViewModelsInfo(viewModels, gridInfoList, { narrowWeekend });

    const renderedViewModels = viewModels
      .filter(isWithinHeight(panelHeight, EVENT_HEIGHT))
      .map((viewModel, index) => (
        <DayEvent viewModel={viewModel} key={`${name}-DayEvent-${index}`} />
      ));

    return <Fragment>{renderedViewModels}</Fragment>;
  };

  return <div className={cls('panel-event-wrapper')}>{renderEvents()}</div>;
};
