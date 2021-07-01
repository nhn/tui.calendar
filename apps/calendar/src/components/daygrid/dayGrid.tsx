import { FunctionComponent, h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import { CreationGuide } from '@src/components/daygrid/creationGuide';
import Grid from '@src/components/daygrid/grid';
import GridWithMouse from '@src/components/daygrid/gridWithMouse';
import GridEvent from '@src/components/events/gridEvent';
import { useCreationGuide } from '@src/components/hooks/creationGuide';
import { useStore } from '@src/components/hooks/store';
import { useTheme } from '@src/components/hooks/theme';
import Schedule from '@src/model/schedule';
import TZDate from '@src/time/date';
import { toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { cls } from '@src/util/cssHelper';
import { getSize } from '@src/util/dom';
import { getRenderedEventViewModels, isWithinHeight } from '@src/util/gridHelper';
import { convertPxToNum, toPercent } from '@src/util/units';

import { GridGuideInfo } from '@t/components/daygrid/creationGuide';
import { CalendarMonthOption } from '@t/store';

const TOTAL_PERCENT_HEIGHT = 100;

interface DayGridProps {
  options: CalendarMonthOption;
  monthDates: TZDate[][];
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
    monthDates = [],
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
  const gridInfoList = getGridInfoList(monthDates);

  const weeks = monthDates.map((weekDates, rowIndex) => {
    const { viewModels, gridDateEventModelMap } = getRenderedEventViewModels(
      weekDates,
      dataStore,
      narrowWeekend
    );

    const gridEvents = viewModels
      .filter(isWithinHeight(height - headerHeight, eventHeight + eventTopMargin))
      .map((viewModel) => (
        <GridEvent
          viewModel={viewModel}
          key={`month-DayEvent-${viewModel.cid()}`}
          eventHeight={eventHeight}
          headerHeight={headerHeight}
        />
      ));

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
            weekDates={weekDates}
            appContainer={appContainer}
            eventHeight={eventHeight}
            height={height}
          />
          <div className={cls('weekday-schedules')}>{gridEvents}</div>
          <CreationGuide
            creationGuide={creationGuide}
            cells={weekDates}
            narrowWeekend={narrowWeekend}
          />
        </div>
      </div>
    );
  });

  return (
    <GridWithMouse
      onGuideChange={onGuideChange}
      onGuideEnd={onGuideEnd}
      onGuideCancel={onGuideCancel}
      gridInfoList={gridInfoList}
      getMousePositionData={getMousePositionData}
    >
      {weeks}
    </GridWithMouse>
  );
};

export default DayGrid;
