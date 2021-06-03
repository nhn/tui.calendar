import { FunctionComponent, h } from 'preact';
import range from 'tui-code-snippet/array/range';

import { useStore } from '@src/components/hooks/store';
import { TemplateWeekDay } from '@src/model';
import { capitalizeDayName, getDayName } from '@src/util/dayName';
import TZDate from '@src/time/date';
import { addDate, toEndOfDay, toStartOfDay } from '@src/time/datetime';

import { OptionData } from '@t/store';
import { DayNameItem } from '@t/components/daygrid/dayNames';
import { Layout } from '@src/components/layout';
import Panel from '@src/components/panel';
import DayNames from '@src/components/daygrid/dayNames';
import { getDayGridEvents } from '@src/event/panelEvent';
import { date } from '@src/time/timezone';
import { DayGridEvents } from '@src/components/panelgrid/dayGridEvents';
import { DayGridEventMatrix } from '@t/events';
import { TimeGrid } from '@src/components/timegrid/timegrid';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import { ColumnInfo } from '@src/components/timegrid/columns';

function getDayNames(template: (model: TemplateWeekDay) => string, options: OptionData) {
  const dayNames: DayNameItem[] = [];

  // @TODO: apply template daynames
  const week = range(0, 7).map((day) => {
    const now = new TZDate();

    return addDate(now, day - now.getDay());
  });

  week.forEach((day) => {
    const dayIndex = day.getDay();
    const name = capitalizeDayName(getDayName(dayIndex));

    dayNames.push({ name, dayIndex });
  });

  return dayNames;
}

const dayNameHeight = 42;

const Week: FunctionComponent = () => {
  const {
    state: { template, theme, options, dataStore },
  } = useStore(['template', 'theme', 'options', 'dataStore']);

  if (!template || !theme || !options || !dataStore) {
    return null;
  }

  const dayNames = getDayNames(template.weekDayname, options);
  const { narrowWeekend } = options.week;
  const cells = range(0, 7).map((day) => {
    const now = toStartOfDay(new TZDate());

    return addDate(now, day - now.getDay());
  });
  // const dayGridEvents = getDayGridEvents(cells, dataStore, narrowWeekend);
  const { milestone, task, allday, time } = getDayGridEvents(cells, dataStore, narrowWeekend);
  // console.log(milestone);
  const columnInfoList: ColumnInfo[] = cells.map((cell) => {
    return {
      start: toStartOfDay(cell),
      end: toEndOfDay(cell),
      unit: 'minute',
      slot: 30,
    } as ColumnInfo;
  });

  return (
    <Layout>
      <Panel name="week-daynames" height={dayNameHeight}>
        <DayNames dayNames={dayNames} marginLeft={120} options={options.week} />
      </Panel>
      <Panel name="milestone" resizable minHeight={20} maxHeight={120}>
        <DayGridEvents events={milestone as DayGridEventMatrix} cells={cells} type="milestone" />
      </Panel>
      <Panel name="task" resizable>
        <DayGridEvents events={task as DayGridEventMatrix} cells={cells} type="task" />
      </Panel>
      <Panel name="allday" resizable>
        <DayGridEvents events={allday as DayGridEventMatrix} cells={cells} type="allday" />
      </Panel>
      <Panel name="time" resizable>
        <TimeGrid events={time as ScheduleViewModel[]} columnInfoList={columnInfoList} />
      </Panel>
    </Layout>
  );
};

export default Week;
