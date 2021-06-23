import { h, FunctionComponent } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import { useStore } from '@src/components/hooks/store';
import Grid from '@src/components/daygrid/grid';
import GridEvents from '@src/components/daygrid/gridEvents';
import GridWithMouse from '@src/components/daygrid/gridWithMouse';
import { CreationGuide } from '@src/components/daygrid/creationGuide';
import { convertPxToNum, toPercent } from '@src/util/units';
import Schedule from '@src/model/schedule';
import TZDate from '@src/time/date';
import { getSize } from '@src/util/dom';
import { cls } from '@src/util/cssHelper';
import { getRenderedEventViewModels } from '@src/util/gridHelper';
import { toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { useCreationGuide } from '@src/components/hooks/creationGuide';

import { CalendarMonthOption } from '@t/store';
import { GridGuideInfo } from '@t/components/daygrid/creationGuide';
import { useTheme } from '@src/components/hooks/theme';

const TOTAL_PERCENT_HEIGHT = 100;

interface DayGridProps {
  options: CalendarMonthOption;
  calendar: TZDate[][];
  appContainer: { current: HTMLDivElement };
  events?: Schedule[];
  shouldRenderDefaultPopup?: boolean;
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
    shouldRenderDefaultPopup = false,
    getMousePositionData = () => null,
  } = props;
  const { visibleWeeksCount, workweek, startDayOfWeek, narrowWeekend } = options;

  const { ref, height } = useGridHeight();

  const { creationGuide, onGuideChange, onGuideEnd, onGuideCancel } = useCreationGuide(
    shouldRenderDefaultPopup
  );

  const rowHeight =
    TOTAL_PERCENT_HEIGHT / Math.max(visibleWeeksCount === 0 ? 6 : visibleWeeksCount, 1);

  const { state: dataStore } = useStore('dataStore');
  const theme = useTheme();

  if (!theme || !dataStore) {
    return null;
  }

  const {
    schedule: monthScheduleTheme,
    daygrid: { cell, cellBar },
  } = theme.month;
  const eventHeight = convertPxToNum(monthScheduleTheme.height);
  const eventTopMargin = convertPxToNum(monthScheduleTheme.marginTop);
  const headerHeight = convertPxToNum(cell.paddingTop) + convertPxToNum(cellBar.height);
  const gridInfoList = getGridInfoList(calendar);

  return (
    <GridWithMouse
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
                eventTopMargin={eventTopMargin}
              />
              <CreationGuide
                creationGuide={creationGuide}
                cells={week}
                narrowWeekend={narrowWeekend}
              />
            </div>
          </div>
        );
      })}
    </GridWithMouse>
  );
};

export default DayGrid;
