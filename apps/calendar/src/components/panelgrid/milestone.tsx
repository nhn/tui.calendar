import { Fragment, FunctionComponent, h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import range from 'tui-code-snippet/array/range';

import { cls } from '@src/util/cssHelper';
import { addDate, Day } from '@src/time/datetime';
import { PanelGrid } from '@src/components/panelgrid/panelgrid';
import { PanelEvents } from '@src/components/panelgrid/panelEvents';
import { isBetween } from '@src/util/math';
import TZDate from '@src/time/date';
import { PanelStateStore, UPDATE_MAX_EVENT_HEIGHT_MAP } from '@src/components/layout';

import type { MilestoneEvent } from '@t/events';
import type { GridInfoList } from '@t/panel';
import { isEndOnNextWeek, isOnCurrentWeek, isStartOnPrevWeek } from '@src/time/panelEvent';

const DEFAULT_PANEL_HEIGHT = 20;
const DEFAULT_EVENT_HEIGHT = 20;
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
  const { state, dispatch } = useContext(PanelStateStore);
  const { milestone } = state;
  const height = milestone?.height ?? DEFAULT_PANEL_HEIGHT;
  const eventHeight = DEFAULT_EVENT_HEIGHT;

  const gridStartDate = gridInfoList[0].getDate();

  useEffect(() => {
    const maxEventHeightMap = gridInfoList.map(() => 0);

    const getTop = (start: number, end: number, heightMap: number[]) => {
      const eventTopList = heightMap.filter((_, index) => isBetween(index, start, end));

      return Math.max(...eventTopList);
    };
    const updateEventHeightMap = ({ start, end }: MilestoneEvent, map: number[]) => {
      const eventStartDate = start.getDate();
      const startDay = start.getDay();
      const endDay = end.getDay();
      let top: number;

      if (isStartOnPrevWeek(startDay, endDay, eventStartDate, gridStartDate)) {
        top = getTop(Day.SUN, endDay, map);
        map.forEach((_, index) => {
          if (isBetween(index, Day.SUN, endDay)) {
            map[index] = top + 1;
          }
        });
      }

      if (isEndOnNextWeek(startDay, endDay, eventStartDate, gridStartDate)) {
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

    events.forEach((event) => {
      updateEventHeightMap(event, maxEventHeightMap);
    });

    dispatch({
      type: UPDATE_MAX_EVENT_HEIGHT_MAP,
      panelType: 'milestone',
      state: {
        maxEventHeightMap,
      },
    });
  }, [dispatch, events, gridInfoList, height, milestone, eventHeight, gridStartDate]);

  return (
    <Fragment>
      <div className={cls('panel-title')} style={{ width: columnWidth }}>
        Title
      </div>
      <div className={cls('panel-milestone')}>
        <PanelGrid name="milestone" gridInfoList={gridInfoList} {...milestone} />
        <PanelEvents name="milestone" events={events} gridInfoList={gridInfoList} {...milestone} />
      </div>
    </Fragment>
  );
};
