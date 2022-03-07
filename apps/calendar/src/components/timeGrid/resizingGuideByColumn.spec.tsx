import { h } from 'preact';
import { useRef, useState } from 'preact/hooks';

import { ResizingGuideByColumn } from '@src/components/timeGrid/resizingGuideByColumn';
import { createGridPositionFinder, createTimeGridData, getWeekDates } from '@src/helpers/grid';
import { createDate } from '@src/test/helpers';
import { render } from '@src/test/utils';
import { Day } from '@src/time/datetime';
import { noop } from '@src/utils/noop';

import { GridPositionFinder } from '@t/grid';

// @TODO: implement or delete @adhrinae
// eslint-disable-next-line jest/no-disabled-tests
describe.skip('ResizingGuideByColumn', () => {
  const rows = getWeekDates(createDate(2021, 2, 14), {
    startDayOfWeek: Day.SUN,
  });
  const timeGridData = createTimeGridData(rows, { hourStart: 0, hourEnd: 24 });
  const DEFAULT_CONTAINER_WIDTH = 70;
  const DEFAULT_CONTAINER_HEIGHT = 480;

  const setup = () => {
    const container = document.createElement('div');
    container.setAttribute('data-testid', 'container');
    document.body.appendChild(container);

    const Component = () => {
      const containerRef = useRef<HTMLDivElement>();
      const [gridPositionFinder, setGridPositionFinder] = useState<GridPositionFinder>(() => null);

      return (
        <div
          data-testid="container"
          ref={(node) => {
            if (node) {
              jest.spyOn(node, 'getBoundingClientRect').mockReturnValue({
                x: 0,
                y: 0,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: DEFAULT_CONTAINER_WIDTH,
                height: DEFAULT_CONTAINER_HEIGHT,
                toJSON: noop,
              });

              containerRef.current = node;
              setGridPositionFinder(
                createGridPositionFinder({
                  rowsCount: timeGridData.rows.length,
                  columnsCount: timeGridData.columns.length,
                  container: node,
                })
              );
            }
          }}
        >
          <ResizingGuideByColumn gridPositionFinder={gridPositionFinder} />
        </div>
      );
    };

    return render(<Component />);
  };
});
