import { FunctionComponent, h } from 'preact';

import { useStore } from '@src/components/hooks/store';
import Panel from '@src/components/panel';
import DayNames from '@src/components/daygrid/dayNames';
import { getDayNames } from '@src/util/dayName';
import { DayGridEvents } from '@src/components/panelgrid/dayGridEvents';
import TZDate from '@src/time/date';
import { Layout } from '@src/components/layout';
import { getDayGridEvents } from '@src/util/gridHelper';
import { toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { TimeGrid } from '@src/components/timegrid/timegrid';
import { ColumnInfo } from '@src/components/timegrid/columns';

const dayNameHeight = 42;

const Day: FunctionComponent = () => {
  const {
    state: { template, theme, options, dataStore, grid },
  } = useStore();

  if (!template || !theme || !options || !dataStore || !grid) {
    return null;
  }

  const { narrowWeekend } = options.week;
  // @TODO: calculate based on today(need to calculate date when prev & next used)
  const cells = [new TZDate()];
  const dayNames = getDayNames(cells);
  const { milestone, task, allday, time } = getDayGridEvents(cells, dataStore, narrowWeekend);
  const columnInfoList = cells.map(
    (cell) =>
      ({ start: toStartOfDay(cell), end: toEndOfDay(cell), unit: 'minute', slot: 30 } as ColumnInfo)
  );
  const {
    milestone: { height: milestoneHeight },
    task: { height: taskHeight },
    allday: { height: alldayHeight },
  } = grid;

  return (
    <Layout>
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
        />
      </Panel>
      <Panel name="time" autoSize={1}>
        <TimeGrid events={time} columnInfoList={columnInfoList} />
      </Panel>
    </Layout>
  );
};

export default Day;
