import { h } from 'preact';
import { ProviderWrapper } from '@stories/util/providerWrapper';
import { TimeEvent } from '@src/components/events/timeEvent';
import Schedule from '@src/model/schedule';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import { BackgroundEvent } from '@src/components/events/backgroundEvent';

export default { title: 'Various Event Blocks' };

export const timeEvent = () => {
  const schedule = Schedule.create({
    title: 'Time Event 2',
    bgColor: 'green',
  });
  const scheduleViewModel = ScheduleViewModel.create(schedule);

  return (
    <ProviderWrapper>
      <TimeEvent viewModel={scheduleViewModel} />
    </ProviderWrapper>
  );
};

export const backgroundEvent = () => {
  const event = Schedule.create({
    bgColor: 'rgba(100, 100, 100, .3)',
  });

  return <BackgroundEvent model={event} />;
};
