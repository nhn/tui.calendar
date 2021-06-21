import { FunctionComponent, h } from 'preact';

import { useStore } from '@src/components/hooks/store';
import Panel from '@src/components/panel';
import DayNames from '@src/components/daygrid/dayNames';
import { TemplateWeekDay } from '@src/model';
import { capitalizeDayName, getDayName } from '@src/util/dayName';
import { DayGridEvents } from '@src/components/panelgrid/dayGridEvents';
import TZDate from '@src/time/date';
import { Layout } from '@src/components/layout';
import { getDayGridEvents, getPanelHeight } from '@src/util/gridHelper';
import { getGridLeftAndWidth, toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { TimeGrid } from '@src/components/timegrid/timegrid';
import { ColumnInfo } from '@src/components/timegrid/columns';
import { usePanel } from '@src/components/hooks/panelContainer';
import { cls } from '@src/util/cssHelper';
import { createMousePositionDataGrabber } from '@src/util/weekViewHelper';

import type { OptionData } from '@t/store';

function getDayNames(options: OptionData) {
  const dayNames: TemplateWeekDay[] = [];

  const today = new Date();
  const day = today.getDay();
  const dayName = capitalizeDayName(getDayName(day));

  dayNames.push({
    date: today.getUTCDate(),
    day: today.getDay(),
    dayName,
    isToday: false,
    renderDate: 'date',
  });

  return dayNames;
}

const dayNameHeight = 42;

const Day: FunctionComponent = () => {
  const { panel, containerRefCallback } = usePanel(cls('.panel-allday'));
  const {
    state: { template, theme, options, dataStore, grid },
  } = useStore();

  if (!template || !theme || !options || !dataStore || !grid) {
    return null;
  }

  const dayNames = getDayNames(options);
  const { narrowWeekend, startDayOfWeek, workweek } = options.week;
  const cells = [new TZDate()]; // @TODO: 오늘 기준으로 계산(prev, next 사용 시 날짜 계산 필요)
  const { milestone, task, allday, time } = getDayGridEvents(cells, dataStore, narrowWeekend);
  const now = new TZDate();
  const start = toStartOfDay(now);
  const end = toEndOfDay(start);
  const columnInfoList: ColumnInfo[] = cells.map(() => {
    return { start, end, unit: 'minute', slot: 30 } as ColumnInfo;
  });

  const grids = getGridLeftAndWidth(cells.length, narrowWeekend, startDayOfWeek, workweek);
  const getMouseDataOnWeek = panel ? createMousePositionDataGrabber(cells, grids, panel) : () => null;
  const { layoutHeight, milestoneHeight, taskHeight, alldayHeight } = getPanelHeight(grid);
  const timePanelHeight = layoutHeight - milestoneHeight - taskHeight - alldayHeight;

  return (
    <Layout refCallback={containerRefCallback}>
      <Panel name="day-daynames" height={dayNameHeight}>
        <DayNames dayNames={dayNames} marginLeft={120} templateType="weekDayname" />
      </Panel>
      <Panel name="milestone" resizable>
        <DayGridEvents
          events={milestone}
          cells={cells}
          type="milestone"
          height={milestoneHeight}
          narrowWeekend={narrowWeekend}
        />
      </Panel>
      <Panel name="task" resizable>
        <DayGridEvents
          events={task}
          cells={cells}
          type="task"
          height={taskHeight}
          narrowWeekend={narrowWeekend}
        />
      </Panel>
      <Panel name="allday" resizable>
        <DayGridEvents
          events={allday}
          cells={cells}
          type="allday"
          height={alldayHeight}
          narrowWeekend={narrowWeekend}
          getMousePositionData={getMouseDataOnWeek}
        />
      </Panel>
      <Panel name="time" height={grid.layout?.height - grid.milestone?.height}>
        <TimeGrid events={time} columnInfoList={columnInfoList} />
      </Panel>
    </Layout>
  );
};

export default Day;
