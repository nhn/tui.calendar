import { h, FunctionComponent } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';

import { cls } from '@src/util/cssHelper';
import { toPercent } from '@src/util/units';
import { getPanelEventInfo } from '@src/time/panelEvent';

import { PanelDispatchStore, UPDATE_PANEL_HEIGHT_TO_MAX } from '@src/components/layout';
import type { PanelName, GridInfoList } from '@t/panel';

const PANEL_GRID_WRAPPER_CLASS_NAME = cls('panel-grid-wrapper');
const PANEL_GRID_CLASS_NAME = cls('panel-grid');
const WEEKDAY_EXCEED_IN_WEEK = cls('weekday-exceed-in-week');
const COLLAPSE_BTN = cls('collapse-btn');
const TOTAL_WIDTH = 100;
const DEFAULT_GRID_STYLE = {
  borderRight: '1px solid #ddd',
};

interface Props {
  name: PanelName;
  gridInfoList: GridInfoList;
  narrowWeekend: boolean;
  maxScheduleHeightMap: number[];
  renderedHeightMap: number[];
}

export const PanelGrid: FunctionComponent<Props> = ({
  name,
  gridInfoList,
  narrowWeekend,
  maxScheduleHeightMap,
  renderedHeightMap,
}) => {
  const [exceedMap, setExceedMap] = useState(
    maxScheduleHeightMap.map((maxHeight, index) => maxHeight - renderedHeightMap[index])
  );
  const [lastExceedMap, setLastExceedMap] = useState<number[]>([]);
  const [isClickedExceedCount, setClickedExceedCount] = useState(false);
  const dispatch = useContext(PanelDispatchStore);

  const onClickExceedCount = () => {
    setClickedExceedCount(true);
    setLastExceedMap(exceedMap);
    dispatch({
      type: UPDATE_PANEL_HEIGHT_TO_MAX,
      panelType: name,
      state: {},
    });
  };

  const onClickCollapseButton = () => {
    setClickedExceedCount(false);
    dispatch({
      type: 'reduceHeight',
      panelType: name,
      state: {},
    });
  };

  useEffect(() => {
    setExceedMap(
      maxScheduleHeightMap.map((maxHeight, index) => maxHeight - renderedHeightMap[index])
    );
  }, [maxScheduleHeightMap, renderedHeightMap]);

  const { widthList, leftList } = getPanelEventInfo({
    gridInfoList,
    narrowWeekend,
    totalWidth: TOTAL_WIDTH,
  });

  const renderExceedCount = (index: number) =>
    exceedMap[index] && !isClickedExceedCount ? (
      <span
        className={WEEKDAY_EXCEED_IN_WEEK}
        onClick={onClickExceedCount}
        style={{ display: isClickedExceedCount ? 'none' : '' }}
      >{`+${exceedMap[index]}`}</span>
    ) : null;
  const renderCollapseButton = (index: number) =>
    lastExceedMap[index] && isClickedExceedCount ? (
      <span className={WEEKDAY_EXCEED_IN_WEEK} onClick={onClickCollapseButton}>
        <i className={COLLAPSE_BTN} />
      </span>
    ) : null;
  const renderCells = () => {
    return gridInfoList.map((gridInfo, index) => {
      const width = toPercent(widthList[index]);
      const left = toPercent(leftList[index]);

      return (
        <div
          key={`panel-grid-${gridInfo.getDate()}`}
          className={PANEL_GRID_CLASS_NAME}
          style={{ ...DEFAULT_GRID_STYLE, width, left }}
        >
          {renderExceedCount(index)}
          {renderCollapseButton(index)}
        </div>
      );
    });
  };

  return <div className={PANEL_GRID_WRAPPER_CLASS_NAME}>{renderCells()}</div>;
};
