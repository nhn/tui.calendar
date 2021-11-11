import { FunctionComponent, h } from 'preact';

import FloatingLayer from '@src/components/floatingLayer';
import { Main } from '@src/components/view/main';
import { useDispatch } from '@src/contexts/calendarStore';
import { cls } from '@src/helpers/css';

import { ProviderWrapper } from '@stories/util/providerWrapper';
import { createRandomEventModelsForMonth } from '@stories/util/randomEvents';
import { Story } from '@storybook/preact';

export default { title: 'Main' };

const style = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 5,
  top: 5,
};

const Wrapper: FunctionComponent = ({ children }) => (
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
      <FloatingLayer />
    </Wrapper>
  </ProviderWrapper>
);

export const Default = Template.bind({});
Default.args = {
  events,
};
