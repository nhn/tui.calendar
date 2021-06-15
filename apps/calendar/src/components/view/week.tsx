import { FunctionComponent, h } from 'preact';

import { useStore } from '@src/components/hooks/store';
import Panel from '@src/components/panel';
import DayNames from '@src/components/daygrid/dayNames';
import { TemplateWeekDay, WeekOption } from '@src/model';
import { capitalizeDayName, getDayName } from '@src/util/dayName';
import TZDate from '@src/time/date';
import { Layout } from '@src/components/layout';
import { getDayGridEvents } from '@src/util/gridHelper';
import {
  addDate,
  getGridLeftAndWidth,
  isWeekend,
  toEndOfDay,
  toStartOfDay,
  WEEK_DAYS,
} from '@src/time/datetime';
import { TimeGrid } from '@src/components/timegrid/timegrid';
import { DayGridEvents } from '@src/components/panelgrid/dayGridEvents';
import { ColumnInfo } from '@src/components/timegrid/columns';
import { range } from '@src/util/utils';
import { usePanel } from '@src/components/hooks/panelContainer';
import { cls } from '@src/util/cssHelper';
import { getMousePositionData } from '@src/util/weekViewHelper';
import { nullFn } from '@src/util';

import type { Cells } from '@t/panel';

function getDayNames(cells: Cells) {
  const dayNames: TemplateWeekDay[] = [];

  // @TODO: apply template daynames
  cells.forEach((day) => {
    const dayIndex = day.getDay();
    const dayName = capitalizeDayName(getDayName(dayIndex));

    dayNames.push({
      date: day.getDate(),
      day: day.getDay(),
      dayName,
      isToday: false,
      renderDate: 'date',
    });
  });

  return dayNames;
}

function getCells(renderDate: TZDate, { startDayOfWeek = 0, workweek }: WeekOption): Cells {
  const renderDay = renderDate.getDay();
  const now = toStartOfDay(renderDate);
  const nowDay = now.getDay();
  const prevWeekCount = startDayOfWeek - WEEK_DAYS;
  const cells = range(startDayOfWeek, WEEK_DAYS + startDayOfWeek).map((day) =>
    addDate(now, day - nowDay + (startDayOfWeek > renderDay ? prevWeekCount : 0))
  );

  if (workweek) {
    return cells.filter((date) => !isWeekend(date.getDay()));
  }

  return cells;
}

const dayNameHeight = 42;

const Week: FunctionComponent = () => {
  const {
    state: { template, theme, options, dataStore, grid },
  } = useStore();

  if (!template || !theme || !options || !dataStore || !grid) {
    return null;
  }

  const { panel, containerRefCallback } = usePanel(cls('.allday'));
  const { narrowWeekend, startDayOfWeek, workweek } = options.week;
  // @TODO: 이번주 기준으로 계산(prev, next 사용 시 날짜 계산 필요)
  const renderWeekDate = new TZDate();
  const cells = getCells(renderWeekDate, options.week);
  const dayNames = getDayNames(cells);
  const { milestone, task, allday, time } = getDayGridEvents(cells, dataStore, narrowWeekend);
  const columnInfoList: ColumnInfo[] = cells.map((cell) => {
    return {
      start: toStartOfDay(cell),
      end: toEndOfDay(cell),
      unit: 'minute',
      slot: 30,
    } as ColumnInfo;
  });

  const grids = getGridLeftAndWidth(cells.length, narrowWeekend, startDayOfWeek, workweek);
  const getMouseDataOnWeek = panel ? getMousePositionData(cells, grids, panel) : nullFn;
  const {
    layout: { height: layoutHeight },
    milestone: { height: milestoneHeight },
    task: { height: taskHeight },
    allday: { height: alldayHeight },
  } = grid;
  const timePanelHeight = layoutHeight - milestoneHeight - taskHeight - alldayHeight;

  return (
    <Layout height={layoutHeight} refCallback={containerRefCallback}>
      <Panel name="week-daynames" height={dayNameHeight}>
        <DayNames
          dayNames={dayNames}
          marginLeft={120}
          templateType="weekDayname"
          options={options.week}
        />
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
      <Panel name="time" height={timePanelHeight}>
        <TimeGrid events={time} columnInfoList={columnInfoList} />
      </Panel>
    </Layout>
  );
};

export default Week;
