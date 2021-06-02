import { h } from 'preact';
import { TimeEvent } from '@src/components/events/timeEvent';
import Schedule from '@src/model/schedule';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import { InstanceContext, getNewAppContext } from '@src/model/context';
import { BackgroundEvent } from '@src/components/events/backgroundEvent';

export default { title: 'Various Event Blocks' };

export const timeEvent = () => {
  const schedule = Schedule.create({
    title: 'Time Event 2',
    bgColor: 'green',
  });
  const scheduleViewModel = ScheduleViewModel.create(schedule);

  return (
    <InstanceContext.Provider value={getNewAppContext()}>
      <TimeEvent viewModel={scheduleViewModel} />
    </InstanceContext.Provider>
  );
};

export const backgroundEvent = () => {
  const event = ScheduleViewModel.create(
    Schedule.create({
      bgColor: 'rgba(100, 100, 100, .3)',
    })
  );

  return <BackgroundEvent viewModel={event} />;
};
