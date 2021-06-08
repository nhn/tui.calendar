import { FunctionComponent, h } from 'preact';

import { useStore } from '@src/components/hooks/store';
import Panel from '@src/components/panel';
import DayNames from '@src/components/daygrid/dayNames';
import { TemplateWeekDay } from '@src/model';
import { capitalizeDayName, getDayName } from '@src/util/dayName';
import { DayGridEvents } from '@src/components/panelgrid/dayGridEvents';
import TZDate from '@src/time/date';
import { Layout } from '@src/components/layout';
import { getDayGridEvents } from '@src/util/panelEvent';
import { toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { TimeGrid } from '@src/components/timegrid/timegrid';
import { ColumnInfo } from '@src/components/timegrid/columns';

import type { OptionData } from '@t/store';
import type { DayNameItem } from '@t/components/daygrid/dayNames';

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
    state: { template, theme, options, dataStore, layout },
  } = useStore(['template', 'theme', 'options', 'dataStore', 'layout']);

  if (!template || !theme || !options || !dataStore || !layout) {
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
      <Panel name="milestone" resizable>
        <DayGridEvents
          events={milestone}
          cells={cells}
          type="milestone"
          panelHeight={layout.milestone?.height}
        />
      </Panel>
      <Panel name="task" resizable>
        <DayGridEvents events={task} cells={cells} type="task" panelHeight={layout.task?.height} />
      </Panel>
      <Panel name="allday" resizable>
        <DayGridEvents
          events={allday}
          cells={cells}
          type="allday"
          panelHeight={layout.allday?.height}
        />
      </Panel>
      <Panel name="time" height={layout.layout?.height - layout.milestone?.height}>
        <TimeGrid events={time} columnInfoList={columnInfoList} />
      </Panel>
    </Layout>
  );
};

export default Day;
