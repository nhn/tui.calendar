import { FunctionComponent, h } from 'preact';

import { useStore } from '@src/components/hooks/store';
import Panel from '@src/components/panel';
import DayNames from '@src/components/daygrid/dayNames';
import { DayGridEvents } from '@src/components/panelgrid/dayGridEvents';
import TZDate from '@src/time/date';
import { Layout } from '@src/components/layout';
import { getDayGridEvents } from '@src/util/gridHelper';
import { getGridLeftAndWidth, toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { TimeGrid } from '@src/components/timegrid/timegrid';
import { ColumnInfo } from '@src/components/timegrid/columns';
import { usePanel } from '@src/components/hooks/panelContainer';
import { cls } from '@src/util/cssHelper';
import { createMousePositionDataGrabber } from '@src/util/weekViewHelper';
import { getDayNames } from '@src/util/dayName';

import type { DayGridEventType } from '@t/panel';

const dayNameHeight = 42;

const Day: FunctionComponent = () => {
  const { panel, containerRefCallback } = usePanel(cls('.panel-allday'));
  const {
    state: { template, theme, options, dataStore, grid },
  } = useStore();

  if (!template || !theme || !options || !dataStore || !grid) {
    return null;
  }

  const { narrowWeekend, startDayOfWeek, workweek, hourStart, hourEnd } = options.week;
  // @TODO: calculate based on today(need to calculate date when prev & next used)
  const cells = [new TZDate()];
  const dayNames = getDayNames(cells);
  const dayGridEvents = getDayGridEvents(cells, dataStore, { narrowWeekend, hourStart, hourEnd });
  const columnInfoList = cells.map(
    (cell) =>
      ({ start: toStartOfDay(cell), end: toEndOfDay(cell), unit: 'minute', slot: 30 } as ColumnInfo)
  );
  const grids = getGridLeftAndWidth(cells.length, narrowWeekend, startDayOfWeek, workweek);
  const getMouseDataOnWeek = panel
    ? createMousePositionDataGrabber(cells, grids, panel)
    : () => null;
  const allDayPanels = Object.entries(grid).map(([key, value]) => {
    const panelType = key as DayGridEventType;

    return (
      <Panel key={panelType} name={panelType} resizable>
        <DayGridEvents
          events={dayGridEvents[panelType]}
          cells={cells}
          type={panelType}
          height={value.height}
          narrowWeekend={narrowWeekend}
          getMousePositionData={getMouseDataOnWeek}
        />
      </Panel>
    );
  });

  return (
    <Layout refCallback={containerRefCallback}>
      <Panel name="day-daynames" height={dayNameHeight}>
        <DayNames dayNames={dayNames} marginLeft={120} templateType="weekDayname" />
      </Panel>
      {allDayPanels}
      <Panel name="time" autoSize={1}>
        <TimeGrid events={dayGridEvents.time} columnInfoList={columnInfoList} />
      </Panel>
    </Layout>
  );
};

export default Day;
