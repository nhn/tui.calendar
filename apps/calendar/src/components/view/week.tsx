import { FunctionComponent, h } from 'preact';
import range from 'tui-code-snippet/array/range';

import { useStore } from '@src/components/hooks/store';
import Panel from '@src/components/panel';
import DayNames from '@src/components/daygrid/dayNames';
import { TemplateWeekDay } from '@src/model';
import { capitalizeDayName, getDayName } from '@src/util/dayName';
import TZDate from '@src/time/date';
import { Layout } from '@src/components/layout';
import { getDayGridEvents } from '@src/util/gridEvent';
import { addDate, toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { TimeGrid } from '@src/components/timegrid/timegrid';
import { DayGridEvents } from '@src/components/panelgrid/dayGridEvents';
import { ColumnInfo } from '@src/components/timegrid/columns';

import { OptionData } from '@t/store';

function getDayNames(options: OptionData) {
  const dayNames: TemplateWeekDay[] = [];

  // @TODO: apply template daynames
  const week = range(0, 7).map((day) => {
    const now = new TZDate();

    return addDate(now, day - now.getDay());
  });

  week.forEach((day) => {
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

const dayNameHeight = 42;

const Week: FunctionComponent = () => {
  const {
    state: { template, theme, options, dataStore, layout },
  } = useStore(['template', 'theme', 'options', 'dataStore', 'layout']);

  if (!template || !theme || !options || !dataStore || !layout) {
    return null;
  }

  const dayNames = getDayNames(options);
  const { narrowWeekend } = options.week;
  const cells = range(0, 7).map((day) => {
    const now = toStartOfDay(new TZDate());

    return addDate(now, day - now.getDay());
  }); // @TODO: 이번주 기준으로 계산(prev, next 사용 시 날짜 계산 필요)
  const { milestone, task, allday, time } = getDayGridEvents(cells, dataStore, narrowWeekend);
  const columnInfoList: ColumnInfo[] = cells.map((cell) => {
    return {
      start: toStartOfDay(cell),
      end: toEndOfDay(cell),
      unit: 'minute',
      slot: 30,
    } as ColumnInfo;
  });
  const timePanelHeight =
    layout.layout?.height - layout.milestone?.height - layout.task?.height - layout.allday?.height;

  return (
    <Layout>
      <Panel name="week-daynames" height={dayNameHeight}>
        <DayNames dayNames={dayNames} marginLeft={120} templateType="weekDayname" />
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
      <Panel name="time" height={timePanelHeight}>
        <TimeGrid events={time} columnInfoList={columnInfoList} />
      </Panel>
    </Layout>
  );
};

export default Week;
