import { h } from 'preact';

import { Layout } from '@src/components/layout';
import { Panel } from '@src/components/panel';

import { ProviderWrapper } from '@stories/util/providerWrapper';

export default { title: 'Components/Layout', component: Layout };

export const vertical = () => (
  <ProviderWrapper>
    <Layout>
      <Panel name="dayName" initialHeight={50}>
        <div style="border-bottom: 1px solid #bbb; height: 100%;">DayName Panel</div>
      </Panel>
      <Panel name="milestone" resizable initialHeight={50}>
        <div>Milestone Panel</div>
      </Panel>
      <Panel name="task" resizable>
        <div>Task Panel</div>
      </Panel>
      <Panel name="allday" resizable minHeight={30}>
        <div>All Day Panel</div>
      </Panel>
      <Panel name="time" autoSize={1}>
        <div style="height: 100%; border-bottom: 1px solid #bbb">Time Panel</div>
      </Panel>
    </Layout>
  </ProviderWrapper>
);

export const verticalWithOverflow = () => (
  <ProviderWrapper>
    <Layout>
      <Panel name="dayName" initialHeight={50} overflowY>
        <div style="border-bottom: 1px solid #bbb; height: 300px;">Overflow-Y Panel</div>
      </Panel>
    </Layout>
  </ProviderWrapper>
);

export const horizontalWithOverflow = () => (
  <ProviderWrapper>
    <Layout>
      <Panel name="dayName" initialWidth={200} initialHeight={200} overflowX>
        <div style="border-right: 1px solid #bbb; width: 300px;">Overflow-X Panel</div>
      </Panel>
    </Layout>
  </ProviderWrapper>
);
