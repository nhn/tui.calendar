import { FunctionComponent, h } from 'preact';

import { useStore } from '@src/components/hooks/store';
import Panel from '@src/components/panel';
import DayNames from '@src/components/daygrid/dayNames';
import { TemplateWeekDay } from '@src/model';
import { capitalizeDayName, getDayName } from '@src/util/dayName';
import { SpecialEvents } from '@src/components/panelgrid/specialEvents';
import TZDate from '@src/time/date';
import { Layout } from '@src/components/layout';
import { getSpecialEvents } from '@src/event/panelEvent';

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
    state: { template, theme, options, dataStore },
  } = useStore(['template', 'theme', 'options', 'dataStore']);

  if (!template || !theme || !options || !dataStore) {
    return null;
  }

  const dayNames = getDayNames(template.weekDayname, options);
  const { narrowWeekend } = options.week;
  const today = new TZDate(); // @TODO: 오늘 기준으로 계산(prev, next 사용 시 날짜 계산 필요)
  const { milestone, task, allday } = getSpecialEvents([today], dataStore, narrowWeekend);

  return (
    <Layout>
      <Panel name="day-daynames" height={dayNameHeight}>
        <DayNames dayNames={dayNames} marginLeft={120} />
      </Panel>
      <Panel name="milestone" resizable minHeight={20} maxHeight={120}>
        <SpecialEvents events={milestone} cells={[today]} type="milestone" />
      </Panel>
      <Panel name="task" resizable>
        <SpecialEvents events={[]} cells={[today]} type="task" />
      </Panel>
      <Panel name="allday" resizable>
        <SpecialEvents events={[]} cells={[today]} type="allday" />
      </Panel>
    </Layout>
  );
};

export default Day;
