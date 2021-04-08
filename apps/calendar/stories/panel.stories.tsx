import { h, RenderableProps } from 'preact';

import { cls } from '@src/util/cssHelper';
import { Milestone } from '@src/components/panel/milestone';
import { ScheduleData } from '@src/model';
import { addDate, toStartOfDay } from '@src/time/datetime';
import TZDate from '@src/time/date';
import Schedule from '@src/model/schedule';

interface WrapperProps {
  style?: Record<string, any>;
  position: string;
  height: string;
}

export default { title: 'Panel' };

function Wrapper({ children, style, position, height }: RenderableProps<WrapperProps>) {
  return (
    <div className={cls('layout')} style={{ position, height, ...style }}>
      {children}
    </div>
  );
}

Wrapper.defaultProps = {
  position: 'relative',
  height: '500px',
};

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
    <Wrapper>
      <Milestone events={data} />
    </Wrapper>
  );
};

milestone.story = {
  name: 'milestone',
};
