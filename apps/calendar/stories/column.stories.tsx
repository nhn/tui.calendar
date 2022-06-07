// @FIXME

import type { ComponentProps } from 'preact';
import { h } from 'preact';

import type { StoryFn } from '@storybook/preact';

import { Column } from '@src/components/timeGrid/column';
import { cls } from '@src/helpers/css';
import { createTimeGridData, getWeekDates } from '@src/helpers/grid';
import TZDate from '@src/time/date';

import type { PropsWithChildren } from '@t/components/common';

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
  timeGridData: getTimeGridData(),
  totalUIModels: [],
  columnWidth: '20%',
};

// const getBackgroundEvents = () => {
//   const start = toStartOfDay(new TZDate());
//   start.setHours(8);
//
//   const data: EventObject[] = [
//     {
//       category: 'background',
//       start,
//       end: addHours(start, 1),
//       backgroundColor: 'rgba(100, 100, 100, .3)',
//     },
//     {
//       category: 'background',
//       start: addMinutes(start, 150),
//       end: addHours(start, 3),
//       backgroundColor: 'rgba(200, 100, 100, .3)',
//     },
//     {
//       category: 'background',
//       start: addHours(start, 4),
//       end: addHours(start, 6),
//       backgroundColor: 'rgba(100, 200, 100, .3)',
//     },
//   ];
//   return createEventModels(data);
// };
// export const WithBackgroundEvents = Template.bind({});
// WithBackgroundEvents.args = {
//   columnDate: new TZDate(),
//   timeGridData: getTimeGridData(),
//   totalUIModels: [getBackgroundEvents()],
//   columnWidth: '20%',
// };
