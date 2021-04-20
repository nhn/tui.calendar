import { FunctionComponent, h, JSX } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';

import { cls } from '@src/util/cssHelper';
import { toPercent, toPx } from '@src/util/units';
import { Day } from '@src/time/datetime';
import { PanelDispatchStore, UPDATE_SCHEDULE_HEIGHT_MAP } from '@src/components/layout';
import { getPanelEventInfo, getWidth } from '@src/time/panelEvent';

import type { GridInfoList, PanelName } from '@t/panel';
import type { BaseEvent } from '@t/events';
import { isBetween } from '@src/util/math';

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
    const renderedHeightMap = gridInfoList.map(() => 0);

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
      const validEventHeightMap = renderedHeightMap.filter((_, index) =>
        isBetween(index, start, end)
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
        renderedHeightMap.forEach((_, index) => {
          if (isBetween(index, eventStartDay, eventEndDay)) {
            renderedHeightMap[index] = top + 1;
          }
        });
      };

      if (isStartOnPrevWeek(startDay, endDay, startDate)) {
        style = getEventStyle(Day.SUN, endDay);

        updateScheduleMap(Day.SUN, endDay, style.top);
      }

      if (isEndOnNextWeek(startDay, endDay, startDate)) {
        style = getEventStyle(startDay, Day.SAT);

        updateScheduleMap(startDay, Day.SAT, style.top);
      }

      if (isOnCurrentWeek(startDay, endDay)) {
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

      if (isStartOnPrevWeek(startDay, endDay, scheduleStartDate)) {
        renderedScheduleHeight = renderedHeightMap.filter((_, index) =>
          isBetween(index, Day.SUN, endDay)
        );
      }

      if (isEndOnNextWeek(startDay, endDay, scheduleStartDate)) {
        renderedScheduleHeight = renderedHeightMap.filter((_, index) =>
          isBetween(index, startDay, Day.SAT)
        );
      }

      if (isOnCurrentWeek(startDay, endDay)) {
        renderedScheduleHeight = renderedHeightMap.filter((_, index) =>
          isBetween(index, startDay, endDay)
        );
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
        renderedHeightMap.forEach((_, index) => {
          if (isBetween(index, Day.SUN, endDay)) {
            renderedHeightMap[index] = top;
          }
        });
      }

      if (isEndOnNextWeek(startDay, endDay, scheduleStartDate)) {
        top = getTop(startDay, Day.SAT);
        renderedHeightMap.forEach((_, index) => {
          if (isBetween(index, startDay, Day.SAT)) {
            renderedHeightMap[index] = top;
          }
        });
      }

      if (isOnCurrentWeek(startDay, endDay)) {
        top = getTop(startDay, endDay);
        renderedHeightMap.forEach((_, index) => {
          if (isBetween(index, startDay, endDay)) {
            renderedHeightMap[index] = top;
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
        renderedHeightMap,
      },
    });
  }, [dispatch, eventHeight, events, gridInfoList, height, name, narrowWeekend]);

  return <div className={PANEL_SCHEDULE_WRAPPER_CLASS_NAME}>{renderedEvents}</div>;
};
