import { h } from 'preact';

import { Story } from '@storybook/preact';
import range from 'tui-code-snippet/array/range';

import { OtherGridRow } from '@src/components/dayGridWeek/otherGridRow';
import { Layout } from '@src/components/layout';
import { Panel } from '@src/components/panel';
import { createEventCollection } from '@src/controller/base';
import { getDayGridEvents } from '@src/helpers/grid';
import TZDate from '@src/time/date';
import { addDate, getRowStyleInfo, toStartOfDay } from '@src/time/datetime';

import { ProviderWrapper } from '@stories/util/providerWrapper';
import { createRandomEventModelsForMonth } from '@stories/util/randomEvents';

import { CalendarData } from '@t/events';

export default {
  title: 'Components/WeekGridRow',
  component: OtherGridRow,
  args: { primary: true },
};

const events = createRandomEventModelsForMonth(40);

const row = range(0, 7).map((day) => {
  const now = toStartOfDay(new TZDate());

  return addDate(now, day - now.getDay());
});
const calendarData: CalendarData = {
  calendars: [],
  events: createEventCollection(...events),
  idsOfDay: {},
};
const dayGridEvents = getDayGridEvents(row, calendarData, { narrowWeekend: false });

const Template: Story = (args) => {
  const { cellWidthMap } = getRowStyleInfo(row.length, true, 0, true);

  return (
    <ProviderWrapper options={args.options} events={events}>
      <Layout height={500}>
        <Panel name="milestone" resizable minHeight={20} maxHeight={args.maxHeight}>
          <OtherGridRow
            events={dayGridEvents.milestone}
            category="milestone"
            options={{ narrowWeekend: false }}
            gridColWidthMap={cellWidthMap}
          />
        </Panel>
      </Layout>
    </ProviderWrapper>
  );
};

export const milestone = Template.bind({});

milestone.storyName = 'random events milestone';
