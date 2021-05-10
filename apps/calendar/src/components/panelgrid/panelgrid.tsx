import { h, FunctionComponent } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';

import { cls } from '@src/util/cssHelper';
import { toPercent } from '@src/util/units';
import { getGridStyleInfo } from '@src/time/panelEvent';

import { PanelStateStore, REDUCE_HEIGHT, UPDATE_PANEL_HEIGHT_TO_MAX } from '@src/components/layout';
import type { PanelName, GridInfoList } from '@t/panel';

const TOTAL_WIDTH = 100;
const DEFAULT_GRID_STYLE = {
  borderRight: '1px solid #ddd',
};

interface Props {
  name: PanelName;
  gridInfoList: GridInfoList;
  narrowWeekend: boolean;
  maxEventHeightMap?: number[];
  renderedHeightMap?: number[];
}

export const PanelGrid: FunctionComponent<Props> = ({
  name,
  gridInfoList,
  narrowWeekend,
  maxEventHeightMap = [],
  renderedHeightMap = [],
}) => {
  const [exceedMap, setExceedMap] = useState(
    maxEventHeightMap.map((maxHeight, index) => maxHeight - renderedHeightMap[index])
  );
  const [clickedCountIndex, setClickedCountIndex] = useState(0);
  const [isClickedExceedCount, setClickedExceedCount] = useState(false);
  const { dispatch } = useContext(PanelStateStore);

  const onClickExceedCount = (index: number) => {
    setClickedExceedCount(true);
    setClickedCountIndex(index);
    dispatch({
      type: UPDATE_PANEL_HEIGHT_TO_MAX,
      panelType: name,
      state: {},
    });
  };

  const onClickCollapseButton = () => {
    setClickedExceedCount(false);
    dispatch({
      type: REDUCE_HEIGHT,
      panelType: name,
      state: {},
    });
  };

  useEffect(() => {
    setExceedMap(maxEventHeightMap.map((maxHeight, index) => maxHeight - renderedHeightMap[index]));
  }, [maxEventHeightMap, renderedHeightMap]);

  const { widthList, leftList } = getGridStyleInfo({
    gridInfoList,
    narrowWeekend,
    totalWidth: TOTAL_WIDTH,
  });

  const renderExceedCount = (index: number) =>
    exceedMap[index] && !isClickedExceedCount ? (
      <span
        className={cls('weekday-exceed-in-week')}
        onClick={() => onClickExceedCount(index)}
        style={{ display: isClickedExceedCount ? 'none' : '' }}
      >{`+${exceedMap[index]}`}</span>
    ) : null;
  const renderCollapseButton = (index: number) =>
    index === clickedCountIndex && isClickedExceedCount ? (
      <span className={cls('weekday-exceed-in-week')} onClick={onClickCollapseButton}>
        <i className={cls('collapse-btn')} />
      </span>
    ) : null;

  const renderCells = () => {
    return gridInfoList.map((gridInfo, index) => {
      const width = toPercent(widthList[index]);
      const left = toPercent(leftList[index]);

      return (
        <div
          key={`panel-grid-${gridInfo.getDate()}`}
          className={cls('panel-grid')}
          style={{ ...DEFAULT_GRID_STYLE, width, left }}
        >
          {renderExceedCount(index)}
          {renderCollapseButton(index)}
        </div>
      );
    });
  };

  return <div className={cls('panel-grid-wrapper')}>{renderCells()}</div>;
};
