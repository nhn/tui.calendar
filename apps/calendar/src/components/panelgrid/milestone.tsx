import { Fragment, FunctionComponent, h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import range from 'tui-code-snippet/array/range';

import { cls } from '@src/util/cssHelper';
import { addDate, Day } from '@src/time/datetime';
import { PanelGrid } from '@src/components/panelgrid/panelgrid';
import { PanelEvents } from '@src/components/panelgrid/panelEvents';
import { isBetween } from '@src/util/math';
import { isEventWithinRange } from '@src/time/panelEvent';
import TZDate from '@src/time/date';
import {
  INIT_STATE,
  PanelDispatchStore,
  PanelStateStore,
  UPDATE_EVENTS,
  UPDATE_MAX_SCHEDULE_HEIGHT_MAP,
} from '@src/components/layout';

import type { MilestoneEvent } from '@t/events';
import type { GridInfoList } from '@t/panel';

const DEFAULT_PANEL_HEIGHT = 20;
const DEFAULT_SCHEDULE_HEIGHT = 20;
const defaultPanelInfoList: TZDate[] = range(0, 7).map((day) => {
  const now = new TZDate();

  return addDate(now, day - now.getDay());
});

interface Props {
  events: MilestoneEvent[];
  gridInfoList?: GridInfoList;
  timesWidth?: number;
  timezonesCount?: number;
}

export const Milestone: FunctionComponent<Props> = ({
  events,
  gridInfoList = defaultPanelInfoList,
  timesWidth = 120,
  timezonesCount = 1,
}) => {
  const columnWidth = timesWidth * timezonesCount;
  const dispatch = useContext(PanelDispatchStore);
  const { milestone } = useContext(PanelStateStore);
  const height = milestone?.height ?? DEFAULT_PANEL_HEIGHT;
  const scheduleHeight = milestone?.scheduleHeight ?? DEFAULT_SCHEDULE_HEIGHT;

  const startDate = gridInfoList[0].getDate();
  const endDate = gridInfoList[gridInfoList.length - 1].getDate();
  const filteredEvents = events.filter((event) => isEventWithinRange(event, startDate, endDate));

  useEffect(() => {
    dispatch({
      type: INIT_STATE,
      panelType: 'milestone',
      state: {
        height: DEFAULT_PANEL_HEIGHT,
        scheduleHeight: DEFAULT_SCHEDULE_HEIGHT,
      },
    });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: UPDATE_EVENTS,
      panelType: 'milestone',
      state: {
        events: filteredEvents,
      },
    });
  }, [dispatch, filteredEvents]);

  useEffect(() => {
    const maxScheduleHeightMap = gridInfoList.map(() => 0);

    const getTop = (start: number, end: number, heightMap: number[]) => {
      const scheduleTopList = heightMap.filter((_, index) => isBetween(index, start, end));

      return Math.max(...scheduleTopList);
    };
    const isStartOnPrevWeek = (startDay: number, endDay: number, scheduleStartDate: number) => {
      return startDay > endDay && scheduleStartDate < startDate;
    };
    const isEndOnNextWeek = (startDay: number, endDay: number, scheduleStartDate: number) => {
      return startDay > endDay && scheduleStartDate >= startDate;
    };
    const isOnCurrentWeek = (startDay: number, endDay: number) => {
      return startDay <= endDay;
    };
    const updateScheduleHeightMap = ({ start, end }: MilestoneEvent, map: number[]) => {
      const scheduleStartDate = start.getDate();
      const startDay = start.getDay();
      const endDay = end.getDay();
      let top: number;

      if (isStartOnPrevWeek(startDay, endDay, scheduleStartDate)) {
        top = getTop(Day.SUN, endDay, map);
        map.forEach((_, index) => {
          if (isBetween(index, Day.SUN, endDay)) {
            map[index] = top + 1;
          }
        });
      }

      if (isEndOnNextWeek(startDay, endDay, scheduleStartDate)) {
        top = getTop(startDay, Day.SAT, map);
        map.forEach((_, index) => {
          if (isBetween(index, startDay, Day.SAT)) {
            map[index] = top + 1;
          }
        });
      }

      if (isOnCurrentWeek(startDay, endDay)) {
        top = getTop(startDay, endDay, map);
        map.forEach((_, index) => {
          if (isBetween(index, startDay, endDay)) {
            map[index] = top + 1;
          }
        });
      }
    };

    filteredEvents.forEach((event) => {
      updateScheduleHeightMap(event, maxScheduleHeightMap);
    });

    dispatch({
      type: UPDATE_MAX_SCHEDULE_HEIGHT_MAP,
      panelType: 'milestone',
      state: {
        maxScheduleHeightMap,
      },
    });
  }, [dispatch, filteredEvents, height, milestone, scheduleHeight, startDate]);

  return (
    <Fragment>
      <div className={cls('panel-title')} style={{ width: columnWidth }}>
        Title
      </div>
      <div className={cls('panel-milestone')}>
        <PanelGrid name="milestone" gridInfoList={gridInfoList} {...milestone} />
        <PanelEvents name="milestone" gridInfoList={gridInfoList} {...milestone} />
      </div>
    </Fragment>
  );
};
