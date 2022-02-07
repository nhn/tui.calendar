import { ComponentProps, h } from 'preact';

import { StoryFn } from '@storybook/preact';

import { Column } from '@src/components/timeGrid/column';
import { cls } from '@src/helpers/css';
import { createTimeGridData, getWeekDates } from '@src/helpers/grid';
import TZDate from '@src/time/date';
import { addHours, addMinutes, toStartOfDay } from '@src/time/datetime';

import { createEventModels } from '@stories/helper/event';

import { PropsWithChildren } from '@t/components/common';
import { EventModelData } from '@t/events';

export default { title: 'Components/Column', component: Column };

function Wrapper({ children }: PropsWithChildren) {
  return (
    <div className={cls('layout')} style={{ position: 'relative' }}>
      {children}
    </div>
  );
}

function getTimeGridData() {
  const now = new TZDate();
  const weekDates = getWeekDates(now, { startDayOfWeek: 0, workweek: false });
  return createTimeGridData(weekDates, { hourStart: 0, hourEnd: 24 });
}

const Template: StoryFn<ComponentProps<typeof Column>> = (args) => (
  <Wrapper>
    <Column {...args} />
  </Wrapper>
);

export const Default = Template.bind({});
Default.args = {
  columnDate: new TZDate(),
  timeGridRows: getTimeGridData().rows,
  events: [],
  columnWidth: '20%',
};

const getBackgroundEvents = () => {
  const start = toStartOfDay(new TZDate());
  start.setHours(8);

  const data: EventModelData[] = [
    {
      category: 'background',
      start,
      end: addHours(start, 1),
      bgColor: 'rgba(100, 100, 100, .3)',
    },
    {
      category: 'background',
      start: addMinutes(start, 150),
      end: addHours(start, 3),
      bgColor: 'rgba(200, 100, 100, .3)',
    },
    {
      category: 'background',
      start: addHours(start, 4),
      end: addHours(start, 6),
      bgColor: 'rgba(100, 200, 100, .3)',
    },
  ];
  return createEventModels(data);
};
export const WithBackgroundEvents = Template.bind({});
WithBackgroundEvents.args = {
  columnDate: new TZDate(),
  timeGridRows: getTimeGridData().rows,
  events: getBackgroundEvents(),
  columnWidth: '20%',
};

export const HasBackgroundColor = Template.bind({});
HasBackgroundColor.args = {
  columnDate: new TZDate(),
  timeGridRows: getTimeGridData().rows,
  events: [],
  columnWidth: '20%',
  backgroundColor: 'rgba(81, 92, 230, 0.05)',
};
