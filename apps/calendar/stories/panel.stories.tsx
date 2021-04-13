import { h } from 'preact';

import { Milestone } from '@src/components/panel/milestone';
import { addDate, toStartOfDay } from '@src/time/datetime';
import TZDate from '@src/time/date';
import { Layout } from '@src/components/layout';
import Panel from '@src/components/panel';

export default { title: 'Panel' };

interface Task {
  start: TZDate;
  end: TZDate;
}

export const milestone = () => {
  const start = toStartOfDay(new TZDate());
  const data: Task[] = [
    {
      start,
      end: addDate(start, 1),
    },
    {
      start,
      end: addDate(start, 2),
    },
    {
      start: addDate(start, 2),
      end: addDate(start, 4),
    },
    {
      start: addDate(start, 5),
      end: addDate(start, 6),
    },
  ];

  return (
    <Layout height={500}>
      <Panel name="milestone" resizable minHeight={20}>
        <Milestone events={data} />
      </Panel>
    </Layout>
  );
};

milestone.storyName = 'milestone';
