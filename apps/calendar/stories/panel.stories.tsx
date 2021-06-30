import { h } from 'preact';

import range from 'tui-code-snippet/array/range';

import { Layout } from '@src/components/layout';
import Panel from '@src/components/panel';
import { DayGridEvents } from '@src/components/panelgrid/dayGridEvents';
import { PanelTitle } from '@src/components/panelgrid/panelTitle';
import { createScheduleCollection } from '@src/controller/base';
import { DataStore } from '@src/model';
import TZDate from '@src/time/date';
import { addDate, getGridInfo, toStartOfDay } from '@src/time/datetime';
import { getDayGridEvents } from '@src/util/gridHelper';

import { ProviderWrapper } from '@stories/util/providerWrapper';
import { createRandomEventModelsForMonth } from '@stories/util/randomEvents';
import { Story } from '@storybook/preact';

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
const dayGridEvents = getDayGridEvents(cells, dataStore, { narrowWeekend: false });

const Template: Story = (args) => {
  const { gridInfo, gridColWidthMap } = getGridInfo(cells.length, true, 0, true);

  return (
    <ProviderWrapper options={args.options} events={events}>
      <Layout height={500}>
        <Panel name="milestone" resizable minHeight={20} maxHeight={args.maxHeight}>
          <DayGridEvents
            events={dayGridEvents.milestone}
            type="milestone"
            options={{ narrowWeekend: false }}
            gridInfo={gridInfo}
            gridColWidthMap={gridColWidthMap}
          />
        </Panel>
      </Layout>
    </ProviderWrapper>
  );
};

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
