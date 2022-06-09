import { h } from 'preact';

import type { Story } from '@storybook/preact';

import { Main } from '@src/components/view/main';
import { useDispatch } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';

import { ProviderWrapper } from '@stories/util/providerWrapper';
import { createRandomEventModelsForMonth } from '@stories/util/randomEvents';

import type { PropsWithChildren } from '@t/components/common';

export default { title: 'Views/Main', component: Main };

const style = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 5,
  top: 5,
};

const Wrapper = ({ children }: PropsWithChildren) => (
  <div className={cls('layout')} style={style}>
    {children}
  </div>
);

const events = createRandomEventModelsForMonth();

const Toolbar = () => {
  const { changeView } = useDispatch('view');

  return (
    <div>
      <button onClick={() => changeView('month')}>Month</button>
      <button onClick={() => changeView('week')}>Week</button>
      <button onClick={() => changeView('day')}>Day</button>
    </div>
  );
};

const Template: Story = (args) => (
  <ProviderWrapper options={args.options} events={args.events}>
    <Wrapper>
      <Toolbar />
      <Main />
    </Wrapper>
  </ProviderWrapper>
);

export const Default = Template.bind({});
Default.args = {
  events,
  options: { useFormPopup: true, useDetailPopup: true },
};
