import { h, FunctionComponent } from 'preact';

import { cls } from '@src/util/cssHelper';
import { toPercent, toPx } from '@src/util/units';

import type TZDate from '@src/time/date';

const PANEL_SCHEDULE_WRAPPER_CLASS_NAME = cls('panel-schedule-wrapper');
const PANEL_SCHEDULE_CLASS_NAME = cls('panel-schedule');
const DEFAULT_SCHEDULE_HEIGHT = 20;
const WIDTH_PER_DAY = 100 / 12;

export interface Task {
  start: TZDate;
  end: TZDate;
}

interface Props {
  gridInfoList: TZDate[];
  events: Task[];
}

function getTop(start: number, end: number, scheduleHeightMap: number[]) {
  const scheduleTopList = scheduleHeightMap.filter((_, index) => start <= index && index <= end);

  return Math.max(...scheduleTopList);
}

// eslint-disable-next-line complexity
function getScheduleStyle({ start, end }: Task, minDate: number, scheduleHeightMap: number[]) {
  const startDate = start.getDate();
  const startDay = start.getDay();
  const endDay = end.getDay();
  let style;
  let top: number;

  if (startDay > endDay && startDate < minDate) {
    top = getTop(0, endDay, scheduleHeightMap);
    style = {
      left: 0,
      width:
        endDay === 6 ? toPercent(12 * WIDTH_PER_DAY) : toPercent((endDay * 2 + 1) * WIDTH_PER_DAY),
      top: toPx(top * DEFAULT_SCHEDULE_HEIGHT),
    };

    scheduleHeightMap.forEach((_, index) => {
      if (index >= 0 && index <= endDay) {
        scheduleHeightMap[index] = top + 1;
      }
    });
  }

  if (startDay > endDay && startDate >= minDate) {
    top = getTop(startDay, 6, scheduleHeightMap);
    style = {
      left: !startDay ? toPercent(0) : toPercent((2 * startDay - 1) * WIDTH_PER_DAY),
      width: !startDay
        ? toPercent(12 * WIDTH_PER_DAY)
        : toPercent(((7 - startDay) * 2 - 1) * WIDTH_PER_DAY),
      top: toPx(top * DEFAULT_SCHEDULE_HEIGHT),
    };

    scheduleHeightMap.forEach((_, index) => {
      if (index >= startDay && index <= 6) {
        scheduleHeightMap[index] = top + 1;
      }
    });
  }

  if (startDay <= endDay) {
    top = getTop(startDay, endDay, scheduleHeightMap);
    style = {
      left: !startDay ? toPercent(0) : toPercent((2 * startDay - 1) * WIDTH_PER_DAY),
      width: toPercent(
        (12 - (!startDay ? 0 : 2 * startDay - 1) - (endDay === 6 ? 0 : (6 - endDay) * 2 - 1)) *
          WIDTH_PER_DAY
      ),
      top: toPx(top * DEFAULT_SCHEDULE_HEIGHT),
    };

    scheduleHeightMap.forEach((_, index) => {
      if (index >= startDay && index <= endDay) {
        scheduleHeightMap[index] = top + 1;
      }
    });
  }

  return style;
}

export const Schedules: FunctionComponent<Props> = ({ gridInfoList, events }) => {
  const scheduleHeightMap = [0, 0, 0, 0, 0, 0, 0];
  const startDate = gridInfoList[0].getDate();
  const endDate = gridInfoList[gridInfoList.length - 1].getDate();
  const isDayView = gridInfoList.length === 1;
  events = events.filter((event) => {
    const eventStartDate = event.start.getDate();
    const eventEndDate = event.end.getDate();

    return (
      (startDate <= eventStartDate && eventStartDate <= endDate) ||
      (startDate <= eventEndDate && eventEndDate <= endDate)
    );
  });

  return (
    <div className={PANEL_SCHEDULE_WRAPPER_CLASS_NAME}>
      {events.map(({ start, end }, index) => {
        const scheduleStyle = getScheduleStyle({ start, end }, startDate, scheduleHeightMap);

        return (
          <div
            key={`schedule-${index}`}
            className={PANEL_SCHEDULE_CLASS_NAME}
            style={{ ...scheduleStyle }}
          >
            {index}
          </div>
        );
      })}
    </div>
  );
};
