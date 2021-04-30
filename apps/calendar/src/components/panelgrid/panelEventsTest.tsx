import { FunctionComponent, h, Fragment } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';

import { cls } from '@src/util/cssHelper';
import { toPercent, toPx } from '@src/util/units';
import { Day } from '@src/time/datetime';

import type { GridInfoList, PanelName } from '@t/panel';
import type { BaseEvent } from '@t/events';
import { isBetween } from '@src/util/math';
import Schedule from '@src/model/schedule';
import { TimeEvent } from '@src/components/events/timeEvent';
import { DayEvent } from '@src/components/events/dayEvent';
import { getMatrices, getViewModels, setViewModelsInfo } from '@src/time/panelEvent';
import { PanelStateStore } from '@src/components/layout';

const PANEL_SCHEDULE_WRAPPER_CLASS_NAME = cls('panel-schedule-wrapper');
const PANEL_SCHEDULE_CLASS_NAME = cls('panel-schedule');
const EVENT_HEIGHT = 20;
const TOTAL_WIDTH = 100;

interface Props {
  name: PanelName;
  gridInfoList: GridInfoList;
  events: Schedule[];
  narrowWeekend: boolean;
  eventHeight: number;
  panelHeight: number;
}

interface EventStyle {
  width: string | number;
  left: string | number;
  top: number;
}

export const PanelEventsTest: FunctionComponent<Props> = ({
  name,
  gridInfoList,
  events,
  narrowWeekend,
  eventHeight,
  panelHeight,
}) => {
  const { dispatch } = useContext(PanelStateStore);

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
