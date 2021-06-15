import { h, FunctionComponent } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import { useStore } from '@src/components/hooks/store';
import Grid from '@src/components/daygrid/grid';
import GridEvents from '@src/components/daygrid/gridEvents';
import GridWithMouse from '@src/components/daygrid/gridWithMouse';
import { renderCreationGuide } from '@src/components/daygrid/creationGuide';
import { toPercent } from '@src/util/units';
import Schedule from '@src/model/schedule';
import TZDate from '@src/time/date';
import { getSize } from '@src/util/dom';
import { cls } from '@src/util/cssHelper';
import { getRenderedEventViewModels } from '@src/util/gridHelper';
import { toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { useCreationGuide } from '@src/components/hooks/creationGuide';
import { nullFn } from '@src/util';

import { CalendarMonthOption } from '@t/store';
import { GridGuideInfo } from '@t/components/daygrid/creationGuide';

const TOTAL_PERCENT_HEIGHT = 100;

interface DayGridProps {
  options: CalendarMonthOption;
  calendar: TZDate[][];
  appContainer: { current: HTMLDivElement };
  events?: Schedule[];
  useCreationPopup?: boolean;
  getMousePositionData?: (e: MouseEvent) => MousePositionData | null;
}

function useGridHeight() {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(getSize(ref.current).height);
  }, []);

  return { ref, height };
}

function getGridInfoList(calendar: TZDate[][]): GridGuideInfo[][] {
  return calendar.map<GridGuideInfo[]>((week) =>
    week.map<GridGuideInfo>((day) => {
      const start = toStartOfDay(day);
      const end = toEndOfDay(start);

      return {
        start,
        end,
      };
    })
  );
}

const DayGrid: FunctionComponent<DayGridProps> = (props) => {
  const {
    options,
    calendar = [],
    appContainer,
    useCreationPopup = false,
    getMousePositionData = nullFn,
  } = props;
  const { visibleWeeksCount, workweek, startDayOfWeek, narrowWeekend } = options;

  const { ref, height } = useGridHeight();

  const {
    creationGuide,
    onGuideStart,
    onGuideChange,
    onGuideEnd,
    onGuideCancel,
  } = useCreationGuide(useCreationPopup);

  const rowHeight =
    TOTAL_PERCENT_HEIGHT / Math.max(visibleWeeksCount === 0 ? 6 : visibleWeeksCount, 1);

  const {
    state: { dataStore, theme },
  } = useStore(['dataStore', 'theme']);

  if (!theme || !dataStore) {
    return null;
  }

  const { schedule: monthScheduleTheme } = theme.month;
  const eventHeight = parseFloat(monthScheduleTheme.height);
  const gridInfoList = getGridInfoList(calendar);
  // @TODO: 테마에서 값 가져와서 설정
  const headerHeight = 31;

  return (
    <GridWithMouse
      onGuideStart={onGuideStart}
      onGuideChange={onGuideChange}
      onGuideEnd={onGuideEnd}
      onGuideCancel={onGuideCancel}
      gridInfoList={gridInfoList}
      getMousePositionData={getMousePositionData}
    >
      {calendar.map((week, rowIndex) => {
        const { viewModels, gridDateEventModelMap } = getRenderedEventViewModels(
          week,
          dataStore,
          narrowWeekend
        );

        return (
          <div
            key={`dayGrid-events-${rowIndex}`}
            className={cls('month-week-item')}
            style={{ height: toPercent(rowHeight) }}
            ref={ref}
          >
            <div className={cls('weekday')}>
              <Grid
                cssHeight={toPercent(TOTAL_PERCENT_HEIGHT)}
                gridDateEventModelMap={gridDateEventModelMap}
                workweek={workweek}
                startDayOfWeek={startDayOfWeek}
                narrowWeekend={narrowWeekend}
                calendar={week}
                appContainer={appContainer}
                eventHeight={eventHeight}
                height={height}
              />
              <GridEvents
                name="month"
                cells={week}
                events={viewModels}
                height={height}
                narrowWeekend={narrowWeekend}
                eventHeight={eventHeight}
                className={cls('weekday-schedules')}
                headerHeight={headerHeight}
              />
              {creationGuide ? renderCreationGuide(creationGuide, week, narrowWeekend) : null}
            </div>
          </div>
        );
      })}
    </GridWithMouse>
  );
};

export default DayGrid;
