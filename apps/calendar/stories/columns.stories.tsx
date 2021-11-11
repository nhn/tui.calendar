import { h, RenderableProps } from 'preact';

import range from 'tui-code-snippet/array/range';

import { Column } from '@src/components/timeGrid/column';
import { cls } from '@src/helpers/css';
import TZDate from '@src/time/date';
import {
  addHours,
  addMinutes,
  addMonth,
  toFormat,
  toStartOfDay,
  toStartOfYear,
} from '@src/time/datetime';

import { TimeGridSelectionInfo } from '@t/components/timeGrid/gridSelection';
import { EventModelData } from '@t/events';

import { createEventModels } from '@stories/helper/event';

export default { title: 'Column' };

interface WrapperProps {
  width: number;
  position: string;
}

function Wrapper({ children, position }: RenderableProps<WrapperProps>) {
  return (
    <div className={cls('layout')} style={{ position }}>
      {children}
    </div>
  );
}
Wrapper.defaultProps = {
  position: 'relative',
  width: 200,
};

function renderGridlineChild(time: TZDate) {
  return <span>{toFormat(time, 'HH:mm')}</span>;
}

export const oneDay = () => (
  <Wrapper>
    <Column renderGridlineChild={renderGridlineChild} />
  </Wrapper>
);

export const backgroundEvents = () => {
  const start = toStartOfDay(new TZDate());
  start.setHours(8);

  const data: EventModelData[] = [
    {
      category: 'background',
      start,
      end: addHours(start, 1),
      bgColor: 'rgba(100, 100, 100, .3)',
    },
    {
      category: 'background',
      start: addMinutes(start, 150),
      end: addHours(start, 3),
      bgColor: 'rgba(200, 100, 100, .3)',
    },
    {
      category: 'background',
      start: addHours(start, 4),
      end: addHours(start, 6),
      bgColor: 'rgba(100, 200, 100, .3)',
    },
  ];
  const events = createEventModels(data);

  return (
    <Wrapper>
      <Column events={events} renderGridlineChild={renderGridlineChild} />
    </Wrapper>
  );
};

export const showOnlyBusinessHours = () => {
  const start = toStartOfDay(new TZDate());
  start.setHours(12);

  const data: EventModelData[] = [
    {
      category: 'background',
      start,
      end: addHours(start, 1),
      bgColor: 'rgba(0, 150, 100, .3)',
    },
  ];

  const events = createEventModels(data);

  return (
    <Wrapper>
      <Column start={9} end={18} events={events} renderGridlineChild={renderGridlineChild} />
    </Wrapper>
  );
};
showOnlyBusinessHours.story = {
  name: 'Show only business hours',
};

export const highlightBusinessHours = () => {
  const start = toStartOfDay(new TZDate());
  start.setHours(9);

  const data: EventModelData[] = [
    {
      category: 'background',
      start,
      end: addHours(start, 9),
      bgColor: 'rgba(0, 150, 100, .3)',
    },
  ];

  const events = createEventModels(data);

  return (
    <Wrapper>
      <Column events={events} renderGridlineChild={renderGridlineChild} />
    </Wrapper>
  );
};
highlightBusinessHours.story = {
  name: 'Highlight business hours',
};

export const highlightOffHours = () => {
  const start = toStartOfDay(new TZDate());
  const data: EventModelData[] = [
    {
      category: 'background',
      start,
      end: addHours(start, 9),
      bgColor: 'rgba(100, 100, 100, .3)',
    },
    {
      category: 'background',
      start: addHours(start, 18),
      end: addHours(start, 24),
      bgColor: 'rgba(100, 100, 100, .3)',
    },
  ];

  const events = createEventModels(data);

  return (
    <Wrapper>
      <Column events={events} renderGridlineChild={renderGridlineChild} />
    </Wrapper>
  );
};
highlightOffHours.story = {
  name: 'Highlight off-hours',
};

export const monthsInAnYear = () => {
  const startOfYear = toStartOfYear(new TZDate());
  const times = range(0, 13).map((m) => addMonth(startOfYear, m));

  const data: EventModelData[] = [
    {
      category: 'background',
      start: startOfYear,
      end: addMonth(startOfYear, 2),
      bgColor: 'rgba(80, 188, 223, .3)',
    },
    {
      category: 'background',
      start: addMonth(startOfYear, 2),
      end: addMonth(startOfYear, 5),
      bgColor: 'rgba(247, 230, 0, .3)',
    },
    {
      category: 'background',
      start: addMonth(startOfYear, 5),
      end: addMonth(startOfYear, 8),
      bgColor: 'rgba(0, 73, 140, .6)',
    },
    {
      category: 'background',
      start: addMonth(startOfYear, 8),
      end: addMonth(startOfYear, 11),
      bgColor: 'rgba(198, 124, 0, .6)',
    },
    {
      category: 'background',
      start: addMonth(startOfYear, 11),
      end: addMonth(startOfYear, 12),
      bgColor: 'rgba(80, 188, 223, .3)',
    },
  ];

  const events = createEventModels(data);

  return (
    <Wrapper>
      <Column
        unit="date"
        slot={15}
        times={times}
        events={events}
        renderGridlineChild={(time) => {
          return <span>{toFormat(time, 'MM.DD')}</span>;
        }}
      />
    </Wrapper>
  );
};
monthsInAnYear.story = {
  name: 'Months in an year',
};

export const columnHasBackgroundColor = () => {
  const backgroundColor = 'rgba(81, 92, 230, 0.05)';

  return (
    <Wrapper>
      <Column backgroundColor={backgroundColor} />
    </Wrapper>
  );
};
columnHasBackgroundColor.story = {
  name: 'Column has background color',
};

export const gridSelectionWithTop = () => {
  const start = toStartOfDay(new TZDate());
  const gridSelection: TimeGridSelectionInfo = {
    start: addHours(start, 2),
    end: addHours(start, 5),
    unit: 'minute',
  };

  return (
    <Wrapper>
      <Column width="100px" gridSelection={gridSelection} />
    </Wrapper>
  );
};
gridSelectionWithTop.story = {
  name: 'Grid selection(text on top)',
};

export const gridSelectionWithBottom = () => {
  const start = toStartOfDay(new TZDate());
  const gridSelection: TimeGridSelectionInfo = {
    start: addHours(start, 3),
    end: addHours(start, 6),
    unit: 'minute',
    textPosition: 'bottom',
  };

  return (
    <Wrapper>
      <Column width="100px" gridSelection={gridSelection} />
    </Wrapper>
  );
};
gridSelectionWithBottom.story = {
  name: 'Grid selection(text on bottom)',
};
