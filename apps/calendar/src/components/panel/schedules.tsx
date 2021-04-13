import { FunctionComponent, h, JSX } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';

import { cls } from '@src/util/cssHelper';
import { toPercent, toPx } from '@src/util/units';
import { PANEL_NAME } from '@src/controller/week';

import type TZDate from '@src/time/date';
import { PanelDispatchStore, UPDATE_SCHEDULE_HEIGHT_MAP } from '@src/components/layout';

const PANEL_SCHEDULE_WRAPPER_CLASS_NAME = cls('panel-schedule-wrapper');
const PANEL_SCHEDULE_CLASS_NAME = cls('panel-schedule');
const DEFAULT_HEIGHT = 20;
const DEFAULT_SCHEDULE_HEIGHT = 20;
const WIDTH_PER_DAY = 100 / 12;

export interface Task {
  start: TZDate;
  end: TZDate;
}

interface Props {
  name: PANEL_NAME;
  gridInfoList: TZDate[];
  events: Task[];
  height?: number;
  scheduleHeight?: number;
}

export enum Day {
  SUN,
  MON,
  TUE,
  WED,
  THU,
  FRI,
  SAT,
}

export const Schedules: FunctionComponent<Props> = ({
  name,
  gridInfoList,
  events,
  height = DEFAULT_HEIGHT,
  scheduleHeight = DEFAULT_SCHEDULE_HEIGHT,
}) => {
  const [renderedSchedules, setRenderedSchedules] = useState<(JSX.Element | null)[]>([]);
  const dispatch = useContext(PanelDispatchStore);

  useEffect(() => {
    const startDate = gridInfoList[0].getDate();
    const renderedScheduleHeightMap = [0, 0, 0, 0, 0, 0, 0];
    const isStartOnPrevWeek = (startDay: number, endDay: number, scheduleStartDate: number) => {
      return startDay > endDay && scheduleStartDate < startDate;
    };
    const isEndOnNextWeek = (startDay: number, endDay: number, scheduleStartDate: number) => {
      return startDay > endDay && scheduleStartDate >= startDate;
    };
    const isOnCurrentWeek = (startDay: number, endDay: number) => {
      return startDay <= endDay;
    };
    const getTop = (start: number, end: number) => {
      const scheduleTopList = renderedScheduleHeightMap.filter(
        (_, index) => start <= index && index <= end
      );

      return Math.max(...scheduleTopList);
    };
    // eslint-disable-next-line complexity
    const getScheduleStyle = ({ start, end }: Task) => {
      const scheduleStartDate = start.getDate();
      const startDay = start.getDay();
      const endDay = end.getDay();
      let style;
      let top: number;

      if (isStartOnPrevWeek(startDay, endDay, scheduleStartDate)) {
        top = getTop(Day.SUN, endDay);
        style = {
          left: 0,
          width: endDay === Day.SAT ? toPercent(100) : toPercent((endDay * 2 + 1) * WIDTH_PER_DAY),
          top: toPx(top * scheduleHeight),
        };
      }

      if (isEndOnNextWeek(startDay, endDay, scheduleStartDate)) {
        top = getTop(startDay, Day.SAT);
        style = {
          left: startDay === Day.SUN ? toPercent(0) : toPercent((2 * startDay - 1) * WIDTH_PER_DAY),
          width:
            startDay === Day.SUN
              ? toPercent(100)
              : toPercent(((7 - startDay) * 2 - 1) * WIDTH_PER_DAY),
          top: toPx(top * scheduleHeight),
        };
      }

      if (isOnCurrentWeek(startDay, endDay)) {
        top = getTop(startDay, endDay);
        style = {
          left: startDay === Day.SUN ? toPercent(0) : toPercent((2 * startDay - 1) * WIDTH_PER_DAY),
          width: toPercent(
            (12 -
              (startDay === Day.SUN ? 0 : 2 * startDay - 1) -
              (endDay === Day.SAT ? 0 : (6 - endDay) * 2 - 1)) *
              WIDTH_PER_DAY
          ),
          top: toPx(top * scheduleHeight),
        };
      }

      return style;
    };
    const getMaxRenderedScheduleCount = ({ start, end }: Task) => {
      const scheduleStartDate = start.getDate();
      const startDay = start.getDay();
      const endDay = end.getDay();
      let renderedScheduleHeight: number[] = [];

      if (startDay > endDay && scheduleStartDate < startDate) {
        renderedScheduleHeight = renderedScheduleHeightMap.filter((_, index) => {
          return Day.SUN <= index && index <= endDay;
        });
      }

      if (startDay > endDay && scheduleStartDate >= startDate) {
        renderedScheduleHeight = renderedScheduleHeightMap.filter((_, index) => {
          return startDay <= index && index <= Day.SAT;
        });
      }

      if (startDay <= endDay) {
        renderedScheduleHeight = renderedScheduleHeightMap.filter((_, index) => {
          return startDay <= index && index <= endDay;
        });
      }

      return Math.max(...renderedScheduleHeight);
    };
    const updateScheduleHeightMap = ({ start, end }: Task) => {
      const scheduleStartDate = start.getDate();
      const startDay = start.getDay();
      const endDay = end.getDay();
      let top: number;

      if (isStartOnPrevWeek(startDay, endDay, scheduleStartDate)) {
        top = getTop(Day.SUN, endDay);
        renderedScheduleHeightMap.forEach((_, index) => {
          if (Day.SUN <= index && index <= endDay) {
            renderedScheduleHeightMap[index] = top + 1;
          }
        });
      }

      if (isEndOnNextWeek(startDay, endDay, scheduleStartDate)) {
        top = getTop(startDay, Day.SAT);
        renderedScheduleHeightMap.forEach((_, index) => {
          if (startDay <= index && index <= Day.SAT) {
            renderedScheduleHeightMap[index] = top + 1;
          }
        });
      }

      if (isOnCurrentWeek(startDay, endDay)) {
        top = getTop(startDay, endDay);
        renderedScheduleHeightMap.forEach((_, index) => {
          if (startDay <= index && index <= endDay) {
            renderedScheduleHeightMap[index] = top + 1;
          }
        });
      }
    };

    setRenderedSchedules(
      events.map((event, index) => {
        const maxScheduleCount = getMaxRenderedScheduleCount(event);
        if (height < (maxScheduleCount + 1) * scheduleHeight) {
          return null;
        }

        const scheduleStyle = getScheduleStyle(event);
        updateScheduleHeightMap(event);

        return (
          <div
            key={`schedule-${index}`}
            className={PANEL_SCHEDULE_CLASS_NAME}
            style={{ ...scheduleStyle }}
          >
            {index}
          </div>
        );
      })
    );

    dispatch({
      type: UPDATE_SCHEDULE_HEIGHT_MAP,
      panelType: name,
      state: {
        renderedScheduleHeightMap,
      },
    });
  }, [dispatch, events, gridInfoList, height, name, scheduleHeight]);

  return <div className={PANEL_SCHEDULE_WRAPPER_CLASS_NAME}>{renderedSchedules}</div>;
};
