import { h, FunctionComponent } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import { useActions, useStore } from '@src/components/hooks/store';

import Grid from '@src/components/daygrid/grid';
import GridEvents from '@src/components/daygrid/gridEvents';
import GridWithMouse from '@src/components/daygrid/gridWithMouse';
import CreationGuide from '@src/components/daygrid/creationGuide';

import { toPercent } from '@src/util/units';
import Schedule from '@src/model/schedule';
import TZDate from '@src/time/date';
import { CalendarMonthOption } from '@t/store';
import { getSize } from '@src/util/dom';
import { cls } from '@src/util/cssHelper';
import { getLeftAndWidth, getRenderedEventViewModels } from '@src/util/gridHelper';
import { toEndOfDay, toStartOfDay } from '@src/time/datetime';
import { PopupType } from '@src/modules/layerPopup';
import { GridGuideInfo } from '@t/components/daygrid/creationGuide';
import { GridGuideCreationInfo } from '@t/components/daygrid/gridWithMouse';

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

function useCreationGuide(useCreationPopup = false) {
  const [creationGuide, setCreationGuide] = useState<GridGuideCreationInfo | null>(null);
  const [popupFlag, setPopupFlag] = useState(false);

  const { show, hide } = useActions('layerPopup');

  const onOpenCreationPopup = (guide: GridGuideCreationInfo) => {
    if (useCreationPopup) {
      const { start, end } = guide;

      // @TODO: popupRect 계산 필요
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
          close: () => {
            onGuideCancel();
            setPopupFlag(false);
          },
        },
      });

      if (!popupFlag) {
        setPopupFlag(true);
      }
    }
  };

  const onGuideStart = (guide: GridGuideCreationInfo | null) => {
    setCreationGuide(guide);
  };
  const onGuideEnd = (guide: GridGuideCreationInfo | null) => {
    setCreationGuide(guide);

    if (guide) {
      onOpenCreationPopup(guide);
    } else if (!guide && popupFlag) {
      hide();
    }
  };
  const onGuideChange = (guide: GridGuideCreationInfo) => {
    setCreationGuide(guide);
  };
  const onGuideCancel = () => setCreationGuide(null);

  return {
    creationGuide,
    onGuideStart,
    onGuideEnd,
    onGuideChange,
    onGuideCancel,
  };
}

function renderCreationGuide(
  creationGuide: GridGuideCreationInfo,
  cells: TZDate[],
  narrowWeekend: boolean
) {
  const { start, end } = creationGuide;
  const { left, width } = getLeftAndWidth(start, end, cells, narrowWeekend);

  return width > 0 ? <CreationGuide {...creationGuide} left={left} width={width} /> : null;
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
    getMousePositionData = () => null,
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

  const {
    schedule: monthScheduleTheme,
    daygrid: { cell, cellBar },
  } = theme.month;
  const eventHeight = parseFloat(monthScheduleTheme.height);
  const eventTopMargin = parseFloat(monthScheduleTheme.marginTop);
  const headerHeight = parseFloat(cell.paddingTop) + parseFloat(cellBar.height);
  const gridInfoList = getGridInfoList(calendar);

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
                eventTopMargin={eventTopMargin}
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
