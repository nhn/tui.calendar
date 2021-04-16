import { h } from 'preact';
import { Story } from '@storybook/preact';

import { Milestone } from '@src/components/panelgrid/milestone';
import { addDate } from '@src/time/datetime';
import TZDate from '@src/time/date';
import { Layout } from '@src/components/layout';
import Panel from '@src/components/panel';

export default { title: 'Panel', component: Milestone, args: { primary: true } };

const Template: Story = (args) => (
  <Layout height={500}>
    <Panel name="Milestone" resizable minHeight={20}>
      <Milestone events={args.events} />
    </Panel>
  </Layout>
);

// prev week event(Sat) ~ current week event(Tue)
const makePrevWeekStartEvent = () => {
  const now = new TZDate();

  return {
    start: addDate(now, -now.getDay() - 1),
    end: addDate(now, -now.getDay() + 1),
  };
};

// current week event(Fri) ~ next week event(Mon)
const makeNextWeekEndEvent = () => {
  const now = new TZDate();

  return {
    start: addDate(now, 7 - now.getDay() - 2),
    end: addDate(now, 7 - now.getDay()),
  };
};

// current week event(Mon) ~ current week event(Fri)
const makeCurrentWeekEvent = () => {
  const now = new TZDate();

  return {
    start: addDate(now, -now.getDay() + 1),
    end: addDate(now, -now.getDay() + 5),
  };
};

export const prevMilestone = Template.bind({});

prevMilestone.args = {
  events: [makePrevWeekStartEvent()],
};

prevMilestone.storyName = 'Prev week started event';

export const nextMilestone = Template.bind({});

nextMilestone.args = {
  events: [makeNextWeekEndEvent()],
};

nextMilestone.storyName = 'Next week ended event';

export const currentMilestone = Template.bind({});

currentMilestone.args = {
  events: [makeCurrentWeekEvent()],
};

currentMilestone.storyName = 'Current week event';

export const totalMilestone = Template.bind({});

totalMilestone.args = {
  events: [makePrevWeekStartEvent(), makeCurrentWeekEvent(), makeNextWeekEndEvent()],
};

totalMilestone.storyName = 'Total week event';
