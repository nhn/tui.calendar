import { FunctionComponent, h } from 'preact';
import { useContext, useState } from 'preact/hooks';

import { cls } from '@src/util/cssHelper';
import { toPercent } from '@src/util/units';
import {
  getGridStyleInfo,
  getViewModels,
  isInGrid,
  setViewModelsInfo,
  TOTAL_WIDTH,
} from '@src/time/panelEvent';
import Schedule from '@src/model/schedule';
import { toStartOfDay } from '@src/time/datetime';
import ScheduleViewModel from '@src/model/scheduleViewModel';
import { PanelActionType, PanelState, PanelStore } from '@src/components/layout';

import type { GridInfoList } from '@t/panel';

const DEFAULT_GRID_STYLE = {
  borderRight: '1px solid #ddd',
};
const EVENT_HEIGHT = 20;

interface Props {
  name: string;
  gridInfoList: GridInfoList;
  events: Schedule[];
  defaultPanelHeight: number;
  options?: PanelState;
}

const isExceededHeight = (panelHeight: number, eventHeight: number) => {
  return ({ top }: ScheduleViewModel) => panelHeight < (top + 1) * eventHeight;
};

const renderExceedCount = (
  index: number,
  exceedCount: number,
  isClickedExceedCount: boolean,
  onClickExceedCount: (exceedCount: number) => void
) =>
  exceedCount && !isClickedExceedCount ? (
    <span
      className={cls('weekday-exceed-in-week')}
      onClick={() => onClickExceedCount(index)}
      style={{ display: isClickedExceedCount ? 'none' : '' }}
    >{`+${exceedCount}`}</span>
  ) : null;

const renderCollapseButton = (
  index: number,
  clickedCountIndex: number,
  isClickedExceedCount: boolean,
  onClickCollapseButton: () => void
) =>
  index === clickedCountIndex && isClickedExceedCount ? (
    <span className={cls('weekday-exceed-in-week')} onClick={onClickCollapseButton}>
      <i className={cls('collapse-btn')} />
    </span>
  ) : null;

export const PanelGrid: FunctionComponent<Props> = ({
  name,
  gridInfoList,
  events,
  defaultPanelHeight,
  options = {},
}) => {
  const [clickedCountIndex, setClickedCountIndex] = useState(0);
  const [isClickedExceedCount, setClickedExceedCount] = useState(false);
  const { dispatch } = useContext(PanelStore);
  const { narrowWeekend = false, panelHeight = EVENT_HEIGHT } = options;

  const viewModels = getViewModels(events, gridInfoList);
  setViewModelsInfo(viewModels, gridInfoList, {});
  const maxTop = viewModels.reduce((acc, viewModel) => Math.max(acc, viewModel.top), 0);

  const onClickExceedCount = (index: number) => {
    setClickedExceedCount(true);
    setClickedCountIndex(index);
    dispatch({
      type: PanelActionType.UPDATE_PANEL_HEIGHT,
      panelType: name,
      state: {
        panelHeight: (maxTop + 1) * EVENT_HEIGHT,
      },
    });
  };
  const onClickCollapseButton = () => {
    setClickedExceedCount(false);
    dispatch({
      type: PanelActionType.UPDATE_PANEL_HEIGHT,
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

  const renderCells = () => {
    return gridInfoList.map((gridInfo, index) => {
      const width = toPercent(widthList[index]);
      const left = toPercent(leftList[index]);

      const gridDate = toStartOfDay(gridInfo);
      const exceedCount = viewModels
        .filter(isExceededHeight(panelHeight, EVENT_HEIGHT))
        .filter(isInGrid(gridDate)).length;

      return (
        <div
          key={`panel-grid-${gridInfo.getDate()}`}
          className={cls('panel-grid')}
          style={{ ...DEFAULT_GRID_STYLE, width, left }}
        >
          {renderExceedCount(index, exceedCount, isClickedExceedCount, onClickExceedCount)}
          {renderCollapseButton(
            index,
            clickedCountIndex,
            isClickedExceedCount,
            onClickCollapseButton
          )}
        </div>
      );
    });
  };

  return <div className={cls('panel-grid-wrapper')}>{renderCells()}</div>;
};
