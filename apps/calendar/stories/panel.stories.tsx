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
  events: data.map((e) => {
    const event = Schedule.create(e);
    event.isAllDay = true;

    return event;
  }),
};

milestone.storyName = 'events milestone';
