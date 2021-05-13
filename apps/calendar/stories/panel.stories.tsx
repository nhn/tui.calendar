import { h } from 'preact';
import { Story } from '@storybook/preact';

import { Milestone } from '@src/components/panelgrid/milestone';
import { addDate } from '@src/time/datetime';
import TZDate from '@src/time/date';
import { Layout } from '@src/components/layout';
import Panel from '@src/components/panel';
import Schedule from '@src/model/schedule';
import { ProviderWrapper } from '@stories/util/providerWrapper';
import { WeekDayNames } from '@src/components/panelgrid/dayNames';
import { PanelTitle } from '@src/components/panelgrid/panelTitle';

import type { MilestoneEvent } from '@t/events';
import type { DayNameItem } from '@t/components/daygrid/dayNames';

export default { title: 'Panel', component: Milestone, args: { primary: true } };

const now = new TZDate();

const mon = addDate(now, -now.getDay() + 1);
const tue = addDate(now, -now.getDay() + 2);
const wed = addDate(now, -now.getDay() + 3);
const thu = addDate(now, -now.getDay() + 4);
const fri = addDate(now, -now.getDay() + 5);
const sat = addDate(now, -now.getDay() + 6);
const sun = addDate(now, -now.getDay() + 7);

const data = [
  { start: mon, end: wed },
  { start: mon, end: wed },
  { start: mon, end: tue },
  { start: mon, end: tue },
  { start: tue, end: fri },
  { start: tue, end: fri },
  { start: tue, end: wed },
  { start: wed, end: thu },
  { start: wed, end: wed },
  { start: thu, end: sun },
  { start: thu, end: sat },
  { start: thu, end: fri },
  { start: thu, end: fri },
  { start: thu, end: fri },
] as MilestoneEvent[];

const Template: Story = (args) => (
  <Layout height={500}>
    <Panel name="milestone" resizable minHeight={20} maxHeight={args.maxHeight}>
      <Milestone events={args.events} />
    </Panel>
  </Layout>
);

export const milestone = Template.bind({});

milestone.args = {
  events: data.map((e) => {
    const event = Schedule.create(e);
    event.isAllDay = true;

    return event;
  }),
};

milestone.storyName = 'events milestone';

export const scrollMilestone = Template.bind({});

scrollMilestone.args = {
  events: data.map((e) => {
    const event = Schedule.create(e);
    event.isAllDay = true;

    return event;
  }),
  maxHeight: 40,
};

scrollMilestone.storyName = 'events milestone with scroll';

export const title: Story = () => {
  const type = 'milestone';

  return <PanelTitle width={120} template={type} model={type} />;
};

title.storyName = 'panel title';

const DayNamesTemplate: Story<{ dayNames: DayNameItem[] }> = (args) => (
  <ProviderWrapper>
    <WeekDayNames dayNames={args.dayNames} />
  </ProviderWrapper>
);

export const dayNames1day = DayNamesTemplate.bind({});
dayNames1day.args = {
  dayNames: [
    {
      name: 'Mon',
      dayIndex: 1,
    },
  ],
};
dayNames1day.storyName = '1 day DayNames';

export const dayNames3day = DayNamesTemplate.bind({});
dayNames3day.args = {
  dayNames: [
    {
      name: 'Mon',
      dayIndex: 1,
    },
    {
      name: 'Wed',
      dayIndex: 3,
    },
    {
      name: 'Fri',
      dayIndex: 5,
    },
  ],
};
dayNames3day.storyName = '3 days DayNames';
