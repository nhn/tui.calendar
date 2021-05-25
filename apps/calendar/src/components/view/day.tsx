import { FunctionComponent, Fragment, h } from 'preact';

import { useStore } from '@src/components/hooks/store';
import Panel from '@src/components/panel';
import DayNames from '@src/components/daygrid/dayNames';
import { TemplateWeekDay } from '@src/model';
import { getDayName } from '@src/util/dayName';

import type { OptionData } from '@t/store';
import type { DayNameItem } from '@t/components/daygrid/dayNames';
import { SpecialEvents } from '@src/components/panelgrid/specialEvents';
import TZDate from '@src/time/date';
import { Layout } from '@src/components/layout';

function getDayNames(template: (model: TemplateWeekDay) => string, options: OptionData) {
  const dayNames: DayNameItem[] = [];

  // @TODO: apply template daynames
  const today = new Date();
  const dayIndex = today.getDay();
  const name = getDayName(dayIndex);

  dayNames.push({ name, dayIndex });

  return dayNames;
}

const dayNameHeight = 42;

const Day: FunctionComponent = () => {
  const { state } = useStore(['template', 'theme', 'options']);
  const { template, theme, options } = state;

  if (!template || !theme || !options) {
    return null;
  }

  const dayNames = getDayNames(template.weekDayname, options);
  const today = new TZDate();

  return (
    <Layout>
      <Panel name="day-daynames" height={dayNameHeight}>
        <DayNames dayNames={dayNames} marginLeft={120} />
      </Panel>
      <Panel name="milestone" resizable minHeight={20} maxHeight={120}>
        <SpecialEvents events={[]} cells={[today]} type="milestone" />
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
