import { h, FunctionComponent } from 'preact';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

import { useActions, useStore } from '@src/components/hooks/store';

import Grid from '@src/components/daygrid/grid';
import GridEvents from '@src/components/daygrid/gridEvents';
import GridsWithMouse from '@src/components/daygrid/gridsWithMouse';
import CreationGuide from '@src/components/daygrid/creationGuide';

import { toPercent } from '@src/util/units';
import Schedule from '@src/model/schedule';
import TZDate from '@src/time/date';
import { CalendarMonthOption } from '@t/store';
import { getSize } from '@src/util/domutil';
import { cls } from '@src/util/cssHelper';
import { getRenderedEventViewModels } from '@src/util/gridHelper';
import { CreationGuideInfo } from '@src/components/timegrid';
import { addDate, getStartAndEndDateFromGrid, toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { getLeftWidthByDate } from '@src/controller/month';
import { PopupType } from '@src/modules/layerPopup';
import { GridGuideInfo } from '@t/components/daygrid/creationGuide';

const TOTAL_PERCENT_HEIGHT = 100;

interface DayGridProps {
  options: CalendarMonthOption;
  calendar: TZDate[][];
  appContainer: { current: HTMLDivElement };
  events?: Schedule[];
  useCreationPopup?: boolean;
}

function useGridHeight() {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(getSize(ref.current).height);
  }, []);

  return { ref, height };
}

function useCreationGuide(useCreationPopup = false) {
  const [creationGuide, setCreationGuide] = useState<CreationGuideInfo[]>([]);

  const { show } = useActions('layerPopup');

  const onOpenCreationPopup = useCallback(
    ({ start, end }: { start: TZDate; end: TZDate }) => {
      if (useCreationPopup) {
        show({
          type: PopupType.creation,
          param: {
            start,
            end,
            isAllDay: true,
            popupRect: {
              width: 474,
              height: 272,
              left: 102.695,
              top: 257,
            },
          },
        });
      }
    },
    [show, useCreationPopup]
  );

  const onCreateEvent = ({ start, end }: CreationGuideInfo) => {
    onOpenCreationPopup({ start, end });
    /*
    // @TODO: beforeCreateSchedule 발생
    externalEvent.fire('beforeCreateSchedule', {
      start: guide.start,
      end: guide.end,
      isAllDay: false,
    });
    */
  };
  const onGuideStart = (guide: CreationGuideInfo) => setCreationGuide([...creationGuide, guide]);
  const onGuideEnd = (guide: CreationGuideInfo) => {
    setCreationGuide([...creationGuide, guide]);

    onCreateEvent(guide);
  };
  const onGuideChange = (guide: CreationGuideInfo) => {
    setCreationGuide([...creationGuide, guide]);
  };
  const onGuideCancel = () => setCreationGuide([]);

  return {
    creationGuide,
    onGuideStart,
    onGuideEnd,
    onGuideChange,
    onGuideCancel,
  };
}

function renderCreationGuide(
  creationGuide: CreationGuideInfo[],
  startDate: TZDate,
  endDate: TZDate
) {
  if (!creationGuide.length) {
    return null;
  }

  return creationGuide.map((guide, index) => {
    const { start, end } = guide;
    const { left, width } = getLeftWidthByDate(start, end, startDate, endDate);

    return width > 0 ? (
      <CreationGuide
        key={`month-creation-guide-${index}`}
        {...creationGuide}
        left={left}
        width={width}
      />
    ) : null;
  });
}

function getGridInfoList(calendar: TZDate[][]): GridGuideInfo[][] {
  return calendar.map((week) =>
    week.map((day, index) => {
      const start = toStartOfDay(addDate(day, index - day.getDay()));
      const end = toEndOfDay(start);

      return {
        start,
        end,
        unit: 'date',
        slot: 1,
      } as GridGuideInfo;
    })
  );
}

const DayGrid: FunctionComponent<DayGridProps> = (props) => {
  const { options, calendar = [], appContainer, useCreationPopup = false } = props;
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

  return (
    <GridsWithMouse
      onGuideStart={onGuideStart}
      onGuideChange={onGuideChange}
      onGuideEnd={onGuideEnd}
      onGuideCancel={onGuideCancel}
      gridInfoList={gridInfoList}
    >
      {calendar.map((week, rowIndex) => {
        const { viewModels, gridDateEventModelMap } = getRenderedEventViewModels(
          week,
          dataStore,
          narrowWeekend
        );
        const { start: gridStart, end: gridEnd } = getStartAndEndDateFromGrid(week);

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
                index={rowIndex}
              />
              <GridEvents
                name="month"
                cells={week}
                events={viewModels}
                height={height}
                narrowWeekend={narrowWeekend}
                eventHeight={eventHeight}
                className={cls('weekday-schedules')}
              />
              {renderCreationGuide(creationGuide, gridStart, gridEnd)}
            </div>
          </div>
        );
      })}
    </GridsWithMouse>
  );
};

export default DayGrid;
