import { FunctionComponent, h, JSX } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';

import { cls } from '@src/util/cssHelper';
import { toPercent, toPx } from '@src/util/units';
import { Day } from '@src/time/datetime';
import { PanelDispatchStore, UPDATE_SCHEDULE_HEIGHT_MAP } from '@src/components/layout';
import { getPanelEventInfo, getWidth } from '@src/time/panelEvent';

import type { GridInfoList, PanelName } from '@t/panel';
import type { BaseEvent } from '@t/events';

const PANEL_SCHEDULE_WRAPPER_CLASS_NAME = cls('panel-schedule-wrapper');
const PANEL_SCHEDULE_CLASS_NAME = cls('panel-schedule');
const TOTAL_WIDTH = 100;

interface Props {
  name: PanelName;
  gridInfoList: GridInfoList;
  events: BaseEvent[];
  narrowWeekend: boolean;
  eventHeight: number;
  height: number;
  renderedHeightMap: number[];
}

interface EventStyle {
  width: string | number;
  left: string | number;
  top: number;
}

export const PanelEvents: FunctionComponent<Props> = ({
  name,
  gridInfoList,
  events,
  narrowWeekend,
  eventHeight,
  height,
}) => {
  const [renderedEvents, setRenderedEvents] = useState<(JSX.Element | null)[]>([]);
  const dispatch = useContext(PanelDispatchStore);

  useEffect(() => {
    const gridStartDate = gridInfoList[0].getDate();
    const renderedScheduleHeightMap = gridInfoList.map(() => 0);

    const isStartOnPrevWeek = (startDay: number, endDay: number, scheduleStartDate: number) => {
      return startDay > endDay && scheduleStartDate < gridStartDate;
    };
    const isEndOnNextWeek = (startDay: number, endDay: number, scheduleStartDate: number) => {
      return startDay > endDay && scheduleStartDate >= gridStartDate;
    };
    const isOnCurrentWeek = (startDay: number, endDay: number) => {
      return startDay <= endDay;
    };
    const getTop = (start: Day, end: Day) => {
      const validEventHeightMap = renderedScheduleHeightMap.filter(
        (_, index) => start <= index && index <= end
      );

      return Math.max(...validEventHeightMap);
    };
    const getEventStyle = (start: Day, end: Day) => {
      const { widthList, leftList } = getPanelEventInfo({
        gridInfoList,
        narrowWeekend,
        totalWidth: TOTAL_WIDTH,
      });

      return {
        left: toPercent(leftList[start]),
        width: toPercent(getWidth(widthList, start, end)),
        top: getTop(start, end),
      };
    };
    const getScheduleStyle = ({ start, end }: BaseEvent) => {
      const startDate = start.getDate();
      const startDay = start.getDay();
      const endDay = end.getDay();
      let style = {} as EventStyle;

      const updateScheduleMap = (eventStartDay: Day, eventEndDay: Day, top: number) => {
        renderedScheduleHeightMap.forEach((_, index) => {
          if (eventStartDay <= index && index <= eventEndDay) {
            renderedScheduleHeightMap[index] = top + 1;
          }
        });
      };

      if (startDay > endDay && startDate < gridStartDate) {
        style = getEventStyle(Day.SUN, endDay);

        updateScheduleMap(Day.SUN, endDay, style.top);
      }

      if (startDay > endDay && startDate >= gridStartDate) {
        style = getEventStyle(startDay, Day.SAT);

        updateScheduleMap(startDay, Day.SAT, style.top);
      }

      if (startDay <= endDay) {
        style = getEventStyle(startDay, endDay);

        updateScheduleMap(startDay, endDay, style.top);
      }

      return { ...style, top: toPx(style.top * eventHeight) };
    };
    const getMaxRenderedScheduleCount = ({ start, end }: BaseEvent) => {
      const scheduleStartDate = start.getDate();
      const startDay = start.getDay();
      const endDay = end.getDay();
      let renderedScheduleHeight: number[] = [];

      if (startDay > endDay && scheduleStartDate < gridStartDate) {
        renderedScheduleHeight = renderedScheduleHeightMap.filter((_, index) => {
          return Day.SUN <= index && index <= endDay;
        });
      }

      if (startDay > endDay && scheduleStartDate >= gridStartDate) {
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
    const updateScheduleHeightMap = ({ start, end }: BaseEvent) => {
      const scheduleStartDate = start.getDate();
      const startDay = start.getDay();
      const endDay = end.getDay();
      let top: number;

      if (isStartOnPrevWeek(startDay, endDay, scheduleStartDate)) {
        top = getTop(Day.SUN, endDay);
        renderedScheduleHeightMap.forEach((_, index) => {
          if (Day.SUN <= index && index <= endDay) {
            renderedScheduleHeightMap[index] = top;
          }
        });
      }

      if (isEndOnNextWeek(startDay, endDay, scheduleStartDate)) {
        top = getTop(startDay, Day.SAT);
        renderedScheduleHeightMap.forEach((_, index) => {
          if (startDay <= index && index <= Day.SAT) {
            renderedScheduleHeightMap[index] = top;
          }
        });
      }

      if (isOnCurrentWeek(startDay, endDay)) {
        top = getTop(startDay, endDay);
        renderedScheduleHeightMap.forEach((_, index) => {
          if (startDay <= index && index <= endDay) {
            renderedScheduleHeightMap[index] = top;
          }
        });
      }
    };

    setRenderedEvents(
      events.map((event, index) => {
        const maxScheduleCount = getMaxRenderedScheduleCount(event);
        if (height < (maxScheduleCount + 1) * eventHeight) {
          return null;
        }

        const eventStyle = getScheduleStyle(event);
        updateScheduleHeightMap(event);

        // @TODO: change to dayEvent component (using controller/core.ts)
        return (
          <div
            key={`panel-events-${index}`}
            className={PANEL_SCHEDULE_CLASS_NAME}
            style={{ ...eventStyle }}
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
        renderedHeightMap: renderedScheduleHeightMap,
      },
    });
  }, [dispatch, eventHeight, events, gridInfoList, height, name, narrowWeekend]);

  return <div className={PANEL_SCHEDULE_WRAPPER_CLASS_NAME}>{renderedEvents}</div>;
};
