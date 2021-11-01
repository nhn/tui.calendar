import { h } from 'preact';

import { BackgroundEvent } from '@src/components/events/backgroundEvent';
import { TimeEvent } from '@src/components/events/timeEvent';
import EventModel from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';

import { ProviderWrapper } from '@stories/util/providerWrapper';

export default { title: 'Various Event Blocks' };

export const timeEvent = () => {
  const event = EventModel.create({
    title: 'Time Event 2',
    bgColor: 'green',
  });
  const eventModels = EventUIModel.create(event);

  return (
    <ProviderWrapper>
      <TimeEvent eventModels={eventModels} />
    </ProviderWrapper>
  );
};

export const backgroundEvent = () => {
  const eventModels = EventUIModel.create(
    EventModel.create({
      bgColor: 'rgba(100, 100, 100, .3)',
    })
  );

  return <BackgroundEvent eventModels={eventModels} />;
};
