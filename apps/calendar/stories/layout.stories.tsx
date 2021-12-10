import { h } from 'preact';

import { Layout } from '@src/components/layout';
import { Panel } from '@src/components/panel';
import { Direction, ResizeMode } from '@src/constants/layout';

import { ProviderWrapper } from '@stories/util/providerWrapper';

export default { title: 'Layout' };

export const vertical = () => (
  <ProviderWrapper>
    <Layout height={500}>
      <Panel name="dayName" height={50}>
        <div style="border-bottom: 1px solid #bbb; height: 100%;">DayName Panel</div>
      </Panel>
      <Panel name="milestone" resizable height={50}>
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

export const horizontal = () => (
  <ProviderWrapper>
    <Layout direction={Direction.ROW} height={300}>
      <Panel name="mon" resizable>
        <div>Mon</div>
      </Panel>
      <Panel name="tue" width={200} resizable>
        <div>Tue</div>
      </Panel>
      <Panel name="wed" resizable>
        <div>Wed</div>
      </Panel>
      <Panel name="thu" resizable>
        <div>Thu</div>
      </Panel>
      <Panel name="fri" resizable>
        <div>Fri</div>
      </Panel>
      <Panel name="sat" resizable>
        <div>Sat</div>
      </Panel>
      <Panel name="sun" resizable autoSize={1}>
        <div>Sun</div>
      </Panel>
    </Layout>
  </ProviderWrapper>
);

export const verticalWithOverflow = () => (
  <ProviderWrapper>
    <Layout>
      <Panel name="dayName" height={50} overflowY>
        <div style="border-bottom: 1px solid #bbb; height: 300px;">Overflow-Y Panel</div>
      </Panel>
    </Layout>
  </ProviderWrapper>
);

export const horizontalWithOverflow = () => (
  <ProviderWrapper>
    <Layout direction={Direction.ROW}>
      <Panel name="dayName" width={200} height={200} overflowX>
        <div style="border-right: 1px solid #bbb; width: 300px;">Overflow-X Panel</div>
      </Panel>
    </Layout>
  </ProviderWrapper>
);

export const resizeModeAbsolute = () => (
  <ProviderWrapper>
    <Layout resizeMode={ResizeMode.ABSOLUTE}>
      <Panel name="1" resizable resizerHeight={10}>
        <div style="height: 200px;">Panel 1</div>
      </Panel>
      <Panel name="2" resizable>
        <div style="height: 200px;">Panel 2</div>
      </Panel>
    </Layout>
  </ProviderWrapper>
);
