import { h } from 'preact';

import { BackgroundEvent } from '@src/components/events/backgroundEvent';
import { TimeEvent } from '@src/components/events/timeEvent';
import EventModel from '@src/model/eventModel';
import EventUIModel from '@src/model/eventUIModel';

import { ProviderWrapper } from '@stories/util/providerWrapper';

export default { title: 'Components/EventBlocks' };

export const timeEvent = () => {
  const event = new EventModel({
    title: 'Time Event 2',
    bgColor: 'green',
  });
  const uiModel = EventUIModel.create(event);

  return (
    <ProviderWrapper>
      <TimeEvent uiModel={uiModel} />
    </ProviderWrapper>
  );
};

export const backgroundEvent = () => {
  const uiModel = EventUIModel.create(
    new EventModel({
      bgColor: 'rgba(100, 100, 100, .3)',
    })
  );

  return <BackgroundEvent uiModel={uiModel} />;
};
