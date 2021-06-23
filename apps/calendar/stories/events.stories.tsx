import { h } from 'preact';

import { BackgroundEvent } from '@src/components/events/backgroundEvent';
import { TimeEvent } from '@src/components/events/timeEvent';
import Schedule from '@src/model/schedule';
import ScheduleViewModel from '@src/model/scheduleViewModel';

import { ProviderWrapper } from '@stories/util/providerWrapper';

export default { title: 'Various Event Blocks' };

export const timeEvent = () => {
  const schedule = Schedule.create({
    title: 'Time Event 2',
    bgColor: 'green',
  });
  const eventModels = ScheduleViewModel.create(schedule);

  return (
    <ProviderWrapper>
      <TimeEvent eventModels={eventModels} />
    </ProviderWrapper>
  );
};

export const backgroundEvent = () => {
  const eventModels = ScheduleViewModel.create(
    Schedule.create({
      bgColor: 'rgba(100, 100, 100, .3)',
    })
  );

  return <BackgroundEvent eventModels={eventModels} />;
};
