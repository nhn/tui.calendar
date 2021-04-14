import { h, FunctionComponent } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';

import TZDate from '@src/time/date';
import { cls } from '@src/util/cssHelper';
import { toPercent } from '@src/util/units';
import { Day } from '@src/components/panel/schedules';

import type { PANEL_NAME } from '@src/controller/week';
import { PanelDispatchStore, UPDATE_PANEL_HEIGHT_TO_MAX } from '@src/components/layout';

const PANEL_GRID_WRAPPER_CLASS_NAME = cls('panel-grid-wrapper');
const PANEL_GRID_CLASS_NAME = cls('panel-grid');
const WEEKDAY_EXCEED_IN_WEEK = cls('weekday-exceed-in-week');
const WIDTH_PER_DAY = 100 / 12;
const DEFAULT_GRID_STYLE = {
  width: toPercent(100),
  left: 0,
  borderRight: '1px solid #ddd',
};

interface Props {
  name: PANEL_NAME;
  gridInfoList: TZDate[];
  maxScheduleHeightMap: number[];
  renderedScheduleHeightMap: number[];
}

export const Grid: FunctionComponent<Props> = ({
  name,
  gridInfoList,
  maxScheduleHeightMap,
  renderedScheduleHeightMap,
}) => {
  const [exceedMap, setExceedMap] = useState(
    maxScheduleHeightMap.map((maxHeight, index) => maxHeight - renderedScheduleHeightMap[index])
  );
  const dispatch = useContext(PanelDispatchStore);
  const isDayView = gridInfoList.length === 1;

  const onClickExceedCount = () =>
    dispatch({
      type: UPDATE_PANEL_HEIGHT_TO_MAX,
      panelType: name,
      state: {},
    });

  useEffect(() => {
    setExceedMap(
      maxScheduleHeightMap.map((maxHeight, index) => maxHeight - renderedScheduleHeightMap[index])
    );
  }, [maxScheduleHeightMap, renderedScheduleHeightMap]);

  return (
    <div className={PANEL_GRID_WRAPPER_CLASS_NAME}>
      {isDayView ? (
        <div className={PANEL_GRID_CLASS_NAME} style={{ ...DEFAULT_GRID_STYLE }} />
      ) : (
        gridInfoList.map((gridInfo, index) => {
          const day = gridInfo.getDay();
          const left = day === Day.SUN ? toPercent(0) : toPercent((2 * index - 1) * WIDTH_PER_DAY);
          const width =
            day === Day.SUN || day === Day.SAT
              ? toPercent(WIDTH_PER_DAY)
              : toPercent(WIDTH_PER_DAY * 2);

          return (
            <div
              key={`week-grid-${gridInfo.getDate()}`}
              className={PANEL_GRID_CLASS_NAME}
              style={{ ...DEFAULT_GRID_STYLE, width, left }}
            >
              {exceedMap[index] ? (
                <span
                  className={WEEKDAY_EXCEED_IN_WEEK}
                  onClick={onClickExceedCount}
                >{`+${exceedMap[index]}`}</span>
              ) : null}
            </div>
          );
        })
      )}
    </div>
  );
};
