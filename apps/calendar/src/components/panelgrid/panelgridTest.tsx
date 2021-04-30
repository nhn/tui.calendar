import { h, FunctionComponent } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';

import { cls } from '@src/util/cssHelper';
import { toPercent } from '@src/util/units';
import {
  getGridStyleInfo,
  getMatrices,
  getViewModels,
  isBetweenEvent,
  setViewModelsInfo,
} from '@src/time/panelEvent';

import {
  PanelStateStore,
  REDUCE_HEIGHT,
  UPDATE_PANEL_HEIGHT,
  UPDATE_PANEL_HEIGHT_TO_MAX,
} from '@src/components/layout';
import type { PanelName, GridInfoList } from '@t/panel';
import Schedule from '@src/model/schedule';
import { toStartOfDay } from '@src/time/datetime';

const TOTAL_WIDTH = 100;
const DEFAULT_GRID_STYLE = {
  borderRight: '1px solid #ddd',
};
const EVENT_HEIGHT = 20;

interface Props {
  name: PanelName;
  gridInfoList: GridInfoList;
  events: Schedule[];
  panelHeight: number;
  defaultPanelHeight: number;
  narrowWeekend: boolean;
}

export const PanelGridTest: FunctionComponent<Props> = ({
  name,
  gridInfoList,
  events,
  panelHeight,
  defaultPanelHeight,
  narrowWeekend,
}) => {
  const [clickedCountIndex, setClickedCountIndex] = useState(0);
  const [isClickedExceedCount, setClickedExceedCount] = useState(false);
  const { dispatch } = useContext(PanelStateStore);

  const viewModels = getViewModels(events, gridInfoList);
  setViewModelsInfo(viewModels, gridInfoList, {});
  const maxTop = viewModels.reduce((acc, viewModel) => Math.max(acc, viewModel.top), 0);

  const onClickExceedCount = (index: number) => {
    setClickedExceedCount(true);
    setClickedCountIndex(index);
    dispatch({
      type: UPDATE_PANEL_HEIGHT,
      panelType: name,
      state: {
        panelHeight: maxTop * EVENT_HEIGHT,
      },
    });
  };

  const onClickCollapseButton = () => {
    setClickedExceedCount(false);
    dispatch({
      type: UPDATE_PANEL_HEIGHT,
      panelType: name,
      state: {
        panelHeight: defaultPanelHeight,
      },
    });
  };

  const { widthList, leftList } = getGridStyleInfo({
    gridInfoList,
    narrowWeekend,
    totalWidth: TOTAL_WIDTH,
  });

  const renderExceedCount = (index: number) => {
    const gridDate = toStartOfDay(gridInfoList[index]);
    const exceedCount = viewModels
      .filter((viewModel) => {
        const scheduleStart = toStartOfDay(viewModel.getStarts());
        const scheduleEnd = toStartOfDay(viewModel.getEnds());

        return (
          (gridDate <= scheduleStart && scheduleStart <= gridDate) ||
          (gridDate <= scheduleEnd && scheduleEnd <= gridDate)
        );
      })
      .filter(({ top }) => panelHeight < (top + 1) * EVENT_HEIGHT).length;

    return exceedCount && !isClickedExceedCount ? (
      <span
        className={cls('weekday-exceed-in-week')}
        onClick={() => onClickExceedCount(index)}
        style={{ display: isClickedExceedCount ? 'none' : '' }}
      >{`+${exceedCount}`}</span>
    ) : null;
  };
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
