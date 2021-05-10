import { FunctionComponent, h, JSX } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';

import { cls } from '@src/util/cssHelper';
import { toPercent, toPx } from '@src/util/units';
import { Day } from '@src/time/datetime';
import { PanelStateStore, UPDATE_EVENT_HEIGHT_MAP } from '@src/components/layout';
import {
  getGridStyleInfo,
  getWidth,
  isEndOnNextWeek,
  isOnCurrentWeek,
  isStartOnPrevWeek,
} from '@src/time/panelEvent';
import { isBetween } from '@src/util/math';

import type { GridInfoList, PanelName } from '@t/panel';
import type { BaseEvent } from '@t/events';

const TOTAL_WIDTH = 100;

interface Props {
  name: PanelName;
  gridInfoList: GridInfoList;
  events?: BaseEvent[];
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
  events = [],
  narrowWeekend,
  eventHeight,
  height,
}) => {
  const [renderedEvents, setRenderedEvents] = useState<(JSX.Element | null)[]>([]);
  const { dispatch } = useContext(PanelStateStore);

  useEffect(() => {
    const gridStartDate = gridInfoList[0].getDate();
    const renderedHeightMap = gridInfoList.map(() => 0);

    const getTop = (start: Day, end: Day) => {
      const validEventHeightMap = renderedHeightMap.filter((_, index) =>
        isBetween(index, start, end)
      );

      return Math.max(...validEventHeightMap);
    };
    const getEventInfo = (start: Day, end: Day) => {
      const { widthList, leftList } = getGridStyleInfo({
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
    const getEventStyle = ({ start, end }: BaseEvent) => {
      const startDate = start.getDate();
      const startDay = start.getDay();
      const endDay = end.getDay();
      let style = {} as EventStyle;

      const updateEventMap = (eventStartDay: Day, eventEndDay: Day, top: number) => {
        renderedHeightMap.forEach((_, index) => {
          if (isBetween(index, eventStartDay, eventEndDay)) {
            renderedHeightMap[index] = top + 1;
          }
        });
      };

      if (isStartOnPrevWeek(startDay, endDay, startDate, gridStartDate)) {
        style = getEventInfo(Day.SUN, endDay);

        updateEventMap(Day.SUN, endDay, style.top);
      }

      if (isEndOnNextWeek(startDay, endDay, startDate, gridStartDate)) {
        style = getEventInfo(startDay, Day.SAT);

        updateEventMap(startDay, Day.SAT, style.top);
      }

      if (isOnCurrentWeek(startDay, endDay)) {
        style = getEventInfo(startDay, endDay);

        updateEventMap(startDay, endDay, style.top);
      }

      return { ...style, top: toPx(style.top * eventHeight) };
    };
    const getMaxRenderedEventCount = ({ start, end }: BaseEvent) => {
      const eventStartDate = start.getDate();
      const startDay = start.getDay();
      const endDay = end.getDay();
      let renderedEventHeight: number[] = [];

      if (isStartOnPrevWeek(startDay, endDay, eventStartDate, gridStartDate)) {
        renderedEventHeight = renderedHeightMap.filter((_, index) =>
          isBetween(index, Day.SUN, endDay)
        );
      }

      if (isEndOnNextWeek(startDay, endDay, eventStartDate, gridStartDate)) {
        renderedEventHeight = renderedHeightMap.filter((_, index) =>
          isBetween(index, startDay, Day.SAT)
        );
      }

      if (isOnCurrentWeek(startDay, endDay)) {
        renderedEventHeight = renderedHeightMap.filter((_, index) =>
          isBetween(index, startDay, endDay)
        );
      }

      return Math.max(...renderedEventHeight);
    };
    const updateEventHeightMap = ({ start, end }: BaseEvent) => {
      const eventStartDate = start.getDate();
      const startDay = start.getDay();
      const endDay = end.getDay();
      let top: number;

      if (isStartOnPrevWeek(startDay, endDay, eventStartDate, gridStartDate)) {
        top = getTop(Day.SUN, endDay);
        renderedHeightMap.forEach((_, index) => {
          if (isBetween(index, Day.SUN, endDay)) {
            renderedHeightMap[index] = top;
          }
        });
      }

      if (isEndOnNextWeek(startDay, endDay, eventStartDate, gridStartDate)) {
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
        const maxEventCount = getMaxRenderedEventCount(event);
        if (height < (maxEventCount + 1) * eventHeight) {
          return null;
        }

        const eventStyle = getEventStyle(event);
        updateEventHeightMap(event);

        // @TODO: change to dayEvent component (using controller/core.ts)
        return (
          <div
            key={`panel-events-${index}`}
            className={cls('panel-event')}
            style={{ ...eventStyle }}
          >
            {index}
          </div>
        );
      })
    );

    dispatch({
      type: UPDATE_EVENT_HEIGHT_MAP,
      panelType: name,
      state: {
        renderedHeightMap,
      },
    });
  }, [dispatch, eventHeight, events, gridInfoList, height, name, narrowWeekend]);

  return <div className={cls('panel-event-wrapper')}>{renderedEvents}</div>;
};
