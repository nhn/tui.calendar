import { h } from 'preact';
import { Story } from '@storybook/preact';
import range from 'tui-code-snippet/array/range';

import { DayGridEvents } from '@src/components/panelgrid/dayGridEvents';
import { addDate, toStartOfDay } from '@src/time/datetime';
import TZDate from '@src/time/date';
import { Layout } from '@src/components/layout';
import Panel from '@src/components/panel';
import { PanelTitle } from '@src/components/panelgrid/panelTitle';
import { createRandomEventModelsForMonth } from '@stories/util/randomEvents';
import { ProviderWrapper } from '@stories/util/providerWrapper';
import { getDayGridEvents } from '@src/util/gridEvent';
import { createScheduleCollection } from '@src/controller/base';
import { DataStore } from '@src/model';

export default { title: 'Panel', component: DayGridEvents, args: { primary: true } };

const events = createRandomEventModelsForMonth(40);

const cells = range(0, 7).map((day) => {
  const now = toStartOfDay(new TZDate());

  return addDate(now, day - now.getDay());
});
const dataStore: DataStore = {
  calendars: [],
  schedules: createScheduleCollection(...events),
  idsOfDay: {},
};
const dayGridEvents = getDayGridEvents(cells, dataStore, false);

const Template: Story = (args) => (
  <ProviderWrapper options={args.options} events={events}>
    <Layout height={500}>
      <Panel name="milestone" resizable minHeight={20} maxHeight={args.maxHeight}>
        <DayGridEvents events={dayGridEvents.milestone} type="milestone" />
      </Panel>
    </Layout>
  </ProviderWrapper>
);

export const milestone = Template.bind({});

milestone.storyName = 'random events milestone';

export const title: Story = () => {
  const type = 'milestone';

  return (
    <ProviderWrapper>
      <PanelTitle width={120} template={type} model={type} />
    </ProviderWrapper>
  );
};

title.storyName = 'panel title';
