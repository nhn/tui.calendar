import { h, RenderableProps } from 'preact';
import { Story } from '@storybook/preact';

import { Milestone } from '@src/components/panelgrid/milestone';
import { addDate } from '@src/time/datetime';
import TZDate from '@src/time/date';
import { Layout } from '@src/components/layout';
import Panel from '@src/components/panel';
import { cls } from '@src/util/cssHelper';
import Schedule from '@src/model/schedule';

import type { MilestoneEvent } from '@t/events';

export default { title: 'Panel', component: Milestone, args: { primary: true } };

const now = new TZDate();

const mon = addDate(now, -now.getDay() + 1);
const tue = addDate(now, -now.getDay() + 2);
const wed = addDate(now, -now.getDay() + 3);
const thu = addDate(now, -now.getDay() + 4);
const fri = addDate(now, -now.getDay() + 5);
const sat = addDate(now, -now.getDay() + 6);
const sun = addDate(now, -now.getDay() + 7);

const data: MilestoneEvent[] = [
  { start: mon, end: wed, name: 'milestone', type: 'daygrid' },
  { start: mon, end: wed, name: 'milestone', type: 'daygrid' },
  { start: mon, end: tue, name: 'milestone', type: 'daygrid' },
  { start: mon, end: tue, name: 'milestone', type: 'daygrid' },
  { start: tue, end: fri, name: 'milestone', type: 'daygrid' },
  { start: tue, end: fri, name: 'milestone', type: 'daygrid' },
  { start: tue, end: wed, name: 'milestone', type: 'daygrid' },
  { start: wed, end: thu, name: 'milestone', type: 'daygrid' },
  { start: wed, end: wed, name: 'milestone', type: 'daygrid' },
  { start: thu, end: sun, name: 'milestone', type: 'daygrid' },
  { start: thu, end: sat, name: 'milestone', type: 'daygrid' },
  { start: thu, end: fri, name: 'milestone', type: 'daygrid' },
  { start: thu, end: fri, name: 'milestone', type: 'daygrid' },
  { start: thu, end: fri, name: 'milestone', type: 'daygrid' },
];

const Template: Story = (args) => (
  <Layout height={500}>
    <Panel name="milestone" resizable minHeight={20}>
      <Milestone events={args.events} />
    </Panel>
  </Layout>
);

interface WrapperProps {
  width: number;
  position: string;
}

function Wrapper({ children, position }: RenderableProps<WrapperProps>) {
  return (
    <div className={cls('layout')} style={{ position }}>
      {children}
    </div>
  );
}
Wrapper.defaultProps = {
  position: 'relative',
  width: 200,
};

export const milestone = Template.bind({});

milestone.args = {
  events: data.map((v) => {
    const events = Schedule.create(v);
    events.isAllDay = true;

    return events;
  }),
};

milestone.storyName = 'events milestone';
