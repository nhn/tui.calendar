import { h, RenderableProps } from 'preact';
import { Story } from '@storybook/preact';

import { Milestone } from '@src/components/panelgrid/milestone';
import { addDate } from '@src/time/datetime';
import TZDate from '@src/time/date';
import { Layout } from '@src/components/layout';
import Panel from '@src/components/panel';
import { cls } from '@src/util/cssHelper';
import Schedule from '@src/model/schedule';
import { getCollisionGroup } from '@src/controller/core';
import DayEvent from '@src/components/events/dayEvent';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import { MilestoneTest } from '@src/components/panelgrid/milestoneTest';
import { MilestoneEvent } from '@t/events';

export default { title: 'Panel', component: Milestone, args: { primary: true } };

const Template: Story = (args) => (
  <Layout height={500}>
    <Panel name="milestone" resizable minHeight={20}>
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

// test

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

export const Test = () => {
  const now = new TZDate();

  const mon = addDate(now, -now.getDay() + 1);
  const tue = addDate(now, -now.getDay() + 2);
  const wed = addDate(now, -now.getDay() + 3);
  const thu = addDate(now, -now.getDay() + 4);
  const fri = addDate(now, -now.getDay() + 5);
  const sat = addDate(now, -now.getDay() + 6);
  const sun = addDate(now, -now.getDay() + 7);

  // const rawData: MilestoneEvent[] = [
  //   { start: thu, end: fri, name: 'milestone', type: 'daygrid' }, // 10
  //   { start: thu, end: fri, name: 'milestone', type: 'daygrid' }, // 11
  //   { start: mon, end: wed, name: 'milestone', type: 'daygrid' }, // 2
  //   { start: tue, end: wed, name: 'milestone', type: 'daygrid' }, // 6
  //   { start: wed, end: wed, name: 'milestone', type: 'daygrid' }, // 8
  //   { start: tue, end: fri, name: 'milestone', type: 'daygrid' }, // 7
  //   { start: thu, end: sun, name: 'milestone', type: 'daygrid' }, // 14
  //   { start: mon, end: tue, name: 'milestone', type: 'daygrid' }, // 4
  //   { start: mon, end: wed, name: 'milestone', type: 'daygrid' }, // 1
  //   { start: wed, end: thu, name: 'milestone', type: 'daygrid' }, // 9
  //   { start: tue, end: fri, name: 'milestone', type: 'daygrid' }, // 5
  //   { start: thu, end: fri, name: 'milestone', type: 'daygrid' }, // 12
  //   { start: thu, end: sat, name: 'milestone', type: 'daygrid' }, // 13
  //   { start: mon, end: tue, name: 'milestone', type: 'daygrid' }, // 3
  // ];
  const rawData: MilestoneEvent[] = [
    { start: thu, end: fri, name: 'milestone', type: 'daygrid' }, // 12
    { start: thu, end: fri, name: 'milestone', type: 'daygrid' }, // 13
    { start: mon, end: wed, name: 'milestone', type: 'daygrid' }, // 2
    { start: tue, end: fri, name: 'milestone', type: 'daygrid' }, // 6
    { start: wed, end: thu, name: 'milestone', type: 'daygrid' }, // 8
    { start: tue, end: wed, name: 'milestone', type: 'daygrid' }, // 7
    { start: thu, end: sat, name: 'milestone', type: 'daygrid' }, // 11
    { start: mon, end: tue, name: 'milestone', type: 'daygrid' }, // 4
    { start: mon, end: wed, name: 'milestone', type: 'daygrid' }, // 1
    { start: wed, end: wed, name: 'milestone', type: 'daygrid' }, // 9
    { start: tue, end: fri, name: 'milestone', type: 'daygrid' }, // 5
    { start: thu, end: fri, name: 'milestone', type: 'daygrid' }, // 14
    { start: thu, end: sun, name: 'milestone', type: 'daygrid' }, // 10
    { start: mon, end: tue, name: 'milestone', type: 'daygrid' }, // 3
  ];
  // grid 밖 data
  // const rawData: MilestoneEvent[] = [
  //   {
  //     start: addDate(now, -now.getDay() - 6),
  //     end: addDate(now, -now.getDay() - 5),
  //     name: 'milestone',
  //     type: 'daygrid',
  //   },
  // ];
  // const data = rawData.map((value) => ScheduleViewModel.create(Schedule.create(value)));

  return (
    <Layout height={500}>
      <Panel name="milestone" resizable minHeight={20}>
        <MilestoneTest
          events={rawData
            .map((v) => Schedule.create(v))
            .map((schedule) => {
              schedule.isAllDay = true;

              return schedule;
            })}
        />
      </Panel>
    </Layout>
  );
};
