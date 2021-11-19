import { FunctionComponent, h } from 'preact';

import { EventFormPopup } from '@src/components/popup/eventFormPopup';
import TZDate from '@src/time/date';

import { EventFormPopupParam } from '@t/store';

import { ProviderWrapper } from '@stories/util/providerWrapper';
import { Story } from '@storybook/preact';

export default {
  component: EventFormPopup,
  title: 'Popup/EventFormPopup',
};

const PopupContainer: FunctionComponent = ({ children }) => (
  <div
    style={{
      zIndex: 1005,
      margin: '30px auto 0',
      width: 474,
      height: 272,
    }}
  >
    {children}
  </div>
);

const Template: Story<EventFormPopupParam> = (args) => (
  <ProviderWrapper>
    <PopupContainer>
      <EventFormPopup {...args} />
    </PopupContainer>
  </ProviderWrapper>
);

export const Basic = Template.bind({});
Basic.args = {
  start: new TZDate(),
  end: new TZDate(),
};
