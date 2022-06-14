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
    backgroundColor: 'green',
  });
  const uiModel = new EventUIModel(event);

  return (
    <ProviderWrapper>
      <TimeEvent uiModel={uiModel} />
    </ProviderWrapper>
  );
};

export const backgroundEvent = () => {
  const uiModel = new EventUIModel(
    new EventModel({
      backgroundColor: 'rgba(100, 100, 100, .3)',
    })
  );

  return <BackgroundEvent uiModel={uiModel} />;
};
