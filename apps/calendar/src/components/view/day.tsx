import { FunctionComponent, h } from 'preact';

import { useStore } from '@src/components/hooks/store';
import Panel from '@src/components/panel';
import DayNames from '@src/components/daygrid/dayNames';
import { TemplateWeekDay } from '@src/model';
import { capitalizeDayName, getDayName } from '@src/util/dayName';
import { DayGridEvents } from '@src/components/panelgrid/dayGridEvents';
import TZDate from '@src/time/date';
import { Layout } from '@src/components/layout';
import { getDayGridEvents } from '@src/event/panelEvent';
import { toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { TimeGrid } from '@src/components/timegrid/timegrid';
import { ColumnInfo } from '@src/components/timegrid/columns';
import ScheduleViewModel from '@src/model/scheduleViewModel';

import type { OptionData } from '@t/store';
import type { DayNameItem } from '@t/components/daygrid/dayNames';
import type { DayGridEventMatrix } from '@t/events';

function getDayNames(template: (model: TemplateWeekDay) => string, options: OptionData) {
  const dayNames: DayNameItem[] = [];

  // @TODO: apply template daynames
  const today = new Date();
  const dayIndex = today.getDay();
  const name = getDayName(dayIndex);

  dayNames.push({ name: capitalizeDayName(name), dayIndex });

  return dayNames;
}

const dayNameHeight = 42;

const Day: FunctionComponent = () => {
  const {
    state: { template, theme, options, dataStore },
  } = useStore(['template', 'theme', 'options', 'dataStore']);

  if (!template || !theme || !options || !dataStore) {
    return null;
  }

  const dayNames = getDayNames(template.weekDayname, options);
  const { narrowWeekend } = options.week;
  const cells = [new TZDate()]; // @TODO: 오늘 기준으로 계산(prev, next 사용 시 날짜 계산 필요)
  const { milestone, task, allday, time } = getDayGridEvents(cells, dataStore, narrowWeekend);
  const now = new TZDate();
  const start = toStartOfDay(now);
  const end = toEndOfDay(start);
  const columnInfoList: ColumnInfo[] = cells.map(() => {
    return { start, end, unit: 'minute', slot: 30 } as ColumnInfo;
  });

  return (
    <Layout>
      <Panel name="day-daynames" height={dayNameHeight}>
        <DayNames dayNames={dayNames} marginLeft={120} />
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

export default Day;
