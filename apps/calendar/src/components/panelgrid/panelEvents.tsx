import { FunctionComponent, h, Fragment } from 'preact';

import { cls } from '@src/util/cssHelper';
import Schedule from '@src/model/schedule';
import { DayEvent } from '@src/components/events/dayEvent';
import { getViewModels, setViewModelsInfo } from '@src/time/panelEvent';

import type { GridInfoList, PanelName } from '@t/panel';

const PANEL_SCHEDULE_WRAPPER_CLASS_NAME = cls('panel-schedule-wrapper');
const EVENT_HEIGHT = 20;

interface Props {
  name: PanelName;
  gridInfoList: GridInfoList;
  events: Schedule[];
  narrowWeekend: boolean;
  eventHeight: number;
  panelHeight: number;
}

export const PanelEvents: FunctionComponent<Props> = ({
  name,
  gridInfoList,
  events,
  narrowWeekend,
  eventHeight,
  panelHeight,
}) => {
  const renderEvents = () => {
    const viewModels = getViewModels(events, gridInfoList);
    setViewModelsInfo(viewModels, gridInfoList, { narrowWeekend, eventHeight });

    return (
      <Fragment>
        {viewModels
          .filter(({ top }) => panelHeight >= (top + 1) * EVENT_HEIGHT)
          .map((viewModel, index) => (
            <DayEvent viewModel={viewModel} key={`DayEvent-${index}`} />
          ))}
      </Fragment>
    );
  };

  return <div className={PANEL_SCHEDULE_WRAPPER_CLASS_NAME}>{renderEvents()}</div>;
};
