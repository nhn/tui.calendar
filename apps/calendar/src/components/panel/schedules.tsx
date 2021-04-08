import { h, FunctionComponent } from 'preact';

import { cls } from '@src/util/cssHelper';
import { toPercent, toPx } from '@src/util/units';

import type TZDate from '@src/time/date';
import { useEffect } from 'preact/hooks';

const PANEL_SCHEDULE_WRAPPER_CLASS_NAME = cls('panel-schedule-wrapper');
const PANEL_SCHEDULE_CLASS_NAME = cls('panel-schedule');
const DEFAULT_SCHEDULE_HEIGHT = 20;
const WIDTH_PER_DAY = 100 / 12;
let scheduleMap = [0, 0, 0, 0, 0, 0, 0];

export interface Task {
  start: TZDate;
  end: TZDate;
}

interface Props {
  gridInfoList: TZDate[];
  events: Task[];
}

function getTop(start: number, end: number) {
  const scheduleTopList = scheduleMap.filter((_, index) => start <= index && index <= end);

  scheduleMap.forEach((_, index) => {
    if (start <= index && index <= end) {
      scheduleMap[index] += 1;
    }
  });

  return Math.max(...scheduleTopList);
}

function getScheduleStyle({ start, end }: Task, minDate: number) {
  const startDate = start.getDate();
  const startDay = start.getDay();
  const endDay = end.getDay();
  let style;

  if (startDay > endDay && startDate < minDate) {
    style = {
      left: 0,
      width:
        endDay === 6 ? toPercent(12 * WIDTH_PER_DAY) : toPercent((endDay * 2 + 1) * WIDTH_PER_DAY),
      top: toPx(getTop(0, endDay) * DEFAULT_SCHEDULE_HEIGHT),
    };
  }

  if (startDay > endDay && startDate >= minDate) {
    style = {
      left: !startDay ? toPercent(0) : toPercent((2 * startDay - 1) * WIDTH_PER_DAY),
      width: !startDay
        ? toPercent(12 * WIDTH_PER_DAY)
        : toPercent(((7 - startDay) * 2 - 1) * WIDTH_PER_DAY),
      top: toPx(getTop(startDay, 6) * DEFAULT_SCHEDULE_HEIGHT),
    };
  }

  if (startDay <= endDay) {
    style = {
      left: !startDay ? toPercent(0) : toPercent((2 * startDay - 1) * WIDTH_PER_DAY),
      width: toPercent(
        (12 - (!startDay ? 0 : 2 * startDay - 1) - (endDay === 6 ? 0 : (6 - endDay) * 2 - 1)) *
          WIDTH_PER_DAY
      ),
      top: toPx(getTop(startDay, endDay) * DEFAULT_SCHEDULE_HEIGHT),
    };
  }

  return style;
}

export const Schedules: FunctionComponent<Props> = ({ gridInfoList, events }) => {
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

  useEffect(() => {
    scheduleMap = scheduleMap.map(() => 0);
  }, [events]);

  return (
    <div className={PANEL_SCHEDULE_WRAPPER_CLASS_NAME}>
      {events.map(({ start, end }, index) => {
        return (
          <div
            key={`schedule-${index}`}
            className={PANEL_SCHEDULE_CLASS_NAME}
            style={{ ...getScheduleStyle({ start, end }, startDate) }}
          >
            {index}
          </div>
        );
      })}
    </div>
  );
};
