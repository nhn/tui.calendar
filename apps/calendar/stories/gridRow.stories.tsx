import { h } from 'preact';

import { Story } from '@storybook/preact';

import { OtherGridRow } from '@src/components/dayGridWeek/otherGridRow';
import { Layout } from '@src/components/layout';
import { Panel } from '@src/components/panel';
import { createEventCollection } from '@src/controller/base';
import { getDayGridEvents, getWeekDates } from '@src/helpers/grid';
import TZDate from '@src/time/date';
import { Day, getRowStyleInfo } from '@src/time/datetime';

import { ProviderWrapper } from '@stories/util/providerWrapper';
import { createRandomEventModelsForMonth } from '@stories/util/randomEvents';

import { CalendarData } from '@t/events';

export default {
  title: 'Components/WeekGridRow',
  component: OtherGridRow,
  args: { primary: true },
};

const events = createRandomEventModelsForMonth(40);

const weekDates = getWeekDates(new TZDate(), { startDayOfWeek: Day.SUN, workweek: false });
const calendarData: CalendarData = {
  calendars: [],
  events: createEventCollection(...events),
  idsOfDay: {},
};
const dayGridEvents = getDayGridEvents(weekDates, calendarData, { narrowWeekend: false });

const Template: Story = (args) => {
  const { cellWidthMap } = getRowStyleInfo(weekDates.length, true, 0, true);

  return (
    <ProviderWrapper options={args.options} events={events}>
      <Layout height={500}>
        <Panel name="milestone" resizable minHeight={20} maxHeight={args.maxHeight}>
          <OtherGridRow
            weekDates={weekDates}
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
