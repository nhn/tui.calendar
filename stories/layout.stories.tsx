import { h } from 'preact';
import { Layout } from '@src/components/layout';
import Panel from '@src/components/panel';
import { Direction, ResizeMode } from '@src/controller/layout';

export default { title: 'Layout' };

export const vertical = () => (
  <Layout height={500}>
    <Panel name="DayName" height={50}>
      <div style="border-bottom: 1px solid #bbb; height: 100%;">DayName Panel</div>
    </Panel>
    <Panel name="Milestone" resizable height={50}>
      <div>Milestone Panel</div>
    </Panel>
    <Panel name="Task" resizable>
      <div>Task Panel</div>
    </Panel>
    <Panel name="All Day" resizable minHeight={30}>
      <div>All Day Panel</div>
    </Panel>
    <Panel name="Time" autoSize={1}>
      <div style="height: 100%; border-bottom: 1px solid #bbb">Time Panel</div>
    </Panel>
    <span>dk</span>
  </Layout>
);

export const horizontal = () => {
  return (
    <Layout direction={Direction.ROW} height={300}>
      <Panel name="Mon" resizable>
        <div>Mon</div>
      </Panel>
      <Panel name="Tue" width={200} resizable>
        <div>Tue</div>
      </Panel>
      <Panel name="Wed" resizable>
        <div>Wed</div>
      </Panel>
      <Panel name="Thu" resizable>
        <div>Thu</div>
      </Panel>
      <Panel name="Fri" resizable>
        <div>Fri</div>
      </Panel>
      <Panel name="Sat" resizable>
        <div>Sat</div>
      </Panel>
      <Panel name="Sun" resizable autoSize={1}>
        <div>Sun</div>
      </Panel>
    </Layout>
  );
};

export const verticalWithOverflow = () => (
  <Layout>
    <Panel name="DayName" height={50} overflowY>
      <div style="border-bottom: 1px solid #bbb; height: 300px;">Overflow-Y Panel</div>
    </Panel>
  </Layout>
);

export const horizontalWithOverflow = () => (
  <Layout direction={Direction.ROW}>
    <Panel name="DayName" width={200} height={200} overflowX>
      <div style="border-right: 1px solid #bbb; width: 300px;">Overflow-X Panel</div>
    </Panel>
  </Layout>
);

export const resizeModeAbsolute = () => (
  <Layout resizeMode={ResizeMode.ABSOLUTE}>
    <Panel name="1" resizable resizerHeight={10}>
      <div style="height: 200px;">Panel 1</div>
    </Panel>
    <Panel name="2" resizable>
      <div style="height: 200px;">Panel 2</div>
    </Panel>
  </Layout>
);
