import { h, FunctionComponent } from 'preact';

import { cls } from '@src/util/cssHelper';
import { toPercent, toPx } from '@src/util/units';
import { Day } from '@src/time/datetime';
import { getGridStyleInfo, getWidth, isValidEvents } from '@src/time/panelEvent';

import type { GridInfoList } from '@t/panel';
import type { BaseEvent } from '@t/events';

const TOTAL_WIDTH = 100;

interface Props {
  gridInfoList: GridInfoList;
  events: BaseEvent[];
  narrowWeekend: boolean;
  eventHeight: number;
}

interface EventStyle {
  width: string | number;
  left: string | number;
  top: number;
}

function getTop(start: Day, end: Day, scheduleHeightMap: number[]): number {
  const scheduleTopList = scheduleHeightMap.filter((_, index) => start <= index && index <= end);

  return Math.max(...scheduleTopList);
}

export const PanelEvents: FunctionComponent<Props> = ({
  gridInfoList,
  events,
  narrowWeekend,
  eventHeight,
}) => {
  const { widthList, leftList } = getGridStyleInfo({
    gridInfoList,
    narrowWeekend,
    totalWidth: TOTAL_WIDTH,
  });

  const scheduleHeightMap = gridInfoList.map(() => 0);
  const weekStartDate = gridInfoList[0].getDate();
  const filteredEvents = events.filter((event) => isValidEvents(event, gridInfoList));

  const getEventStyle = (start: Day, end: Day) => {
    return {
      left: toPercent(leftList[start]),
      width: toPercent(getWidth(widthList, start, end)),
      top: getTop(start, end, scheduleHeightMap),
    };
  };
  const updateScheduleMap = (start: Day, end: Day, top: number) => {
    scheduleHeightMap.forEach((_, index) => {
      if (start <= index && index <= end) {
        scheduleHeightMap[index] = top + 1;
      }
    });
  };
  const getScheduleStyle = ({ start, end }: BaseEvent, minDate: number) => {
    const startDate = start.getDate();
    const startDay = start.getDay();
    const endDay = end.getDay();
    let style = {} as EventStyle;

    if (startDay > endDay && startDate < minDate) {
      style = getEventStyle(Day.SUN, endDay);

      updateScheduleMap(Day.SUN, endDay, style.top);
    }

    if (startDay > endDay && startDate >= minDate) {
      style = getEventStyle(startDay, Day.SAT);

      updateScheduleMap(startDay, Day.SAT, style.top);
    }

    if (startDay <= endDay) {
      style = getEventStyle(startDay, endDay);

      updateScheduleMap(startDay, endDay, style.top);
    }

    return { ...style, top: toPx(style.top * eventHeight) };
  };

  const renderEvents = () =>
    filteredEvents.map((event, index) => {
      // @TODO: change to dayEvent component (using controller/core.ts)
      return (
        <div
          key={`panel-event-${index}`}
          className={cls('panel-event')}
          style={{ ...getScheduleStyle(event, weekStartDate) }}
        >
          {index}
        </div>
      );
    });

  return <div className={cls('panel-event-wrapper')}>{renderEvents()}</div>;
};
