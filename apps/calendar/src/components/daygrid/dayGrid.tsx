import { FunctionComponent, h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import { CreationGuide } from '@src/components/daygrid/creationGuide';
import Grid from '@src/components/daygrid/grid';
import GridEvents from '@src/components/daygrid/gridEvents';
import GridWithMouse from '@src/components/daygrid/gridWithMouse';
import { useCreationGuide } from '@src/components/hooks/creationGuide';
import { useStore } from '@src/components/hooks/store';
import { useTheme } from '@src/components/hooks/theme';
import Schedule from '@src/model/schedule';
import TZDate from '@src/time/date';
import { toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { cls } from '@src/util/cssHelper';
import { getSize } from '@src/util/dom';
import { getRenderedEventViewModels } from '@src/util/gridHelper';
import { convertPxToNum, toPercent } from '@src/util/units';

import { GridGuideInfo } from '@t/components/daygrid/creationGuide';
import { CalendarMonthOption } from '@t/store';

const TOTAL_PERCENT_HEIGHT = 100;

interface Props {
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

const DayGrid: FunctionComponent<Props> = (props) => {
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

  const { state: calendarData } = useStore('calendarData');
  const theme = useTheme();

  if (!theme || !calendarData) {
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
          calendarData,
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
